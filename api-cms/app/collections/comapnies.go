package collections

import (
	"context"

	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Company struct {
	ID     primitive.ObjectID `bson:"_id" json:"id"`
	Name   string             `bson:"name" json:"name"`
	Adress string             `bson:"adress" json:"adress"`

	CreatedBy primitive.ObjectID `bson:"created_by" json:"created_by"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedBy primitive.ObjectID `bson:"updated_by" json:"updated_by"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
	DeletedBy primitive.ObjectID `bson:"deleted_by" json:"deleted_by"`
	DeletedAt *time.Time         `bson:"deleted_at" json:"deleted_at"`
}

type Companies []Company

func (u *Company) CollectionName() string {
	return "companies"
}

func (u *Company) Find(filter interface{}, opts ...*options.FindOptions) (Companies, error) {
	ctx, cancel := context.WithTimeout(context.Background(), QueryTimeOut)
	defer cancel()
	data := make(Companies, 0)
	if cursor, err := DB().Collection(u.CollectionName()).Find(ctx, filter, opts...); err == nil {
		for cursor.Next(ctx) {
			var elem Company
			if err = cursor.Decode(&elem); err != nil {
				return data, err
			}
			data = append(data, elem)
		}
		if err = cursor.Err(); err != nil {
			return data, err
		}
		return data, cursor.Close(ctx)
	} else {
		return data, err
	}
}

func (u *Company) First(filter interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), QueryTimeOut)
	defer cancel()
	if result := DB().Collection(u.CollectionName()).FindOne(ctx, filter); result.Err() != nil {
		return result.Err()
	} else {
		return result.Decode(&u)
	}
}

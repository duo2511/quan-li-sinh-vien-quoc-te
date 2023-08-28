FROM node:19.6.1-alpine
RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo "Asia/Ho_Chi_Minh" >  /etc/timezone
# Cài đặt GCC và G++ để nodejs build node-gyp
RUN apk add --update alpine-sdk
# Install python/pip
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

## Active môi trường cho nodeJS từ 17 trở lên
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app
COPY ./ /app

RUN npm install -g npm && npm install && npm run build

ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "start"]

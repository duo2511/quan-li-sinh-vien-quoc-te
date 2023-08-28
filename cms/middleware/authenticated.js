export default function ({ store, redirect, $cookies }) {
  if (!$cookies.get("jwt")) {
    return redirect({ name: "auth-login" });
  }
}

export default function ({ store, redirect, $cookies }) {
  if ($cookies.get("access_token")) {
    return redirect({ name: "admin-homepage" });
  }
}

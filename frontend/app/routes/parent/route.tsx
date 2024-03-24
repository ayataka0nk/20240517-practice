import { Outlet } from "@remix-run/react";

export default function Parent() {
  return (
    <div>
      <h1>Parent</h1>
      <Outlet />
    </div>
  );
}

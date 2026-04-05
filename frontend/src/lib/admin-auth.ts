import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "mranga-admin-session";

export async function createAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function requireAdminSession() {
  const store = await cookies();
  if (store.get(COOKIE_NAME)?.value !== "authenticated") {
    redirect("/admin/login");
  }
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === "authenticated";
}

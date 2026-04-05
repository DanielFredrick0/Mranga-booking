"use server";

import { redirect } from "next/navigation";

import { clearAdminSession, createAdminSession } from "@/lib/admin-auth";
import { updateLeadStatus } from "@/lib/api";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (
    email === (process.env.ADMIN_LOGIN_EMAIL ?? "admin@mrangatours.com") &&
    password === (process.env.ADMIN_LOGIN_PASSWORD ?? "ChangeMe123!")
  ) {
    await createAdminSession();
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateLeadStatusAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const statusValue = String(formData.get("status"));
  await updateLeadStatus(id, statusValue);
  redirect("/admin/leads");
}

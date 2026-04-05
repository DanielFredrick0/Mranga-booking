import type {
  AdminStats,
  Destination,
  Lead,
  QuoteSummary,
  Review,
  SiteHomeResponse,
  TourPackage,
} from "@/types";

const API_BASE =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000/api";
const ADMIN_KEY = process.env.BACKEND_ADMIN_API_KEY ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    ...init,
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("API request failed", { url, path, status: response.status, body: body.slice(0, 200) });
    throw new Error(`API request failed for ${path} (${response.status}) via ${url}`);
  }

  return response.json();
}

export async function getHomeData() {
  return request<SiteHomeResponse>("/site/home/");
}

export async function getTours(search = "") {
  return request<{ results: TourPackage[] }>(`/tours/${search ? `?${search}` : ""}`);
}

export async function getTour(slug: string) {
  return request<{ package: TourPackage; relatedTours: TourPackage[]; reviewSummary: { average_rating: number; total_reviews: number } }>(
    `/tours/${slug}/`,
  );
}

export async function getDestinations() {
  return request<{ results: Destination[] }>("/destinations/");
}

export async function getDestination(slug: string) {
  return request<{ destination: Destination; relatedTours: TourPackage[] }>(`/destinations/${slug}/`);
}

export async function getReviews() {
  return request<{ results: Review[]; summary: { average_rating: number; total_reviews: number } }>("/reviews/");
}

export async function getQuoteSummary(id: string) {
  return request<{ quote: QuoteSummary }>(`/quotes/${id}/summary/`);
}

export async function createQuote(payload: Record<string, unknown>) {
  return request<{ quoteId: number; email: string; status: string; message: string }>("/quotes/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}

export async function verifyQuote(payload: { quote_id: number; code: string }) {
  return request<{ quoteId: number; status: string; isVerified: boolean }>("/quotes/verify/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}

export async function resendQuoteCode(payload: { quote_id: number }) {
  return request<{ message: string }>("/quotes/resend/", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
}

export async function getAdminStats() {
  return request<AdminStats>("/admin/stats/", { headers: { "x-admin-key": ADMIN_KEY } });
}

export async function getAdminLeads(searchParams = "") {
  return request<Lead[]>(`/admin/quotes/${searchParams ? `?${searchParams}` : ""}`, {
    headers: { "x-admin-key": ADMIN_KEY },
  });
}

export async function getAdminTours() {
  return request<TourPackage[]>("/admin/tours/", { headers: { "x-admin-key": ADMIN_KEY } });
}

export async function getAdminDestinations() {
  return request<Destination[]>("/admin/destinations/", { headers: { "x-admin-key": ADMIN_KEY } });
}

export async function getAdminReviews() {
  return request<Review[]>("/admin/reviews/", { headers: { "x-admin-key": ADMIN_KEY } });
}

export async function updateLeadStatus(id: number, statusValue: string) {
  return request<Lead>(`/admin/quotes/${id}/`, {
    method: "PATCH",
    headers: { "x-admin-key": ADMIN_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ status: statusValue }),
  });
}

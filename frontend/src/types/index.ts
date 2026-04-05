export type Destination = {
  id: number;
  name: string;
  slug: string;
  description: string;
  hero_image: string;
  highlights: string[];
  best_time_to_visit: string;
};

export type TourPackage = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  duration_days: number;
  duration_nights: number;
  price_from: string;
  price_to: string;
  currency: string;
  featured_image: string;
  gallery_images?: string[];
  destinations: Destination[];
  travel_style: string;
  private_or_shared: string;
  accommodation_type: string;
  itinerary_json?: { day: number; title: string; description: string }[];
  inclusions?: string[];
  exclusions?: string[];
  is_featured: boolean;
  is_active: boolean;
};

export type Review = {
  id: number;
  guest_name: string;
  guest_country: string;
  rating: number;
  review_text: string;
  source: string;
  review_date: string;
  is_approved: boolean;
};

export type QuoteSummary = {
  id: number;
  fullName: string;
  email: string;
  destinationInterest: string[];
  tripType: string;
  travelMonth: string;
  adults: number;
  children: number;
  durationDays: number;
  status: string;
  isVerified: boolean;
};

export type SiteHomeResponse = {
  featuredPackages: TourPackage[];
  destinations: Destination[];
  reviews: Review[];
  reviewSummary: { average_rating: number; total_reviews: number };
  stats: { label: string; value: string }[];
};

export type AdminStats = {
  tours: number;
  destinations: number;
  reviews: number;
  leads: number;
  verifiedLeads: number;
  recentLeads: Lead[];
};

export type Lead = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  travel_month: string;
  adults: number;
  children: number;
  duration_days: number;
  destination_interest: string[];
  trip_type: string;
  accommodation_level: string;
  private_or_shared: string;
  budget_min: number;
  budget_max: number;
  is_verified: boolean;
  status: string;
  created_at: string;
};

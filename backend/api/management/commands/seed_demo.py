import os
from datetime import date

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from api.models import Destination, Review, TourPackage


DESTINATIONS = [
    {
        "name": "Masai Mara",
        "description": "Kenya's iconic savannah known for big cats, the Great Migration, and luxury tented camps.",
        "hero_image": "/images/masai-mara.svg",
        "highlights": ["Big Five sightings", "Great Migration season", "Balloon safari add-ons"],
        "best_time_to_visit": "July to October for migration, with excellent wildlife year-round.",
    },
    {
        "name": "Amboseli",
        "description": "A classic elephant country landscape set beneath the dramatic silhouette of Mount Kilimanjaro.",
        "hero_image": "/images/amboseli.svg",
        "highlights": ["Elephant herds", "Mount Kilimanjaro views", "Photographic game drives"],
        "best_time_to_visit": "June to October and January to February.",
    },
    {
        "name": "Tsavo East",
        "description": "Vast red-earth wilderness with dramatic scenery, elephant herds, and quieter safari circuits.",
        "hero_image": "/images/tsavo-east.svg",
        "highlights": ["Red elephants", "Galana River", "Aruba Dam wildlife viewing"],
        "best_time_to_visit": "June to October and January to March.",
    },
    {
        "name": "Tsavo West",
        "description": "Rugged volcanic landscapes, springs, and excellent mixed safari routes from the coast.",
        "hero_image": "/images/tsavo-west.svg",
        "highlights": ["Mzima Springs", "Shetani lava flows", "Scenic mixed terrain"],
        "best_time_to_visit": "June to October for drier trails and easier sightings.",
    },
    {
        "name": "Diani",
        "description": "Premium beach escape on Kenya's south coast, perfect for post-safari relaxation.",
        "hero_image": "/images/diani.svg",
        "highlights": ["White-sand beaches", "Boutique resorts", "Snorkeling and dhow trips"],
        "best_time_to_visit": "December to March and July to October.",
    },
    {
        "name": "Bush & Beach Kenya",
        "description": "Combine Kenya's classic game viewing with the Indian Ocean for a seamless twin-center holiday.",
        "hero_image": "/images/bush-beach.svg",
        "highlights": ["Safari and coast combo", "Flexible honeymoon itineraries", "Luxury or mid-range options"],
        "best_time_to_visit": "All year with best wildlife viewing from June to October.",
    },
]


TOURS = [
    {
        "title": "3 Days Tsavo East Safari",
        "short_description": "A compact wildlife escape from Mombasa into Kenya's red-elephant country.",
        "full_description": "Ideal for beach travelers wanting a classic short safari with game drives, lodge stay, and scenic park views.",
        "duration_days": 3,
        "duration_nights": 2,
        "price_from": 620,
        "price_to": 890,
        "featured_image": "/images/tsavo-east.svg",
        "gallery_images": [
            "/images/tsavo-east.svg",
            "/images/tsavo-west.svg",
        ],
        "destinations": ["Tsavo East"],
        "travel_style": "Safari only",
        "private_or_shared": "Private",
        "accommodation_type": "Mid-range lodge",
        "itinerary_json": [
            {"day": 1, "title": "Coast to Tsavo East", "description": "Drive from the coast, enter the park for a game drive, and check in at your lodge."},
            {"day": 2, "title": "Full-day game drives", "description": "Morning and afternoon safari drives around Aruba Dam and the Galana ecosystem."},
            {"day": 3, "title": "Sunrise safari and return", "description": "Final game drive before breakfast and transfer back to the coast."},
        ],
        "inclusions": ["Park fees", "Transport", "Accommodation", "Meals on safari", "Game drives"],
        "exclusions": ["International flights", "Travel insurance", "Tips", "Personal items"],
        "is_featured": True,
    },
    {
        "title": "4 Days Amboseli Safari",
        "short_description": "A scenic Kilimanjaro-backed safari with elephants, swamps, and excellent photography.",
        "full_description": "Perfect for couples and families wanting relaxed pacing, premium scenery, and strong wildlife viewing.",
        "duration_days": 4,
        "duration_nights": 3,
        "price_from": 980,
        "price_to": 1450,
        "featured_image": "/images/amboseli.svg",
        "gallery_images": [
            "/images/amboseli.svg",
            "/images/masai-mara.svg",
        ],
        "destinations": ["Amboseli"],
        "travel_style": "Safari only",
        "private_or_shared": "Private",
        "accommodation_type": "Premium lodge",
        "itinerary_json": [
            {"day": 1, "title": "Arrival in Amboseli", "description": "Transfer and afternoon game drive with Kilimanjaro views."},
            {"day": 2, "title": "Classic Amboseli day", "description": "Explore the swamps and open plains for elephants, lions, and birdlife."},
            {"day": 3, "title": "Flexible safari day", "description": "Choose a sunrise drive, cultural visit, or relaxed lodge time."},
            {"day": 4, "title": "Return journey", "description": "Breakfast and departure with optional stop en route."},
        ],
        "inclusions": ["Private transport", "Game drives", "Accommodation", "Meals", "Guide services"],
        "exclusions": ["Flights", "Travel insurance", "Tips", "Optional cultural visits"],
        "is_featured": True,
    },
    {
        "title": "5 Days Masai Mara Safari",
        "short_description": "A flagship Kenya safari with big cats, sweeping plains, and luxury camp ambiance.",
        "full_description": "Designed for guests who want a high-impact Mara experience with enough time for deep game viewing.",
        "duration_days": 5,
        "duration_nights": 4,
        "price_from": 1650,
        "price_to": 2490,
        "featured_image": "/images/masai-mara.svg",
        "gallery_images": [
            "/images/masai-mara.svg",
            "/images/amboseli.svg",
        ],
        "destinations": ["Masai Mara"],
        "travel_style": "Safari only",
        "private_or_shared": "Private",
        "accommodation_type": "Luxury tented camp",
        "itinerary_json": [
            {"day": 1, "title": "Nairobi to the Mara", "description": "Scenic transfer to camp and sunset game drive."},
            {"day": 2, "title": "Morning and afternoon drives", "description": "Search for big cats and expansive herds across the reserve."},
            {"day": 3, "title": "Full-day safari", "description": "Packed lunch safari for deeper exploration or migration crossings in season."},
            {"day": 4, "title": "Mara moments", "description": "Optional balloon safari and farewell bush dinner."},
            {"day": 5, "title": "Departure", "description": "Breakfast and return transfer."},
        ],
        "inclusions": ["Park fees", "Accommodation", "Meals", "Game drives", "Professional guide"],
        "exclusions": ["Balloon safari", "Flights", "Insurance", "Tips"],
        "is_featured": True,
    },
    {
        "title": "7 Days Bush and Beach Safari",
        "short_description": "A signature Mranga journey blending iconic safari wildlife with Diani's ocean calm.",
        "full_description": "A premium bush-to-beach itinerary ideal for first-time Kenya visitors, honeymooners, and celebratory escapes.",
        "duration_days": 7,
        "duration_nights": 6,
        "price_from": 2190,
        "price_to": 3280,
        "featured_image": "/images/bush-beach.svg",
        "gallery_images": [
            "/images/bush-beach.svg",
            "/images/diani.svg",
        ],
        "destinations": ["Tsavo East", "Diani", "Bush & Beach Kenya"],
        "travel_style": "Bush + beach",
        "private_or_shared": "Private",
        "accommodation_type": "Boutique lodge + beach resort",
        "itinerary_json": [
            {"day": 1, "title": "Begin safari", "description": "Transfer to Tsavo and afternoon wildlife viewing."},
            {"day": 2, "title": "Bush adventure", "description": "Full safari day with red elephants and savannah landscapes."},
            {"day": 3, "title": "Last game drive", "description": "Morning safari before transfer to the coast."},
            {"day": 4, "title": "Relax in Diani", "description": "Beach check-in and free afternoon."},
            {"day": 5, "title": "Ocean experiences", "description": "Optional snorkeling, dhow cruise, or spa time."},
            {"day": 6, "title": "Flexible beach day", "description": "Rest or explore local attractions."},
            {"day": 7, "title": "Departure", "description": "Beach breakfast and onward transfer."},
        ],
        "inclusions": ["Safari transport", "Park fees", "Beach stay", "Meals on safari", "Airport transfers"],
        "exclusions": ["Marine excursions", "Flights", "Insurance", "Premium beverages"],
        "is_featured": True,
    },
    {
        "title": "3 Days Diani Beach Getaway",
        "short_description": "A polished ocean escape with boutique stays, white sand, and effortless relaxation.",
        "full_description": "For travelers who want a beach-only extension or standalone coastal break with optional water activities.",
        "duration_days": 3,
        "duration_nights": 2,
        "price_from": 540,
        "price_to": 920,
        "featured_image": "/images/diani.svg",
        "gallery_images": [
            "/images/diani.svg",
            "/images/bush-beach.svg",
        ],
        "destinations": ["Diani"],
        "travel_style": "Beach only",
        "private_or_shared": "Private",
        "accommodation_type": "Beach resort",
        "itinerary_json": [
            {"day": 1, "title": "Arrival in Diani", "description": "Transfer to your beach resort and unwind."},
            {"day": 2, "title": "Beach leisure day", "description": "Optional water sports or simply enjoy the shoreline."},
            {"day": 3, "title": "Departure", "description": "Breakfast and airport or rail transfer."},
        ],
        "inclusions": ["Accommodation", "Breakfast", "Transfers", "Concierge support"],
        "exclusions": ["Flights", "Lunch and dinner", "Activities", "Travel insurance"],
        "is_featured": False,
    },
    {
        "title": "6 Days Tsavo + Diani Combo",
        "short_description": "A smooth coast-based holiday that balances safari excitement with elegant beach downtime.",
        "full_description": "Popular with families and honeymoon couples looking for wildlife, comfort, and easy logistics.",
        "duration_days": 6,
        "duration_nights": 5,
        "price_from": 1480,
        "price_to": 2380,
        "featured_image": "/images/tsavo-west.svg",
        "gallery_images": [
            "/images/tsavo-west.svg",
            "/images/diani.svg",
        ],
        "destinations": ["Tsavo West", "Diani", "Bush & Beach Kenya"],
        "travel_style": "Bush + beach",
        "private_or_shared": "Private",
        "accommodation_type": "Mid-range lodge + beach resort",
        "itinerary_json": [
            {"day": 1, "title": "Into Tsavo West", "description": "Drive inland and start your game-viewing experience."},
            {"day": 2, "title": "Wildlife and springs", "description": "Game drives with a stop at Mzima Springs."},
            {"day": 3, "title": "Coast transfer", "description": "Breakfast and scenic return to the beach."},
            {"day": 4, "title": "Beach recovery", "description": "Relaxed day by the Indian Ocean."},
            {"day": 5, "title": "Optional excursions", "description": "Choose dhow sailing, spa, or snorkeling."},
            {"day": 6, "title": "Departure", "description": "Transfer out with Mranga support."},
        ],
        "inclusions": ["Transport", "Safari lodge", "Beach resort", "Breakfasts", "Game drives"],
        "exclusions": ["Optional excursions", "Insurance", "Tips", "Premium meals"],
        "is_featured": True,
    },
]


REVIEWS = [
    ("Emily Carter", "United Kingdom", 5, "Mranga organized a flawless bush and beach honeymoon. Every handoff felt personal and smooth.", "TripAdvisor"),
    ("Daniel Mwangi", "Kenya", 5, "Excellent communication, honest advice, and a genuinely premium experience in Amboseli.", "Google"),
    ("Aisha Rahman", "UAE", 5, "Our family safari was paced perfectly for children and still felt luxurious for the adults.", "Direct Guest"),
    ("Sophie Laurent", "France", 4, "Very responsive local team and beautiful lodge choices. We'd book with them again.", "TripAdvisor"),
    ("Michael Tan", "Singapore", 5, "The Tsavo and Diani combo was exactly what we wanted. Smooth logistics and great value.", "Google"),
    ("Grace Njeri", "Kenya", 5, "Professional from inquiry to follow-up. The WhatsApp support was especially helpful.", "Direct Guest"),
]


class Command(BaseCommand):
    help = "Seed demo destinations, safari packages, reviews, and an admin user."

    def handle(self, *args, **options):
        destination_map = {}
        for item in DESTINATIONS:
            destination, _ = Destination.objects.update_or_create(name=item["name"], defaults=item)
            destination_map[destination.name] = destination

        for item in TOURS:
            payload = item.copy()
            destination_names = payload.pop("destinations")
            tour, _ = TourPackage.objects.update_or_create(title=payload["title"], defaults=payload)
            tour.destinations.set([destination_map[name] for name in destination_names])

        for index, review in enumerate(REVIEWS, start=1):
            Review.objects.update_or_create(
                guest_name=review[0],
                defaults={
                    "guest_country": review[1],
                    "rating": review[2],
                    "review_text": review[3],
                    "source": review[4],
                    "review_date": date(2025, min(index, 12), min(20, index + 5)),
                    "is_approved": True,
                },
            )

        user_model = get_user_model()
        if not user_model.objects.filter(username="mrangaadmin").exists():
            user_model.objects.create_superuser(
                username="mrangaadmin",
                email=settings.ADMIN_NOTIFICATION_EMAIL,
                password=os.getenv("DJANGO_SUPERUSER_PASSWORD", "ChangeMe123!"),
            )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully."))

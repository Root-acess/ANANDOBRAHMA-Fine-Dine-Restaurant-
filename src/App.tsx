import React, { useEffect, useState, type JSX } from "react";

interface Review {
  q: string;
  a: string;
}

interface Dish {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
}

const FALLBACK_IMAGE =
  "https://img.freepik.com/premium-photo/indian-family-eating-food-dining-table-home-restaurant-having-meal-together_466689-11716.jpg";
  "https://t3.ftcdn.net/jpg/09/10/32/74/360_F_910327477_4hV6Wega8noylYBTJzHC6k1RHh9LIfg8.jpg"

export default function Anandobrahma(): JSX.Element {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [year] = useState<number>(new Date().getFullYear());
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [msg, setMsg] = useState<string>("");
  const [showFullMenu, setShowFullMenu] = useState<boolean>(false);
  const [menuAnimIn, setMenuAnimIn] = useState<boolean>(false);

  const reviews: Review[] = [
    {
      q: "The best Hyderabadi biryani I’ve had in years. Perfect spice balance!",
      a: "— Rohan S.",
    },
    {
      q: "Mandi platter was generous and incredibly juicy. Family loved it.",
      a: "— Afreen K.",
    },
    { q: "Silky butter chicken and soft naans. Service was quick!", a: "— Vivek T." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
    // reviews.length won't change at runtime here so leaving deps empty is okay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  // Reservation
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      setMsg("Please fill all required fields correctly.");
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as { phone?: string };

    setMsg(`Reservation received! We will confirm shortly on ${data.phone ?? "your number"}.`);
    form.reset();

    // In real app: send to API here.
  };

  const sampleDishes: Dish[] = [
    {
      id: "biryani-chicken",
      name: "Chicken Dum Biryani",
      price: "₹279 / ₹349",
      desc: "Aromatic basmati, saffron and juicy chicken cooked on dum.",
      img:
        "https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg",
    },
    {
      id: "mutton-mandi",
      name: "Mutton Mandi",
      price: "₹1099 (for 2)",
      desc: "Slow-roasted mutton served on fragrant mandi rice.",
      img:
        "https://i.ytimg.com/vi/RhWVDBYC5vk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDpqt35m1C-MXNad8YxbEqdfyRlcA",
    },
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      price: "₹349",
      desc: "Silky tomato-butter gravy with tender chicken.",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGB1tZ115HdaFxkxQBXGkO7ImT1Nzu55IvYA&s fit=crop",
    },
    {
      id: "paneer-butter",
      name: "Paneer Butter Masala",
      price: "₹319",
      desc: "Creamy, rich and best with butter naan.",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2GVSX6yMjCLHtHBaQwyqjUw1rkC1sF9H8g&s",
    },
    {
      id: "veg-biryani",
      name: "Veg Biryani",
      price: "₹239 / ₹299",
      desc: "Garden-fresh veggies layered with spiced rice.",
      img:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "garlic-naan",
      name: "Garlic Naan",
      price: "₹79",
      desc: "Fluffy naan with butter and roasted garlic.",
      img:
        "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const openFullMenu = () => {
    setShowFullMenu(true);
    // simple entrance animation
    setTimeout(() => setMenuAnimIn(true), 10);
  };

  const closeFullMenu = () => {
    setMenuAnimIn(false);
    setTimeout(() => setShowFullMenu(false), 220);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    // remove handler to prevent infinite loop if fallback fails
    (e.currentTarget as any).onerror = null;
  };

  return (
    <div className="bg-[#0b0a0a] text-white font-[Poppins]">
      {/* Header */}
      <header className="sticky top-0 bg-[#0b0a0acc] backdrop-blur-md z-50 border-b border-[#1f1b1a]">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-between items-center py-3">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-800 to-amber-500 grid place-items-center font-bold text-black">
                AB
              </div>
              <div>
                <strong>ANANDOBRAHMA</strong>
                <br />
                <small className="text-[#d4c9bf]">Fine Dine Restaurant</small>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-4 items-center">
              {[
                { id: "menu", label: "Menu" },
                { id: "reserve", label: "Reserve" },
                { id: "gallery", label: "Gallery" },
                { id: "reviews", label: "Reviews" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-amber-400 transition"
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+919999999999"
                className="bg-gradient-to-r from-orange-700 to-amber-400 text-black rounded-full px-4 py-2 font-semibold"
                aria-label="Call to order"
              >
                Call to Order
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden border border-[#2b2421] rounded-lg px-3 py-1"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Open mobile menu"
            >
              ☰
            </button>
          </nav>

          {/* Mobile Nav */}
          {mobileNavOpen && (
            <div className="md:hidden bg-[#120f0e] border-t border-[#221c1a]">
              {[
                "menu",
                "reserve",
                "gallery",
                "reviews",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left border-b border-[#211b19] p-3"
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center brightness-50 -z-10"></div>

        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              "Authentic Indian",
              "Hyderabadi Biryani",
              "Mandi Special",
              "Family Dining",
            ].map((chip) => (
              <span
                key={chip}
                className="text-sm border border-[#3a3434] rounded-full px-3 py-1 bg-[#1a1512] text-[#e9d5ff]"
              >
                {chip}
              </span>
            ))}
          </div>

          <h1 className="font-[Playfair_Display] text-5xl font-bold mb-3">
            Welcome to <span className="text-[#ffd166]">ANANDOBRAHMA</span> Fine Dine.
          </h1>

          <p className="text-[#f5e7d6] max-w-2xl mb-6">
            Experience the perfect blend of authentic Indian flavors, aromatic biryanis, and
            traditional mandi — served with a touch of luxury.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection("menu")}
              className="bg-gradient-to-r from-orange-700 to-amber-500 text-black font-semibold px-4 py-2 rounded-full"
            >
              Explore Menu
            </button>

            <button
              onClick={() => scrollToSection("reserve")}
              className="border border-[#2a2626] text-white px-4 py-2 rounded-full"
            >
              Book a Table
            </button>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="border border-[#2a2626] text-white px-4 py-2 rounded-full"
            >
              Order on WhatsApp
            </a>

            <button
              onClick={openFullMenu}
              className="border border-[#2a2626] text-white px-4 py-2 rounded-full"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-[Playfair_Display] text-3xl mb-6">Our Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleDishes.map((d) => (
            <article
              key={d.id}
              className="bg-[#141212] border border-[#26201e] rounded-2xl overflow-hidden hover:border-amber-600 transition group"
            >
              <img
                src={d.img}
                alt={d.name}
                onError={handleImgError}
                loading="lazy"
                className="w-full h-52 object-cover group-hover:scale-[1.03] transition duration-300"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{d.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{d.desc}</p>
                <div className="mt-2 text-amber-300 font-semibold">{d.price}</div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded-full border border-[#2a2626] text-sm"
                    onClick={() => alert(`${d.name} added to order (demo)`)}
                    aria-label={`Add ${d.name} to order`}
                  >
                    Add
                  </button>

                  <button
                    className="px-3 py-1 rounded-full bg-[#222] text-sm"
                    onClick={() => alert(`Open details for ${d.name} (demo)`)}
                    aria-label={`Open details for ${d.name}`}
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-[Playfair_Display] text-3xl mb-6">Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <img
              key={i}
              src={`https://images.unsplash.com/photo-15${i}645?auto=format&fit=crop&w=1200&q=80&sig=${i}`}
              alt={`Dish ${i}`}
              onError={handleImgError}
              loading="lazy"
              className="rounded-2xl w-full h-64 object-cover"
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-[Playfair_Display] text-3xl mb-4">What Guests Say</h2>

          <div className="bg-[#13100f] border border-[#261e1b] rounded-2xl p-6">
            <blockquote className="text-lg italic">“{reviews[reviewIndex].q}”</blockquote>

            <div className="flex justify-between items-center mt-4">
              <span className="text-[#e7d1bd] font-semibold">{reviews[reviewIndex].a}</span>

              <div className="space-x-2">
                <button
                  onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)}
                  className="border border-[#2a2626] px-3 py-1 rounded-full"
                  aria-label="Previous review"
                >
                  ◀️
                </button>

                <button
                  onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)}
                  className="border border-[#2a2626] px-3 py-1 rounded-full"
                  aria-label="Next review"
                >
                  ▶️
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section id="reserve" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-[Playfair_Display] text-3xl mb-6">Reserve a Table</h2>

        <form
          onSubmit={handleFormSubmit}
          className="bg-[#141212] border border-[#2a2626] rounded-2xl p-6 max-w-xl mx-auto"
        >
          <label className="sr-only">Full Name</label>
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          />

          <label className="sr-only">Phone</label>
          <input
            name="phone"
            placeholder="Phone"
            type="tel"
            pattern="^[0-9+\-\s]{7,15}$"
            required
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          />

          <label className="sr-only">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          />

          <label className="sr-only">Time</label>
          <input
            type="time"
            name="time"
            required
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          />

          <select
            name="guests"
            required
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          >
            <option value="">Select guests…</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <label className="sr-only">Notes</label>
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            rows={3}
            className="w-full bg-[#0f0d0c] border border-[#2a211e] text-white px-3 py-2 rounded mb-3"
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-700 to-amber-500 text-black font-semibold px-4 py-2 rounded-full"
          >
            Confirm Reservation
          </button>

          {msg && <p className="text-sm mt-2 text-amber-400">{msg}</p>}
        </form>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-[Playfair_Display] text-3xl mb-6">Contact</h2>

        <div className="bg-[#13100f] border border-[#261e1b] rounded-2xl p-6">
          <p>
            <strong>Email:</strong> hello@anandobrahma.in |
            <strong> Phone:</strong> +91 99999 99999
          </p>

          <p className="mt-2">
            <strong>Follow:</strong>{" "}
            <a
              href="https://instagram.com/anandobrahmahyderabad"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-amber-300"
            >
              Instagram
            </a>{" "}
            · Facebook · Zomato · Swiggy
          </p>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="font-[Playfair_Display] text-3xl mb-4">Visit Us</h2>

        <div className="bg-[#141212] border border-[#2a2626] rounded-2xl p-5 grid md:grid-cols-2 gap-5">
          <div>
            <p className="mb-2">
              <strong>Address:</strong> Anandobrahma Fine Dine, Satyam Theatre Road, Hyderabad
            </p>

            <p className="mb-2">
              <strong>Phone:</strong> +91 99999 99999
            </p>

            <p className="mb-4">
              <strong>Open:</strong> 12:00 PM – 11:30 PM (All days)
            </p>

            <a
              href="https://www.google.com/maps?q=Anandobrahma+Fine+Dine+Restaurant+Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-gradient-to-r from-orange-700 to-amber-500 text-black font-semibold px-4 py-2 rounded-full"
            >
              Get Directions
            </a>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden border border-[#2a2626] shadow-lg">
              <iframe
                title="Map"
                width="100%"
                height="320"
                style={{ border: 0, filter: "grayscale(20%) contrast(90%) brightness(95%)" }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Anandobrahma%20Fine%20Dine%20Restaurant%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Full Menu Modal (simple) */}
      {showFullMenu && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity ${menuAnimIn ? "opacity-100" : "opacity-0"}`}
            onClick={closeFullMenu}
            aria-hidden
          />

          <div
            className={`relative max-w-4xl w-full bg-[#0f0d0c] rounded-2xl border border-[#26201e] overflow-hidden transform transition-transform ${
              menuAnimIn ? "translate-y-6 opacity-100" : "translate-y-12 opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Full menu"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Full Menu</h3>
                <button onClick={closeFullMenu} className="px-3 py-1 rounded-full border">
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleDishes.map((d) => (
                  <div key={d.id} className="flex gap-3 items-start">
                    <img
                      src={d.img}
                      alt={d.name}
                      onError={handleImgError}
                      loading="lazy"
                      className="w-28 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{d.name}</h4>
                      <p className="text-sm text-gray-400">{d.desc}</p>
                      <div className="text-amber-300 font-semibold mt-1">{d.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#221c1a] py-6 text-center text-gray-400 text-sm">
        © {year} ANANDOBRAHMA. Demo by SupportTech X.
      </footer>
    </div>
  );
}

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BookingButton from "@/components/shared/BookingButton";
import LocationModal from "@/components/shared/LocationModal";
import WhatsappButton from "@/components/shared/WhatsappButton";
import { LocationProvider } from "@/context/LocationContext";

/**
 * Chrome for the public marketing site.
 *
 * It lives here rather than in the root layout so full-screen routes outside
 * this group (such as the hidden TV Show screens) can render on their own.
 */
export default function MainLayout({ children }) {
  return (
    <LocationProvider>
      {/* Gym Location Selection Popup */}
      <LocationModal />

      {/* Header Component */}
      <Header />

      {/* WhatsApp Floating Button */}
      <WhatsappButton />
      {/* Booking Floating Button (visible when logged in) */}
      <BookingButton />
      {children}

      {/* Footer Component */}
      <Footer />
    </LocationProvider>
  );
}

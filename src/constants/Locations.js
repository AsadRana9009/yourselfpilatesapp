/**
 * Gym Locations Constants
 * Contact details for each Yourself Pilates location.
 * The selectable list comes from the dashboard (regions API); the contact
 * details below are matched to each region by slug/name.
 * NOTE: locations only change the displayed contacts, nothing else.
 */

const mapsEmbedUrl = (query) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(
    query,
  )}&t=m&z=16&output=embed&iwloc=near`;

export const LOCATIONS = [
  {
    slug: "caldas-da-rainha",
    name: "Caldas da Rainha",
    // keywords used to match a dashboard region to this location
    match: ["caldas"],
    phone: {
      number: "927 078 842",
      formatted: "927078842",
      label: "Contacto Telefónico",
      note: "(Chamada para a rede móvel nacional)",
    },
    email: {
      address: "contacto@yourselfpilates.pt",
      label: "Email",
    },
    address: {
      street: "Rua Diário de Notícias nº 09",
      postalCode: "2500-107",
      city: "Caldas da Rainha",
      fullAddress: "Rua Diário de Notícias nº 09, 2500-107 Caldas da Rainha",
    },
    maps: {
      embedUrl: mapsEmbedUrl(
        "Rua Diário de Notícias nº 09, 2500-107 Caldas da Rainha",
      ),
      label: "Rua Diário de Notícias nº 09, 2500-107 Caldas da Rainha",
    },
    titleLines: ["Localizada no centro", "das Caldas da Rainha"],
  },
  {
    slug: "oeiras-lisboa",
    name: "Oeiras / Lisboa",
    match: ["oeiras", "lisboa", "lisbon"],
    phone: {
      number: "+351 939 404 008",
      formatted: "+351939404008",
      label: "Contacto Telefónico",
      note: "(Chamada para a rede móvel nacional)",
    },
    email: {
      address: "oeiras@yourselfpilates.pt",
      label: "Email",
    },
    address: {
      street: "Rua Recife, 4H LJTR",
      postalCode: "",
      city: "Oeiras / Lisboa",
      fullAddress: "Rua Recife, 4H LJTR, Oeiras / Lisboa",
    },
    maps: {
      embedUrl: mapsEmbedUrl("Rua Recife, 4H LJTR, Oeiras"),
      label: "Rua Recife, 4H LJTR, Oeiras / Lisboa",
    },
    titleLines: ["Localizada em", "Oeiras / Lisboa"],
  },
];

export const DEFAULT_LOCATION = LOCATIONS[0];

export const LOCATION_STORAGE_KEY = "yourselfpilates_gym_location";

/**
 * Find the contact details matching a dashboard region (by slug or name).
 * Falls back to the default location so contacts are never empty.
 */
export const findLocationContacts = (region) => {
  if (!region) return DEFAULT_LOCATION;

  const haystack = `${region.slug ?? ""} ${region.name ?? ""}`.toLowerCase();

  return (
    LOCATIONS.find((location) =>
      location.match.some((keyword) => haystack.includes(keyword)),
    ) ?? DEFAULT_LOCATION
  );
};

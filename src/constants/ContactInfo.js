/**
 * Contact Information Constants
 * Centralized contact data for the Yourself Pilates website
 */

export const CONTACT_INFO = {
  // Phone Contact
  phone: {
    number: "927 078 842",
    formatted: "927078842",
    label: "Contacto Telefónico",
    note: "(Chamada para a rede móvel nacional)",
  },

  // Email Contact
  email: {
    address: "yourselfpilates@gmail.com",
    label: "Email",
  },

  // Physical Address
  address: {
    street: "Rua Diário de Notícias nº 09",
    postalCode: "2500-107",
    city: "Caldas da Rainha",
    fullAddress: "Rua Diário de Notícias nº 09, 2500-107 Caldas da Rainha",
    label: "Localizada no centro das Caldas da Rainha",
  },

  // Business Hours
  hours: {
    weekdays: "Segunda a Sábado",
    time: "das 8h às 20h",
    formatted: "Segunda a Sábado das 8h às 20h",
  },

  // Social Media
  social: {
    instagram: {
      url: "https://www.instagram.com/yourselfpilates/?hl=en",
      handle: "@yourselfpilates",
      label: "Instagram",
    },
  },

  // Google Maps
  maps: {
    embedUrl: `https://maps.google.com/maps?q=Rua%20Di%C3%A1rio%20de%20not%C3%ADcias%20n%C2%BA%2009%2C%202500-107%20Caldas%20da%20Rainha&t=m&z=16&output=embed&iwloc=near`,
    directionsUrl: "https://goo.gl/maps/YourMapLink", // Replace with actual Google Maps link
    label: "Rua Diário de notícias nº 09, 2500-107 Caldas da Rainha",
  },
};

// Form Configuration
export const CONTACT_FORM_CONFIG = {
  fields: {
    nome: {
      name: "name",
      label: "Nome",
      placeholder: "Nome",
      type: "text",
      required: true,
    },
    email: {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    mensagem: {
      name: "Message",
      label: "Message",
      placeholder: "Mensagem...",
      type: "textarea",
      required: false,
    },
    consentimento: {
      name: "consentimento",
      label: "Aceito os termos e condições e a política de privacidade",
      type: "checkbox",
      required: true,
    },
  },
  submitButton: {
    text: "Enviar",
    loadingText: "A enviar...",
  },
  messages: {
    success: "Mensagem enviada com sucesso! Entraremos em contacto em breve.",
    error: "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.",
  },
};

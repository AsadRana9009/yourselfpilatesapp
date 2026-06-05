/**
 * PACKAGES DATA
 * Central data source for all package pages
 * Used by dynamic package pages to render content
 */

export const PACKAGES = {
  "uma-sessao": {
    id: "uma-sessao",
    name: "1 Sessão",
    title: "1 sessão hora/aula",
    slug: "uma-sessao",
    sessions: 1,
    pricePerSession: 22,
    totalPrice: 22,
    savings: 0,
    savingsPercentage: 0,
    validity: "1 mês",
    badge: null,
    image: "/images/3.jpg", // Using existing image
    imageAlt: "Pack de 1 sessão de Pilates - Yourself Pilates Caldas da Rainha",
    description: "Pack de 1 hora, para maior flexibilidade de horários.",
    fullDescription:
      "Experimente o nosso espaço sem compromisso! Este pack inclui 1 sessão de 1 hora com acesso total a todos os equipamentos de qualidade premium. Ideal para quem quer conhecer o espaço ou tem uma agenda imprevisível.",
    features: [
      "Horários flexíveis",
      "Escolha o dia e hora",
      "Equipamentos premium",
      "Ambiente profissional",
      "Validade: 1 mês",
    ],
    whatsIncluded: [
      "Acesso a todos os equipamentos (Reformer, Cadillac, Ladder Barrel, Step Chair, Prancha de molas)",
      "Espaço de 80m² totalmente equipado",
      "WiFi gratuito de alta velocidade",
      "Ducha e vestiário disponíveis",
      "Estacionamento público próximo",
      "Ambiente profissional e climatizado",
    ],
    bestFor: "Experimentar",
    color: "#398ffc",
    popular: false,
    ctaText: "Agendar Sessão",
    url: "/packs/uma-sessao",
  },
  "quatro-aulas": {
    id: "quatro-aulas",
    name: "4 Aulas",
    title: "Pack de 4 horas/aula",
    slug: "quatro-aulas",
    sessions: 4,
    pricePerSession: 20,
    totalPrice: 80,
    savings: 8,
    savingsPercentage: 9,
    validity: "2 meses",
    badge: "Mais Popular",
    image: "/images/1.jpg", // Using existing image
    imageAlt:
      "Pack de 4 aulas de Pilates - Yourself Pilates Caldas da Rainha - Mais Popular",
    description:
      "Pack de 4 horas, pode escolher o dia e hora que desejar até um limite de 4 aulas.",
    fullDescription:
      "O nosso pack mais popular! Perfeito para quem quer praticar regularmente com a liberdade de escolher dia e hora. Com 4 sessões de 1 hora cada, tem 2 meses para aproveitar ao máximo o nosso espaço e equipamentos.",
    features: [
      "Horários flexíveis",
      "Escolha o dia e hora",
      "Equipamentos premium",
      "Ambiente profissional",
      "Validade: 2 meses",
      "Poupe 8€ no total",
    ],
    whatsIncluded: [
      "Acesso a todos os equipamentos (Reformer, Cadillac, Ladder Barrel, Step Chair, Prancha de molas)",
      "Espaço de 80m² totalmente equipado",
      "WiFi gratuito de alta velocidade",
      "Ducha e vestiário disponíveis",
      "Estacionamento público próximo",
      "Ambiente profissional e climatizado",
      "Flexibilidade de agendamento",
      "Suporte por WhatsApp",
    ],
    bestFor: "Prática Regular",
    color: "#398ffc",
    popular: true,
    ctaText: "Escolher Este Pack",
    url: "/packs/quatro-aulas",
  },
  "oito-aulas": {
    id: "oito-aulas",
    name: "8 Aulas",
    title: "Pack de 8 horas/aula",
    slug: "oito-aulas",
    sessions: 8,
    pricePerSession: 18,
    totalPrice: 144,
    savings: 32,
    savingsPercentage: 18,
    validity: "4 meses",
    badge: "Melhor Preço",
    image: "/images/2.jpg", // Using existing image
    imageAlt:
      "Pack de 8 aulas de Pilates - Yourself Pilates Caldas da Rainha - Melhor Preço",
    description:
      "Pack de 8 horas, pode escolher o dia e hora que desejar até um limite de 8 aulas.",
    fullDescription:
      "O melhor valor para o seu investimento! Com 8 sessões de 1 hora cada e 4 meses de validade, este pack oferece a máxima poupança e flexibilidade. Ideal para quem está comprometido com a prática regular de Pilates.",
    features: [
      "Horários flexíveis",
      "Escolha o dia e hora",
      "Equipamentos premium",
      "Ambiente profissional",
      "Validade: 4 meses",
      "Poupe 32€ no total",
    ],
    whatsIncluded: [
      "Acesso a todos os equipamentos (Reformer, Cadillac, Ladder Barrel, Step Chair, Prancha de molas)",
      "Espaço de 80m² totalmente equipado",
      "WiFi gratuito de alta velocidade",
      "Ducha e vestiário disponíveis",
      "Estacionamento público próximo",
      "Ambiente profissional e climatizado",
      "Flexibilidade total de agendamento",
      "Suporte prioritário por WhatsApp",
      "Desconto de 18% por sessão",
    ],
    bestFor: "Compromisso",
    color: "#00d084",
    popular: false,
    ctaText: "Obter Melhor Preço",
    url: "/packs/oito-aulas",
  },
};

export const PACKAGE_BENEFITS = [
  {
    id: 1,
    icon: "Calendar",
    title: "Horários Flexíveis",
    description: "Escolha o dia e hora que melhor se adequa à sua agenda",
  },
  {
    id: 2,
    icon: "Star",
    title: "Equipamentos Premium",
    description: "Acesso a equipamentos de topo: Reformer, Cadillac, e mais",
  },
  {
    id: 3,
    icon: "Building",
    title: "Espaço Profissional",
    description: "80m² totalmente equipados para a melhor experiência",
  },
  {
    id: 4,
    icon: "MapPin",
    title: "Localização Central",
    description: "No centro das Caldas da Rainha, fácil acesso",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Escolha o Pack",
    description:
      "Selecione o pack que melhor se adequa às suas necessidades e orçamento",
  },
  {
    step: 2,
    title: "Agende as Aulas",
    description:
      "Marque as suas sessões com total flexibilidade de horários através do nosso sistema",
  },
  {
    step: 3,
    title: "Aproveite",
    description:
      "Desfrute do espaço e equipamentos de qualidade premium num ambiente profissional",
  },
];

export const ACCESS_CONDITIONS = [
  {
    id: 1,
    text: "O valor do pacote de horas é ajustado automaticamente conforme o número de aulas agendadas.",
  },
  {
    id: 2,
    text: "Cancelamentos/remarcação dentro de 24 horas antes do início marcado, serão penalizados com uma hora do pack.",
  },
  {
    id: 3,
    text: "Por cada hora/período em que for excedida a duração acordada, será acrescido o valor/hora.",
  },
  {
    id: 4,
    text: "Após a sua contratação, aguardarei o pagamento de 100% dos valores contratados.",
  },
  {
    id: 5,
    text: "Em caso de cancelamento do agendamento, será creditado um horário a agendar até sua data de validade.",
  },
  {
    id: 6,
    text: "As aulas são de máximo 1 aluno, com intervalos de 15 minutos entre cada uma para permitir a limpeza da sala antes da entrada do horário marcado.",
    highlight: "máximo 1 aluno",
  },
  {
    id: 7,
    text: "O usuário terá total responsabilidade pelo uso durante a periodo de utilização dos locais e seus itens integrantes/os espaço e dos equipamentos fornecidos em caso de danos, quantos os elementos, o usuário será responsável pelos custos de reparação ou substituição dos itens afetados.",
  },
];

export const PACKAGE_FAQ = [
  {
    id: 1,
    question: "Qual é a validade do pack?",
    answer:
      "A validade varia por pack: 1 mês (1 sessão), 2 meses (4 aulas), 4 meses (8 aulas). O prazo começa a contar a partir da data da primeira sessão.",
  },
  {
    id: 2,
    question: "Posso transferir aulas para outra pessoa?",
    answer:
      "Não, os packs são pessoais e intransmissíveis. Cada pack está associado ao cliente que o adquiriu.",
  },
  {
    id: 3,
    question: "Como faço o agendamento das aulas?",
    answer:
      "Pode agendar através do nosso formulário online, por telefone (927 078 842) ou por WhatsApp. Oferecemos total flexibilidade de horários.",
  },
  {
    id: 4,
    question: "Posso cancelar ou remarcar uma aula?",
    answer:
      "Sim, pode cancelar ou remarcar com 24 horas de antecedência sem qualquer custo adicional. Contacte-nos por WhatsApp ou telefone.",
  },
  {
    id: 5,
    question: "O que devo trazer para as aulas?",
    answer:
      "Traga apenas roupa confortável e uma toalha. Todos os equipamentos de Pilates são fornecidos pelo estúdio.",
  },
  {
    id: 6,
    question: "Há estacionamento disponível?",
    answer:
      "Sim, há estacionamento público próximo ao estúdio. Estamos localizados no centro das Caldas da Rainha com fácil acesso.",
  },
  {
    id: 7,
    question: "Posso usar o pack fora do horário de validade?",
    answer:
      "As aulas devem ser utilizadas dentro do prazo de validade. Em situações excepcionais, contacte-nos para analisar o seu caso.",
  },
  {
    id: 8,
    question: "Como funciona o pagamento?",
    answer:
      "O pagamento é feito antecipadamente aquando da compra do pack. Aceitamos transferência bancária, MB Way ou pagamento presencial.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Maria Silva",
    rating: 5,
    text: "Excelente espaço e equipamentos de topo! O pack de 4 aulas foi perfeito para começar a praticar Pilates regularmente.",
    date: "Outubro 2024",
  },
  {
    id: 2,
    name: "João Santos",
    rating: 5,
    text: "Ambiente profissional e flexibilidade total de horários. Recomendo o pack de 8 aulas pelo melhor preço!",
    date: "Setembro 2024",
  },
  {
    id: 3,
    name: "Ana Costa",
    rating: 5,
    text: "Adorei a experiência! Comecei com 1 sessão para experimentar e agora já comprei o pack de 4 aulas.",
    date: "Novembro 2024",
  },
];

// Helper function to get all packages as array
export const getAllPackages = () => {
  return Object.values(PACKAGES);
};

// Helper function to get package by slug
export const getPackageBySlug = (slug) => {
  return PACKAGES[slug] || null;
};

// Helper function to get other packages (for comparison)
export const getOtherPackages = (currentSlug) => {
  return Object.values(PACKAGES).filter((pkg) => pkg.slug !== currentSlug);
};

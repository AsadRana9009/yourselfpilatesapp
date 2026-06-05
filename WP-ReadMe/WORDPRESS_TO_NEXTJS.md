# Yourself Pilates - WordPress to Next.js Conversion Analysis

## Executive Summary

**Site Name:** Yourself Pilates  
**Location:** Caldas da Raínha, Portugal  
**Business Type:** Pilates Studio Coworking Space  
**Language:** Portuguese (pt-PT)  
**Original WordPress Version:** 6.8.3

---

## 1. SITE STRUCTURE & PAGES

### Main Pages

1. **Home** (`/` or `/home.html`)
2. **Sobre** (`/sobre.html`) - About page
3. **Contactos** (`/contactos.html`) - Contact page
4. **Agendar Espaço** (`/agendar-espaco.html`) - Book Space page
5. **Packs** (Package pages):
   - Uma Sessão (`/packs/uma-sessao.html`) - 1 session @ 22€
   - Quatro Aulas (`/packs/quatro-aulas.html`) - 4 sessions @ 20€/session
   - Oito Aulas (`/packs/oito-aulas.html`) - 8 sessions @ 18€/session

### Legal Pages

- Política de Privacidade (`/politica-de-privacidade.html`)
- Termos e Condições (`/termos-e-condicoes.html`)
- Prazos e Condições de Entrega (`/prazos-e-condicoes-de-entrega-dos-produtos.html`)

---

## 2. WORDPRESS THEME & FRAMEWORK

### Theme Information

- **Primary Theme:** Kava v2.1.4 by Crocoblock
- **Child Theme:** Kava-child v2.1.4
- **Page Builder:** Elementor 3.32.2
- **Theme Type:** Full-width, Elementor-based theme
- **License:** GPL v2+

### Theme Features

- Full Elementor compatibility
- Responsive design
- Custom logo support
- Custom menus
- Featured images
- WooCommerce integration

---

## 3. WORDPRESS PLUGINS & FUNCTIONALITY

### Core Plugins

#### 1. **Elementor Pro** (v3.32.2)

- Page builder for all content
- Custom widgets and templates
- Responsive design tools

#### 2. **Jet Suite (Crocoblock)** - Premium Plugin Bundle

- **Jet Engine** (v3.7.6) - Custom post types & fields
- **Jet Appointments Booking** (v2.2.3) - **CRITICAL** for booking system
- **JetFormBuilder** - Form creation and management
- **Jet Elements** (v2.7.11) - Additional Elementor widgets
- **Jet Blocks** (v1.3.20.1) - Header/Footer builder
- **Jet Menu** (v2.4.15) - Advanced menu system
- **Jet Blog** (v2.4.6) - Blog layouts
- **Jet Tabs** (v2.2.10) - Tab widgets
- **Jet Tricks** (v1.5.7) - Visual effects
- **Jet Woo Builder** (v2.2.1.1) - WooCommerce integration

#### 3. **WooCommerce** (v10.2.1)

- E-commerce functionality
- Payment processing
- Package/product management

#### 4. **Other Essential Plugins**

- **Yoast SEO** (v26.0) - SEO optimization
- **Cookie Notice** (v2.5.7) - GDPR compliance
- **Click to Chat for WhatsApp** (v4.28) - WhatsApp integration
- **Lastudio Element Kit** (v1.5.5.4) - Additional widgets
- **WP Smush** - Image optimization
- **Jet Theme Core** (v2.3.0.3) - Theme integration

---

## 4. COLOR PALETTE & BRANDING

### Primary Colors

```css
--primary-color: #398ffc;      /* Blue - Main brand color */
--primary-hover: #5fb5ff;      /* Light blue - rgb(95,181,255) */
--secondary-color: #3b3d42;    /* Dark gray - Text & headings */
--tertiary-color: #c4681e4;    /* Accent color (appears in gradients) */
```

### Secondary Colors

```css
--light-gray: #a1a2a4;         /* Muted elements, placeholders */
--white: #ffffff;              /* Background & text on colored */
--background-gradient-start: #88A9C300;
--background-gradient-end: #88A9C330;
```

### Gradients

```css
/* Primary Gradient */
linear-gradient(180deg, #88A9C300 0%, #88A9C330 100%);

/* Button Gradient */
linear-gradient(200deg, var(--e-global-color-primary) 0%, var(--e-global-color-c4681e4) 100%);
```

---

## 5. TYPOGRAPHY

### Font Families

```css
/* Primary Fonts */
--font-primary: 'Roboto', sans-serif;
  • Weights: 300, 400, 500, 900

/* Secondary Fonts */
--font-secondary: 'PT Sans', Sans-serif;
--font-accent: 'Kodchasan', Sans-serif;
--font-display: 'Montserrat', Sans-serif;
  • Weight: 700
```

### Typography Scale

```css
/* Body Text */
body: 14px / 300 weight / 1.6 line-height / Roboto

/* Headings */
h1: 34px → 56px @1200px / 400 weight / 1.4 line-height
h2: 24px → 40px @1200px / 400 weight / 1.4 line-height
h3: 21px → 28px @1200px / 400 weight / 1.4 line-height
h4: 20px / 400 weight / 1.5 line-height
h5: 18px / 300 weight / 1.5 line-height
h6: 14px / 500 weight / 1.5 line-height

/* Buttons */
buttons: 11px / 900 weight / 1 line-height / 1px letter-spacing / uppercase
```

---

## 6. UI COMPONENTS IDENTIFICATION

### Navigation Components

1. **Header/Navbar**
   - Logo (image-based)
   - Horizontal menu (desktop)
   - Hamburger menu (mobile)
   - Full-width mobile menu overlay
   - WhatsApp floating button

2. **Menu Structure**
   - Desktop: Horizontal navigation
   - Mobile: Full-width slide-down
   - Hover effects with color transitions
   - Sub-menu support (dropdown)

### Content Components

#### Hero Sections

- Full-width hero with background images
- Text overlay with gradient backgrounds
- CTA buttons with animations
- Rounded corners (border-radius: 26px - 210px)

#### Icon Boxes

- Large icon (126px font-size)
- Title + Description
- Centered alignment
- Hover effects

#### Image Components

- Rounded corners (140px, 210px border-radius)
- Lazy loading implementation
- Responsive images with srcset
- Overlay effects

#### Cards/Feature Boxes

- Background images
- Text overlay
- Rounded corners (26px)
- Padding: 40px
- Min-height: 378px
- Icon + Title + Description layout

#### Carousel/Slider

- **Plugin:** Jet Carousel
- Swiper.js based
- Custom navigation arrows
- Dot pagination
- Responsive settings
- Items spacing: 20px margin

#### Forms (JetFormBuilder)

- Custom form fields
- Advanced field types (select, checkbox, radio)
- WYSIWYG editor fields
- Switcher fields
- Flatpickr date picker integration
- Form validation with Zod-like structure

### Button Styles

#### Primary Buttons

```css
.btn-primary {
  background: #398ffc;
  color: #ffffff;
  font-weight: 900;
  font-size: 11px;
  letter-spacing: 1px;
  border-radius: 29px;
  padding: 10px 60px;
}

.btn-primary:hover {
  background: #5fb5ff;
}
```

#### Gradient Buttons

```css
.btn-gradient {
  background: linear-gradient(200deg, #398ffc 0%, #c4681e4 100%);
  border-radius: 29px;
}
```

#### Outline/Ghost Buttons

```css
.btn-outline {
  background: transparent;
  border: 1px solid #398ffc;
  color: #398ffc;
}
```

### Animation Effects

#### Used Animations

- **Skew Forward** - Logo hover effect
- **Move Up Effect** - Popup transitions (translateY(-20px))
- **Move Down Effect** - Popup transitions (translateY(20px))
- **Fade Effect** - Opacity transitions
- **Scale Effect** - Transform scale
- **Zoom Effect** - Panel effects
- **Slide Effect** - Menu panels

#### Transition Timings

```css
/* Standard transitions */
transition: 200ms linear;
transition: opacity 200ms, transform 200ms;

/* Smooth transitions */
transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
transition-timing-function: cubic-bezier(0.35, 0.19, 0.45, 0.91);
```

---

## 7. BOOKING SYSTEM (JET APPOINTMENTS)

### Features Required

- Calendar view with date picker (Flatpickr)
- Time slot selection
- Package selection (1, 4, or 8 sessions)
- User information form
- Payment integration (likely Stripe or local gateway)
- Confirmation emails
- Admin dashboard for bookings management

### Form Fields Needed

- Name
- Email
- Phone
- Preferred date/time
- Package selection
- Additional notes (optional)
- Privacy policy checkbox

---

## 8. RESPONSIVE BREAKPOINTS

```css
/* Desktop */
@media (min-width: 1200px)

/* Tablet */
@media (max-width: 1024px)

/* Mobile */
@media (max-width: 767px)

/* Extra Small (if needed) */
@media (max-width: 480px)
```

### Layout Adjustments

- **Desktop:** Full-width containers, multi-column layouts
- **Tablet:** 2-column → 1-column, reduced padding
- **Mobile:** Single column, stacked elements, larger touch targets

---

## 9. NEXT.JS 16 PROJECT STRUCTURE

### Recommended File Structure

```
your-self-pilates/
├── app/
│   ├── (main)/
│   │   ├── page.jsx                    # Home
│   │   ├── sobre/page.jsx              # About
│   │   ├── contactos/page.jsx          # Contact
│   │   ├── agendar-espaco/page.jsx     # Booking
│   │   └── packs/
│   │       ├── uma-sessao/page.jsx
│   │       ├── quatro-aulas/page.jsx
│   │       └── oito-aulas/page.jsx
│   ├── layout.jsx
│   ├── globals.css
│   └── api/
│       ├── bookings/route.js
│       └── contact/route.js
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navigation.jsx
│   │   └── MobileMenu.jsx
│   ├── ui/                             # Shadcn components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── dialog.jsx
│   │   └── calendar.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── IconBoxSection.jsx
│   │   ├── CarouselSection.jsx
│   │   └── CtaSection.jsx
│   ├── booking/
│   │   ├── BookingForm.jsx
│   │   ├── DateTimePicker.jsx
│   │   ├── PackageSelector.jsx
│   │   └── BookingCalendar.jsx
│   └── shared/
│       ├── IconBox.jsx
│       ├── FeatureCard.jsx
│       └── WhatsAppButton.jsx
├── lib/
│   ├── utils.js
│   ├── api.js
│   └── validations/
│       ├── bookingSchema.js
│       └── contactSchema.js
├── hooks/
│   ├── useBooking.js
│   └── useMediaQuery.js
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── animations.css
└── tailwind.config.js
```

---

## 10. COMPONENT MAPPING: WORDPRESS → NEXT.JS

### Header Components

| WordPress/Elementor | Next.js + Tailwind + Shadcn |
|---------------------|------------------------------|
| Jet Blocks Logo | Next.js Image + Link component |
| Jet Nav Menu | Custom Navigation + Shadcn Sheet for mobile |
| Mobile Menu (Jet) | Shadcn Sheet/Drawer component |
| Search Widget | Shadcn Command/Search component |
| Auth Links | Custom component with Next Auth |

### Content Sections

| WordPress/Elementor | Next.js Implementation |
|---------------------|------------------------|
| Elementor Container | `<section>` with Tailwind flex/grid |
| Icon Box Widget | Custom IconBox component |
| Image Widget | Next.js `<Image>` component |
| Heading Widget | Custom heading with variants |
| Text Editor Widget | MDX or rich text component |
| Button Widget | Shadcn Button with variants |
| Divider Widget | Custom Divider with Tailwind |
| Google Maps | React Google Maps or Mapbox |

### Form Components

| WordPress/Elementor | Next.js Implementation |
|---------------------|------------------------|
| JetFormBuilder | React Hook Form + Zod |
| Form Fields | Shadcn Input, Select, Textarea |
| Date Picker (Flatpickr) | Shadcn Calendar + react-day-picker |
| Checkbox/Radio | Shadcn Checkbox/RadioGroup |
| Switcher | Shadcn Switch |
| File Upload | Shadcn Input with file type |

### Interactive Components

| WordPress/Elementor | Next.js Implementation |
|---------------------|------------------------|
| Jet Carousel | Swiper.js with React |
| Jet Tabs | Shadcn Tabs component |
| Jet Accordion | Shadcn Accordion |
| Modal/Popup | Shadcn Dialog/Modal |
| Hamburger Panel | Shadcn Sheet/Drawer |

### Booking System

| WordPress Feature | Next.js Implementation |
|-------------------|------------------------|
| Jet Appointments | Custom booking with Calendly API or custom |
| Calendar View | Shadcn Calendar + date-fns |
| Time Slots | Custom TimeSlot picker |
| Booking Form | React Hook Form + Zod validation |
| Payment | Stripe Elements React |

---

## 11. TAILWIND CSS CONFIGURATION

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#398ffc",
          hover: "#5fb5ff",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#3b3d42",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#c4681e4",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#a1a2a4",
          foreground: "#3b3d42",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        display: ['var(--font-kodchasan)', 'sans-serif'],
        heading: ['var(--font-pt-sans)', 'sans-serif'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '34px',
        '6xl': '40px',
        '7xl': '48px',
        '8xl': '56px',
      },
      borderRadius: {
        'lg': "var(--radius)",
        'md': "calc(var(--radius) - 2px)",
        'sm': "calc(var(--radius) - 4px)",
        'xl': '26px',
        '2xl': '29px',
        '3xl': '50px',
        'full-140': '140px',
        'full-210': '210px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 12. KEY COMPONENT SPECIFICATIONS

### 1. Hero Section Component

```jsx
// components/sections/HeroSection.jsx
<section className="relative min-h-screen flex items-center">
  <div className="absolute inset-0 bg-gradient-to-b from-[#88A9C300] to-[#88A9C330]" />
  <div className="container relative z-10">
    <div className="max-w-[740px]">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-[68px] h-px bg-primary" />
        <span className="text-muted">Label</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-normal mb-6">Title</h1>
      <Button className="rounded-2xl px-12" variant="primary">
        CTA Button
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  </div>
  <div className="absolute right-0">
    <Image 
      src="/images/hero.jpg" 
      className="rounded-l-[140px]"
      width={972}
      height={800}
    />
  </div>
</section>
```

### 2. Icon Box Component

```jsx
// components/shared/IconBox.jsx
<Card className="text-center p-10 hover:shadow-lg transition-shadow">
  <div className="flex justify-center mb-6">
    <Icon className="w-32 h-32 text-secondary" />
  </div>
  <h3 className="text-2xl font-normal mb-4">{title}</h3>
  <p className="text-base font-pt-sans leading-6">{description}</p>
</Card>
```

### 3. Feature Card Component

```jsx
// components/shared/FeatureCard.jsx
<Card className="min-h-[378px] rounded-xl p-10 bg-cover bg-center relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20" />
  <div className="relative z-10">
    <Icon className="w-8 h-8 mb-6" />
    <h3 className="text-[30px] font-pt-sans font-semibold leading-10 mb-4">
      {title}
    </h3>
    <p className="max-w-[352px] text-white">{description}</p>
  </div>
</Card>
```

### 4. Booking Form Component

```jsx
// components/booking/BookingForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookingSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  package: z.enum(['1-session', '4-sessions', '8-sessions']),
  date: z.date(),
  time: z.string(),
  notes: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, 'Deve aceitar a política'),
});

export function BookingForm() {
  const form = useForm({
    resolver: zodResolver(bookingSchema),
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

### 5. Carousel Component

```jsx
// components/sections/CarouselSection.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export function CarouselSection({ items }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <Card className="rounded-r-[50px] overflow-hidden">
            <Image src={item.image} alt={item.title} />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

---

## 13. SHADCN UI COMPONENTS NEEDED

### Core Components (Install these)

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add toast
```

### Component Customizations

Each Shadcn component should be customized to match the design:

- Button: Add gradient variant, outline variant
- Card: Add image overlay variant, rounded variants
- Input: Match the site's styling
- Calendar: Style for booking system

---

## 14. FRAMER MOTION ANIMATIONS

### Animation Configurations

```javascript
// lib/animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: 'linear' }
};

export const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { duration: 0.2, ease: 'linear' }
};

export const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4, ease: [0.35, 0.19, 0.45, 0.91] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Usage Example

```jsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div {...fadeInUp}>
  <Card />
</motion.div>
```

---

## 15. API ROUTES & BACKEND

### Required API Routes

#### 1. Booking API

```javascript
// app/api/bookings/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();
  
  // Validate with Zod
  // Save to database
  // Send confirmation email
  // Integrate with Stripe for payment
  
  return NextResponse.json({ success: true });
}
```

#### 2. Contact Form API

```javascript
// app/api/contact/route.js
export async function POST(request) {
  const data = await request.json();
  
  // Send email
  // Log to database
  
  return NextResponse.json({ success: true });
}
```

#### 3. WhatsApp Integration

```javascript
// lib/whatsapp.js
export function openWhatsApp(message) {
  const phone = '+351YOUR_PHONE';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
```

---

## 16. PAYMENT INTEGRATION (STRIPE)

### Installation

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Implementation

```jsx
// components/booking/CheckoutForm.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export function CheckoutForm({ amount, onSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentElement />
      <Button type="submit">Pagar {amount}€</Button>
    </Elements>
  );
}
```

---

## 17. SEO & META TAGS

### Implementation with Next.js Metadata API

```javascript
// app/layout.jsx or page.jsx
export const metadata = {
  title: 'Yourself Pilates - Estúdio para aulas de Pilates',
  description: 'Cowork de Pilates exclusivo para profissionais em equipamentos...',
  keywords: ['pilates', 'caldas da raínha', 'estúdio', 'coworking'],
  openGraph: {
    title: 'Yourself Pilates',
    description: '...',
    url: 'https://yourselfpilates.pt',
    siteName: 'Yourself Pilates',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yourself Pilates',
    description: '...',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon-32x32.jpg',
    apple: '/apple-touch-icon.jpg',
  },
};
```

---

## 18. PERFORMANCE OPTIMIZATION

### Image Optimization

```jsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Yourself Pilates"
  width={1920}
  height={1080}
  priority // For LCP images
  placeholder="blur"
  blurDataURL="..."
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Font Optimization

```javascript
// app/layout.jsx
import { Roboto, PT_Sans, Kodchasan } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const kodchasan = Kodchasan({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-kodchasan',
  display: 'swap',
});
```

### Code Splitting

```javascript
// Dynamic imports for heavy components
const BookingCalendar = dynamic(
  () => import('@/components/booking/BookingCalendar'),
  { ssr: false, loading: () => <Skeleton /> }
);
```

---

## 19. DEPLOYMENT CHECKLIST

### Environment Variables (.env.local)

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Email (e.g., SendGrid, Resend)
EMAIL_FROM=noreply@yourselfpilates.pt
RESEND_API_KEY=re_...

# Database (if using)
DATABASE_URL=postgresql://...

# Analytics
NEXT_PUBLIC_GA_ID=G-...

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+351...

# Calendly (if using)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...
```

### Vercel Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy
5. Configure custom domain

### Post-Deployment

- [ ] Test all forms
- [ ] Test booking system
- [ ] Test payment flow
- [ ] Verify SEO metadata
- [ ] Check mobile responsiveness
- [ ] Test all animations
- [ ] Verify analytics tracking
- [ ] Test WhatsApp integration
- [ ] Check GDPR compliance
- [ ] Performance audit with Lighthouse

---

## 20. THIRD-PARTY INTEGRATIONS

### Email Service (Resend recommended)

```bash
npm install resend
```

```javascript
// lib/email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(data) {
  await resend.emails.send({
    from: 'Yourself Pilates <noreply@yourselfpilates.pt>',
    to: data.email,
    subject: 'Confirmação de Reserva',
    html: `<p>Olá ${data.name}...</p>`,
  });
}
```

### Analytics (Google Analytics or Plausible)

```jsx
// app/layout.jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  );
}
```

### Cookie Consent

```bash
npm install react-cookie-consent
```

---

## 21. TESTING STRATEGY

### Unit Tests

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### E2E Tests

```bash
npm install -D @playwright/test
```

### Example Test

```javascript
// __tests__/BookingForm.test.jsx
import { render, screen } from '@testing-library/react';
import { BookingForm } from '@/components/booking/BookingForm';

test('renders booking form', () => {
  render(<BookingForm />);
  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
});
```

---

## 22. ACCESSIBILITY (A11Y)

### Key Requirements

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast (WCAG AA)
- Alt text for images

### Example

```jsx
<button
  aria-label="Abrir menu de navegação"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  <span className="sr-only">Menu</span>
  <MenuIcon />
</button>
```

---

## 23. WORDPRESS TO NEXT.JS MIGRATION STEPS

### Phase 1: Setup (Week 1)

1. Initialize Next.js 16 project
2. Install dependencies
3. Configure Tailwind CSS
4. Set up Shadcn UI
5. Configure fonts
6. Set up folder structure

### Phase 2: Static Content (Week 2-3)

1. Create layout components (Header, Footer, Navigation)
2. Build home page
3. Build about page
4. Build contact page
5. Create all static pages

### Phase 3: Interactive Features (Week 4)

1. Implement mobile menu
2. Add animations with Framer Motion
3. Build carousel section
4. Add WhatsApp button
5. Implement smooth scrolling

### Phase 4: Booking System (Week 5-6)

1. Design booking flow
2. Create booking form with React Hook Form + Zod
3. Implement date/time picker
4. Add package selection
5. Integrate Stripe payment
6. Set up confirmation emails
7. Test booking flow

### Phase 5: Polish & Optimize (Week 7)

1. Optimize images
2. Implement lazy loading
3. Add SEO metadata
4. Set up analytics
5. Performance testing
6. Accessibility audit

### Phase 6: Testing & Deployment (Week 8)

1. QA testing
2. Fix bugs
3. Deploy to Vercel
4. Configure domain
5. Monitor and iterate

---

## 24. ESTIMATED COSTS

### Development Tools (Free/One-time)

- Next.js: Free
- Vercel Hosting: Free tier (upgrade for production $20/month)
- Shadcn UI: Free
- Tailwind CSS: Free

### Third-Party Services (Monthly)

- Stripe: 2.9% + €0.25 per transaction
- Email Service (Resend): Free tier, then $20/month
- Database (if needed): $5-25/month
- Analytics: Free (Google Analytics) or $9/month (Plausible)

### Total Estimated Monthly Cost: ~$50-75/month

---

## 25. NOTES & RECOMMENDATIONS

### Critical Observations

1. **Jet Appointments Booking** is the core functionality - needs careful recreation
2. Heavy use of Elementor means all layouts need manual conversion
3. Multiple Jet plugins create complex dependencies
4. Portuguese language throughout - maintain all copy
5. WhatsApp integration is important for this market

### Best Practices

1. Use TypeScript for type safety (optional but recommended)
2. Implement proper error boundaries
3. Add loading states for all async operations
4. Use React Server Components where possible
5. Implement proper caching strategy
6. Set up monitoring (Sentry, LogRocket)

### Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s

---

## 26. SUPPORT & MAINTENANCE

### Post-Launch Tasks

- Monitor error logs
- Track booking conversions
- Optimize based on analytics
- Regular security updates
- Content updates as needed
- A/B testing for conversions

---

## CONCLUSION

This WordPress site is a well-structured Pilates studio booking platform built with premium Crocoblock plugins (Jet Suite) and Elementor. The migration to Next.js 16 will modernize the tech stack while maintaining all functionality, especially the critical booking system.

**Key Focus Areas:**

1. Recreate the booking system (most complex)
2. Match the visual design exactly
3. Ensure mobile responsiveness
4. Maintain SEO performance
5. Integrate payment processing

**Timeline:** 6-8 weeks for full migration
**Complexity:** Medium-High (due to booking system)
**Risk Level:** Low (straightforward conversion with clear requirements)

---

**Generated:** November 11, 2025  
**For:** YourSelf Pilates WordPress to Next.js Conversion  
**Tech Stack:** Next.js 16 (App Router) + Tailwind CSS + Shadcn UI + Framer Motion + Swiper.js + Stripe

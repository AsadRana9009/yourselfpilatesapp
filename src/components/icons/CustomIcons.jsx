import React from "react";

/**
 * Custom SVG Icons for YourSelf Pilates
 * Based on WordPress site design
 */

// Y Logo Icon - Used in Section Divider
export const YLogoIcon = ({ className = "w-18 h-18", ...props }) => (
  <svg
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M36 2L24 22L24 52L36 52L36 32L48 52L60 52L45 27L60 2L48 2L36 22L24 2L12 2L27 27L12 52L24 52Z"
      fill="currentColor"
      opacity="0.15"
    />
  </svg>
);

// Quality Badge Icon - Premium Equipment
export const QualityBadgeIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <path
      d="M63 15L75 45H107L81 64L90 95L63 75L36 95L45 64L19 45H51L63 15Z"
      fill="currentColor"
    />
    <circle cx="63" cy="63" r="8" fill="currentColor" />
  </svg>
);

// WiFi Icon - Internet
export const WifiIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <path
      d="M63 85C67.4183 85 71 81.4183 71 77C71 72.5817 67.4183 69 63 69C58.5817 69 55 72.5817 55 77C55 81.4183 58.5817 85 63 85Z"
      fill="currentColor"
    />
    <path
      d="M49 65C49 58.3726 54.3726 53 61 53H65C71.6274 53 77 58.3726 77 65"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M39 55C39 44.5066 47.5066 36 58 36H68C78.4934 36 87 44.5066 87 55"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M29 45C29 30.6406 40.6406 19 55 19H71C85.3594 19 97 30.6406 97 45"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Floor Plan Icon - 80M2 Space
export const FloorPlanIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <rect
      x="30"
      y="30"
      width="66"
      height="66"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <line
      x1="30"
      y1="63"
      x2="96"
      y2="63"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="63"
      y1="30"
      x2="63"
      y2="96"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="36"
      y="36"
      width="22"
      height="20"
      fill="currentColor"
      opacity="0.3"
    />
    <rect
      x="68"
      y="36"
      width="22"
      height="20"
      fill="currentColor"
      opacity="0.3"
    />
    <rect
      x="36"
      y="70"
      width="22"
      height="20"
      fill="currentColor"
      opacity="0.3"
    />
    <rect
      x="68"
      y="70"
      width="22"
      height="20"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

// TV Icon - Smart TV
export const TvIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <rect
      x="25"
      y="35"
      width="76"
      height="50"
      rx="4"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <rect
      x="30"
      y="40"
      width="66"
      height="40"
      fill="currentColor"
      opacity="0.2"
    />
    <line
      x1="45"
      y1="85"
      x2="55"
      y2="95"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="81"
      y1="85"
      x2="71"
      y2="95"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="45"
      y1="95"
      x2="81"
      y2="95"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="63" cy="60" r="8" fill="currentColor" />
  </svg>
);

// Air Conditioning Icon - AC
export const AirConditioningIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <rect
      x="30"
      y="35"
      width="66"
      height="25"
      rx="4"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <rect
      x="35"
      y="40"
      width="56"
      height="15"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M45 60L45 75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M55 60L55 75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M65 60L65 75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M75 60L75 75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M85 60L85 75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M40 65C35 70 35 80 40 85"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M90 65C95 70 95 80 90 85"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="50" cy="45" r="2" fill="currentColor" />
    <circle cx="60" cy="45" r="2" fill="currentColor" />
    <circle cx="70" cy="45" r="2" fill="currentColor" />
  </svg>
);

// Security Camera Icon - Video Surveillance
export const SecurityCameraIcon = ({ className = "w-32 h-32", ...props }) => (
  <svg
    viewBox="0 0 126 126"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="63"
      cy="63"
      r="58"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.1"
    />
    <path
      d="M35 50C35 45.5817 38.5817 42 43 42H73C77.4183 42 81 45.5817 81 50V65C81 69.4183 77.4183 73 73 73H43C38.5817 73 35 69.4183 35 65V50Z"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <circle
      cx="58"
      cy="57.5"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="58" cy="57.5" r="4" fill="currentColor" />
    <path d="M81 55L95 48V67L81 60" fill="currentColor" />
    <rect
      x="50"
      y="73"
      width="16"
      height="8"
      fill="currentColor"
      opacity="0.3"
    />
    <line
      x1="42"
      y1="81"
      x2="74"
      y2="81"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Location Dot Icon - Location Badge
export const LocationDotIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Blue outline */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="#88a9c3"
      strokeWidth="2"
      fill="none"
    />
    {/* Black center dot */}
    <circle cx="12" cy="12" r="4" fill="#104c88ff" />
  </svg>
);

// Chevron Right Icon - Buttons
export const ChevronRightIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Phone Icon - Phone CTA
export const PhoneIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M22 16.92V19.92C22 20.49 21.54 20.95 20.97 20.96C10.44 21.33 3.67 14.56 4.04 4.03C4.05 3.46 4.51 3 5.08 3H8.08C8.64 3 9.11 3.47 9.12 4.03C9.18 5.51 9.43 6.94 9.85 8.29C9.98 8.72 9.83 9.19 9.47 9.49L7.9 10.91C9.51 14.04 11.96 16.49 15.09 18.1L16.51 16.53C16.81 16.17 17.28 16.02 17.71 16.15C19.06 16.57 20.49 16.82 21.97 16.88C22.53 16.89 23 17.36 23 17.92Z"
      fill="currentColor"
    />
  </svg>
);

// Check Icon - Feature lists and benefits
export const CheckIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Money/Euro Icon - Baixo Custo
export const MoneyIcon = ({ className = "w-8 h-8", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M14 8H10C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12H14C15.1046 12 16 12.8954 16 14C16 15.1046 15.1046 16 14 16H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="6"
      x2="12"
      y2="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="16"
      x2="12"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Document Check Icon - Sem Burocracia
export const DocumentCheckIcon = ({ className = "w-8 h-8", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 13L11 15L15 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Instagram Icon - Social Media
export const InstagramIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
);

// Trophy Icon - Premium/Excellence
export const TrophyIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M6 9C6 9 6 4 12 4C18 4 18 9 18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 9H4C3.44772 9 3 9.44772 3 10V11C3 12.6569 4.34315 14 6 14C6 14 6 11.5 6 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 9H20C20.5523 9 21 9.44772 21 10V11C21 12.6569 19.6569 14 18 14C18 14 18 11.5 18 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14C8 17.3137 9.79086 20 12 20C14.2091 20 16 17.3137 16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 20V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 22H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Building Icon - Space/Property
export const BuildingIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="4"
      y="2"
      width="16"
      height="20"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9 6H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 6H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 10H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 10H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 14H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 14H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="11" y="18" width="2" height="4" fill="currentColor" />
  </svg>
);

// Wallet Icon - Finance/Money
export const WalletIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="3"
      y="6"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 10H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="17" cy="15" r="1" fill="currentColor" />
    <path
      d="M7 6L5 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Target/Focus Icon - Precision/Focus
export const TargetIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

// Briefcase Icon - Professional
export const BriefcaseIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="3"
      y="7"
      width="18"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 12H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 12V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Users/Network Icon - Community/Networking
export const UsersIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M3 19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13 19C13 17.3431 14.3431 16 16 16H18C19.6569 16 21 17.3431 21 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Clock/Schedule Icon - Time Management
export const ClockIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7V12L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Chart/Finances Icon - Financial Control
export const ChartIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M3 3V18C3 19.1046 3.89543 20 5 20H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 14V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 10V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M17 6V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Amenities Icon - Facilities
export const AmenitiesIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 10V14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 16L12 14L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 16V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Export all icons as a group
export const Icons = {
  YLogo: YLogoIcon,
  QualityBadge: QualityBadgeIcon,
  Wifi: WifiIcon,
  FloorPlan: FloorPlanIcon,
  Tv: TvIcon,
  AirConditioning: AirConditioningIcon,
  SecurityCamera: SecurityCameraIcon,
  LocationDot: LocationDotIcon,
  ChevronRight: ChevronRightIcon,
  Phone: PhoneIcon,
  Check: CheckIcon,
  Money: MoneyIcon,
  DocumentCheck: DocumentCheckIcon,
  Instagram: InstagramIcon,
  Trophy: TrophyIcon,
  Building: BuildingIcon,
  Wallet: WalletIcon,
  Target: TargetIcon,
  Briefcase: BriefcaseIcon,
  Users: UsersIcon,
  Clock: ClockIcon,
  Chart: ChartIcon,
  Amenities: AmenitiesIcon,
};

export default Icons;

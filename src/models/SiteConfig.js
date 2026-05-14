const mongoose = require("mongoose");

const siteConfigSchema = new mongoose.Schema(
  {
    // Brand Identity
    siteName: {
      type: String,
      default: "متجر برو بايك الفارس | Alfaris Pro Bike",
    },
    siteTagline: { type: String, default: "مغامرتك تبدأ من هنا" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },

    // Colors
    colors: {
      primary: { type: String, default: "#C62839" },
      secondary: { type: String, default: "#1F304A" },
      accent: { type: String, default: "#D4AF37" },
      background: { type: String, default: "#0D1117" },
    },

    // WhatsApp
    whatsappNumber: { type: String, default: "966502631984" },
    whatsappMessage: {
      type: String,
      default: "مرحباً، أريد الاستفسار عن الدراجات",
    },

    // Announcement Bar
    announcements: [
      {
        icon: { type: String, default: "🚚" },
        text: { type: String, required: true },
      },
    ],

    // SEO
    seo: {
      title: {
        type: String,
        default: "متجر برو بايك الفارس | Alfaris Pro Bike",
      },
      description: {
        type: String,
        default: "أفضل دراجات هوائية في المملكة العربية السعودية",
      },
      keywords: {
        type: String,
        default: "دراجات هوائية، دراجات جبلية، دراجات طريق، السعودية",
      },
      ogImage: { type: String, default: "" },
    },

    // Pixel Codes
    pixels: {
      meta: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      snapchat: { type: String, default: "" },
      twitter: { type: String, default: "" },
      google: { type: String, default: "" },
      custom: [{ type: String }],
    },

    // Hero Section
    hero: {
      image: { type: String, default: "" },
      title: { type: String, default: "مغامرتك تبدأ من هنا..!" },
      subtitle: { type: String, default: "مع دراجات برو بايك الفارس" },
      ctaText: { type: String, default: "ابدأ المغامرة" },
      ctaLink: { type: String, default: "https://wa.me/966502631984" },
    },

    // Navbar Links
    navLinks: [
      {
        label: { type: String },
        href: { type: String },
        order: { type: Number },
      },
    ],

    // Footer
    footer: {
      description: {
        type: String,
        default:
          "متجر الدراجات الهوائية الاحترافية في المملكة العربية السعودية",
      },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      socialLinks: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        snapchat: { type: String, default: "" },
        tiktok: { type: String, default: "" },
      },
      copyrightText: {
        type: String,
        default: "© 2026 الفارس برو بايك. جميع الحقوق محفوظة",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteConfig", siteConfigSchema);

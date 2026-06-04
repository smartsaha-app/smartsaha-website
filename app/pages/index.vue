<template>
  <Hero />
  <section id="about">
    <About />
  </section>
  <section id="services">
    <Service />
  </section>
  <Precision />
  <Mrv />
  <Demo />
  <Pricing />
  <section id="team">
    <Team />
  </section>
  <Cta />
  <ContactSection />
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
import About from "~/components/About.vue";
import Service from "~/components/Service.vue";
import Precision from "~/components/Precision.vue";
import Mrv from "~/components/Mrv.vue";
import Demo from "~/components/Demo.vue";
import Team from "~/components/Team.vue";
import Pricing from "~/components/Pricing.vue";
import Cta from "~/components/Cta.vue";
import ContactSection from "~/components/ContactSection.vue";
import { useLanguageStore } from "~/stores/language";
import { translate } from "~/utils/translate";

const languageStore = useLanguageStore();
const t = (key: string) => {
  const lang = languageStore.lang;
  return translate[lang][key] || key;
};

definePageMeta({
  layout: "default",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SmartSaha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartSaha is a digital agriculture platform that empowers smallholder farmers, cooperatives, and agribusinesses in Madagascar and Africa with AI-powered tools, precision agriculture features, and direct market access.",
      },
    },
    {
      "@type": "Question",
      name: "What is Precision Agriculture in SmartSaha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartSaha's Precision Agriculture uses satellite imagery, AI analytics, and weather forecasting to help farmers monitor crops, optimize yields, reduce waste, and adapt to climate change.",
      },
    },
    {
      "@type": "Question",
      name: "What is the MRV system offered by SmartSaha?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The MRV (Monitoring, Reporting, and Verification) system provides end-to-end agricultural data management: from mobile field data collection to geospatial analysis and exportable reports on an interactive dashboard secured by Postgres and PostGIS.",
      },
    },
    {
      "@type": "Question",
      name: "How does the SmartSaha Marketplace work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SmartSaha Marketplace connects farmers directly to buyers and markets, removing intermediaries to ensure fair pricing and sustainable trade for smallholder farmers.",
      },
    },
    {
      "@type": "Question",
      name: "Is SmartSaha free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartSaha offers a free Starter plan with basic platform access, local weather monitoring, and 1 registered field. The Growth plan at $29/month unlocks advanced AI analytics and up to 10 fields. Enterprise plans are available for large organizations with unlimited fields and API access.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does SmartSaha serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartSaha is based in Madagascar and serves farmers, cooperatives, and agribusinesses across Madagascar and Africa.",
      },
    },
  ],
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SmartSaha",
  applicationCategory: "https://schema.org/BusinessApplication",
  operatingSystem: "Web Browser",
  url: "https://smart-saha.com",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "0",
      priceCurrency: "USD",
      description: "Basic platform access, local weather monitoring, 1 registered field, email support.",
    },
    {
      "@type": "Offer",
      name: "Growth",
      price: "29",
      priceCurrency: "USD",
      description: "Advanced AI analytics, up to 10 registered fields, PDF report export, priority support.",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "29",
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "Unlimited fields, API access, custom training, dedicated account manager. Custom pricing.",
    },
  ],
};

useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(faqSchema) },
    { type: "application/ld+json", innerHTML: JSON.stringify(pricingSchema) },
  ],
});
</script>


<style scoped></style>

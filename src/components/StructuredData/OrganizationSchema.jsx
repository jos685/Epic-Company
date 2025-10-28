// Create a new file: components/StructuredData/OrganizationSchema.jsx
'use client';

import Script from 'next/script';

export default function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EpicAI",
    "url": "https://epicsoftwares.shop",
    "logo": "https://yoursite.com/logo.png",
    "description": "AI solutions for small businesses to boost productivity",
    "address": {
      "@type": "PostalAddress",
      // Add your address if applicable
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-768-131-905",
      "contactType": "customer service"
    }
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
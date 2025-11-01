import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import EpicAIWidget from "@/components/EpicAIWidget/EpicAIWidget";
import type { Metadata } from 'next'
import OrganizationSchema from '@/components/StructuredData/OrganizationSchema';
import Navbar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from "@/components/Whatsapp/WhatsAppButton";

export const metadata: Metadata = {
  title: 'EpicAI - AI Solutions for Businesses',
  description:  'Cut operational costs by 30% with our AI tools. Easy setup, no technical skills needed. Start your free trial today.',
  keywords: 'AI tools, small business automation, website, productivity software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T9489C6B1J"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T9489C6B1J');
            `,
          }}
        />
      </head>
      <body>
        
        {children}
         <Navbar/>
        <OrganizationSchema/>
        <Toaster position="top-right" />
        <EpicAIWidget/>
        <WhatsAppButton/>
        <Footer/>
      </body>
    </html>
  );
}

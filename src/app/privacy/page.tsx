import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - EpicAI | Data Protection & Privacy',
  description: 'Learn how EpicAI collects, uses, and protects your personal information. Our commitment to data privacy and security for all users.',
};

export default function PrivacyPolicy() {
  const lastUpdatedDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {lastUpdatedDate}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to EpicAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your 
              personal information and your right to privacy. This Privacy Policy explains how 
              we collect, use, disclose, and safeguard your information when you visit our 
              website <Link href="/" className="text-blue-600 hover:underline">epicsoftwares.shop</Link> 
              and use our services.
            </p>
            <p className="text-gray-700">
              If you have any questions or concerns about this policy, please contact us at{' '}
              <a 
                href="mailto:epicsoftwaredesigners@gmail.com" 
                className="text-blue-600 hover:underline"
              >
                epicsoftwaredesigners@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Contact us through our website forms</li>
              <li>Request quotes or services</li>
              <li>Subscribe to our newsletter</li>
              <li>Engage with us on social media</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Name and contact details (email, phone number)</li>
              <li>Company information</li>
              <li>Project requirements and specifications</li>
              <li>Budget information</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you visit our website, we automatically collect certain information about 
              your device and browsing actions, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>IP address and browser type</li>
              <li>Pages you view and time spent on pages</li>
              <li>Referring website and search terms</li>
              <li>Device information and operating system</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Providing and maintaining our services</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Processing transactions and delivering projects</li>
              <li>Sending administrative information and updates</li>
              <li>Improving our website and services</li>
              <li>Marketing and promotional communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third 
              parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>
                <strong>Service Providers:</strong> We may share information with trusted 
                third parties who assist us in operating our website and providing services
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information when required 
                by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any merger, sale of 
                company assets, or acquisition
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no internet transmission is completely secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following rights regarding your 
              personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us at{' '}
              <a 
                href="mailto:epicsoftwaredesigners@gmail.com" 
                className="text-blue-600 hover:underline"
              >
                epicsoftwaredesigners@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our website 
              and hold certain information. Cookies are files with a small amount of data that 
              may include an anonymous unique identifier.
            </p>
            <p className="text-gray-700">
              You can instruct your browser to refuse all cookies or to indicate when a cookie 
              is being sent. However, if you do not accept cookies, you may not be able to use 
              some portions of our website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to other sites that are not operated by us. If you 
              click on a third-party link, you will be directed to that third party&apos;s site. We 
              strongly advise you to review the Privacy Policy of every site you visit.
            </p>
          </section>

          {/* Children&apos;s Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for individuals under the age of 18. We do not 
              knowingly collect personal information from children under 18. If you are a parent 
              or guardian and believe your child has provided us with personal information, 
              please contact us.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the 
              &quot;Last updated&quot; date.
            </p>
            <p className="text-gray-700">
              You are advised to review this Privacy Policy periodically for any changes. 
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:epicsoftwaredesigners@gmail.com" 
                  className="text-blue-600 hover:underline"
                >
                  epicsoftwaredesigners@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a 
                  href="tel:+254768131905" 
                  className="text-blue-600 hover:underline"
                >
                  +254 768 131 905
                </a>
              </li>
              <li>
                <strong>Address:</strong> Nairobi, Kenya
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
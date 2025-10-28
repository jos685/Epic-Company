import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions - EpicAI | Service Agreement',
  description: 'Read the terms and conditions governing the use of EpicAI services. Learn about our service agreements, intellectual property, and user responsibilities.',
};

export default function TermsAndConditions() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms &amp; Conditions</h1>
          <p className="text-lg text-gray-600">
            Last updated: {lastUpdatedDate}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using EpicAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) services and website 
              (<Link href="/" className="text-blue-600 hover:underline">epicsoftwares.shop</Link>), 
              you agree to be bound by these Terms and Conditions. If you disagree with any part 
              of these terms, you may not access our services.
            </p>
          </section>

          {/* Services Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Description</h2>
            <p className="text-gray-700 mb-4">
              EpicAI provides the following services:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>AI Agents &amp; Business Automation</li>
              <li>Web Development (Next.js, React, etc.)</li>
              <li>Mobile App Development</li>
              <li>E-Commerce Solutions</li>
              <li>SEO Optimization Services</li>
              <li>Cybersecurity &amp; Penetration Testing</li>
              <li>IoT &amp; Smart Systems</li>
              <li>Payment Systems Integration (M-Pesa, etc.)</li>
              <li>UI/UX Design</li>
              <li>Google Business Profile Setup</li>
            </ul>
          </section>

          {/* Project Agreements */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Project Agreements</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1. Quotes and Proposals</h3>
            <p className="text-gray-700 mb-4">
              All quotes and proposals provided are valid for 30 days from the date of issue. 
              Projects commence upon receipt of the agreed deposit and signed agreement.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2. Payment Terms</h3>
            <p className="text-gray-700 mb-4">
              Standard payment terms are:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>50% deposit upon project initiation</li>
              <li>25% upon milestone completion</li>
              <li>25% upon project delivery and acceptance</li>
              <li>All payments are due within 15 days of invoice date</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3. Project Scope</h3>
            <p className="text-gray-700">
              Any changes to the project scope after agreement may result in additional charges 
              and timeline adjustments. Scope changes must be agreed upon in writing by both parties.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1. Client Materials</h3>
            <p className="text-gray-700 mb-4">
              You retain all intellectual property rights to materials you provide for your 
              project, including logos, content, images, and business information.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.2. Deliverables</h3>
            <p className="text-gray-700 mb-4">
              Upon full payment, we transfer all rights to the final deliverables to you, 
              excluding:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Third-party components, libraries, or frameworks with their own licenses</li>
              <li>Proprietary code and systems we developed prior to your project</li>
              <li>Our methodology, processes, and internal tools</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">4.3. Portfolio Rights</h3>
            <p className="text-gray-700">
              We retain the right to display your project in our portfolio and marketing 
              materials unless otherwise agreed in writing.
            </p>
          </section>

          {/* Client Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Client Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Provide complete, accurate, and timely information</li>
              <li>Respond to requests for feedback and approval within agreed timeframes</li>
              <li>Provide necessary access to systems and accounts when required</li>
              <li>Make timely payments as agreed</li>
              <li>Ensure all provided materials do not infringe on third-party rights</li>
            </ul>
          </section>

          {/* Warranties and Limitations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Warranties and Limitations</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1. Service Warranty</h3>
            <p className="text-gray-700 mb-4">
              We warrant that our services will be performed in a professional and workmanlike 
              manner. We provide a 30-day warranty on delivered work from the date of completion.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">6.2. Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              Our total liability for any claim arising from our services shall not exceed the 
              total amount paid by you for the specific services giving rise to the claim.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">6.3. No Guarantees</h3>
            <p className="text-gray-700">
              While we strive for excellent results, we cannot guarantee specific outcomes, 
              including but not limited to search engine rankings, sales figures, or user 
              engagement metrics.
            </p>
          </section>

          {/* Confidentiality */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Confidentiality</h2>
            <p className="text-gray-700 mb-4">
              Both parties agree to maintain the confidentiality of proprietary information 
              received from the other party. This obligation survives termination of our 
              agreement.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate a project with written notice if the other party:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Materially breaches the agreement and fails to cure within 15 days</li>
              <li>Becomes insolvent or declares bankruptcy</li>
              <li>Ceases business operations</li>
            </ul>
            <p className="text-gray-700">
              Upon termination, you will pay for all services rendered up to the termination date.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our services may integrate with or require third-party services (hosting, 
              payment processors, APIs, etc.). You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Complying with third-party terms of service</li>
              <li>Any fees associated with third-party services</li>
              <li>Maintaining your accounts with third-party providers</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws of 
              Kenya, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              In the event of any dispute, claim, or controversy arising out of or relating to 
              these Terms, the parties shall first attempt to resolve the dispute through 
              good-faith negotiations.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. We will notify you of 
              any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
            </p>
            <p className="text-gray-700">
              Your continued use of our services after any changes constitutes acceptance of 
              the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              For any questions about these Terms, please contact us:
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
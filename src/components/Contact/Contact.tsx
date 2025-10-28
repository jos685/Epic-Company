'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  MessageCircle,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const services = [
    'AI Agents & Business Automation',
    'Web Development (Next.js, React)',
    'Mobile App Development',
    'E-Commerce Solutions',
    'SEO Optimization',
    'Cybersecurity & Pen Testing',
    'IoT & Smart Systems',
    'Payment Systems (M-Pesa)',
    'UI/UX Design',
    'Google Business Profile Setup',
    'Other Project'
  ];

  const budgetRanges = [
    'KSH 10,000 - 50,000',
    'KSH 50,000 - 200,000',
    'KSH 200,000 - 500,000',
    'KSH 500,000 - 1,000,000',
    'KSH 1,000,000+',
    'Need consultation first'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();

      if (response.ok) {
        setStatus('sent');
        toast.success('Message sent successfully! We will get back to you within 2 hours.');

        // Reset form
        form.current?.reset();
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          message: ''
        });
      } else {
        setStatus('error');
        
        if (response.status === 429) {
          toast.error('Too many requests. Please try again in 15 minutes.');
        } else {
          toast.error(result.error || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      toast.error('Network error. Please try again or contact us directly.');
    }
  };

  // Schema.org structured data for local business
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "EpicAI - AI Solutions & Web Development",
    "description": "AI solutions, web development, and automation services for businesses in Kenya and worldwide",
    "url": "https://epicsoftwares.shop",
    "telephone": "+254768131905",
    "email": "epicsoftwaredesigners@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "openingHours": "Mo-Su 08:00-18:00",
    "areaServed": "Kenya",
    "serviceType": [
      "AI Development",
      "Web Development", 
      "Mobile App Development",
      "SEO Services",
      "Cybersecurity"
    ]
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Add structured data for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 fill-green-500" />
            <span>98% Client Satisfaction Rate</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900" itemProp="name">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Transform</span> Your Business?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Get your <strong>free AI strategy consultation</strong> and discover how our solutions can 
            <strong> boost your productivity by 40%</strong> while cutting costs by 30%.
          </p>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>2-Hour Response Time</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>Proven Results</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Let&apos;s Start Your Project</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you need AI automation, a new website, or custom software development, 
                we provide <strong>end-to-end solutions</strong> with <strong>measurable results</strong>. 
                Share your vision and we&apos;ll handle the technical complexity.
              </p>
            </div>

            {/* Enhanced Contact Methods */}
            <div className="space-y-6">
              <motion.div 
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                  <a 
                    href="mailto:epicsoftwaredesigners@gmail.com" 
                    className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                    itemProp="email"
                  >
                    epicsoftwaredesigners@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Preferred for detailed project discussions</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Call/WhatsApp</h4>
                  <a 
                    href="tel:+254768131905" 
                    className="text-green-600 hover:text-green-700 font-medium text-lg"
                    itemProp="telephone"
                  >
                    +254 768 131 905
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available 8AM-6PM EAT, 7 days a week</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Based in Nairobi</h4>
                  <p className="text-gray-600 font-medium" itemProp="addressLocality">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500 mt-1">Serving clients worldwide remotely</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Fast Response Guarantee</h4>
                  <p className="text-gray-600 font-medium">Within 2 Hours</p>
                  <p className="text-sm text-gray-500 mt-1">Average response time for new inquiries</p>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Why Choose Us */}
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-xl mb-6 text-white">Why 98% of Clients Choose Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span><strong>M-Pesa Integration Experts</strong> - Seamless payment solutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span><strong>AI & Automation Specialists</strong> - Boost efficiency by 40%+</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span><strong>Full-Stack Development</strong> - End-to-end project delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span><strong>Ongoing Support</strong> - 24/7 maintenance & updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span><strong>30-Day Money-Back Guarantee</strong> - Risk-free investment</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 space-y-6 relative overflow-hidden"
          >
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Get Your Free Consultation</h3>
              <p className="text-gray-600 mb-6">Complete the form below and we&apos;ll contact you within 2 hours</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company / Business
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  What service do you need? *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Estimated Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                >
                  <option value="">What&apos;s your budget range?</option>
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Tell us about your project *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project goals, timeline, specific features needed, and any challenges you're facing..."
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg mt-6"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Your Request...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get Free AI Consultation
                  </>
                )}
              </button>

              {/* Privacy Assurance */}
              <p className="text-center text-sm text-gray-500 mt-4">
                🔒 Your information is secure. We never share your data with third parties.
              </p>

              {/* Status Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 mt-4"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Failed to send message. Please try again or contact us directly.</span>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
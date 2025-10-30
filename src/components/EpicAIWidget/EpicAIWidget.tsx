'use client';
import { useState } from 'react';

export default function EpicAISidePanel() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Comprehensive FAQ database
  const faqDatabase = [
    {
      question: 'price',
      keywords: ['price', 'cost', 'how much', 'pricing', 'fee', 'rate', 'charges'],
      answer: 'Our pricing varies by project:\n• Basic website: Ksh6000 - Ksh10000\n• E-commerce site: Ksh8,500 - Ksh25,500\n• Mobile app: Ksh10,0000 - Ksh30,000\n• AI solutions: Ksh15000 - Ksh30,000\n• Custom projects: Get a free quote\n\nAll prices include 3 months of free support!'
    },
    {
      question: 'hosting',
      keywords: ['hosting', 'host', 'server', 'domain', 'deployment'],
      answer: 'Yes! We offer complete hosting solutions:\n• Shared hosting: Ksh1500/month\n• VPS hosting: Ksh2500/month\n• Domain registration: Ksh1500/year\n• SSL certificates: Included free\n• 99.9% uptime guarantee\n• Kenyan server locations available'
    },
    {
      question: 'contact',
      keywords: ['contact', 'support', 'email', 'phone', 'call', 'reach', 'get in touch'],
      answer: 'Contact us anytime:\n📧 Email: epicsoftwaredesigners@gmail.com\n📞 Phone: +254 768 131 905 / +254 783 069 010\n📍 Location: Nairobi, Kenya\n⏰ Hours: Mon-Sun, 8AM-6PM EAT\n\nWe respond within 2 hours!'
    },
    {
      question: 'technologies',
      keywords: ['technologies', 'tech stack', 'framework', 'tools', 'programming', 'code'],
      answer: 'We use modern, reliable technologies:\nFrontend: Next.js, React, TypeScript, Tailwind CSS\nBackend: Node.js, Python, Django, Laravel\nMobile: React Native, Flutter\nAI/ML: TensorFlow, OpenAI, Custom models\nDatabase: PostgreSQL, MongoDB, MySQL\nDevOps: AWS, Vercel, Docker'
    },
    {
      question: 'mobile apps',
      keywords: ['mobile', 'app', 'android', 'ios', 'phone application'],
      answer: 'Absolutely! We develop cross-platform mobile apps:\n• iOS and Android from single codebase\n• React Native & Flutter development\n• App store deployment included\n• Push notifications & offline support\n• Backend API integration\n• 6 months free maintenance'
    },
    {
      question: 'development process',
      keywords: ['process', 'how you work', 'development', 'timeline', 'steps', 'methodology'],
      answer: 'Our proven 5-step process:\n1. Discovery & Planning (Free consultation)\n2. Design & Prototyping (Client approval)\n3. Development & Coding (Regular updates)\n4. Testing & Quality Assurance\n5. Deployment & Training\n\nWe maintain transparent communication throughout!'
    },
    {
      question: 'timeline',
      keywords: ['how long', 'timeline', 'duration', 'time', 'delivery', 'deadline'],
      answer: 'Typical project timelines:\n• Basic website: 1-2 weeks\n• E-commerce site: 3-6 weeks\n• Mobile app: 4-8 weeks\n• Custom software: 2-12 weeks\n• AI solutions: 2-8 weeks\n\nWe provide detailed timelines during our free consultation!'
    },
    {
      question: 'ecommerce',
      keywords: ['ecommerce', 'online store', 'shop', 'products', 'payments', 'mpesa'],
      answer: 'We build complete e-commerce solutions:\n• Product catalogs & inventory management\n• M-Pesa, PayPal, Stripe integration\n• Vendor dashboards\n• Order tracking system\n• Mobile-responsive design\n• SEO optimized\n• Starting at $800'
    },
    {
      question: 'ai solutions',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'automation', 'chatbot'],
      answer: 'Our AI services include:\n• Custom AI chatbots & virtual assistants\n• Business process automation\n• Predictive analytics\n• Computer vision solutions\n• Natural language processing\n• AI-powered customer service\n• Starting at Ksh40,000'
    },
    {
      question: 'seo',
      keywords: ['seo', 'search engine', 'google', 'ranking', 'optimization'],
      answer: 'Our SEO services:\n• Technical SEO audit\n• Keyword research & strategy\n• On-page optimization\n• Content creation\n• Local SEO (Google Business)\n• Monthly performance reports\n• Typically see 200-400% traffic growth'
    },
    {
      question: 'support',
      keywords: ['support', 'maintenance', 'updates', 'help', 'bugs'],
      answer: 'We provide comprehensive support:\n• 3 months FREE support on all projects\n• 24/7 emergency bug fixes\n• Regular security updates\n• Performance monitoring\n• Content updates available\n• Hosting management\n• Extended support plans from Ksh2,000/month'
    },
    {
      question: 'portfolio',
      keywords: ['portfolio', 'examples', 'previous work', 'projects', 'clients'],
      answer: 'Check out our portfolio section on the main website! We\'ve worked with:\n• E-commerce stores\n• Business websites\n• Mobile applications\n• AI automation systems\n• Payment gateways\n• IoT solutions\nAll delivering measurable results for our clients.'
    },
    {
      question: 'payment',
      keywords: ['payment', 'pay', 'deposit', 'installments', 'mpesa'],
      answer: 'Flexible payment options:\n• 50% deposit to start project\n• 25% at milestone completion\n• 25% upon delivery\n• M-Pesa, bank transfer, PayPal\n• Payment plans available\n• All major currencies accepted'
    }
  ];

  const suggestedQuestions = [
    'What is the price of an eCommerce site?',
    'Do you offer hosting?',
    'How can I contact support?',
    'What technologies do you use?',
    'Can you build mobile apps?',
    'What is your development process?',
    'How long does development take?',
    'Do you integrate M-Pesa payments?',
    'What AI solutions do you offer?',
    'Do you provide SEO services?'
  ];

  const findAnswer = (userQuestion: string) => {
    const lowerQuestion = userQuestion.toLowerCase().trim();
    
    // Direct match for common questions
    for (const faq of faqDatabase) {
      for (const keyword of faq.keywords) {
        if (lowerQuestion.includes(keyword)) {
          return faq.answer;
        }
      }
    }

    // Smart matching for common phrases
    if (lowerQuestion.includes('how much') || lowerQuestion.includes('what is the cost')) {
      return faqDatabase.find(f => f.question === 'price')?.answer;
    }
    
    if (lowerQuestion.includes('how long') || lowerQuestion.includes('time taken')) {
      return faqDatabase.find(f => f.question === 'timeline')?.answer;
    }
    
    if (lowerQuestion.includes('work with') || lowerQuestion.includes('technologies')) {
      return faqDatabase.find(f => f.question === 'technologies')?.answer;
    }

    // Default response for unknown questions
    return `I understand you're asking about "${userQuestion}". While I'm optimized for common questions about our services, pricing, and processes, I'd love to give you a personalized answer!\n\nPlease contact us directly:\n📧 epicsoftwaredesigners@gmail.com\n📞 +254 768 131 905\n\nWe'll provide detailed information specific to your needs within 2 hours!`;
  };

  const handleAsk = () => {
    if (!prompt.trim()) {
      setResponse('Please enter a question so I can help you!');
      return;
    }

    setLoading(true);
    setResponse('');

    // Simulate AI "thinking" for better UX
    setTimeout(() => {
      const answer = findAnswer(prompt);
      if(answer){
        setResponse(answer);
      }else{
        setResponse('Sorry, I could not find an answer to that question. Please contact us directly for more information.');
      }
      setLoading(false);
    }, 800); // Short delay to feel responsive
  };

  const handleSuggestedQuestion = (question: string) => {
    setPrompt(question);
    setResponse('');
    setLoading(true);
    
    setTimeout(() => {
      const answer = findAnswer(question);
      if(answer){
        setResponse(answer);
      }else{
        setResponse('Sorry, I could not find an answer to that question. Please contact us directly for more information.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-40 right-4 z-40 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-3 rounded-full shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold"
      >
        Ask Epic AI
      </button>

      {/* Slide-In Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b bg-gradient-to-r from-green-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-green-700">Epic AI Assistant</h2>
            <p className="text-xs text-green-600">Powered by our knowledge base</p>
          </div>
          <button 
            onClick={() => setOpen(false)} 
            className="text-gray-500 hover:text-gray-700 text-xl transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 h-[calc(100vh-80px)] overflow-hidden">
          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about pricing, services, timeline..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              className="border border-gray-300 p-3 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              className="bg-green-600 text-white py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-green-700 transition-colors whitespace-nowrap font-medium"
              disabled={loading || !prompt.trim()}
            >
              {loading ? '...' : 'Ask'}
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
              <span className="text-sm">Epic AI is thinking...</span>
            </div>
          )}

          {/* Response Area */}
          {response && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1 overflow-y-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">AI</div>
                <strong className="text-green-700">Epic AI:</strong>
              </div>
              <div className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
                {response}
              </div>
            </div>
          )}

          {/* Suggested Questions */}
          <div className="mt-2">
            <h4 className="text-sm font-semibold mb-3 text-gray-600 flex items-center gap-2">
              <span>💡</span> Popular Questions:
            </h4>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedQuestion(q)}
                  disabled={loading}
                  className="bg-gray-50 hover:bg-green-50 border border-gray-200 text-sm px-4 py-3 rounded-lg transition-all duration-200 text-left disabled:opacity-50 text-gray-800 hover:border-green-200 hover:text-green-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
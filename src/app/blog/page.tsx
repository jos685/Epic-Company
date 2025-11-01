// Main blog listing Page

import { blogPosts } from './data/post';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 pt-10">EpicAI Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights on AI, web development, and digital transformation for Kenyan businesses
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/3">
                  <div className="h-48 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <span className="text-lg font-semibold">AI + Automation</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-900 mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with AI Insights</h3>
          <p className="mb-6 text-blue-100">
            Get the latest tips on AI automation and web development for your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
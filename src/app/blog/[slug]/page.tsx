import { blogPosts } from '../data/post';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import ShareButton from '../components/ShareButton';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors font-medium"
        >
          ← Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            {/* Use the client component for share button */}
            <ShareButton title={post.title} />
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">AI Automation</div>
              <div className="text-blue-100">Kenyan Business Solutions</div>
            </div>
          </div>

          {/* Article Content with Markdown */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                // Custom heading styles
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{children}</h3>
                ),
                // Custom paragraph styles
                p: ({ children }) => (
                  <p className="mb-4 text-gray-900 leading-relaxed">{children}</p>
                ),
                // Custom list styles
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                // Custom blockquote styles
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-900 my-4">
                    {children}
                  </blockquote>
                ),
                // Custom table styles
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-300 px-4 py-2">{children}</td>
                ),
                // Custom strong/bold
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                // Custom emphasis/italic
                em: ({ children }) => (
                  <em className="italic text-gray-900">{children}</em>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-3">Article Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Automate Your Business?</h3>
          <p className="mb-6 text-green-100 max-w-2xl mx-auto">
            Let us help you implement AI solutions that save time and grow your revenue
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link
              href="tel:+254768131905"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Call: +254 768 131 905
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase'; // ✅ Make sure this is correct

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  created_at: string;
};

export default function BlogPost() {
  const { query } = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!query.slug) return;

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', query.slug)
        .single(); // ✅ Gets one row only

      if (error) {
        console.error('Error loading post:', error);
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    }

    fetchPost();
  }, [query.slug]);

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!post) return <p className="p-6 text-red-600">Post not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt={post.title}
          width={800}
          height={400}
          className="rounded mb-6"
        />
      )}

      <article className="prose prose-green max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}

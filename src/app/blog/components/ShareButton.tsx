'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.log('Sharing failed', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Share2 size={16} />
      <span>{copied ? 'Copied!' : 'Share'}</span>
    </button>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    setMounted(true);
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setDarkMode(storedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } catch (e) {
      console.error('Could not access theme preferences', e);
    }
  }, []);

  // Update theme when darkMode changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch (e) {
      console.error('Could not save theme preference', e);
    }
  }, [darkMode, mounted]);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <button className="fixed bottom-6 right-6 p-3 bg-white border border-gray-300 rounded-full shadow-lg z-50 opacity-0">
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed bottom-6 right-6 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg z-50 transition-colors duration-200"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
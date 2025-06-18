import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 px-6 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://github.com/jos685" target="_blank" rel="noopener noreferrer">
          <Github className="w-6 h-6 text-gray-700 dark:text-white hover:text-blue-600 transition" />
        </a>
        <a href="https://linkedin.com/in/joseph-owang254" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-gray-700 dark:text-white hover:text-blue-600 transition" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-6 h-6 text-gray-700 dark:text-white hover:text-blue-500 transition" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 text-gray-700 dark:text-white hover:text-blue-700 transition" />
        </a>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </p>
    </footer>
  )
}

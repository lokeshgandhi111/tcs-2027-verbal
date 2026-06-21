import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-md bg-gradient-to-b from-white/3 to-purple-600/5 dark:from-white/1 dark:to-purple-900/10">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div>© 2026 Read N Recall. Built by Lokesh Gandhi</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="mailto:lokeshgandhimodalavalasa111@gmail.com" className="hover:text-purple-600 dark:hover:text-teal-400 transition">Email</a>
            <a href="https://github.com/lokeshgandhi111" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-teal-400 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/lokesh-gandhi-modalavalasa-9a69a5292/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-teal-400 transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
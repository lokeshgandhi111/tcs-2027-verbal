import React from 'react'

function IconLogo(){
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg gradient flex items-center justify-center shadow-md">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16v2H4z" fill="#fff" opacity="0.9" />
          <path d="M4 11h10v2H4z" fill="#fff" opacity="0.9" />
          <path d="M4 16h7v2H4z" fill="#fff" opacity="0.9" />
        </svg>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Read N Recall</h1>
        <p className="text-xs opacity-90">Read. Recall. Improve.</p>
      </div>
    </div>
  )
}

function DarkToggle({dark, setDark}){
  return (
    <button
      onClick={()=> setDark(!dark)}
      aria-label="Toggle theme"
      className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-yellow-400">
          <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )}
    </button>
  )
}

export default function Header({dark, setDark}){
  return (
    <header className="backdrop-blur-sm bg-white/30 dark:bg-black/30 border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <IconLogo />
        <div className="flex items-center gap-4">
          
          <DarkToggle dark={dark} setDark={setDark} />
        </div>
      </div>
    </header>
  )
}

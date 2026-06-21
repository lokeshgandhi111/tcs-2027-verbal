import React, { useMemo } from 'react'

function Stat({label, value, icon}){
  return (
    <div className="card p-5 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-teal-400/20 flex items-center justify-center mb-3">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </div>
  )
}

export default function Home({onStart, paragraphs}){
  const stats = useMemo(()=>{
    try{ const raw = JSON.parse(localStorage.getItem('rnr:progress')||'{}')
      return {
        practiced: raw.sessions||0,
        words: raw.totalWords||0,
        avgWpm: raw.avgWpm||0,
        bestWpm: raw.bestWpm||0
      }
    }catch(e){return {practiced:0, words:0, avgWpm:0, bestWpm:0}}
  },[])

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">Read N Recall</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">Master reading comprehension and recall skills through targeted, timed exercises designed for placement exam success.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={()=> onStart('easy')} className="card p-8 text-left hover:scale-105 transform transition-transform cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-teal-400/20 text-xs font-bold text-purple-700 dark:text-purple-300">BEGINNER</div>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-purple-500 group-hover:translate-x-1 transition"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Easy Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Perfect for building confidence with shorter paragraphs</p>
          <div className="mt-5 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">📖 <span>30s read</span></div>
            <div className="flex items-center gap-1">✍️ <span>90s write</span></div>
          </div>
        </button>
        <button onClick={()=> onStart('medium')} className="card p-8 text-left hover:scale-105 transform transition-transform cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-teal-400/20 text-xs font-bold text-teal-700 dark:text-teal-300">ADVANCED</div>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-teal-500 group-hover:translate-x-1 transition"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Medium Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Challenge yourself with longer, complex paragraphs</p>
          <div className="mt-5 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">📖 <span>30s read</span></div>
            <div className="flex items-center gap-1">✍️ <span>90s write</span></div>
          </div>
        </button>
      </section>

      {(stats.practiced > 0) && (
        <section>
          <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">🔥 Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Practiced" value={stats.practiced} icon={<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4h16v12H2z" stroke="#06b6d4" strokeWidth="1.5" fill="none"/></svg>} />
            <Stat label="Words Written" value={stats.words} icon={<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="#06b6d4" strokeWidth="1.5" fill="none"/></svg>} />
            <Stat label="Avg WPM" value={stats.avgWpm} icon={<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" stroke="#06b6d4" strokeWidth="1.5" fill="none"/></svg>} />
            <Stat label="Best WPM" value={stats.bestWpm} icon={<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17l3-8 3 6 5-10 3 15" stroke="#06b6d4" strokeWidth="1.5" fill="none"/></svg>} />
          </div>
        </section>
      )}
    </div>
  )
}

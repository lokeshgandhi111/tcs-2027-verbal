import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Practice from './components/Practice'
import paragraphs from './data/paragraphs'

export default function App(){
  const [dark, setDark] = useState(() => {
    try{ return localStorage.getItem('rnr:dark') === 'true' }catch(e){return true}
  })
  const [view, setView] = useState('home')
  const [difficulty, setDifficulty] = useState('easy')

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('rnr:dark', dark)
  },[dark])

  return (
    <div className="h-full flex flex-col">
      <Header dark={dark} setDark={setDark} />
      <main className="flex-1 overflow-y-auto container mx-auto px-4 py-8">
        {view === 'home' && <Home
          onStart={(diff)=>{ setDifficulty(diff); setView('practice') }}
          paragraphs={paragraphs}
        />}
        {view === 'practice' && <Practice
          difficulty={difficulty}
          paragraphs={paragraphs}
          onDone={()=> setView('results')}
          onBackHome={()=> setView('home')}
        />}
        {view === 'results' && <Practice
          difficulty={difficulty}
          paragraphs={paragraphs}
          showResultsOnly
          onDone={()=> setView('practice')}
          onBackHome={()=> setView('home')}
        />}
      </main>
      <Footer />
    </div>
  )
}

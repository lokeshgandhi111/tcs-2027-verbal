import React, { useEffect, useMemo, useRef, useState } from 'react'
import CircularTimer from './CircularTimer'
import { countWords, uniqueWords, recallCoverage, secondsToMMSS } from '../utils/metrics'

export default function Practice({difficulty, paragraphs, showResultsOnly, onDone, onBackHome}){
  // local state machine: read -> transition -> write -> results
  const [phase, setPhase] = useState(showResultsOnly ? 'results' : 'idle')
  const [selected, setSelected] = useState(null)
  const [readingRunning, setReadingRunning] = useState(false)
  const [writingRunning, setWritingRunning] = useState(false)
  const [response, setResponse] = useState('')
  const [timeUsed, setTimeUsed] = useState(0)
  const writeStartRef = useRef(null)

  useEffect(()=>{
    // select random paragraph
    const pool = paragraphs[difficulty] || []
    const idx = Math.floor(Math.random() * pool.length)
    setSelected(pool[idx])
    if(!showResultsOnly) setPhase('reading')
  },[difficulty, paragraphs, showResultsOnly])

  useEffect(()=>{
    if(phase === 'reading'){
      setReadingRunning(true)
      // auto transition handled by CircularTimer onComplete
    }
    if(phase === 'writing'){
      setWritingRunning(true)
      writeStartRef.current = Date.now()
    }
  },[phase])

  function handleReadingComplete(){
    setReadingRunning(false)
    setPhase('countdown')
    // short countdown
    let n=3
    const iv = setInterval(()=>{ n--; if(n<=0){ clearInterval(iv); setPhase('writing') } }, 800)
  }

  function handleWritingComplete(){
    setWritingRunning(false)
    const used = Math.round((Date.now() - writeStartRef.current)/1000) || 90
    setTimeUsed(used)
    setPhase('results')
    // update progress in localStorage
    try{
      const raw = JSON.parse(localStorage.getItem('rnr:progress')||'{}')
      const words = countWords(response)
      const wpm = Math.round(words / (used/60) || 0)
      const sessions = (raw.sessions||0) + 1
      const totalWords = (raw.totalWords||0) + words
      const bestWpm = Math.max(raw.bestWpm||0, wpm)
      const avgWpm = Math.round(((raw.avgWpm||0) * (raw.sessions||0) + wpm) / sessions || 0)
      localStorage.setItem('rnr:progress', JSON.stringify({sessions, totalWords, bestWpm, avgWpm}))
    }catch(e){/* ignore */}
  }

  const originalWords = useMemo(()=> uniqueWords(selected || ''),[selected])
  const responseWords = useMemo(()=> uniqueWords(response),[response])
  const common = useMemo(()=> {
    const set = new Set(originalWords.filter(w=> responseWords.includes(w)))
    return set.size
  },[originalWords, responseWords])

  if(!selected) return <div className="card">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {phase === 'reading' && (
        <div className="space-y-4">
          <div className="card p-8 text-center">
            <div className="flex justify-center mb-8">
              <CircularTimer seconds={30} running={readingRunning} onComplete={handleReadingComplete} size={160} />
            </div>
            <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wide mb-4">READ THE PARAGRAPH CAREFULLY</h3>
            <div className="text-lg leading-8 text-gray-800 dark:text-gray-100 text-left bg-gradient-to-br from-white/3 to-white/1 p-6 rounded-lg">{selected}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-6 tracking-wide">Focus on key details. You'll be asked to recall this text.</p>
          </div>
        </div>
      )}

      {phase === 'countdown' && (
        <div className="card p-12 text-center">
          <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wide mb-6">GET READY</h3>
          <div className="text-7xl font-black bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent animate-pulse">3</div>
          <p className="text-gray-600 dark:text-gray-400 mt-6">Prepare to write...</p>
        </div>
      )}

      {phase === 'writing' && (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <CircularTimer seconds={90} running={writingRunning} onComplete={handleWritingComplete} size={110} />
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">Write What You Recall</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Auto-submits when time expires</div>
                </div>
              </div>
              <button className="btn text-sm px-4 py-2" onClick={handleWritingComplete}>Submit Early</button>
            </div>

            <textarea
              autoFocus
              value={response}
              onChange={(e)=> setResponse(e.target.value)}
              placeholder="Type everything you remember from the paragraph..."
              className="w-full min-h-[300px] p-4 bg-white/5 dark:bg-black/5 focus:outline-none border border-white/10 dark:border-white/5 focus:border-purple-600 dark:focus:border-teal-400 rounded-lg resize-none leading-relaxed text-gray-900 dark:text-white"
            />

            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-white/10">
              <div className="flex gap-6">
                <div><strong>{countWords(response)}</strong> words</div>
                <div><strong>{response.length}</strong> characters</div>
              </div>
              <div><strong>{Math.round(countWords(response) / ( ( (Date.now() - (writeStartRef.current||Date.now()))/1000 || 1)/60) ) || 0}</strong> WPM (live)</div>
            </div>
          </div>
        </div>
      )}

      {phase === 'results' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">Results</h2>
          </div>

          <div className="card p-6">
            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wide">ORIGINAL PARAGRAPH</h4>
            <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">{selected}</p>
          </div>

          <div className="card p-6">
            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wide">YOUR RESPONSE</h4>
            <div className="mt-3 p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/2 dark:from-black/5 dark:to-black/2 text-gray-700 dark:text-gray-200 leading-relaxed min-h-[100px]">{response || <span className="text-gray-500">No response provided</span>}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-5 text-center">
              <div className="text-3xl font-bold text-purple-600">{countWords(response)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 tracking-wide">WORDS</div>
            </div>
            <div className="card p-5 text-center">
              <div className="text-3xl font-bold text-teal-600">{response.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 tracking-wide">CHARS</div>
            </div>
            <div className="card p-5 text-center">
              <div className="text-3xl font-bold text-pink-600">{secondsToMMSS(timeUsed || 90)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 tracking-wide">TIME</div>
            </div>
            <div className="card p-5 text-center">
              <div className="text-3xl font-bold text-blue-600">{Math.round(countWords(response) / ((timeUsed||90)/60) || 0)}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 tracking-wide">WPM</div>
            </div>
          </div>

          <div className="card p-6">
            <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 tracking-wide mb-4">RECALL COVERAGE</h4>
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-purple-600 to-teal-400 transition-all duration-300" style={{width: `${recallCoverage(originalWords, responseWords)}%`}} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white ml-4">{recallCoverage(originalWords, responseWords)}%</div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">You recalled {recallCoverage(originalWords, responseWords)}% of unique words from the original paragraph</p>
          </div>

          <div className="flex gap-4">
            <button className="btn flex-1 py-3" onClick={() => window.location.reload()}>Practice Another</button>
            <button className="btn-ghost btn flex-1 py-3" onClick={onBackHome}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  )
}

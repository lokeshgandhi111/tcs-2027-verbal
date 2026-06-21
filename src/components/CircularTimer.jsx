import React, { useEffect, useMemo, useState } from 'react'

export default function CircularTimer({seconds, onComplete, running, size = 120}){
  const [remaining, setRemaining] = useState(seconds)

  useEffect(()=>{ setRemaining(seconds) },[seconds])

  useEffect(()=>{
    if(!running) return
    if(remaining <= 0){ onComplete && onComplete(); return }
    const id = setInterval(()=>{
      setRemaining(r => {
        if(r <= 1){ clearInterval(id); onComplete && onComplete(); return 0 }
        return r - 1
      })
    },1000)
    return ()=> clearInterval(id)
  },[running, remaining, onComplete])

  const pct = useMemo(()=> Math.max(0, remaining / seconds),[remaining, seconds])

  const minutes = String(Math.floor(remaining/60)).padStart(2,'0')
  const secs = String(remaining%60).padStart(2,'0')

  const stroke = Math.max(6, Math.round(size * 0.07))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center justify-center" style={{width: size}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size/2},${size/2})`}>
          <circle r={radius} fill="transparent" strokeWidth={stroke} stroke="#00000020" cx="0" cy="0" />
          <circle r={radius} fill="transparent" strokeWidth={stroke} strokeLinecap="round"
            stroke="url(#g)"
            strokeDasharray={circumference}
            strokeDashoffset={(1 - pct) * circumference}
            style={{transition: 'stroke-dashoffset 0.6s linear'}}
            transform="rotate(-90)"
          />
          <text x="0" y="6" textAnchor="middle" className="timer-text" style={{fontSize: Math.round(size*0.18)}}>{minutes}:{secs}</text>
        </g>
      </svg>
    </div>
  )
}

import { useState, useEffect } from 'react'
interface ScrollState {
  x: number 
  y: number
}
function getScroll(): ScrollState {
  return {
    x: typeof window === 'undefined' ? 0 : window.pageXOffset || window.scrollX,
    y: typeof window === 'undefined' ? 0 : window.pageYOffset || document.documentElement.scrollTop,
  }
}

export function useScroll(): ScrollState {
  const [scrollState, setScroll] = useState(getScroll())

  useEffect(() => {
    let ticking: number | null = null
    function handleScroll() {
      if (ticking === null) {
        ticking = window.requestAnimationFrame(() => {
          setScroll(getScroll())
          ticking = null
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return scrollState
}
export function useScrollX(): number {
  const { x } = useScroll()
  return x
}
export function useScrollY(): number {
  const { y } = useScroll()
  return y
}

import { useEffect, useState } from 'react'

export function atPageBottom(scrollY: number, innerHeight: number, scrollHeight: number): boolean {
  return scrollY + innerHeight >= scrollHeight - 2
}

/** The section in the reading band; the first section until another one reaches it. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const list = key.split('|')
    const elements = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const bottom = () => atPageBottom(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit && !bottom()) setActive(hit.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      if (bottom()) {
        setActive(list[list.length - 1])
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [key])

  return active
}

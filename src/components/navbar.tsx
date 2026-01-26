import { useEffect, useState } from 'react'
import { DinkieIconsGithub } from './icons/github'
import { formatStars } from '@/lib/utils'

function Navbar() {
  const [stars, setStars] = useState<number | null>(null)
  const githubRepo = 'luxuling/excel-opener'

  useEffect(() => {
    fetch(`https://api.github.com/repos/${githubRepo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch((err) => console.error('Error fetching GitHub stars:', err))
  }, [])

  return (
    <nav className="border-b h-16 flex justify-between items-center px-15 fixed top-0 left-0 w-full z-0 bg-secondary">
      <h1 className="font-semibold">excel-opener</h1>
      <div className="flex items-center gap-2">
        <DinkieIconsGithub width={16} height={16} />
        <p className="text-sm font-medium">{formatStars(stars ?? 0)}</p>
      </div>
    </nav>
  )
}

export default Navbar

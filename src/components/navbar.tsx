import { DinkieIconsGithub } from './icons/github'

function Navbar() {
  return (
    <div className="border-b h-16 flex justify-between items-center px-15">
      <h1 className="font-semibold">excel-opener</h1>
      <div className="flex items-center gap-2">
        <DinkieIconsGithub width={16} height={16} />
        <p className="text-sm font-medium">200k</p>
      </div>
    </div>
  )
}

export default Navbar

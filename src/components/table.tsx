import { Button } from './ui/button'

interface ITable {
  html: TrustedHTML
  loadNewFile: () => void
}
function Table({ html, loadNewFile }: ITable) {
  return (
    <section className="px-20 pt-20 h-screen gap-3 flex flex-col items-end">
      <Button onClick={loadNewFile}>Load New File</Button>
      <div className="overflow-scroll h-[90%] border w-full">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  )
}

export default Table

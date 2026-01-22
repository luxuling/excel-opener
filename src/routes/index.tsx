import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { read, utils } from 'xlsx'
import Hero from '@/components/sections/hero'
import useToggle from '@/hooks/use-toggle'
import { UploadDialog } from '@/components/upload-modal'
import Table from '@/components/table'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [isUploadOpen, isUploadOpenToggle] = useToggle(false)
  const [loading, loadingToggle] = useToggle(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [__tableHTML, setTableHTML] = useState<TrustedHTML | null>(null)
  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file)
  }, [])

  const transformFile = useCallback(async () => {
    if (selectedFile) {
      loadingToggle.toggle()
      const arrayBuffer = await selectedFile.arrayBuffer()
      const workBook = read(arrayBuffer)

      const workSheet = workBook.Sheets[workBook.SheetNames[0]]

      const dataHTML = utils.sheet_to_html(workSheet)
      setTableHTML(dataHTML)
      loadingToggle.toggle()
      isUploadOpenToggle.toggle()
    }
  }, [selectedFile])

  return (
    <div>
      {__tableHTML ? (
        <Table html={__tableHTML} loadNewFile={isUploadOpenToggle.toggle} />
      ) : (
        <Hero onClick={isUploadOpenToggle.toggle} />
      )}
      <UploadDialog
        loading={loading}
        isOpen={isUploadOpen}
        onClose={isUploadOpenToggle.toggle}
        value={selectedFile}
        accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleFileChange}
        onConfirm={transformFile}
      />
    </div>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Hero from '@/components/sections/hero'
import useToggle from '@/hooks/use-toggle'
import { UploadDialog } from '@/components/upload-modal'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [isUploadOpen, isUploadOpenToggle] = useToggle(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
    console.log('Selected file:', file)
  }

  return (
    <div>
      <Hero onClick={isUploadOpenToggle.toggle} />
      <UploadDialog
        isOpen={isUploadOpen}
        onClose={isUploadOpenToggle.toggle}
        value={selectedFile}
        accept="xlsx"
        onChange={handleFileChange}
      />
    </div>
  )
}

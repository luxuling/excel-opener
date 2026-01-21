import { useRef, useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { isFileSizeSafe } from '@/lib/utils'

interface IUploadDialog {
  isOpen: boolean
  onClose: () => void
  value?: File | null
  onChange?: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  title?: string
  description?: string
}

export function UploadDialog({
  isOpen,
  onClose,
  value,
  onChange,
  accept = '*/*',
  maxSize = 10,
  title = 'Upload',
  description = 'Select the file or drag & drop the file',
}: IUploadDialog) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (file: File | null) => {
    setError(null)

    if (!file) {
      onChange?.(null)
      return
    }

    if (!isFileSizeSafe(file, maxSize)) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    onChange?.(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const handleRemoveFile = () => {
    handleFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[425px] overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-primary/10'
              }
            `}
            onClick={handleBrowseClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="flex flex-col items-center space-y-3">
              <div
                className={`
                p-3 rounded-full 
                ${isDragging ? 'bg-primary/10' : 'bg-primary'}
              `}
              >
                <Upload
                  className={`
                  w-8 h-8 
                  ${isDragging ? 'text-primary' : 'text-secondary'}
                `}
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {isDragging
                    ? 'Drop file here'
                    : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">
                  Maximum file size: {maxSize}MB
                </p>
              </div>
            </div>
          </div>

          {value && (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-gray-200 w-full">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary text-ellipsis line-clamp-1">
                    {value.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(value.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {error && (
            <div className="p-3 border border-destructive rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

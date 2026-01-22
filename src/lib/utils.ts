import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const isFileSizeSafe = (file: File, maxSize: number) => {
  const fileSizeInMB = file.size / (1024 * 1024)
  return fileSizeInMB < maxSize
}

export const isFileExtensionValid = (file: File, allowed: Array<string>) => {
  const extension = file.name.split('.').pop()
  if (!extension) return false
  return allowed.includes(extension)
}

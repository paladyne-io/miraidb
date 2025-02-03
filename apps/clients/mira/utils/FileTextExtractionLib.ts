// src/utils/fileProcessor.ts
import * as pdfjsLib from 'pdfjs-dist'

// Define an interface for file processing results
export interface FileProcessingResult {
  text: string
  metadata: {
    originalFileName: string
    fileType: string
    fileSize: number
  }
}

// Main file processing utility class
export class FileProcessor {
  // PDF processing method
  static async processPDF(file: File): Promise<FileProcessingResult> {
    try {
      const arrayBuffer = await file.arrayBuffer()

      // Use PDF.js for extraction
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise

      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map(item => item.str).join(' ')
        fullText += pageText + '\n'
      }

      return {
        text: fullText.trim(),
        metadata: {
          originalFileName: file.name,
          fileType: file.type,
          fileSize: file.size
        }
      }
    } catch (error) {
      console.error('PDF processing error:', error)
      throw new Error('Failed to process PDF file')
    }
  }

  // Plain text file processing
  static async processTextFile(file: File): Promise<FileProcessingResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const text = e.target?.result as string

        resolve({
          text: text.trim(),
          metadata: {
            originalFileName: file.name,
            fileType: file.type,
            fileSize: file.size
          }
        })
      }

      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // Rich text (HTML) processing
  static async processHTMLFile(file: File): Promise<FileProcessingResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const htmlContent = e.target?.result as string
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = htmlContent
        const text = tempDiv.textContent || tempDiv.innerText

        resolve({
          text: text.trim(),
          metadata: {
            originalFileName: file.name,
            fileType: file.type,
            fileSize: file.size
          }
        })
      }

      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // RTF processing (basic extraction)
  static async processRTFFile(file: File): Promise<FileProcessingResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const rtfContent = e.target?.result as string
        // Basic RTF to plain text conversion
        const plainText = rtfContent
          .replace(/\\[a-z]{1,32}(-)?|\{|\}|\\\n?/gm, '')
          .replace(/[\\{}]/g, '')
          .replace(/[\r\n]+/g, ' ')

        resolve({
          text: plainText.trim(),
          metadata: {
            originalFileName: file.name,
            fileType: file.type,
            fileSize: file.size
          }
        })
      }

      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // DOCX processing (using Mammoth)
  static async processDOCXFile(file: File): Promise<FileProcessingResult> {
    try {
      // Dynamically import Mammoth
      const mammoth = await import('mammoth')

      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })

      return {
        text: result.value.trim(),
        metadata: {
          originalFileName: file.name,
          fileType: file.type,
          fileSize: file.size
        }
      }
    } catch (error) {
      console.error('DOCX processing error:', error)
      throw new Error('Failed to process DOCX file')
    }
  }

  // Main processing method to handle different file types
  static async processFile(file: File): Promise<FileProcessingResult> {
    // Supported file types
    const fileTypeProcessors = {
      'application/pdf': this.processPDF,
      'text/plain': this.processTextFile,
      'text/html': this.processHTMLFile,
      'text/rtf': this.processRTFFile,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': this.processDOCXFile
    }

    // Check file type
    const processor = fileTypeProcessors[file.type as keyof typeof fileTypeProcessors]

    if (processor) {
      return await processor(file)
    }

    // Fallback for unsupported file types
    throw new Error(`Unsupported file type: ${file.type}`)
  }
}

// Utility function for file type validation
export function validateFileType(file: File): boolean {
  const supportedTypes = [
    'application/pdf',
    'text/plain',
    'text/html',
    'text/rtf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  return supportedTypes.includes(file.type)
}

// Utility function for file size validation
export function validateFileSize(file: File, maxSizeInBytes: number = 2 * 1024 * 1024): boolean {
  return file.size <= maxSizeInBytes
}

/**
 * Download utilities for theme builder
 */

/**
 * Check if the browser is Safari
 */
function isSafari(): boolean {
  return navigator.userAgent.indexOf('Safari') > 0 &&
         navigator.userAgent.indexOf('Chrome') < 0
}

/**
 * Check if the browser is Internet Explorer
 */
function isIE(): boolean {
  return navigator.userAgent.indexOf('MSIE') > 0 ||
         navigator.userAgent.indexOf('Trident') > 0
}

/**
 * Check if the browser is Edge (legacy)
 */
function isEdge(): boolean {
  return navigator.userAgent.indexOf('Edge') > 0
}

/**
 * Save a file with the given content and filename
 * @param data - File content
 * @param filename - Name of the file
 * @param type - MIME type of the file
 */
function saveFile(data: string, filename: string, type: string = 'text/plain'): void {
  if (isSafari()) {
    // Safari doesn't support Blob downloads well, use data URL
    window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data))
  } else {
    try {
      const file = new Blob([data], { type })
      const url = URL.createObjectURL(file)

      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Download failed:', e)
      // Fallback to data URL
      window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(data))
    }
  }
}

/**
 * Download a JSON file
 * @param data - JSON data object
 * @param filename - Name of the file (without extension)
 */
export function downloadJsonFile(data: any, filename: string): void {
  const jsonString = JSON.stringify(data, null, 4)
  saveFile(jsonString, `${filename}.json`, 'application/json')
}

/**
 * Download a JavaScript file
 * @param content - JavaScript code content
 * @param filename - Name of the file (without extension)
 */
export function downloadJsFile(content: string, filename: string): void {
  saveFile(content, `${filename}.js`, 'application/javascript')
}

/**
 * Check if the browser supports downloads
 */
export function isDownloadSupported(): boolean {
  return !isIE() && !isEdge()
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    return result
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

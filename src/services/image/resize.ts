/**
 * Image downscaling helpers.
 * Keeps images small enough to persist in localStorage and to send
 * as Gemini reference images.
 */

/** Downscale an image given as a data URL and return a JPEG data URL. */
export function dataUrlToResizedDataUrl(dataUrl: string, maxSize = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = () => reject(new Error('画像として読み込めないファイルです'))
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(img.width * scale))
      canvas.height = Math.max(1, Math.round(img.height * scale))
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('画像の変換に失敗しました'))
        return
      }
      // JPEG化で透過が黒くならないよう白で塗っておく
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.src = dataUrl
  })
}

/** Read an uploaded image file and return a downscaled JPEG data URL. */
export function fileToResizedDataUrl(file: File, maxSize = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('画像の読み込みに失敗しました'))
    reader.onload = () => {
      dataUrlToResizedDataUrl(reader.result as string, maxSize).then(resolve, reject)
    }
    reader.readAsDataURL(file)
  })
}

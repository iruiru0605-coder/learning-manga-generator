/**
 * 生成画像の永続ストア（IndexedDB）。
 * base64画像はlocalStorageの容量（約5MB）を超えるため IndexedDB に保存する。
 * キー: "page-1".."page-12"（ページ画像）, "char-teacher" 等（キャラ画像）。
 */

const DB_NAME = 'learning-manga-generator'
const STORE = 'images'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('IndexedDBを開けませんでした'))
  })
}

export async function idbSetImage(key: string, dataUrl: string): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(dataUrl, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function idbGetAllImages(): Promise<Record<string, string>> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const keysReq = store.getAllKeys()
    const valsReq = store.getAll()
    tx.oncomplete = () => {
      const out: Record<string, string> = {}
      const keys = keysReq.result as string[]
      const vals = valsReq.result as string[]
      keys.forEach((k, i) => {
        if (typeof vals[i] === 'string') out[k] = vals[i]
      })
      resolve(out)
    }
    tx.onerror = () => reject(tx.error)
  })
}

export async function idbDeleteImage(key: string): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

/** 新しい台本を生成したときに、古いページ画像だけを消す（キャラ画像は使い回せるので残す） */
export async function idbClearPageImages(): Promise<void> {
  const all = await idbGetAllImages()
  for (const key of Object.keys(all)) {
    if (key.startsWith('page-')) await idbDeleteImage(key)
  }
}

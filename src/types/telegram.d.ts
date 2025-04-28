// src/types/telegram.d.ts

export {}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string
        initDataUnsafe: any
        ready: () => void
        expand: () => void
        close: () => void
        sendData: (data: string) => void
        showAlert: (message: string) => void
        showConfirm: (message: string, callback: (confirmed: boolean) => void) => void
        showPopup: (params: object, callback: (buttonId: string) => void) => void
      }
    }
  }
}

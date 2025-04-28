<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Типы для пользователя
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

const user = ref<TelegramUser | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function authenticateWithTelegram(initData: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initData }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed')
    }

    user.value = data.user
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  let initData: string | null = null

  // Пытаемся взять initData из Telegram WebApp API
  if (window.Telegram?.WebApp?.initData) {
    window.Telegram.WebApp.ready()
    initData = window.Telegram.WebApp.initData
  } else {
    // Иначе берём из URL-параметров (tgWebAppData или initData)
    const params = new URLSearchParams(window.location.search)
    initData = params.get('tgWebAppData') || params.get('initData')
  }

  if (initData) {
    authenticateWithTelegram(initData)
  } else {
    loading.value = false
    error.value = 'No initData provided. Please open this app from Telegram.'
  }
})
</script>

<template>
  <div v-if="loading">
    <h1>Загрузка...</h1>
  </div>

  <div v-else-if="error">
    <h1 style="color: red;">Ошибка: {{ error }}</h1>
  </div>

  <div v-else>
    <h1>Добро пожаловать, {{ user?.first_name }}!</h1>
    <p>ID пользователя: {{ user?.id }}</p>
    <p>Username: @{{ user?.username }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}
p {
  font-size: 18px;
}
</style>

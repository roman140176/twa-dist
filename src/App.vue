<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Типы для пользователя
// interface TelegramUser {
//   id: number;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   language_code?: string;
//   is_premium?: boolean;
// }

const loading = ref(true)
const error = ref<string | null>(null)

// async function authenticateWithTelegram(initData: string) {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ initData }),
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       throw new Error(data.error || 'Authentication failed')
//     }

//     user.value = data.user
//   } catch (err: any) {
//     error.value = err.message
//   } finally {
//     loading.value = false
//   }
// }
const tg = window.Telegram?.WebApp
const first_name = ref('')
const id = ref('')
const username = ref('')
onMounted(() => {
  loading.value = true;
  // Пытаемся взять initData из Telegram WebApp API
  setTimeout(() => {
    first_name.value = tg?.initDataUnsafe.user?.first_name
    id.value = tg?.initDataUnsafe.user?.id
    username.value = tg?.initDataUnsafe.user?.username
  },1000)
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
    <h1>Добро пожаловать, {{ first_name }}!</h1>
    <p>ID пользователя: {{ id }}</p>
    <p>Username: @{{username }}</p>
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

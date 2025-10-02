<template class="login-container">
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">{{ $t('auth.email.text') }}</label>
          <input
            id="email"
            type="email"
            v-model="email"
            :placeholder="$t('auth.email.placeholder')"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">{{ $t('auth.password.text') }}</label>
          <input
            id="password"
            type="password"
            v-model="password"
            :placeholder="$t('auth.password.placeholder')"
            required
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? $t('common.loading') : $t('auth.login.text') }}
        </button>
      </form>

      <p class="extra">
        {{ $t('auth.login.noAccount') }}
        <a href="/register">{{ $t('auth.register.text') }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/scripts/http-requests/endpoints";
import { useTypedI18n } from "@/composables/useI18n";
import Swal from "sweetalert2";
import '../styles/views/LoginView.css'

const router = useRouter();
const { t } = useTypedI18n();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await login(email.value, password.value);
    if (response.token) {
      localStorage.setItem("token", response.token);
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo de errado aconteceu com o servidor!",
      });
    }
  } catch (e: any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: e.response?.data?.message || "Login failed",
    });
  } finally {
    loading.value = false;
  }
};
</script>
<template class="register-container">
    <div class="register-container">
        <div class="register-card">
          <h1>Register</h1>
      
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label for="username">{{$t('auth.username.text')}}</label>
              <input 
                id="username" 
                type="username" 
                v-model="username" 
                :placeholder="$t('auth.username.placeholder')"
                required 
              />
            </div>

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

            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input 
                id="confirm-password" 
                type="password" 
                v-model="confirmPassword" 
                placeholder="Confirm your password" 
                required 
              />
            </div>
      
            <button type="submit" :disabled="loading">
              {{ loading ? "Logging in..." : "Register" }}
            </button>
          </form>
      
          <p class="extra">
            {{ $t('auth.register.hasAccount') }}
            <a href="/login">{{ $t('auth.login.text') }}</a>
          </p>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/scripts/http-requests/instance";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';
import '../styles/views/RegisterView.css'

const router = useRouter();
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref(null);

const handleRegister = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await register(email.value, username.value, password.value, confirmPassword.value);
    router.push("/login");
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: e.response?.data?.message || "Register failed"
    });
  } finally {
    loading.value = false;
  }
};
</script>
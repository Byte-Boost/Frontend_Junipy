<template class="login-container">
    <div class="login-container">
        <div class="login-card">
          <h1>Login</h1>
      
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                id="email" 
                type="email" 
                v-model="email" 
                placeholder="Enter your email" 
                required 
              />
            </div>
      
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                id="password" 
                type="password" 
                v-model="password" 
                placeholder="Enter your password" 
                required 
              />
            </div>
      
            <button type="submit" :disabled="loading">
              {{ loading ? "Logging in..." : "Login" }}
            </button>
          </form>
      
          <p class="extra">
            Don't have an account?
            <a href="/register">Register</a>
          </p>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/scripts/http-requests/instance";
import Swal from 'sweetalert2';

const router = useRouter();
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
        text: "Algo de errado aconteceu com o servidor!"
      });
    }
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: e.response?.data?.message || "Login failed"
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
  width: 32rem;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #000;
  color: #fff;
  border-radius: 8px;
  background: #2f2f2f;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #48b684;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.extra {
  margin-top: 1rem;
  text-align: center;
}

.error {
  margin-top: 1rem;
  color: red;
  font-weight: bold;
}
</style>

<template class="register-container">
    <div class="register-container">
        <div class="register-card">
          <h1>Register</h1>
      
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                id="username" 
                type="username" 
                v-model="username" 
                placeholder="Enter your username" 
                required 
              />
            </div>

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
            Already have an account?
            <a href="/login">Login</a>
          </p>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/scripts/http-requests/instance";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

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

<style scoped>
.register-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.register-card {
  width: 32rem;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #000;
  color: #fff;
  border-radius: 8px;
  background: #2f2f2f;
}

.register-form {
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

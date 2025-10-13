<template class="login-container">
  <WavyBackground>
    <div class="login-container">
      <div class="login-card">
        <section class="logo-section">
          <h1 class="app-name"></h1>
        </section>
        <section class="form-section">
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <div class="iconified-input">
                <label for="email" hidden>{{
                  $t("auth.login.fields.email.label")
                }}</label>
                <div class="relative flex items-center">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="peer pl-10"
                    :placeholder="$t('auth.login.fields.email.placeholder')"
                  />
                  <IconMail
                    class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
                  />
                </div>
              </div>
              <div class="iconified-input">
                <label for="password" hidden>{{
                  $t("auth.login.fields.password.label")
                }}</label>
                <div class="relative flex items-center">
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    class="peer pl-10"
                    :placeholder="$t('auth.login.fields.password.placeholder')"
                  />
                  <IconKey
                    class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {{
                loading ? $t("common.loading") : $t("auth.login.actions.submit")
              }}
              <IconRightArrow class="w-5 h-5" />
            </button>
          </form>
        </section>
        <p class="flex content-center flex-wrap gap-3 justify-center">
          <a href="/forgot-password">{{
            $t("auth.login.actions.forgotPassword")
          }}</a>
          <span class="font-extrabold text-gray-400">•</span>
          <a href="/register">{{ $t("auth.register.actions.hasAccount") }}</a>
        </p>
      </div>
    </div>
  </WavyBackground>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/scripts/http-requests/endpoints";
import { useTypedI18n } from "@/composables/useI18n";
import Swal from "sweetalert2";
import "../styles/views/LoginView.css";
import WavyBackground from "@/components/WavyBackground.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconKey from "@/components/icons/IconKey.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
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
        text: t("errors.server.generic"),
      });
    }
  } catch (e: any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: e.response?.data?.message || t("errors.server.generic"),
    });
  } finally {
    loading.value = false;
  }
};
</script>

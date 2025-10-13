<template>
  <WavyBackground>
    <div class="register-container">
      <div class="register-card">
        <h1 class="text-2xl pb-5">{{ $t("auth.register.title") }}</h1>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="iconified-input">
            <label for="username" hidden>{{
              $t("auth.register.fields.username.label")
            }}</label>
            <div class="relative flex items-center">
              <input
                id="username"
                type="username"
                v-model="username"
                class="peer pl-10"
                :placeholder="$t('auth.register.fields.username.placeholder')"
                required
              />
              <IconUser
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </div>
          </div>

          <div class="iconified-input">
            <label for="email" hidden>{{
              $t("auth.register.fields.email.label")
            }}</label>
            <div class="relative flex items-center">
              <input
                id="email"
                v-model="email"
                type="email"
                class="peer pl-10"
                :placeholder="$t('auth.register.fields.email.placeholder')"
              />
              <IconMail
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </div>
          </div>
          <div class="iconified-input">
            <label for="password" hidden>{{
              $t("auth.register.fields.password.label")
            }}</label>
            <div class="relative flex items-center">
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                class="peer pl-10"
                :placeholder="$t('auth.register.fields.password.placeholder')"
              />
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </div>
          </div>

          <div class="iconified-input">
            <label for="confirm-password" hidden>{{
              $t("auth.register.fields.confirmPassword.label")
            }}</label>
            <div class="relative flex items-center">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                autocomplete="current-password"
                class="peer pl-10"
                :placeholder="
                  $t('auth.register.fields.confirmPassword.placeholder')
                "
                required
              />
              <IconKey
                class="absolute left-3 text-gray-400 peer-focus:text-white transition-colors"
              />
            </div>
          </div>
          <!-- <h1 class="text-2xl">
            {{ $t("auth.register.fields.anamnese.title") }}
          </h1> -->

          <section></section>

          <p class="error">{{ error }}</p>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {{
              loading
                ? $t("common.loading")
                : $t("auth.register.actions.submit")
            }}
            <IconRightArrow class="w-5 h-5" />
          </button>
        </form>

        <p class="extra">
          <a href="/login">{{ $t("auth.register.actions.hasAccount") }}</a>
        </p>
      </div>
    </div>
  </WavyBackground>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/scripts/http-requests/endpoints";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import "../styles/views/RegisterView.css";
import WavyBackground from "@/components/WavyBackground.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconKey from "@/components/icons/IconKey.vue";
import IconRightArrow from "@/components/icons/IconRightArrow.vue";
import IconUser from "@/components/icons/IconUser.vue";

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
  if (
    email.value === "" ||
    username.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    error.value = "All fields are required";
    loading.value = false;
    return;
  }
  try {
    const response = await register(
      email.value,
      username.value,
      password.value,
      confirmPassword.value
    );
    router.push("/login");
  } catch (e) {
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

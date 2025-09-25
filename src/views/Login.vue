<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Login</h2>
            <div class="form-group">
                <label for="username">Usuário</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    required
                    autocomplete="username"
                />
            </div>
            <div class="form-group">
                <label for="password">Senha</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                    autocomplete="current-password"
                />
            </div>
            <button type="submit">Entrar</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async handleLogin() {
            this.error = "";
            if (this.username === "admin" && this.password === "admin") {
            this.$router.push({ name: "Home" });
            } else {
                this.error = "Usuário ou senha inválidos.";
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f6fa;
}
.login-form {
    background: #fff;
    padding: 2rem 2.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 320px;
}
.form-group {
    margin-bottom: 1.2rem;
}
label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 500;
}
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    width: 100%;
    padding: 0.7rem;
    background: #1976d2;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}
button:hover {
    background: #1565c0;
}
.error {
    color: #d32f2f;
    margin-top: 1rem;
    text-align: center;
}
</style>
<template>
  <div class="user-list-page">
    <h1>All Users</h1>

    <table class="user-table">
      <thead >
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">Loading users...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// State
const users = ref([]);
const loading = ref(false);
const error = ref(null);

// Mock fetching function
const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    users.value = (await axios.get(
      `http://localhost:8080/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )).data;

    console.log(users.value[0].email);
  } catch (e) {
    error.value = "Failed to load users";
  } finally {
    loading.value = false;
  }
};

// Load users on mount
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-list-page {
  padding: 1rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  text-align: left;
}

.user-table th {
  background-color: #444444;
  font-weight: bold;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>

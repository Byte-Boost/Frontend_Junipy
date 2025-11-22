<template>
  <div class="user-list-page">
    <h1>All Users</h1>

    <table class="user-table">
      <thead>
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
import { getAllUsers } from "@/scripts/http-requests/endpoints";
import '../../styles/views/UserListView.scss'

const users = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchUsers = async () => {
  loading.value = true;
  error.value = null;

  try {
    users.value = await getAllUsers();
    console.log(users);
    console.log(users.value[0].email);
  } catch (e) {
    error.value = "Failed to load users";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
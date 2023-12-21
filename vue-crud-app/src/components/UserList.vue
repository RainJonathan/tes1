<template>
    <div>
      <h1 class="mt-4 mb-4">User List</h1>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Search by name">
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUserList" :key="user.user_id">
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
            <td>{{ user.user_phone }}</td>
            <td>{{ user.user_address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      userList: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        searchQuery: '',
      };
    },
    computed: {
      filteredUserList() {
        const query = this.searchQuery.toLowerCase();
        return this.userList.filter(user => user.user_name.toLowerCase().includes(query));
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  
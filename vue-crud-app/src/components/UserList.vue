<template>
    <div>
      <h1>User List</h1>
      <ul>
        <li v-for="user in userList" :key="user.user_id">
          {{ user.user_name }} - {{ user.user_email }} - {{ user.user_phone }} - {{ user.user_address }}
        </li>
      </ul>
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
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
  
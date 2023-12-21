<template>
  <div id="app">
    <UserList :userList="userList" />
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";

export default {
  components: {
    UserList,
  },
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    fetchUserList() {
      // Replace with your actual server address
      const apiUrl = 'http://localhost:3000/users';

      // Using Axios to make the HTTP request
      this.$axios.get(apiUrl)
        .then(response => {
          this.userList = response.data;
        })
        .catch(error => {
          console.error('Error fetching user list:', error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

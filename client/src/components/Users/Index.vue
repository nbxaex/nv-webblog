<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div>
        <h2>แสดงผู้ใช้งานในระบบ</h2>
        <h4>จำนวนผู้ใช้งาน {{ users.length }}</h4>
        <p>
          <button
            class="btn btn-success btn-sm"
            v-on:click="navigateTo('/user/create')"
          >
            <i class="fas fa-plus-circle"></i>
            สร้างผู้ใช้งาน
          </button>
        </p>
        <div v-for="user in users" v-bind:key="user.id">
          <p>ID : {{ user.id }}</p>
          <p>ชื่อ - นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
          <p>อีเมล์ : {{ user.email }}</p>
          <p>รหัสผ่าน : {{ user.password }}</p>
          <p>
            <button
              class="btn btn-sm btn-info"
              v-on:click="navigateTo('/user/' + user.id)"
            >
              <i class="fas fa-align-left"></i>
              &nbsp; ดูข้อมูลผู้ใช้
            </button>
            <button
              class="btn btn-sm btn-warning"
              v-on:click="navigateTo('/user/edit/' + user.id)"
            >
              <i class="far fa-edit"></i>
              &nbsp; แก้ไขข้อมูล
            </button>
            <button class="btn btn-sm btn-danger" v-on:click="deleteUser(user)">
              <i class="fas fa-trash-alt"></i>&nbsp; ลบข้อมูล
            </button>
          </p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>
<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div>
        <h1>แสดงข้อมูลผู้ใช้</h1>
        <p>
          ID :
          <input class="form-control" type="text" v-model="user.id" readonly />
        </p>

        <p>
          ชื่อ :
          <input
            class="form-control"
            type="text"
            v-model="user.name"
            readonly
          />
        </p>
        <p>
          นามสกุล :
          <input
            class="form-control"
            type="text"
            v-model="user.lastname"
            readonly
          />
        </p>
        <p>
          อีเมล์ :<input
            class="form-control"
            type="text"
            v-model="user.email"
            readonly
          />
        </p>
        <p>
          รหัสผ่าน :
          <input
            class="form-control"
            type="text"
            v-model="user.password"
            readonly
          />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      let userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
</style>
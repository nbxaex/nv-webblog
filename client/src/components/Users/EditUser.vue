<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div div class="blog-list">
        <center><h1>แก้ไขบัญชี</h1></center>
        <form v-on:submit.prevent="editUser">
          <p>
            ชื่อ :
            <input type="text" class="form-control" v-model="user.name" />
          </p>
          <p>
            นามสกุล :
            <input type="text" class="form-control" v-model="user.lastname" />
          </p>
          <p>
            อีเมล์ :
            <input type="text" class="form-control" v-model="user.email" />
          </p>
          <p>
            รหัสผ่าน :
            <input type="text" class="form-control" v-model="user.password" />
          </p>
          <center><p>
            <button type="submit" class="btn btn-success">แก้ไขบัญชี</button>
          </p></center>
        </form>
        <hr />
        <div>
          <h3>แสดงผล</h3>
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
            อีเมล์ :
            <input
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
          <p></p>
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
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        status: "active",
      },
    };
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push({
          name: "users",
        });
      } catch (err) {
        console.log(err);
      }
    },
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
.blog-list {
  border-radius: 10px;
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
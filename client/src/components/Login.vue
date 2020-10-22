<template>
  <div class="container">
    <br />
    <br />
    <br />
    <div class="blog-list">
      <center><h1>เข้าสู่ระบบ</h1></center>
      <br />
      <br />
      <form v-on:submit.prevent="onLogin">
        <p>
         บัญชีอีเมล์ :
          <input type="text" class="form-control" v-model="email" />
        </p>
        <p>
         รหัสผ่าน :
          <input type="password" class="form-control" v-model="password" />
        </p>
        <center><p><button type="submit" class="btn btn-success">Login</button></p></center>
        <center><div class="error" v-if="error">{{ error }}</div></center>
      </form>
    </div>
  </div>
</template>
<style scoped>
.error {
  color: red;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
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
<script>
import AuthenService from "@/services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>
<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="container">
      <front-header />
      <div class="hero-wrapper">
        <div class="hero">
          <img src="@/assets/logo.png" class="logo" style="float: left" />
          <h1>Webblot from nodejs + vuejs Ebook</h1>
          <p>By Gooddev.ME</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div class="blog-list">
        <div class="blog-wrapper" v-if="blog != null">
          <h1>{{ blog.title }}</h1>
          <p>
            <strong> </strong>
            <a
              href="#"
              v-on:click.prevent="navigateTo(`/front?search=${blog.category}`)"
              >{{ blog.category }}</a
            >
          </p>
          <div class="content" v-html="blog.content"></div>
          <!-- <p>category: {{ blog.category }}</p>
<p>status: {{ blog.status }}</p> -->
        </div>
      </div>
      <center><div class="back-nav">
        <button class="btn btn-success" v-on:click="navigateTo('/front')">
          <i class="fas fa-arrow-left"></i> กลับ
        </button>
      </div></center>
      <transition name="fade">
        <div v-if="resultUpdated != ''" class="popup-msg">
          <p>{{ resultUpdated }}</p>
        </div>
      </transition>
      <br />
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
import BlogsService from "@/services/BlogsService";
export default {
  data() {
    return {
      blog: null,
      resultUpdated: "",
      users: null,
    };
  },
  delete() {
    console.log("delete blog");
  },
  async created() {
    // get blog
    // check permission first
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
.component-wrapper {
  padding-left: 5px;
  padding-right: 5px;
}
.hero {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background: darkcyan;
  height: 250px;
  color: white;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.logo {
  padding-right: 20px;
}
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 5px 5px 5px;
  border: solid 1px #ccc;
  margin: 10px 10px 0px 0px;
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
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.create-blog {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
</style>
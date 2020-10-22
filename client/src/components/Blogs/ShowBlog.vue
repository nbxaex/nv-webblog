<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div class="blog-list">
          <div>
            <center><h1>คอนเทนต์</h1></center>
            <!--<p>หมายเลข : {{ blog.id }}</p>-->
            <center><p>หัวเรื่อง : {{ blog.title }}</p></center>
            <center><div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
                <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
              </div></center>
            <p>รายละเอียด :</p>
            <div v-html="blog.content"></div>
            <p>ประเภท : {{ blog.category }}</p>
           <!-- <p>สถานะ : {{ blog.status }}</p>-->
            <center><p>
              <button
                class="btn btn-success"
                v-on:click="navigateTo('/blog/edit/' + blog.id)"
              >
                แก้ไขบล็อก
              </button>
              <button
                class="btn btn-secondary"
                v-on:click="navigateTo('/blogs')"
              >
                กลับ
              </button>
            </p></center>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
import BlogsService from "@/services/BlogsService";
export default {
  data() {
    return {
      blog: null,
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
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
/* thumbnail */
.thumbnail-pic img {
  border-radius: 10px;
  width: 200px;
  padding: 5px 5px 5px 5px;
  margin: 10px 10px 0px 0px;
}
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
  border-radius: 10px;
  width: 200px;
  padding: 5px 5px 5px 5px;
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
  padding: 20px;
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
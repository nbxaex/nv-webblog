<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div>
        <h2>คอมเมนต์</h2>
        <h4>จำนวนคอมเมนต์ {{ comments.length }}</h4>
        <div v-for="comment in comments" v-bind:key="comment.id">
          <p>ID : {{ comment.id }}</p>
          <p>บล็อก ID : {{ comment.blogId }}</p>
          <p>คอมเมนต์ : {{ comment.comment }}</p>
          <p>
            <button
              class="btn btn-sm btn-warning"
              v-on:click="navigateTo('/comment/' + comment.id)"
            >
              <i class="fas fa-align-left"></i>&nbsp;ดูคอมเมนต์
            </button>
            <button
              class="btn btn-sm btn-danger"
              v-on:click="deleteComment(comment)"
            >
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
import CommentsService from "@/services/CommentsService";
export default {
  data() {
    return {
      comments: [],
    };
  },
  async created() {
    this.comments = (await CommentsService.index()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteComment(comment) {
      try {
        await CommentsService.delete(comment);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.comments = (await CommentsService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>
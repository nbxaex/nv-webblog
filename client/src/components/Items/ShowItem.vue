<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div class="item-list">
          <div>
            <h1>คอนเทนต์</h1>
            <p>หมายเลข : {{ item.id }}</p>
            <p>หัวเรื่อง : {{ item.title }}</p>
            <p>รายละเอียด :</p>
            <div v-html="item.content.slice(0, 200) + '...'"></div>
            <p>ประเภท : {{ item.category }}</p>
            <p>สถานะ : {{ item.status }}</p>
            <p>
              <button
                class="btn btn-success"
                v-on:click="navigateTo('/item/edit/' + item.id)"
              >
                แก้ไขบล็อก
              </button>
              <button
                class="btn btn-secondary"
                v-on:click="navigateTo('/items')"
              >
                กลับ
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
import ItemsService from "@/services/ItemsService";
export default {
  data() {
    return {
      item: null,
    };
  },
  async created() {
    try {
      let itemId = this.$route.params.itemId;
      this.item = (await ItemsService.show(itemId)).data;
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
.empty-item {
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
.item-info {
  float: left;
}
.item-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.item-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.item-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#item-list-bottom {
  padding-top: 4px;
}
.item-load-finished {
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
.create-item {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
</style>
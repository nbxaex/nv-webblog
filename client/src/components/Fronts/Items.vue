<template>
  <div>
    <main-header navsel="front"></main-header>
    <div>
      <front-header />
      <div class="hero-wrapper">
        <div class="hero">
          <img src="@/assets/logo.png" class="logo" style="float: left" />
          <h1>ร้านหนังสือออนไลน์ สัEงซืEอได้เลยครับ</h1>
          <p>By Gooddev.ME</p>
        </div>
        <div class="clearfix"></div>
        <div class="Item-header">
          <div>
            <form class="form-inline form-search">
              <span><strong> จำนวนบล็อก : </strong> {{ results.length }} </span>
              &nbsp;
              <div class="form-group">
                <div class="input-group">
                  <input
                    type="text"
                    v-model="search"
                    class="form-control"
                    id="exampleInputAmount"
                    placeholder="Search"
                  />
                  <div class="input-group-addon">
                    <i class="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ul class="categories">
            <li v-for="cate in category" v-bind:key="cate.index">
              <a v-on:click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
            </li>
            <li class="clear">
              <a v-on:click.prevent="setCategory(' ')" href="#">Clear</a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <transition-group name="fade">
          <div v-for="Item in Items" v-bind:key="Item.id" class="Item-list">
            <!-- <p>id: {{ Item.id }}</p> -->
            <div class="Item-pic">
              <!-- <transition name="fade"> -->
              <div class="thumbnail-pic" v-if="Item.thumbnail != 'null'">
                <img :src="BASE_URL + Item.thumbnail" alt="thumbnail" />
              </div>
              <!-- </transition> -->
            </div>
            <h3>{{ Item.title }}</h3>
            <div v-html="Item.content.slice(0, 200) + '...'"></div>
            <div class="Item-info">
              <p><strong>ประเภท :</strong> {{ Item.category }}</p>
              <p><strong>อัพเดทล่าสุด :</strong> {{ Item.createdAt }}</p>
              <!-- <p>status: {{ Item.status }}</p> -->
              <p>
                <button
                  class="btn btn-sm btn-info"
                  v-on:click="navigateTo('/Item/' + Item.id)"
                >
                  <i class="fab fa-readme"></i> ดูบล็อก
                </button>
              </p>
            </div>
            <div class="clearfix"></div>
          </div>
          
        </transition-group>
        <div v-if="Items.length === 0 && loading === false" class="emptyItem">
          *** ไม่มีข้อมูล ***
        </div>
        <div id="Item-list-bottom">
          <div
            class="Item-load-finished"
            v-if="Items.length === results.length && results.length > 0"
          >
            โหลดข้อมูลครบแล้ว
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemsService from "@/services/ItemsService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "front-items",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.Items = [];
        this.results = [];
        this.loading = true;
        this.results = (await ItemsService.index(value)).data;
        this.appendResults();
        this.results.forEach((Item) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(Item.category))
            if (this.category.indexOf(Item.category) === -1) {
              this.category.push(Item.category);
            }
          } else {
            this.category.push(Item.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      Items: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
      newItems: [],
    };
  },
  async created() {
    let allItems = (await ItemsService.frontIndex()).data;
    this.newItems = allItems.slice(0, 4);
  },
  // async created () {
  // this.Items = (await ItemsService.index()).data
  // },
  methods: {
    appendResults: function () {
      if (this.Items.length < this.results.length) {
        let toAppend = this.results.slice(
          this.Items.length,
          LOAD_NUM + this.Items.length
        );
        this.Items = this.Items.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteItem(Item) {
      try {
        await ItemsService.delete(Item);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.Items = (await ItemsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
  },
  updated() {
    let sens = document.querySelector("#Item-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
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
.empty-Item {
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
.Item-info {
  float: left;
}
.Item-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.Item-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.Item-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#Item-list-bottom {
  padding-top: 4px;
}
.Item-load-finished {
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
.create-Item {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
</style>
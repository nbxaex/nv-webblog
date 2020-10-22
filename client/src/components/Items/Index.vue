<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div class="item-header">
        <h2>ส่วนจัดการสินค้า</h2>
        <div>
          <form class="form-inline form-search">
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
        <div class="create-item">
          <button
            class="btn btn-success btn-sm"
            v-on:click="navigateTo('/item/create')"
          >
            <i class="fas fa-plus-circle"></i>
            &nbsp; เพิ่มสินค้า
          </button>
          <strong>&nbsp; จำนวนชนิด : </strong> {{ results.length }}
        </div>
        <ul class="categories">
          <li v-for="cate in category" v-bind:key="cate.index">
            <a v-on:click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
          </li>
          <li class="clear">
            <a v-on:click.prevent="setCategory('')" href="#">เคลียร์</a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <transition-group name="fade">
        <div v-for="item in items" v-bind:key="item.id" class="item-list">
          <!-- <p>id: {{ item.id }}</p> -->
          <div class="item-pic">
            <!-- <transition name="fade"> -->
            <div class="thumbnail-pic" v-if="item.thumbnail != 'null'">
              <img :src="BASE_URL + item.thumbnail" alt="thumbnail" />
            </div>
            <!-- </transition> -->
          </div>
          <h3>{{ item.title }}</h3>
          <div v-html="item.content.slice(0, 200) + '...'"></div>
          <div class="item-info">
            <p><strong>ประเภท : </strong> {{ item.category }}</p>
            <p>
              <strong>ราคา :</strong>
              {{ item.prices | getNumberWithCommas }} บาท
            </p>
            <p><strong>อัพเดทเมื่อ : </strong> {{ item.createdAt }}</p>

            <!-- <p>status: {{ item.status }}</p> -->
            <p>
              <button
                class="btn btn-sm btn-info"
                v-on:click="navigateTo('/item/' + item.id)"
              >
                <i class="fas fa-align-left"></i>&nbsp; ดูรายละเอียด
              </button>
              <button
                class="btn btn-sm btn-warning"
                v-on:click="navigateTo('/item/edit/' + item.id)"
              >
                <i class="far fa-edit"></i>&nbsp; แก้ไขสินค้า
              </button>
              <button
                class="btn btn-sm btn-danger"
                v-on:click="deleteItem(item)"
              >
                <i class="fas fa-trash-alt"></i>&nbsp; ลบสินค้า
              </button>
            </p>
          </div>
          <div class="clearfix"></div>
        </div>
      </transition-group>
      <div v-if="items.length === 0 && loading === false" class="emptyitem">
        *** ไม่มีข้อมูล ***
      </div>
      <div id="item-list-bottom">
        <div
          class="item-load-finished"
          v-if="items.length === results.length && results.length > 0"
        >
          โหลดข้อมูลครบแล้ว
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
        name: "items",
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
        this.items = [];
        this.results = [];
        this.loading = true;
        this.results = (await ItemsService.index(value)).data;
        this.appendResults();
        this.results.forEach((item) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(item.category))
            if (this.category.indexOf(item.category) === -1) {
              this.category.push(item.category);
            }
          } else {
            this.category.push(item.category);
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
      items: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
    };
  },
  // async created () {
  // this.items = (await ItemsService.index()).data
  // },
  methods: {
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    appendResults: function () {
      if (this.items.length < this.results.length) {
        let toAppend = this.results.slice(
          this.items.length,
          LOAD_NUM + this.items.length
        );
        this.items = this.items.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteItem(item) {
      try {
        await ItemsService.delete(item);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.items = (await ItemsService.index()).data;
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
    let sens = document.querySelector("#item-list-bottom");
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
  padding: 5px 10px 0px 0px;
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
  border-radius: 10px;
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.item-header {
  margin-left: auto;
  margin-right: auto;
}
#item-list-bottom {
  padding-top: 4px;
}
.item-load-finished {
  border-radius: 25px;
  padding: 4px;
  text-align: center;
  background: #c0eccc;
  color: black;
}
.categories {
  margin-top: 10px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  border-radius: 25px;
  padding: 5px 10px 5px 10px;
  background: #c0eccc;
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: #f6a8a6;
  color: black;
}
.create-item {
  margin-top: 10px;
}
</style>
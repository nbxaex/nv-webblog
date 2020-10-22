<template>
  <!-- new navbar -->
  <div>
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a
            class="navbar-brand navbar-link"
            href="#"
            v-on:click.prevent="navigateTo('/dashboard')"
          >
            <img src=""
          /></a>
          <button
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span><span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav navbar-right">
            <li role="presentation">
              <router-link :to="{ name: 'blogs' }"> บล็อก</router-link>
            </li>
            <li role="presentation">
              <router-link :to="{ name: 'users' }"> ผู้ใช้งานในระบบ</router-link>
            </li>
           <!--< <li role="presentation">
              <router-link :to="{ name: 'comments' }"> คอมเมนต์ </router-link>
            </li>-->
            <!--<li role="presentation">
              <router-link :to="{ name: 'login' }"> เข้าสู่ระบบ </router-link>
            </li>-->
            <li role="presentation">
              <router-link :to="{ name: 'front' }"> ออกจากระบบ </router-link>
            </li>
       
          </ul>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>
<style scoped>
.navbar-brand > img {
  width: 36px;
  padding: 12px 0;
  margin-top: -20px;
}
a.router-link-active {
  color: yellowgreen !important;
}
</style>
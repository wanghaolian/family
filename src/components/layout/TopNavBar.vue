<template>
  <div class="bar" :class="scrollTopShow ? 'nav-fixed' : 'nav'">
    <div class="float_left blog_title">
      FAMILY
    </div>
    <div class="float_right nav_title">
      <div class="menus_item">
        <i class="iconfont iconzhuye" /> 首页
      </div>
      <div class="menus_item">
        <i class="iconfont iconlianjie" /> 友链
      </div>
      <div class="menus_item">
        <i class="iconfont iconzhifeiji" /> 关于
      </div>
      <div class="menus_item">
        <i class="iconfont iconpinglunzu" /> 留言
      </div>
      <div class="menus_item">
        <i class="iconfont icondenglu" /> 登录
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";

// mounted
onMounted(() => {
  window.addEventListener("scroll", scroll);
});

const scrollTop: any = ref(null);
const scrollTopShow = ref(false);

// methods

function scroll() {
  scrollTop.value =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  if (scrollTop.value > 60) {
    scrollTopShow.value = true;
  } else {
    scrollTopShow.value = false;
  }
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 48px;
  background-color: #49b1f5;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 0 12px;
}

.float_left {
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
}

.float_right {
  font-size: 14px;
  display: flex;
  align-items: center;

  .menus_item {
    padding: 4px;
    text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  }
}

.bar.nav-fixed {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);

  .float_left,
  .float_right {
    color: #333;
  }
}
</style>

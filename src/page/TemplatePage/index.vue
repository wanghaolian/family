<template>
  <div class="template">
    <div>
      <TopNavBar></TopNavBar>
 
    </div>
    <div class="home_banner">
      <img src="@/assets/images/rests/xiao.png" />
    </div>

    <div class="home_container">
      <div class="main"></div>
      <div class="side_nav_bar">
        <div class="side_nav_info">
          <div class="photo"> </div>
          <div class="collection_btn" @click="open">加入书签</div>
        </div>
      </div>
    </div>

    <img src="@/assets/images/rests/return.gif" class="return" v-if="isShow" @click="backTop">

  </div>
</template> 

<script src="./index.ts"></script>

<style src="./index.scss" lang="scss" scoped></style>

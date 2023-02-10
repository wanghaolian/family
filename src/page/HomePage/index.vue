<template>
  <div class="home_wrapper">
    <div class="family_home">
      <div class="header">
        <div id="he-plugin-simple"></div>
      </div>
      <div class="main">
        <div class="region center_above"></div>
        <div class="time"><span>{{$moment(nowtime).format('h:mm') }}</span></div>
        <div class="search">
          <div class="search_container" v-if="progress > 0">
            <div class="progress progress-striped" :class="{width: progress + '%'}">
              <div class="progress-bar">
                <img src="@/assets/images/icon/cat04.png" />
              </div>
            </div>
          </div>
          <input type="input" id="input_search" autocomplete='off' placeholder="输入点什么吧..." class="search_input" v-model="search"
            @keydown.enter="keydownSearch">
        </div>
      </div>
      <div class="footer">
        <div class="handle" @click="skipMemorialHall"><img src="@/assets/images/icon/cat01.png" /></div>
        <div class="entrance">
          <div class="entrance_scroll">
            <div v-for="(val,key) in wisdom" :key="key">{{val}}</div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <!-- 背景 无关紧要 -->
    <div class="Aniya" ref="Aniya"></div>
    <div class="family_home_background" :style="{'background-image': `url(${background[random].background})`}"
      ref="family_home_background"></div>
    <div class="family_home_filter_blur" :style="{'background-image': `url(${background[random].background_blur})`}"
      ref="family_home_filter_blur"></div>
    <div class="family_home_cover" ref="family_home_cover"></div>
    <div class="family_home_taunt" :class="{active: without}" ref="family_home_taunt"></div>
    <!-- 背景 无关紧要 -->
  </div>
</template> 

<script src="./index.ts"></script>

<style src="./index.scss" lang="scss" scoped></style>

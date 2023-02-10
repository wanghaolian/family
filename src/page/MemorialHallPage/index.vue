<template>
  <div class="home">
    <div class="home_background">
      <div class="home_background_underpainting left"></div>
      <div class="home_background_underpainting right"></div>
    </div>

    <div class="home_content">
      <div class="home_bar">
        <div class="home_bar_logo">
          HAOTINGFANG
        </div>
        <div class="home_bar_menu">
        </div>
      </div>

      <div class="home_info">
        <div class="home_info_video">
          <!-- controls -->
          <video class="video_box" ref="video" src="@/assets/video/20230201.mp4" controlsList="nodownload"
            @timeupdate="timeupdate"></video>
          <div class="home_info_video_view">
            <div class="home_info_video_introduce">
              <div>
                <div class="hint">我们的纪录片</div>
                <div class="title">开始啦 <span
                    v-if="videoState">{{studyTime.currentTime.toFixed(2)}}/{{Math.round(studyTime.duration.toFixed(2))}}:00</span>
                </div>
              </div>
              <div @click="operateVideo">
                <img src="@/assets/images/play.png" v-if="!videoState" />
                <img src="@/assets/images/pause.png" v-else />
              </div>
            </div>
          </div>
        </div>
        <div class="home_info_left">

        </div>
        <div class="home_info_right">
          <div class="serial">
             <div>01<span>温暖序列</span></div>
          </div>
          <div class="poetry">
            {{poetryList[0]}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./index.ts"></script>

<style src="./index.scss" lang="scss" scoped></style>





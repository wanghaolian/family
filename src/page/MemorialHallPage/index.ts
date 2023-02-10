import { ref, onMounted, reactive, nextTick } from "vue";
export default {

  name: 'memorialhall',

  setup() {

    // mounted
    onMounted(() => { });

    // data
    let videoState: any = ref(false);
    const video = ref();

    const poetryList = ref([
      '风尘仆仆，终有归途世界很烦，但你要很可爱遇见你，凛冬散尽，星河长明四方食事，不过一碗人间烟火所有的告别里，我最喜欢明天见疲惫的生活里总要一些温柔的梦想愿你忠于自己，活得认真，笑得放肆活在这珍贵世间，太阳强烈，水波温柔所求皆所愿，所行化坦途，多喜乐，长安宁祝你此生，梦想光芒，野蛮生长，永不彷徨城市慷慨亮了一整夜光，如同少年不惧岁月长一定要，爱着点什么，恰似草木对光阴的钟情对待自己温柔一点，你只不过是宇宙的孩子，与植物、星辰没什么两样一遇到可爱的人，就觉得生活一下子不艰难了，晚风也好，凉夜也罢，都好，都值得开心'
    ]);

    // methods
    // 操作视频播放、暂停
    function operateVideo() {
      if (video.value.paused) {
        video.value.play();
        videoState.value = true;
      } else {
        video.value.pause();
        videoState.value = false;
      }
    }

    let studyTime = reactive({
      currentTime: 0, // 当前已学时长
      duration: 0, // 总时长
    });


    // 获取当前播放位置
    function timeupdate(e) {
      // console.log(studyTime.currentTime,  e.target.currentTime)
      studyTime.currentTime = e.target.currentTime;
      studyTime.duration = e.target.duration ? e.target.duration : 0;
      if (studyTime.currentTime === studyTime.duration) {
        video.value.currentTime = 0;
        videoState = false;
      }
    }

    return { //必须返回 模板中才能使用
      videoState,
      video,
      studyTime,
      poetryList,
      operateVideo,
      timeupdate
    }
  }
}





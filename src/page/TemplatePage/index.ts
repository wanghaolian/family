import { ref, onMounted, reactive, nextTick, onBeforeUnmount } from "vue";
import TopNavBar from "@/components/layout/TopNavBar.vue";
import { h } from 'vue'
import { ElNotification } from 'element-plus'

export default {

  name: 'temp',

  components: {
    TopNavBar,
  },

  setup() {

    window.addEventListener("scroll", scrollToTop);

    // 时间
    let isShow = ref(false)
    // timer
    let scrollTop: any = ref(null)

    // 为了计算距离顶部的高度，当高度大于100显示回顶部图标，小于100则隐藏
    function scrollToTop() {
      scrollTop.value =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let height = document.documentElement.clientHeight || document.body.clientHeight;

      console.log(
        scrollTop.value, height, isShow.value
      )
      if (scrollTop.value > height) {
        isShow.value = true
      } else {
        isShow.value = false
      }
    }

    function open() {
      ElNotification({
        title: '小盆友^_^',
        message: h('i', { style: 'color: teal' }, '按CTRL+D 键将本页加入书签'),
      })
    }

    function backTop() {
      window.scrollTo({
        behavior: "smooth",
        top: 0
      });
    }

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollToTop);
    })
  

    // onMounted(() => {
    //   setTimeout(() => {
    //     window.L2Dwidget.init({
    //       pluginRootPath: '../../static/live2dw/',
    //       pluginJsPath: 'lib/',
    //       pluginModelPath: 'live2d-widget-model-tororo/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
    //       tagMode: false,
    //       debug: false,
    //       model: { jsonPath: '../../static/live2dw/live2d-widget-model-tororo/assets/tororo.model.json' },
    //       display: { position: 'right', width: 320, height: 320 },  //调整大小,和位置
    //       mobile: { show: true },   //要不要盯着你的鼠标看
    //       log: false,
    //     })
    //   }, 1)
    // })

    return { //必须返回 模板中才能使用
      open,
      backTop,
      isShow
    }
  },
}


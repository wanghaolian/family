import { ref, onMounted, reactive, nextTick, onBeforeUnmount } from "vue";
import { useRouter } from 'vue-router'
import * as path from '@/router/pathConstants'
import skipFamilyHomeList from '@/assets/json/user.json';
import { fuzzySearch, require } from '@/utils/utils.js'

export default {

  name: 'home',

  setup() {

    // setup相当于之前的created周期：创建时
    // onBeforeMount：DOM即将挂载
    // onMounted：DOM挂载完毕
    // onBeforeUpdate：DOM即将更新
    // onUpdated：DOM更新完毕
    // onBeforeUnmount：即将销毁
    // onUnmounted：销毁完毕

    // 动态
    let wisdom = ref([
      '人生最宝贵的是生命，人生最需要的是学习，人生最愉快的是工作，人生最重要的是友谊。——斯大林',
      '人的生命似洪水奔流，不遇着岛屿和暗礁，难以激起美丽的浪花。——奥斯特洛夫斯基',
      '人生最苦痛的是梦醒了无路可走。做梦的人是幸福的;倘没有看出可走的路，最要紧的是不要去惊醒他。——鲁迅',
      '没有比人生更难的艺术，因为其他的艺术和学问，到处都可以找到很理想的老师。——塞涅卡',
      '要生活啊，信我的话，别等待明天，就在今天采摘生命的玫瑰吧。——龙沙',
      '思索，是愚变智的钥匙;不思，是智变愚的根由。思索，继续不断地思索，以待天曙，渐进乃见光明。——(英)牛顿'
    ])
    // background
    let background = ref([
      {
        id: 1,
        background: require("@/assets/images/wallpaper/wallpaper_6.png"),
        background_blur: require("@/assets/images/wallpaper/wallpaper_6_1.png"),
      },
      {
        id: 2,
        background: require("@/assets/images/wallpaper/wallpaper_5.jpg"),
        background_blur: require("@/assets/images/wallpaper/wallpaper_5_1.png"),
      },
      {
        id: 3,
        background: require("@/assets/images/wallpaper/wallpaper_1.jpg"),
        background_blur: require("@/assets/images/wallpaper/wallpaper_2.jpg"),
      },
      {
        id: 4,
        background: require("@/assets/images/wallpaper/wallpaper_3.jpg"),
        background_blur: require("@/assets/images/wallpaper/wallpaper_4.jpg"),
      },
    ])

    // 时间
    let nowtime = ref()
    // timer
    let timer: any = ref(null)
    onMounted(() => {
      timer.value = setInterval(() => {
        nowtime.value = new Date();
      }, 1000)

      // //和风天气插件调用
      // window.WIDGET = {
      //   "CONFIG": {
      //     "modules": "01234",
      //     "background": "5",
      //     "tmpColor": "FFFFFF",
      //     "tmpSize": "16",
      //     "cityColor": "FFFFFF",
      //     "citySize": "16",
      //     "aqiColor": "FFFFFF",
      //     "aqiSize": "16",
      //     "weatherIconSize": "24",
      //     "alertIconSize": "18",
      //     "padding": "10px 10px 10px 10px",
      //     "shadow": "1",
      //     "language": "auto",
      //     "borderRadius": "5",
      //     "fixed": "false",
      //     "vertical": "top",
      //     "horizontal": "left",
      //     "key": "5ee180939c2743b18f7eb63d0f438831"
      //   }
      // };
      // (function (d) {
      //   var c = d.createElement('link');
      //   c.rel = 'stylesheet';
      //   c.href = '../../static/css/he-simple.css';
      //   var s = d.createElement('script');
      //   s.src = '../../static/js/he-simple.js';
      //   var sn = d.getElementsByTagName('script')[0];
      //   sn.parentNode.insertBefore(c, sn);
      //   sn.parentNode.insertBefore(s, sn);
      // })(document);
    })

    onBeforeUnmount(() => {
      if (timer.value) {
        clearInterval(timer.value);
      }
      document.removeEventListener("mousemove", handleMousemove);
    })

    document.addEventListener('mousemove', handleMousemove, false)

    // 左右倾斜度
    let range = ref(40)
    // 暂存区
    let timeout = ref()
    // 随机数
    let random = ref(Math.floor(Math.random() * 4 + 1) - 1)

    function getMousePos(event) {
      let e = event || window.event;
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      let y = e.pageY || e.clientY + scrollY;
      return y;
    }

    function calcValue(a, b) {
      return (a / b * range.value - range.value / 2).toFixed(1);
    }

    let family_home_filter_blur = ref();
    let family_home_background = ref();
    let family_home_cover = ref();
    let Aniya = ref();

    function handleMousemove(_ref) {

      family_home_filter_blur.value.style.opacity = 1 - (getMousePos(event) / window.outerHeight * 2.5);

      let x = _ref.x, y = _ref.y;

      if (timeout.value) {
        window.cancelAnimationFrame(timeout.value);
      }

      window.requestAnimationFrame(() => {
        let yValue: any = calcValue(y, window.innerHeight);
        let xValue: any = calcValue(x, window.innerWidth);
        family_home_background.value.style.backgroundPositionX = xValue * 1 - 10 + "px ";
        family_home_background.value.style.backgroundPositionY = (-yValue * 0.75 - 20) + "px";
        family_home_filter_blur.value.style.backgroundPositionX = xValue * 1 - 10 + "px ";
        family_home_filter_blur.value.style.backgroundPositionY = (-yValue * 0.75 - 20) + "px";
        family_home_cover.value.style.backgroundPositionX = xValue * 1 - 10 + "px ";
        family_home_cover.value.style.backgroundPositionY = (-yValue * 1 - 20) + "px";
        Aniya.value.style.right = xValue * 0.7 - 100 + "px";
      })

    }

    // 搜索
    let search = ref("")
    // 时间
    let without = ref(false)
    // 进度条
    let progress = ref(0)
    //首先在setup中定义
    const router = useRouter()

    function keydownSearch() {
      if (search.value === '') {
        without.value = true
        setTimeout(() => {
          without.value = false
        }, 3000)
        return false
      }

      if (!fuzzySearch(skipFamilyHomeList, search.value)) {
        window.open("https://www.baidu.com/s?wd=" + search.value);
        return false
      }

      progress.value = 100

      setTimeout(() => {
        router.push(
          {
            path: fuzzySearch(skipFamilyHomeList, search.value).router,
            query: {}
          }
        )
      }, 3000)
    }


    function skipMemorialHall(){
      router.push(
        {
          path: path.MemorialHall,
          query: {}
        }
      )
    }

    return { //必须返回 模板中才能使用
      range,
      timeout,
      wisdom,
      search,
      skipFamilyHomeList,
      nowtime,
      timer,
      without,
      background,
      random,
      progress,
      family_home_filter_blur,
      family_home_background,
      family_home_cover,
      Aniya,
      keydownSearch,
      skipMemorialHall
    }
  },
}


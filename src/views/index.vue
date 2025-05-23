<template>
  <!-- <div class="background" v-show="this.$store.state.Loading == true" style="z-index: 99999;">
    <div class="spinner">
      <div class="outer">
        <div class="inner tl"></div>
        <div class="inner tr"></div>
        <div class="inner br"></div>
        <div class="inner bl"></div>
      </div>
    </div>
  </div> -->
  <div  style="background: #FFF4E6;" >
    <div style="
        display: flex;
        width: 100%;
        height: 10vh;
        justify-content: space-around;
        background: linear-gradient(to right, #FF4500 30%, #FF8C00 70%);
      ">
      <div style="width: 45%; height: 100%; text-align: left">
        <img src="https://www.jscdc.cn/images/logo.svg" alt="" style="width:
        100%;height: 100%;" </div>
        <div style="
          text-align: right;
          font-size: 3vh;
          line-height: 10vh;
          color: white;
        ">
          {{ year }} {{ time }}
        </div>
      </div>
      <router-view />
      <div class="foot">
        <div class="footbody">
          <div>发布单位：江苏省疾病预防控制中心（江苏省预防医学科学院）</div>
          <div>技术支持:中国疾病预防控制中心环境与健康相关产品安全所</div>
          <div>访问量：{{ total }}</div>
        </div>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      year: "",
      week: "",
      time: "",
      Loading: this.$store.state.Loading,
      total: 0
    };
  },
  mounted() {
      axios
      .get(
        baseURL +"/HotData/getAccessCount"
      )
      .then((response) => { 
          this.total=response.data.data.accessCount
      })
    this.$store.commit("setLoading", false);
    this.$router.push("/");
    setInterval(() => {
      // 获取当前时间
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      this.time = `${hours}:${minutes}:${seconds}`;

      // 获取年、月、日
      let today = new Date();
      let year = today.getFullYear(); // 获取完整的年份（4位数字）
      let month = today.getMonth() + 1; // 月份是从0开始的，所以+1
      let day = today.getDate(); // 获取日（1-31）

      // 格式化月份和日期
      month = month.toString().padStart(2, "0");
      day = day.toString().padStart(2, "0");

      // 获取星期几
      let weekday = today.getDay();
      const daysOfWeek = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let weekDayName = daysOfWeek[weekday];

      // 将它们组合成一个字符串并输出
      this.year = `${year}年${month}月${day}日 ${weekDayName}`;
    }, 1000);


  },
  methods: {
    last() {
      // 获取当前日期
      const today = new Date();

      // 设置日期为昨天（当前日期减去1天）
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // 格式化日期为 YYYY-MM-DD
      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1并补0
      const day = String(yesterday.getDate()).padStart(2, "0"); // 补0

      const formattedYesterday = `${year}-${month}-${day}`;
      return formattedYesterday;
    },
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  width: 100%;
  height: 0.1vh;
  background: #1e69a9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 3vh;
  color: white;

  div {
    cursor: pointer;
  }

  // position: fixed;
  // top: 0;
  // z-index: 99999;
}

.foot {
  width: 100%;
  height: 6vh;
  background: linear-gradient(to right, #FF4500 30%, #FF8C00 70%);
  margin-top: 2vh;
  line-height: 6vh;
  color: white;
  text-align: center;
}

.footbody {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  font-size: 2vh;
  // color: #a7aab4;
}

/* loading.css */
.background {
  background: #081f40;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;
}

.spinner {
  position: absolute;
  width: 128px;
  height: 128px;
  top: calc(50% - 64px);
  left: calc(50% - 64px);
  transform: perspective(206px) rotateX(45deg);
}

.outer {
  box-sizing: border-box;
  animation: spin 3s linear infinite;
  height: 100%;
}

.inner {
  position: absolute;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1.8s ease-in-out infinite;
}

.inner.tl {
  top: 0;
  left: 0;
  border-top: 2px solid rgb(12, 95, 248);
  border-left: 4px solid rgb(12, 95, 248);
}

.inner.tr {
  top: 0;
  right: 0;
  border-top: 2px solid rgb(12, 95, 248);
  border-right: 4px solid rgb(12, 95, 248);
}

.inner.br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid rgb(12, 95, 248);
  border-right: 4px solid rgb(12, 95, 248);
}

.inner.bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid rgb(12, 95, 248);
  border-left: 4px solid rgb(12, 95, 248);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

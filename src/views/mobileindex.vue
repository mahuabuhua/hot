<template>
    <div class="home" style="margin-top: 2vh">
  
      <!-- 主体 -->
      <div class="body">
        <div style="width: 100%; ">
          <div class="cardheader">
            <div
              :class="btn == 0 ? 'btn2' : 'btn1'"
              style="border-top-left-radius: 2vh"
              @click="getData2(0)"
            >
              {{ getFutureDate(0) }}
            </div>
            <div :class="btn == 1 ? 'btn2' : 'btn1'" @click="getData2(1)">
              {{ getFutureDate(1) }}
            </div>
            <div :class="btn == 2 ? 'btn2' : 'btn1'" @click="getData2(2)">
              {{ getFutureDate(2) }}
            </div>
            <div
              :class="btn == 3 ? 'btn2' : 'btn1'"
              style="border-top-right-radius: 2vh"
              @click="getData2(3)"
            >
              {{ getFutureDate(3) }}
            </div>
          </div>
          <div class="cardbody">
            <div
              style="
                color: white;
                font-size: 3.5vh;
                padding-top: 4vh;
                font-weight: bold;
              "
            >
              {{ cityres.areaName }}风险等级:
              <span  v-if="cityres.tempLevel == 0"
                >低风险</span
              >
              <span style="color: rgb(0, 0, 255)" v-if="cityres.tempLevel == 1"
                >中等风险</span
              >
              <span style="color: rgb(255, 255, 0)" v-if="cityres.tempLevel == 2"
                >较高风险</span
              >
              <span style="color: rgb(255, 126, 0)" v-if="cityres.tempLevel == 3"
                >高风险</span
              >
              <span style="color: rgb(255, 0, 0)" v-if="cityres.tempLevel == 4"
                >极高风险</span
              >
              <span
                v-if="
                  cityres.tempLevel == '' ||
                  cityres.tempLevel == undefined ||
                  cityres.tempLevel == -1
                "
                >--</span
              >
            </div>
            <div style="display: flex; margin-left: 5vh; margin-top: 6vh">
              <div>
                <img
                  src="https://www.cdctj.com.cn/hjjkfwpt/images/wendu.png"
                  width="100"
                  height="120"
                />
              </div>
              <div style="margin-left: 6vh">
                <div style="font-weight: bold; color: white; font-size: 4vh">
                  最低温度
                </div>
                <div style="font-weight: bold; color: white; font-size: 7vh">
                  {{ cityres.minTemp }}
                </div>
              </div>
            </div>
            <div
              style="
                color: white;
                font-size: 3vh;
                padding-left: 1vh;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                width:85%;
                margin: auto;
              "
            >
              <div>最高温度: {{ cityres.highTemp }}</div>
              <div>平均温度：{{ cityres.avgTemp }}</div>
            </div>
            <div style="color: white;width: 90%;text-align: left; margin: auto;margin-top: 4vh; "><span style="color: red;">*</span>最新更新时间：{{getFutureDate(0)}} 6:00:00</div>
          <div
            style="
              width: 90%;
              margin: auto;
              font-weight: bold;
              color: white;
              font-size: 2.5vh;
              text-align: left;
              margin-top: 0.5vh;
            "
          >
              <span v-if="cityres.tempLevel == 1"
                >防护建议:室内保持适宜的温度和湿度，适时通风换气；出入温暖的室内时，注意温度的缓冲，不宜忽冷忽热；外出或户外活动注意添衣保暖。</span
              >
              <span v-if="cityres.tempLevel == 2"
                >防护建议:适时采取室内供暖措施；外出或户外活动尽量选择在一天中较温暖的时段；避免进行剧烈的体力活动。户外作业人员尽量选择在一天中较温暖的时段作业；儿童、老年人、心肺疾病患者尽量减少在户外活动时间；外出或户外活动注意添衣保暖；保持通讯畅通，如有不适请及时就医。</span
              >
              <span v-if="cityres.tempLevel == 3"
                >防护建议:采取室内供暖措施；不宜长时间户外逗留，尽量减少户外体力活动；户外作业人员尽量减少户外作业时间；儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖；保持通讯畅通，如有不适请及时就医。</span
              >
              <span v-if="cityres.tempLevel == 4"
                >防护建议:加强室内供暖措施；不宜长时间户外逗留；户外作业人员避免长时间户外作业；儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖、热餐热饮；保持通讯畅通，如有不适及时就医。</span
              >
              <span v-if="cityres.tempLevel == 0||cityres.tempLevel==-1">防护建议:--</span>
              <div style="height: 1vh;"></div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%">
        <div style="margin-bottom: 0vh;color: white;font-size: 3vh;">地区低温健康风险预报</div>
        <div style="margin-bottom: 2vh;color: white;font-size: 1vh;">（长按区域展示当日的基本信息，点击区域进入地级市）</div>
          <Map
            ref="map"
            @custom-event="getDatamap()"
            @custom-back="getData2()"
            @custom-choose="getres()"
          />
        </div>
    </div>
  </template>
  
  <script>
  // import Map from '@/components/Map/map.vue'
  import axios from "axios";
  import Map from "@/components/echartsmobileMap/index.vue";
  import * as echarts from "echarts";
  
  import { markRaw } from "vue";
  export default {
  name: "HomeView",
  components: {
    Map,
  },
  data() {
    return {
      air: [],
      intervalId: null,
      chartoption: null,
      btn: 0,
      dataFour: [],
      columnsFour: [
        {
          title: "日期",
          key: "time",
        },
        {
          title: "区域",
          key: "areaName",
        },
        {
          title: "健康风险",
          key: "tempLevelname",
        },
        {
          title: "最低温度",
          key: "minTemp",
        },
        {
          title: "最高温度",
          key: "highTemp",
        },
        {
          title: "平均温度",
          key: "avgTemp",
        },
      ],
      suggestion: [
        {
          suggestion0: "--",
          suggestion1:
            "室内保持适宜的温度和湿度，适时通风换气；出入温暖的室内时，注意温度的缓冲，不宜忽冷忽热；外出或户外活动注意添衣保暖。",
          suggestion2:
            "适时采取室内供暖措施；外出或户外活动尽量选择在一天中较温暖的时段；避免进行剧烈的体力活动。户外作业人员尽量选择在一天中较温暖的时段作业；儿童、老年人、心肺疾病患者尽量减少在户外活动时间；外出或户外活动注意添衣保暖；保持通讯畅通，如有不适请及时就医。",
          suggestion3:
            "采取室内供暖措施；不宜长时间户外逗留，尽量减少户外体力活动；户外作业人员尽量减少户外作业时间；儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖；保持通讯畅通，如有不适请及时就医。",
          suggestion4:
            "加强室内供暖措施；不宜长时间户外逗留；户外作业人员避免长时间户外作业；儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖、热餐热饮；保持通讯畅通，如有不适及时就医。",
        },
      ],
      suggestionrow: [
        {
          title: "低风险",
          color: "#69C0FF",
          key: "suggestion0",
        },
        {
          title: "中等风险",
          color: "rgb(0, 0, 255)",
          key: "suggestion1",
        },
        {
          title: "较高风险",
          color: "rgb(255, 255, 0)",
          key: "suggestion2",
        },
        {
          title: "高风险",
          color: "rgb(255, 126, 0)",
          key: "suggestion3",
        },
        {
          title: "极高风险",
          color: "rgb(255, 0, 0)",
          key: "suggestion4",
        },
      ],
      cityres: {},
      air: [{
                name: "南京市",
                code: "320100"
            },
            {
                name: "无锡市",
                code: "320200"
            },
            {
                name: "徐州市",
                code: "320300"

            },
            {
                name: "常州市",
                code: "320400"
            },
            {
                name: "苏州市",
                code: "320500"
            },
            {
                name: "南通市",
                code: "320600"
            },
            {
                name: "连云港市",
                code: "320700"
            },
            {
                name: "淮安市",
                code: "320800"
            },
            {
                name: "盐城市",
                code: "320900"
            },

            {
                name: "扬州市",
                code: "321000"
            },
            {
                name: "镇江市",
                code: "321100"
            },
            {
                name: "泰州市",
                code: "321200"
            },
            {
                name: "宿迁市",
                code: "321300"
            }

      ],
            oldbtn:''
    };
  },
  async mounted() {
    this.getData(0);
    
  },
  methods: {
    getFutureDate(days) {
      let today = new Date();
      let futureDate = new Date(today);
      futureDate.setDate(today.getDate() + days);
      // 获取月份和日期，并格式化为两位数
      let month = ("0" + (futureDate.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1
      let day = ("0" + futureDate.getDate()).slice(-2);
      // 返回格式化的字符串
      return `${month}月${day}日`;
    },
    getFormattedDate(days) {
      // 创建一个新的Date对象，基于当前日期
      let futureDate = new Date();

      // 增加days天数到futureDate
      futureDate.setDate(futureDate.getDate() + days);

      // 获取年份、月份（需要加1，因为JavaScript中月份从0开始）和日期
      let year = futureDate.getFullYear();
      let month = String(futureDate.getMonth() + 1).padStart(2, "0"); // 确保两位数显示
      let day = String(futureDate.getDate()).padStart(2, "0"); // 确保两位数显示

      // 返回格式化的日期字符串
      return `${year}-${month}-${day}`;
    },
    getData(e) {
      this.$store.commit("setLoading", true);
      if (e == undefined) {
        this.btn = this.$store.state.btn;
        // this.$store.commit("setbtn", e);
      } else {
        this.btn = e;
        this.$store.commit("setbtn", e);
      }
      if (this.$store.state.code != "320000") {
        this.getDatamap();
        return;
      }
      axios
        .get(
          baseURL +
            "/CwwData/list?time=" +
            this.getFormattedDate(this.$store.state.btn) +
            "&level=1"
        )
        .then((response) => {
          this.dataFour = response.data.data;
          this.$store.commit("setarr", response.data.data);
          axios.get(baseURL + "/api/get-location").then((response) => {
            let citystatus = false
            if (response.data.code!=502) { 
              for (let i of this.air) {
                if (i.name == response.data.data.city) {
                  citystatus = true;
                  break;
                }
              }
            }
            // for (let i of this.air) { 
            //   if (i.name == response.data.data.city) { 
            //     citystatus = true;
            //     break;
            //   }
            // }
            console.log(response.data.data);
            if (false) {
                  this.dataFour.forEach((item) => {
                    if (
                      item.areaName == response.data.data.city
                    ) {
                      this.cityres = item;
                      this.air.forEach((item) => {
                        if (item.name == response.data.data.city&&this.$refs.map.status==false) { 
                          this.$refs.map.status = true;
                          this.$store.commit("setCode", item.code);
                          this.getDatamap();
                          return;
                        }
                      })
                      // this.$store.commit("setchooseareaname", res.data.result.addressComponent.city);
                    }

                    item.time = this.getFutureDate(this.btn);
                    item.minTemp = item.minTemp + "°C";
                    item.highTemp = item.highTemp + "°C";
                    item.avgTemp = item.avgTemp + "°C";
                    if (item.tempLevel == 0) {
                      item.tempLevelname = "低风险";
                    } else if (item.tempLevel == 1) {
                      item.tempLevelname = "中等风险";
                    } else if (item.tempLevel == 2) {
                      item.tempLevelname = "较高风险";
                    } else if (item.tempLevel == 3) {
                      item.tempLevelname = "高风险";
                    } else if (item.tempLevel == 4) {
                      item.tempLevelname = "极高风险";
                    } else {
                      item.tempLevelname = "--";
                    }
                  });
                  this.getres();
                  this.$refs.map.getMapData(this.$store.state.code);
            } else {
              this.dataFour.forEach((item) => {
                if (item.areaName == "南京市") {
                  this.cityres = item;
                  // this.$store.commit("setchooseareaname", "南京市");
                }
                item.time = this.getFutureDate(this.btn);
                item.minTemp = item.minTemp + "°C";
                item.highTemp = item.highTemp + "°C";
                item.avgTemp = item.avgTemp + "°C";
                if (item.tempLevel == 0) {
                  item.tempLevelname = "低风险";
                } else if (item.tempLevel == 1) {
                  item.tempLevelname = "中等风险";
                } else if (item.tempLevel == 2) {
                  item.tempLevelname = "较高风险";
                } else if (item.tempLevel == 3) {
                  item.tempLevelname = "高风险";
                } else if (item.tempLevel == 4) {
                  item.tempLevelname = "极高风险";
                } else {
                  item.tempLevelname = "--";
                }
              });
              this.getres();
              this.$refs.map.getMapData(this.$store.state.code);
            }
          });
        });
    },
    getDatamap() {
      this.$store.commit("setLoading", true);
      axios
        .get(
          baseURL +
            "/CwwData/list?time=" +
            this.getFormattedDate(this.$store.state.btn) +
            "&city_code=" +
            this.$store.state.code +
            "&level=2"
        )
        .then((response) => {
          if (response.data.data.length == 0) { 
            this.btn = this.oldbtn;
            this.$message('数据还未同步，请稍后再试！');
            this.$store.commit("setLoading", false);
            this.$store.commit("setbtn", this.btn);
            return;
          }
          this.dataFour = response.data.data;
          this.$store.commit("setarr", response.data.data);
          this.dataFour.forEach((item) => {
            item.time = this.getFutureDate(this.btn);
            item.minTemp = item.minTemp + "°C";
            item.highTemp = item.highTemp + "°C";
            item.avgTemp = item.avgTemp + "°C";
            if (item.tempLevel == 0) {
              item.tempLevelname = "低风险";
            } else if (item.tempLevel == 1) {
              item.tempLevelname = "中等风险";
            } else if (item.tempLevel == 2) {
              item.tempLevelname = "较高风险";
            } else if (item.tempLevel == 3) {
              item.tempLevelname = "高风险";
            } else if (item.tempLevel == 4) {
              item.tempLevelname = "极高风险";
            } else {
              item.tempLevelname = "--";
            }
          });
          this.getres();
          this.$refs.map.getMapData(this.$store.state.code);
        });
    },
    getres() {
      if (this.$store.state.chooseareaname != "") {
        if (this.$store.state.chooseareaname == "海门区") {
          this.$store.state.chooseareaname = "海门市";
        }
        axios
          .get(
            baseURL +
            "/CwwData/list?time=" +
              this.getFormattedDate(this.$store.state.btn) +
              "&area_code=" +
              this.$store.state.chooseareaname 
          )
          .then((response) => {
            this.cityres = response.data.data[0];
            this.cityres.minTemp = this.cityres.minTemp + "°C";
            this.cityres.highTemp = this.cityres.highTemp + "°C";
            this.cityres.avgTemp = this.cityres.avgTemp + "°C";
          });
      }
      // for (let i of this.dataFour) {
      //   if (i.areaName == this.$store.state.chooseareaname) {
      //     console.log(i);

      //     this.cityres = i;
      //   }
      // }
    },
    getData2(e) {
      this.$store.commit("setLoading", true);
      this.oldbtn = this.btn;
      if (e == undefined) {
        this.btn = this.$store.state.btn;
        // this.$store.commit("setbtn", e);
      } else {
        this.btn = e;
        this.$store.commit("setbtn", e);
      }
      if (this.$store.state.code != "320000") {
        this.getDatamap();
        return;
      }
      axios
        .get(
          baseURL +
            "/CwwData/list?time=" +
            this.getFormattedDate(this.$store.state.btn) +
            "&level=1"
        )
        .then((response) => {
          if (response.data.data.length == 0) { 
            this.btn = this.oldbtn;
            this.$message('数据还未同步，请稍后再试！');
            this.$store.commit("setLoading", false);
            this.$store.commit("setbtn", this.btn);
            return;
          }
          this.dataFour = response.data.data;
          this.$store.commit("setarr", response.data.data);
          axios.get(baseURL + "/api/get-location").then((response) => {
            if (response.data.code!=502&&response.data.data.city!='') {
                  this.dataFour.forEach((item) => {
                    if (
                      item.areaName == response.data.data.city
                    ) {
                      this.cityres = item;
                      // this.$store.commit("setchooseareaname", res.data.result.addressComponent.city);
                    }

                    item.time = this.getFutureDate(this.btn);
                    item.minTemp = item.minTemp + "°C";
                    item.highTemp = item.highTemp + "°C";
                    item.avgTemp = item.avgTemp + "°C";
                    if (item.tempLevel == 0) {
                      item.tempLevelname = "低风险";
                    } else if (item.tempLevel == 1) {
                      item.tempLevelname = "中等风险";
                    } else if (item.tempLevel == 2) {
                      item.tempLevelname = "较高风险";
                    } else if (item.tempLevel == 3) {
                      item.tempLevelname = "高风险";
                    } else if (item.tempLevel == 4) {
                      item.tempLevelname = "极高风险";
                    } else {
                      item.tempLevelname = "--";
                    }
                  });
                  this.getres();
                  this.$refs.map.getMapData(this.$store.state.code);
            } else {
              this.dataFour.forEach((item) => {
                if (item.areaName == "南京市") {
                  this.cityres = item;
                  // this.$store.commit("setchooseareaname", "南京市");
                }
                item.time = this.getFutureDate(this.btn);
                item.minTemp = item.minTemp + "°C";
                item.highTemp = item.highTemp + "°C";
                item.avgTemp = item.avgTemp + "°C";
                if (item.tempLevel == 0) {
                  item.tempLevelname = "低风险";
                } else if (item.tempLevel == 1) {
                  item.tempLevelname = "中等风险";
                } else if (item.tempLevel == 2) {
                  item.tempLevelname = "较高风险";
                } else if (item.tempLevel == 3) {
                  item.tempLevelname = "高风险";
                } else if (item.tempLevel == 4) {
                  item.tempLevelname = "极高风险";
                } else {
                  item.tempLevelname = "--";
                }
              });
              this.getres();
              this.$refs.map.getMapData(this.$store.state.code);
            }
          });
        });
    },
  },
};
</script>

  <style scoped>
  .tittle {
    width: 90%;
    height: 5vh;
    margin: auto;
    margin-bottom: 2vh;
    display: flex;
  }
  
  .first-child {
    padding: 0 1vh;
    width: 25%;
    height: 100%;
    text-align: left;
    line-height: 5vh;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    background: #fccc70;
    font-weight: bold;
    text-align: center;
  
    img {
      width: 80%;
      height: 60%;
      margin: auto;
    }
  }
  
  .last-child {
    width: 80%;
    height: 100%;
    background: #dad3d3;
    display: flex;
    align-items: center;
  }
  
  .weather {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: baseline;
    padding: 1vh 0;
  
    div {
      margin-left: 1vh;
    }
  }
  
  .body {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: auto;
    /* margin-top: 2vh; */
  }
  
  .text {
    width: 98%;
    max-height: 6vh;
    border-radius: 10pc;
    background: #e7e4e4;
    display: flex;
    align-items: center;
    margin-bottom: 2vh;
  }
  
  .img {
    width: 8%;
    height: 70%;
    margin-top: 5px;
    padding-left: 4%;
    padding-right: 2%;
  
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  #mychart {
    width: 100%;
    height: 58vh;
    padding-top: -50px;
  }
  .cardheader {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btn1 {
    width: 25%;
    height: 10vh;
    background: #fffcfc;
    font-size: 2vh;
    text-align: center;
    line-height: 10vh;
    font-weight: bold;
    cursor: pointer;
  }
  .btn2 {
    width: 25%;
    height: 12vh;
    background: #2a1664;
    font-size: 2vh;
    text-align: center;
    line-height: 12vh;
    font-weight: bold;
    border-radius: 2vh;
    color: white;
    cursor: pointer;
    z-index: 999;
    border: 0.3vh solid #1E69A9;
  }
  .cardbody {
    width: 100%;
    /* height: 75vh; */
    background: #69C0FF;
    position: relative;
    top: -2vh;
    text-align: center;
    border-bottom-left-radius: 2vh;
    border-bottom-right-radius: 2vh;
  }
  .table-wrapper {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    margin: auto;
    /* margin-top: 2vh; */
  }
  
  .header-cell {
    width: 10vh;
    height: 3vh;
    padding: 8px 16px;
    line-height: 3vh;
    font-size: 2vh;
    border-bottom: 1px solid #ccc;
  }
  .table-row {
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .table-header {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .data-cell {
    width: 10vh;
    height: 3vh;
    font-size: 2vh;
    padding: 8px 10.5px;
    border-bottom: 1px solid #ccc;
    line-height: 3.5vh;
  }
  
  .data-cell:last-child {
    border-right: none;
  }
  .header-cell2 {
    width: 10vh;
    font-size: 2vh;
    height: 5vh;
    line-height: 5vh;
    padding: 8px 16px;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
  .data-cell2 {
    text-align: left;
    /* width: 160vh; */
    height: 5vh;
    padding: 8px 16px;
    font-size: 2vh;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
  }
  
  .data-cell2:last-child {
    border-right: none;
  }
  </style>
  
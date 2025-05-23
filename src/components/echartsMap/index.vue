<template>
  <div style="width: 100%;height: 100%;">
    <!-- <el-card> -->
    <!-- <el-button type="primary" @click="goBack" style="position: absolute; left: 85vh; z-index: 999999"
      v-if="status && this.$store.state.code != '320000'">返回上级</el-button> -->
    <!-- <el-select v-model="selectedPollutant" placeholder="请选择污染物" style="position: absolute;left: 10vh; z-index: 999999; width: 15vh;">
      <el-option label="HCHO" value="HCHO" />
      <el-option label="O3" value="O3" />
      <el-option label="NO2" value="NO2" />
      <el-option label="PM2.5" value="PM2.5" />
      <el-option label="PM10" value="PM10" />
    </el-select> -->
    <div ref="mapChartRef" style="height: 100%; width: 100%" id="mapChartRef"></div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  data() {
    return {
      mapChartRef: "",
      initChinaMap: "",
      initAdCode: "320000",
      currentMapName: "江苏",
      mapList: [],
      historyInfo: [],
      status: false,
      selectedPollutant: 'HCHO',
    };
  },
  mounted() {
    // this.getMapData(this.initAdCode);
    // window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听
    window.removeEventListener('resize', this.handleResize);
    if (this.initChinaMap) {
      this.initChinaMap.dispose();
    }
  },
  methods: {
    handleResize() {
      if (this.initChinaMap) {
        // 添加防抖处理，避免频繁重绘
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.initChinaMap.resize();
          // 重新设置option以确保visualMap正确渲染
          this.initChinaMap.setOption(this.initChinaMap.getOption(), true);
        }, 100);
      }
    },
    async getMapData(code, obj) {
      const data = await axios
        .get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`)
        .then((res) => {
          this.mapList = [];
          let result = res.data;
          if (res.status === 200) {
            // 获取当前选中的省市区的所有名称和编码
            result.features.forEach((item) => {
              if (item.properties.name == "铜山区") {
                item.properties.cp = [117.169698, 34.181162];
              }
              this.mapList.push(item.properties);
            });
            result.features.unshift(result.features[0]);

            this.renderChart(this.currentMapName, result, obj);
          }
        })
        .catch(() => {
          this.$store.commit("setLoading", false);
        });
      return data;
    },
    renderChart(mapName, mapData, data) {
      let arr = data;
      arr.forEach((item) => {
        item.name = item.areaName;
        if (item.name == "海门市") {
          item.name = "海门区";
        }
        if (item.tempLevel == "" || item.tempLevel == undefined) {
          item.value = 0;
        } else {
          item.value = item.tempLevel;
        }
      });

      
      if (this.initChinaMap != "") {
        this.initChinaMap.dispose();
      }
      this.initChinaMap = echarts.init(document.getElementById("mapChartRef"));
      // 注册: registerMap('地图名称', 地图数据）, 地图名称须和option里面的map一致
      echarts.registerMap(mapName, mapData);

      // 地图配置项
      const option = {
        // layoutCenter: ["70%", "50%"], //位置
        // layoutSize:'65%',//大小
        // 提示浮窗样式
        tooltip: {
          show: true,
          trigger: "item",
          alwaysShowContent: false,
          backgroundColor: "#e6a23c",
          borderColor: "rgba(0, 0, 0, 0.16);",
          hideDelay: 100,
          triggerOn: "mousemove",
          enterable: true,
          textStyle: {
            color: "white",
          },
          showDelay: 100,
          formatter: (params) => {
    
            let str = `<div>${params.name}</div>`;
            str += `<div style="text-align:left">平均温度：${params.data.avgTemp}°C</div>`
             str += `<div style="text-align:left">最低温度：${params.data.minTemp?params.data.minTemp+"°C":"暂无"}</div>`
            str += `<div style="text-align:left">最高温度：${params.data.highTemp}°C</div>`
            str += `<div style="text-align:left">风险等级：${params.data.tempLevelName}</div>`
             str += `<div style="text-align:left">更新时间：${params.data.time}</div>`
            return str;
          },
        },
        series: [
          {
            type: "map",
            select: {
              //这个就是鼠标点击后，地图想要展示的配置
              disabled: true, //可以被选中
              itemStyle: {
                //相关配置项很多，可以参考echarts官网
                areaColor: "#fff", //选中
              },
            },
            map: mapName, // 地图名称
            roam: true, // 开启缩放和平移功能
            data: arr,
            zoom: "1.25", // 当前视角的缩放比例
            label: {
              show: true, // 是否显示省份名字
              normal: {
                show: true,
                color: "#000000", // 默认字体颜色为白色
              },
              emphasis: {
                color: "#000000", // 悬浮时字体颜色变为黑色
              },
            },
            roam: false, // 是否开启缩放和平移
            itemStyle: {
              borderColor: "#fff", // 边界线颜色
              borderType: "dashed", // 边界线类型
            },
            // 设置鼠标移上去高亮的样式
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                areaColor: "#e6a23c",
                borderType: "solid",
              },
            },
          },
        ],
        visualMap: {
          type: "piecewise", // 定义为分段型visualMap
          show: true,
          selectedMode: false,
          textStyle: {
            color: "#000000", // 设置字体颜色为白色
          },
          splitNumber: 0, // 由于我们手动定义了pieces，所以不需要自动分割，设置splitNumber为0
          calculable: false,
          left: "left",
          top: "bottom",
          orient: "vertical", // 布局朝向，'horizontal'(横向)'vertical'(纵向)
          pieces: [
            {
              min: -1,
              max: -1,
              label: "暂未进入风险预报监测期",
              color: "#ccc",
            },
            {
              min: 0,
              max: 0,
              label: "低风险",
              color: "#B5FF2F",
            },
            {
              min: 1,
              max: 1,
              label: "中等风险",
              color: "rgb(0,0,255)",
            },
            {
              min: 2,
              max: 2,
              label: "较高风险",
              color: "rgb(255,255,0)",
            },
            {
              min: 3,
              max: 3,
              label: "高风险",
              color: "rgb(255,126,0)",
            },
            {
              min: 4,
              max: 4,
              label: "极高风险",
              color: "rgb(255,0,0)",
            },
          ],
        },
      };

      // 渲染
      this.initChinaMap.setOption(option);
      // window.onresize = this.initChinaMap.resize;

      // 防止多次触发click事件，重要！！！
      this.initChinaMap.off("click");

      // 下钻
      this.initChinaMap.on("click", (params) => {

        this.$store.commit("setchooseareaname", params.data.areaCode);
        this.$emit("custom-choose");
        const activeItem = this.mapList.find(
          (item) => item.name == params.name
        );
        if (activeItem.childrenNum != 0) {
          this.$store.commit("setCode", activeItem.adcode);
        } else {
          this.$store.commit("setCode", activeItem.parent.adcode);
        }
        console.log(activeItem.parent.adcode, "//////////////");
        // 判断有子级的时候才可以下钻
        if (activeItem && activeItem.adcode && activeItem.childrenNum) {
          this.historyInfo.push(activeItem);
          this.currentMapName = params.name;
          this.$emit("custom-event");
          this.status = true;
          // this.getMapData(activeItem.adcode);
        }
      });
      this.$store.commit("setLoading", false);
    },
    goBack() {
      const lastItem = this.historyInfo.pop();
      this.$store.commit("setCode", "320000");
      this.$emit("custom-back");
      if (lastItem && lastItem.parent && lastItem.parent.adcode) {
        this.status = false;
        // this.getMapData(lastItem.parent.adcode);
      }
    },
  },
};

// const mapChartRef = ref();
// const initChinaMap = ref();
// const initAdCode = ref(320000); // 默认中国地图的编码
// const currentMapName = ref("江苏"); // 默认地图的名称
// const mapList = ref([]); // 当前展示的省市区所有数据
// const historyInfo = ref([]); // 记录历史点击的省市区，用于返回查询

// // 获取地图数据
// const getMapData = async (code) => {
//     const data = await axios
//         .get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`)
//         .then((res) => {
//             mapList.value = [];
//             if (res.status === 200) {
//                 // 获取当前选中的省市区的所有名称和编码
//                 res.data.features.forEach((item) => {
//                     mapList.value.push(item.properties);
//                 });
//                 renderChart(currentMapName.value, res.data);
//             }
//         })
//         .catch(() => { });
//     return data;
// };

// // 渲染地图
// const renderChart = (mapName, mapData) => {
//     let that = this;
//     // 注册: registerMap('地图名称', 地图数据）, 地图名称须和option里面的map一致
//     echarts.registerMap(mapName, mapData);

//     // 地图配置项
//     const option = {
//         layoutCenter: ['70%', '50%'],//位置
//         // layoutSize:'65%',//大小
//         // 提示浮窗样式
//         tooltip: {
//             show: true,
//             trigger: "item",
//             alwaysShowContent: false,
//             backgroundColor: "#0C121C",
//             borderColor: "rgba(0, 0, 0, 0.16);",
//             hideDelay: 100,
//             triggerOn: "mousemove",
//             enterable: true,
//             textStyle: {
//                 color: "#DADADA",
//             },
//             showDelay: 100,
//             formatter: (params) => {
//                 return params.name;
//             },
//         },
//         series: [
//             {
//                 type: "map",
//                 map: mapName, // 地图名称
//                 roam: true, // 开启缩放和平移功能
//                 data: [],
//                 zoom: "1.2", // 当前视角的缩放比例
//                 label: {
//                     show: true, // 是否显示省份名字
//                 },
//                 roam: false, // 是否开启缩放和平移
//                 itemStyle: {
//                     borderColor: "#F59A23", // 边界线颜色
//                     borderType: "dashed", // 边界线类型
//                 },
//                 // 设置鼠标移上去高亮的样式
//                 emphasis: {
//                     itemStyle: {
//                         borderColor: "#34AEAE",
//                         areaColor: "#CCEBEB",
//                         borderType: "solid",
//                     },
//                 },
//             },
//         ],
//     };

//     // 渲染
//     initChinaMap.value.setOption(option);

//     // 防止多次触发click事件，重要！！！
//     initChinaMap.value.off("click");

//     // 下钻
//     initChinaMap.value.on("click", (params) => {
//         const activeItem = mapList.value.find((item) => item.name == params.name);
//         // 判断有子级的时候才可以下钻
//         if (activeItem && activeItem.adcode && activeItem.childrenNum) {
//             historyInfo.value.push(activeItem);
//             currentMapName.value = params.name;
//             getMapData(activeItem.adcode);
//         }
//     });
// };

// onMounted(() => {
//     initChinaMap.value = echarts.init(mapChartRef.value);
//     getMapData(initAdCode.value);
//     console.log(this.$store.state.arr);

// });

// // 返回上一级
// const goBack = () => {
//     const lastItem = historyInfo.value.pop();
//     if (lastItem && lastItem.parent && lastItem.parent.adcode) {
//         getMapData(lastItem.parent.adcode);
//     }
// };
</script>

<style scoped>
/* .mapWrapper {
    width: 700px;
    height: 600px;
    padding: 10px;
    border: 1px dashed orange;
  } */
</style>

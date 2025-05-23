<template>
  <div>
    <hothead />
    <div class="top">
      <el-card style="width: 34%;text-align: left;">
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #6B7280;">当前位置</div>
        <div style="font-family: Roboto;font-weight: 500;color: #000000;font-size: 3vh;margin-top: 0.5vh;">
          {{ locationobj.areaName }}</div>
        <div style="font-size: 7vh;font-family: Roboto;font-weight: bold;color: #DC2626;">{{ locationobj.avgTemp }}°C
          <span style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;">最低温度：{{
            locationobj.minTemp ? locationobj.minTemp + "°C" : "暂无" }}</span>
          <span style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;">最高温度：{{
            locationobj.highTemp }}°C</span>
        </div>
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 1vh;">
          发布时间：{{ this.getFormattedDate(0) }} 6:00</div>
      </el-card>
      <el-card style="width: 64.5%;text-align: left;">
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #6B7280;margin-bottom: 0.5vh;">预警状态
        </div>
        <div style="display: flex;align-items: center;">
          <div class="round" v-if="locationobj.tempLevel == 0" style="  background: greenyellow;"></div>
          <div class="round" v-if="locationobj.tempLevel == 1" style="  background:  RGB(0,0,255);"></div>
          <div class="round" v-if="locationobj.tempLevel == 2" style="  background: RGB(255,255,0);"></div>
          <div class="round" v-if="locationobj.tempLevel == 3" style="  background: RGB(255,126,0);"></div>
          <div class="round" v-if="locationobj.tempLevel == 4" style="  background: RGB(255,0,0);"></div>
          <div v-if="locationobj.tempLevel == 0"
            style="color: greenyellow;font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">低风险</div>
          <div v-if="locationobj.tempLevel == 1"
            style="color: RGB(0,0,255);font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">中等风险
          </div>
          <div v-if="locationobj.tempLevel == 2"
            style="color: RGB(255,255,0);font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">较高风险
          </div>
          <div v-if="locationobj.tempLevel == 3"
            style="color: RGB(255,126,0);font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">高风险
          </div>
          <div v-if="locationobj.tempLevel == 4"
            style="color: RGB(255,0,0);font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">极高风险
          </div>
        </div>
        <div v-if="locationobj.tempLevel == 0"
          style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">健康建议:暂无建议~</div>
        <div v-if="locationobj.tempLevel == 1"
          style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">
          健康建议：一般人群：外出活动时注意防暑降温;保证水分充足;保持室内凉爽。
          重点人群：老人:尽量避开高温时段外出，减少户外剧烈活动;保持沟通联系;身体不适时，及时就医。儿童:玩要时，尽可能待在阴凉处;及时补充水分及电解质。孕妇:尽量避开高温时段外出;身体不适时，及时就医。慢性疾病患者:尽量避开高温时段外出，减少户外剧烈活动;准备常用药品，服药需遵医嘱;保持沟通联系。户外工作者:及时补充水分及电解质;注意防暑降温。
        </div>
        <div v-if="locationobj.tempLevel == 2"
          style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">
          健康建议：一般人群：合理安排外出时间，减少户外剧烈活动，注意防暑降温;保证水分充足:保持室内凉爽。
          重点人群：老人:避开高温时段外出，减少户外活动，外出时宜有人陪伴:保持沟通联系:身体不适时，及时就医。儿童:避开高温时段外出;玩要时，待在阴凉处，应有成人陪伴:及时补充水分及电解质。孕妇: 避开高温时段外出;
          身体不适时，及时就医。慢性疾病患者:避开高温时段外出，减少户外活动;准备常用药品，服药需遵医嘱;保持沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;合理安排户外作业时间，注意防暑降温:穿戴透气、轻薄的工作服。
        </div>
        <div v-if="locationobj.tempLevel == 3"
          style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">
          健康建议：
          一般人群：合理安排外出时间，减少户外活动，注意防暑降温;保证水分充足;保持室内凉爽。
          重点人群：老人:不宜外出;确需外出时，宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童: 避开高温时段外出, 减少户外活动, 外出时应有成人陪伴; 及时补充水分及电解质; 密切关注中暑症状的发生。孕妇:
          避开高温时段外出; 外出时，宜有人陪伴; 身体不适时及时就医。慢性疾病患者: 不宜外出。确需外出时，注意防暑降温; 准备常用药品，服药需遵医嘱; 保持沟通联系; 身体不适时，及时拨打急救电话。户外工作者:
          及时补充水分及电解质; 合理安排户外作业时间，减少高温时段户外作业，注意防暑降温; 穿戴透气、轻薄的工作服; 预防职业性中暑。 </div>
        <div v-if="locationobj.tempLevel == 4"
          style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">
          健康建议：
          一般人群：不宜外出。确需外出时，注意防暑降温:保证水分充足:保持室内凉爽;身体不适时，及时就医。
          重点人群：老人:不宜外出;外出时宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童:不宜外出;确需外出时，应有成人陪伴;及时补充水分及电解质:密切关注中暑症状的发生。孕妇:不宜外出:确需外出时，宜有人陪伴;身体不适时，及时就医。慢性疾病患者:不宜外出;准备常用药品，服药需遵医嘱:保持沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;避免高温时段户外作业，注意防暑降温;穿戴透气、轻薄的工作服;预防职业性中暑;改善工作环境，注意遮阳、通风。
        </div>
      </el-card>
    </div>

    <div class="top">
      <div style="width: 61%;">
        <Map ref="childRef" />
      </div>
      <el-card style="width: 38%;">
        <!-- <template #header >
          <span style="font-weight: 600;font-size: 3vh;">江苏省高温热浪健康风险预警  2025年05月21日发布</span>
        </template> -->

        <div style="display: flex;justify-content: space-around;">
          <el-button type="warning" @click="btntime(0)" size="large" style="width: 17vh;">今日</el-button>
          <el-button type="warning" @click="btntime(1)" size="large" style="width: 17vh;">明日</el-button>
          <el-button type="warning" @click="btntime(2)" size="large" style="width: 17vh;">后日</el-button>
        </div>

        <div style="font-size: 5vh;font-weight: 500;">{{ this.areaName }}</div>

        <div style="display: flex;justify-content: space-around;margin: auto; margin-top: 1vh;width: 80%;">
          <el-select v-model="city" placeholder="选择地区" @keydown.delete.prevent="handleDeleteKey"
            @keydown.backspace.prevent="handleDeleteKey" style="width: 40%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model="time" type="date" placeholder="选择日期" style="margin-left: 2vh;"
            :disabled-date="disabledDate" value-format="YYYY-MM-DD" :clearable="false"
            @keydown.delete.prevent="handleDeleteKey" @keydown.backspace.prevent="handleDeleteKey">
          </el-date-picker>
          <el-button type="danger" @click="search" style="width: 10vh;margin-left: 1vh;">搜索</el-button>
        </div>
        <el-table ref="tableDemo" :data="data" border height="500"
          style="max-width: 100%;margin-top: 1vh;overflow: auto;">
          <el-table-column label="地区" prop='areaName' align="center" />
          <el-table-column label="平均温度" prop='avgTemp' align="center">
            <template #default="scope">
              {{ scope.row.avgTemp }}°C
            </template>
          </el-table-column>
          <el-table-column label="最低温度" prop='minTemp' align="center">
            <template #default="scope">
              {{ scope.row.minTemp ? scope.row.minTemp + "°C" : "暂无" }}
            </template>
          </el-table-column>
          <el-table-column label="最高温度" prop='highTemp' align="center">
            <template #default="scope">
              {{ scope.row.highTemp }}°C
            </template>
          </el-table-column>
          <el-table-column label="风险等级" prop='tempLevel' align="center">
            <template #default="scope">
              <div v-if="scope.row.tempLevel == 0" style="color: greenyellow">低风险</div>
              <div v-if="scope.row.tempLevel == 1" style="color: RGB(0,0,255);">中等风险</div>
              <div v-if="scope.row.tempLevel == 2" style="color: RGB(255,255,0);">较高风险</div>
              <div v-if="scope.row.tempLevel == 3" style="color: RGB(255,126,0);">高风险</div>
              <div v-if="scope.row.tempLevel == 4" style="color: RGB(255,0,0);">极高风险</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div style="margin: auto;text-align: center;font-weight: 500;font-size: 5vh;margin-top: 2vh;">不同高温热浪预警级别的健康建议</div>

    <el-table :data="suggestiondata" border style="width: 90%;margin: auto;margin-top: 2vh;">
      <el-table-column label="预警等级" prop="level" align="center" width="200"></el-table-column>
      <el-table-column label="颜色" prop="color" align="center" width="100">
        <template #default="scope">
          <div v-if="scope.row.tempLevel == 0"
            style="background-color: greenyellow;width: 2vh;height: 2vh;margin: auto;"></div>
          <div v-if="scope.row.tempLevel == 1"
            style="background-color: RGB(0,0,255);width: 2vh;height: 2vh;margin: auto;"></div>
          <div v-if="scope.row.tempLevel == 2"
            style="background-color: RGB(255,255,0);width: 2vh;height: 2vh;margin: auto;"></div>
          <div v-if="scope.row.tempLevel == 3"
            style="background-color: RGB(255,126,0);width: 2vh;height: 2vh;margin: auto;"></div>
          <div v-if="scope.row.tempLevel == 4"
            style="background-color: RGB(255,0,0);width: 2vh;height: 2vh;margin: auto;"></div>
        </template>
      </el-table-column>
      <el-table-column label="健康建议" prop="suggestion" align="center">
        <template #default="scope">
          <div style="text-align: left;"><span style="font-weight: 500;">一般人群：</span>{{ scope.row.suggestion.first }}
          </div>
          <div style="text-align: left;"><span style="font-weight: 500;">重点人群：</span>{{ scope.row.suggestion.second }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from "echarts";
import hothead from "@/components/hotheader/index.vue"
import Map from "@/components/echartsMap/index.vue"
import { markRaw } from 'vue';
import axios from "axios";
export default {
  components: {
    hothead,
    Map
  },
  data() {
    return {
      address: "建邺区",
      city: '320000',
      time: '',
      areaName: '江苏省',
      locationobj: {},
      options: [
        { value: '320000', label: '江苏省' },
        { value: '320100', label: '南京市' },
        { value: '320200', label: '无锡市' },
        { value: '320300', label: '徐州市' },
        { value: '320400', label: '常州市' },
        { value: '320500', label: '苏州市' },
        { value: '320600', label: '南通市' },
        { value: '320700', label: '连云港市' },
        { value: '320800', label: '淮安市' },
        { value: '320900', label: '盐城市' },
        { value: '321000', label: '扬州市' },
        { value: '321100', label: '镇江市' },
        { value: '321200', label: '泰州市' },
        { value: '321300', label: '宿迁市' }
      ],
      data: [],
      copydata: [],
      suggestiondata: [
        { level: "低风险", tempLevel: 0, suggestion: {first:"暂无建议~",second:"暂无建议~"} },
        { level: '中等风险', tempLevel: 1, suggestion: { first: '外出活动时注意防暑降温;保证水分充足;保持室内凉爽。', second: '老人:尽量避开高温时段外出，减少户外剧烈活动;保持沟通联系;身体不适时，及时就医。儿童:玩要时，尽可能待在阴凉处;及时补充水分及电解质。孕妇:尽量避开高温时段外出;身体不适时，及时就医。慢性疾病患者:尽量避开高温时段外出，减少户外剧烈活动;准备常用药品，服药需遵医嘱;保持沟通联系。户外工作者:及时补充水分及电解质;注意防暑降温。' } },
        { level: '较高风险', tempLevel: 2, suggestion: { first: '合理安排外出时间，减少户外剧烈活动，注意防暑降温;保证水分充足:保持室内凉爽。', second: '老人:避开高温时段外出，减少户外活动，外出时宜有人陪伴:保持沟通联系:身体不适时，及时就医。儿童:避开高温时段外出;玩要时，待在阴凉处，应有成人陪伴:及时补充水分及电解质。孕妇: 避开高温时段外出; 身体不适时，及时就医。慢性疾病患者:避开高温时段外出，减少户外活动;准备常用药品，服药需遵医嘱;保持沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;合理安排户外作业时间，注意防暑降温:穿戴透气、轻薄的工作服。' } },
        { level: '高风险', tempLevel: 3, suggestion: { first: '合理安排外出时间，减少户外活动，注意防暑降温;保证水分充足;保持室内凉爽。', second: '老人:不宜外出;确需外出时，宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童: 避开高温时段外出, 减少户外活动, 外出时应有成人陪伴; 及时补充水分及电解质; 密切关注中暑症状的发生。孕妇: 避开高温时段外出; 外出时，宜有人陪伴; 身体不适时及时就医。慢性疾病患者: 不宜外出。确需外出时，注意防暑降温; 准备常用药品，服药需遵医嘱; 保持沟通联系; 身体不适时，及时拨打急救电话。户外工作者: 及时补充水分及电解质; 合理安排户外作业时间，减少高温时段户外作业，注意防暑降温; 穿戴透气、轻薄的工作服; 预防职业性中暑。' } },
        { level: '极高风险', tempLevel: 4, suggestion: { first: '不宜外出。确需外出时，注意防暑降温:保证水分充足:保持室内凉爽;身体不适时，及时就医。', second: '老人:不宜外出;外出时宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童:不宜外出;确需外出时，应有成人陪伴;及时补充水分及电解质:密切关注中暑症状的发生。孕妇:不宜外出:确需外出时，宜有人陪伴;身体不适时，及时就医。慢性疾病患者:不宜外出;准备常用药品，服药需遵医嘱:保持沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;避免高温时段户外作业，注意防暑降温;穿戴透气、轻薄的工作服;预防职业性中暑;改善工作环境，注意遮阳、通风。' } }
      ]
    }
  },
  mounted() {
    this.disabledDate();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // 格式化为 YYYY-MM-DD
    this.time = formattedDate;
    this.getlist(0);
  },
  beforeUnmount() { // 组件销毁前清除监听器

  },
  methods: {
    disabledDate(time) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 清除时间部分，只比较日期

      const maxAllowedDate = new Date(today);
      maxAllowedDate.setDate(today.getDate() + 2); // 今天 + 2 天

      // 禁用条件：日期 > 今天 + 2 天
      return time > maxAllowedDate;
    },
    handleDeleteKey() {
      e.preventDefault(); // 阻止默认删除行为
      // 可以添加提示
      console.log('不允许删除日期');
    },
    getFormattedDate(days) {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
      ].join('-');
    },
    getlist() {
      let time = this.getFormattedDate(0)
      axios.get(
        baseURL +
        "/HotData/list?time="
        + time +
        "&level=1"
      )
        .then((response) => {
          this.data = response.data.data;
          axios.get(baseURL + "/api/get-location").then((response) => {
            let Location = response.data.data.city
            for (let i of this.data) {
              if (Location == i.areaName) {
                this.locationobj = i;
              }
            }
            this.$refs.childRef.getMapData(this.city, this.data);
            window.addEventListener('resize', this.$refs.childRef.handleResize);
          })

        })
    },
    search() {
      let url = ''
      if (this.city == 320000) {
        url = baseURL +
          "/HotData/list?time="
          + this.time +
          "&level=1"
      } else {
        url = baseURL +
          "/HotData/list?city_code="
          + this.city +
          "&time=" + this.time + "&level=2"
      }
      axios.get(url).then((response) => {
        this.data = response.data.data;
        this.$refs.childRef.getMapData(this.city, this.data);
        window.addEventListener('resize', this.$refs.childRef.handleResize);
        for (let i of this.options) {
          if (i.value == this.city) {
            console.log(i.label);

            this.areaName = i.label;
          }
        }
      })

    },
    btntime(day) {
      this.time = this.getFormattedDate(day);
      this.search();
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
}

.round {
  width: 2vh;
  height: 2vh;
  border-radius: 50%;

}

::v-deep .el-table th {
  background-color: #e6a23c !important;
  /* 浅绿色背景 */
  color: white !important;
  /* 绿色文字 */
}
</style>
<template>
  <div>
    <hothead />
    <div class="top">
      <el-card style="width: 30%;text-align: left;">
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #6B7280;">当前位置</div>
        <div style="font-family: Roboto;font-weight: 500;color: #000000;font-size: 3vh;margin-top: 0.5vh;">南京市玄武区</div>
        <div style="font-size: 7vh;font-family: Roboto;font-weight: bold;color: #DC2626;">38°C <span
            style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;">最低温度：36°C</span> <span
            style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;">最高温度：40°C</span></div>
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 1vh;">
          发布时间：2025-5-20 6:00</div>
      </el-card>
      <el-card style="width: 68.5%;text-align: left;">
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #6B7280;margin-bottom: 0.5vh;">预警状态
        </div>
        <div style="display: flex;align-items: center;">
          <div class="round" style="  background: #EF4444;"></div>
          <div style="color: #EF4444; font-family: Roboto;font-weight: 500;font-size: 2.5vh;margin-left: 1vh;">极高风险
          </div>
        </div>
        <div style="font-size: 2vh;font-family: Roboto;font-weight: normal;color: #4B5563;margin-top: 0.5vh;">
          健康建议：一般人群:不宜外出。确需外出时，注意防暑降温;保证水分充足;保持室内凉爽;身体不适时，及时就医。重点人群：老人:不宜外出;外出时宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童:不宜外出;确需外出时，应有成人陪伴;及时补充水分及电解质:密切关注中暑症状的发生。孕妇:不宜外出;确需外出时，宜有人陪伴;身体不适时，及时就医。
          慢性疾病患者:不宜外出;准备常用药品，服药需遵医嘱;保持
          沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;避免高温时段户外作业，注意防暑降温;穿戴透气、轻薄的工作服:预防职业性中暑:改善工作环境，注意遮阳、通风。</div>
      </el-card>
    </div>

    <div class="top">
      <div style="width: 45%;">
        <Map />
      </div>
      <el-card style="width: 54%;">
        <!-- <template #header >
          <span style="font-weight: 600;font-size: 3vh;">江苏省高温热浪健康风险预警  2025年05月21日发布</span>
        </template> -->

        <div style="display: flex;justify-content: space-around;">
          <el-button type="warning" @click="" size="large" style="width: 17vh;">今日</el-button>
          <el-button type="warning" @click="" size="large" style="width: 17vh;">明日</el-button>
          <el-button type="warning" @click="" size="large" style="width: 17vh;">后日</el-button>
        </div>

        <div style="font-size: 5vh;font-weight: 500;">江苏省</div>

        <div style="display: flex;justify-content: space-around;margin: auto; margin-top: 1vh;width: 80%;">
          <el-select v-model="city" placeholder="选择地区" clearable style="width: 40%;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model="time" type="date" placeholder="选择日期" style="margin-left: 2vh;"
            :disabled-date="disabledDate" value-format="YYYY-MM-DD" :clearable="false"
            @keydown.delete.prevent="handleDeleteKey" @keydown.backspace.prevent="handleDeleteKey">
          </el-date-picker>
          <el-button type="danger" @click="" style="width: 10vh;">搜索</el-button>
        </div>
        <el-table ref="tableDemo" :data="data" border style="max-width: 100%;margin-top: 1vh;max-height: 50vh;overflow: auto;">
          <el-table-column label="地区" prop='name' align="center" />
          <el-table-column label="平均温度" prop='avgTemp' align="center">
            <template #default="scope">
              {{ scope.row.avgTemp }}°C
            </template>
          </el-table-column>
          <el-table-column label="最低温度" prop='minTemp' align="center">
            <template #default="scope">
              {{ scope.row.minTemp }}°C
            </template>
          </el-table-column>
          <el-table-column label="最高温度" prop='highTemp' align="center">
            <template #default="scope">
              {{ scope.row.highTemp }}°C
            </template>
          </el-table-column>
          <el-table-column label="风险等级" prop='tempLevel' align="center">
            <template #default="scope">
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
      <el-table-column label="颜色" prop="color" align="center" width="200">
        <template #default="scope">
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
export default {
  components: {
    hothead,
    Map
  },
  data() {
    return {
      address: "建邺区",
      city: 'jinagshusheng',
      time: '',
      options: [
        { value: 'jinagshusheng', label: '江苏省' },
        { value: 'nanjing', label: '南京市' },
        { value: 'wuxi', label: '无锡市' },
        { value: 'xuzhou', label: '徐州市' },
        { value: 'changzhou', label: '常州市' },
        { value: 'suzhou', label: '苏州市' },
        { value: 'nantong', label: '南通市' },
        { value: 'lianyungang', label: '连云港市' },
        { value: 'huaian', label: '淮安市' },
        { value: 'yancheng', label: '盐城市' },
        { value: 'yangzhou', label: '扬州市' },
        { value: 'zhenjiang', label: '镇江市' },
        { value: 'taizhou', label: '泰州市' },
        { value: 'suqian', label: '宿迁市' }
      ],
      data: [
        { tempLevel: '1', minTemp: '26', highTemp: '35', avgTemp: '30', name: '南京市' },
        { tempLevel: '2', minTemp: '26', highTemp: '35', avgTemp: '30', name: '无锡市' },
        { tempLevel: '3', minTemp: '26', highTemp: '35', avgTemp: '30', name: '徐州市' },
        { tempLevel: '4', minTemp: '26', highTemp: '35', avgTemp: '30', name: '常州市' },
        { tempLevel: '1', minTemp: '26', highTemp: '35', avgTemp: '30', name: '苏州市' },
        { tempLevel: '2', minTemp: '26', highTemp: '35', avgTemp: '30', name: '南通市' },
        { tempLevel: '3', minTemp: '26', highTemp: '35', avgTemp: '30', name: '连云港市' },
        { tempLevel: '4', minTemp: '26', highTemp: '35', avgTemp: '30', name: '淮安市' },
        { tempLevel: '3', minTemp: '26', highTemp: '35', avgTemp: '30', name: '盐城市' },
        { tempLevel: '1', minTemp: '26', highTemp: '35', avgTemp: '30', name: '扬州市' },
        { tempLevel: '2', minTemp: '26', highTemp: '35', avgTemp: '30', name: '镇江市' },
        { tempLevel: '4', minTemp: '26', highTemp: '35', avgTemp: '30', name: '泰州市' },
        { tempLevel: '2', minTemp: '26', highTemp: '35', avgTemp: '30', name: '宿迁市' }
      ],
      copydata: [],
      suggestiondata: [
        { level: '中等风险', tempLevel: 1, suggestion: { first: '外出活动时注意防暑降温;保证水分充足;保持室内凉爽。', second: '老人:尽量避开高温时段外出，减少户外剧烈活动;保持沟通联系;身体不适时，及时就医。儿童:玩要时，尽可能待在阴凉处;及时补充水分及电解质。孕妇:尽量避开高温时段外出;身体不适时，及时就医。慢性疾病患者:尽量避开高温时段外出，减少户外剧烈活动;准备常用药品，服药需遵医嘱;保持沟通联系。户外工作者:及时补充水分及电解质;注意防暑降温。' } },
        { level: '较高风险', tempLevel: 2, suggestion: { first: '合理安排外出时间，减少户外剧烈活动，注意防暑降温;保证水分充足:保持室内凉爽。', second: '老人:避开高温时段外出，减少户外活动，外出时宜有人陪伴:保持沟通联系:身体不适时，及时就医。儿童:避开高温时段外出;玩要时，待在阴凉处，应有成人陪伴:及时补充水分及电解质。孕妇: 避开高温时段外出; 身体不适时，及时就医。' } },
        { level: '高风险', tempLevel: 3, suggestion: { first: '合理安排外出时间，减少户外活动，注意防暑降温;保证水分充足;保持室内凉爽。', second: '老人:不宜外出;确需外出时，宜有人陪伴;保持沟通联系:身体不适时，及时就医。儿童: 避开高温时段外出, 减少户外活动, 外出时应有成人陪伴: 及时补充水分及电解质: 密切关注中暑症状的发生。孕妇: 避开高温时段外出; 外出时，宜有人陪伴; 身体不适时及时就医。慢性疾病患者: 不宜外出。确需外出时，注意防暑降温; 准备常用药品，服药需遵医嘱; 保持沟通联系; 身体不适时，及时拨打急救电话。户外工作者: 及时补充水分及电解质; 合理安排户外作业时间，减少高温时段户外作业，注意防暑降温; 穿戴透气、轻薄的工作服; 预防职业性中暑。' } },
        { level: '极高风险', tempLevel: 4, suggestion: { first: '不宜外出。确需外出时，注意防暑降温:保证水分充足:保持室内凉爽;身体不适时，及时就医。', second: '老人:不宜外出;外出时宜有人陪伴;保持沟通联系;身体不适时，及时就医。儿童:不宜外出;确需外出时，应有成人陪伴;及时补充水分及电解质:密切关注中暑症状的发生。孕妇:不宜外出:确需外出时，宜有人陪伴;身体不适时，及时就医。慢性疾病患者:不宜外出;准备常用药品，服药需遵医嘱:保持沟通联系;身体不适时，及时拨打急救电话。户外工作者:及时补充水分及电解质;避免高温时段户外作业，注意防暑降温;穿戴透气、轻薄的工作服:预防职业性中暑:改善工作环境，注意遮阳、通风。' } }
      ]
    }
  },
  mounted() {
    this.disabledDate();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // 格式化为 YYYY-MM-DD
    this.time = formattedDate;
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
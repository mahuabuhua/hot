<template>
    <div>
        <div style="position: absolute;z-index: 9999;">
            <el-select v-model="city" placeholder="请选择城市" style="width: 300%;" @change="cityobj">
                <el-option label="全省" value="全省" />
                <el-option v-for="(item, index) in air" :key="item.code" :label="item.name" :value="index">
                </el-option>
            </el-select>
        </div>
        <div id="mainMap">
            <el-card id="mapDiv" style="width:100%; height:70vh;margin: auto;">
            </el-card>
        </div>
    </div>
</template>

<script>

import axios from "axios"
// import jsonData from '@/assets/data.geojson'
export default {
    data() {
        return {
            areacode: ["3201", "3202", "3203", "3204", "3205", "3206", "3207", "3208", "3209", "3210", "3211", "3212", "3213"],
            city: '',
            air: [{
                name: "南京市",
                ename: "nanjing",
                left: "118.796624",
                right: "32.059344",
                code: "3201",
                center: { left: "118.796624", right: "32.059344" },
                bounds: [118.22, 31.14, 119.14, 32.37],
                area: [{
                    name: "玄武区",
                    left: "118.797779",
                    right: "32.048644",
                    code: "320102",
                }, {
                    name: "秦淮区",
                    left: "118.794792",
                    right: "32.039065",
                    code: "320104",
                }, {
                    name: "建邺区",
                    left: "118.731642",
                    right: "32.003343",
                    code: "320105",
                }, {
                    name: "鼓楼区",
                    left: "116.395937",
                    right: "39.940781",
                    code: "320106",
                }, {
                    name: "浦口区",
                    left: "118.627165",
                    right: "32.059796",
                    code: "320111",
                }, {
                    name: "栖霞区",
                    left: "118.909117",
                    right: "32.096423",
                    code: "320113",
                }, {
                    name: "雨花台区",
                    left: "118.779087",
                    right: "31.991291",
                    code: "320114",
                }, {
                    name: "江宁区",
                    left: "118.83951",
                    right: "31.953195",
                    code: "320115",
                }, {
                    name: "六合区",
                    left: "118.822241",
                    right: "32.323235",
                    code: "320116",
                }, {
                    name: "溧水区",
                    left: "119.028414",
                    right: "31.651108",
                    code: "320117",
                }, {
                    name: "高淳区",
                    left: "118.892074",
                    right: "31.328678",
                    code: "320118",
                },]
            },
            {
                name: "无锡市",
                ename: "wuxi",
                left: "120.311889",
                right: "31.491064",
                code: "3202",
                center: { left: "120.311889", right: "31.491064" },
                bounds: [119.51394, 31.10415, 120.60051, 31.99271],
                area: [{
                    name: "锡山区",
                    left: "120.357732",
                    right: "31.589484",
                    code: "320205",
                }, {
                    name: "惠山区",
                    left: "120.29843",
                    right: "31.680282",
                    code: "320206",
                }, {
                    name: "滨湖区",
                    left: "120.284381",
                    right: "31.527846",
                    code: "320211",
                }, {
                    name: "梁溪区",
                    left: "120.303551",
                    right: "31.566226",
                    code: "320213",
                }, {
                    name: "新吴区",
                    left: "120.364303",
                    right: "31.49085",
                    code: "320214",
                }, {
                    name: "江阴市",
                    left: "120.284794",
                    right: "31.921642",
                    code: "320281",
                }, {
                    name: "宜兴市",
                    left: "119.821873",
                    right: "31.338429",
                    code: "320282",
                },]
            },
            {
                name: "徐州市",
                ename: "xuzhou",
                left: "117.283752",
                right: "34.204224",
                code: "3203",
                center: { left: "117.283752", right: "34.204224" },
                bounds: [116.22, 33.43, 118.40, 34.58],
                area: [{
                    name: "鼓楼区",
                    left: "117.185643",
                    right: "34.288736",
                    code: "320302",
                }, {
                    name: "云龙区",
                    left: "117.251515",
                    right: "34.253638",
                    code: "320303",
                }, {
                    name: "贾汪区",
                    left: "117.465137",
                    right: "34.436492",
                    code: "320305",
                }, {
                    name: "泉山区",
                    left: "117.194405",
                    right: "34.22655",
                    code: "320311",
                }, {
                    name: "铜山区",
                    left: "117.194405",
                    right: "34.22655",
                    code: "320312",
                }, {
                    name: "丰县",
                    left: "116.658111",
                    right: "34.697232",
                    code: "320321",
                }, {
                    name: "沛县",
                    left: "116.936353",
                    right: "34.760761",
                    code: "320322",
                }, {
                    name: "睢宁县",
                    left: "117.941364",
                    right: "33.913727",
                    code: "320324",
                }, {
                    name: "新沂市",
                    left: "118.354747",
                    right: "34.369585",
                    code: "320381",
                }, {
                    name: "邳州市",
                    left: "118.012511",
                    right: "34.339208",
                    code: "320382",
                },]

            },
            {
                name: "常州市",
                ename: "changzhou",
                left: "119.974092",
                right: "31.811313",
                code: "3204",
                center: { left: "119.974092", right: "31.811313" },
                bounds: [119.08, 31.09, 120.12, 32.04],
                area: [{
                    name: "天宁区",
                    left: "119.999439",
                    right: "31.79232",
                    code: "320402",
                }, {
                    name: "钟楼区",
                    left: "119.902081",
                    right: "31.802608",
                    code: "320404",
                }, {
                    name: "新北区",
                    left: "119.960925",
                    right: "31.86355",
                    code: "320411",
                }, {
                    name: "武进区",
                    left: "119.942441",
                    right: "31.701252",
                    code: "320412",
                }, {
                    name: "金坛区",
                    left: "119.587503",
                    right: "31.722384",
                    code: "320413",
                }, {
                    name: "溧阳市",
                    left: "119.484164",
                    right: "31.416967",
                    code: "320481",
                },]
            },
            {
                name: "苏州市",
                ename: "suzhou",
                left: "120.585294",
                right: "31.299758",
                code: "3205",
                center: { left: "120.585294", right: "31.299758" },
                bounds: [119.55, 30.47, 121.20, 32.02],
                area: [{
                    name: "虎丘区",
                    left: "120.434238",
                    right: "31.329601",
                    code: "320505",
                }, {
                    name: "吴中区",
                    left: "120.632094",
                    right: "31.263604",
                    code: "320506",
                }, {
                    name: "相城区",
                    left: "120.642391",
                    right: "31.369189",
                    code: "320507",
                }, {
                    name: "姑苏区",
                    left: "120.617367",
                    right: "31.335648",
                    code: "320508",
                }, {
                    name: "吴江区",
                    left: "120.645728",
                    right: "31.138525",
                    code: "320509",
                }, {
                    name: "苏州工业园区",
                    left: "120.723343",
                    right: "31.324036",
                    code: "320571",
                }, {
                    name: "常熟市",
                    left: "120.752512",
                    right: "31.656016",
                    code: "320581",
                }, {
                    name: "张家港市",
                    left: "120.555979",
                    right: "31.876739",
                    code: "320582",
                }, {
                    name: "昆山市",
                    left: "120.980795",
                    right: "31.385476",
                    code: "320583",
                }, {
                    name: "太仓市",
                    left: "121.130344",
                    right: "31.458043",
                    code: "320585",
                },]
            },
            {
                name: "南通市",
                ename: "nantong",
                left: "120.894522",
                right: "31.981269",
                code: "3206",
                center: { left: "120.894522", right: "31.981269" },
                bounds: [120.1147, 31.4106, 121.5433, 32.4244],
                area: [
                    {
                        name: "崇川区",
                        left: "120.994364",
                        right: "31.854288",
                        code: "320613",
                    },
                    {
                        name: "南通市",
                        left: "120.813678",
                        right: "32.032427",
                        code: "320611",
                    },
                    {
                        name: "通州区",
                        left: "121.073742",
                        right: "32.065972",
                        code: "320612",
                    },
                    {
                        name: "启东市",
                        left: "121.65523",
                        right: "31.792831",
                        code: "320681",
                    },
                    {
                        name: "如皋市",
                        left: "120.574028",
                        right: "32.371493",
                        code: "320682",
                    },
                    {
                        name: "海门区",
                        left: "121.182016",
                        right: "31.869418",
                        code: "320614",
                    },
                    {
                        name: "海安市",
                        left: "120.46779",
                        right: "32.532853",
                        code: "320685",
                    },
                ]
            },
            {
                name: "连云港市",
                ename: "lianyungang",
                left: "119.221487",
                right: "34.596639",
                code: "3207",
                center: { left: "119.221487", right: "34.596639" },
                bounds: [118.2403, 33.5855, 119.5451, 35.0830],
                area: [
                    {
                        name: "连云区",
                        left: "119.338901",
                        right: "34.760317",
                        code: "320703",
                    },
                    {
                        name: "海州区",
                        left: "119.163492",
                        right: "34.572506",
                        code: "320706",
                    },
                    {
                        name: "赣榆区",
                        left: "119.173173",
                        right: "34.841336",
                        code: "320707",
                    },
                    {
                        name: "东海县",
                        left: "118.752869",
                        right: "34.542194",
                        code: "320722",
                    },
                    {
                        name: "灌云县",
                        left: "119.239426",
                        right: "34.284074",
                        code: "320723",
                    },
                    {
                        name: "灌南县",
                        left: "119.315583",
                        right: "34.087251",
                        code: "320724",
                    },
                ]
            },
            {
                name: "淮安市",
                ename: "huaian",
                left: "119.113166",
                right: "33.551495",
                code: "3208",
                center: { left: "119.113166", right: "33.551495" },
                bounds: [118.1200, 32.4300, 119.3630, 34.0600],
                area: [
                    {
                        name: "淮安区",
                        left: "119.141183",
                        right: "33.50296",
                        code: "320803",
                    },
                    {
                        name: "淮阴区",
                        left: "119.034895",
                        right: "33.632588",
                        code: "320804",
                    },
                    {
                        name: "清江浦区",
                        left: "119.026662",
                        right: "33.552579",
                        code: "320812",
                    },
                    {
                        name: "洪泽区",
                        left: "118.873132",
                        right: "33.294095",
                        code: "320813",
                    },
                    {
                        name: "涟水县",
                        left: "119.260589",
                        right: "33.781648",
                        code: "320826",
                    },
                    {
                        name: "盱眙县",
                        left: "118.544545",
                        right: "33.011905",
                        code: "320830",
                    },
                    {
                        name: "金湖县",
                        left: "119.020432",
                        right: "33.024663",
                        code: "320831",
                    },
                ]
            },
            {
                name: "盐城市",
                ename: "yancheng",
                left: "120.16263",
                right: "33.348176",
                code: "3209",
                center: { left: "120.16263", right: "33.348176" },
                bounds: [119.27, 32.34, 120.54, 34.28],
                area: [
                    {
                        name: "亭湖区",
                        left: "120.196148",
                        right: "33.391414",
                        code: "320902",
                    },
                    {
                        name: "盐都区",
                        left: "120.153567",
                        right: "33.338538",
                        code: "320903",
                    },
                    {
                        name: "大丰区",
                        left: "120.500761",
                        right: "33.200047",
                        code: "320904",
                    },
                    {
                        name: "响水县",
                        left: "119.578332",
                        right: "34.199172",
                        code: "320921",
                    },
                    {
                        name: "滨海县",
                        left: "119.820713",
                        right: "33.990372",
                        code: "320922",
                    },
                    {
                        name: "阜宁县",
                        left: "119.802271",
                        right: "33.758857",
                        code: "320923",
                    },
                    {
                        name: "射阳县",
                        left: "120.326338",
                        right: "33.766277",
                        code: "320924",
                    },
                    {
                        name: "建湖县",
                        left: "119.788743",
                        right: "33.438931",
                        code: "320925",
                    },
                    {
                        name: "东台市",
                        left: "120.320308",
                        right: "32.867845",
                        code: "320981",
                    },
                ]
            },

            {
                name: "扬州市",
                ename: "yangzhou",
                left: "119.412834",
                right: "32.394404",
                code: "3210",
                center: { left: "119.412834", right: "32.394404" },
                bounds: [119.01, 32.15, 119.54, 33.25],
                area: [
                    {
                        name: "广陵区",
                        left: "119.431785",
                        right: "32.395654",
                        code: "321002",
                    }, {
                        name: "邗江区",
                        left: "119.397935",
                        right: "32.37741",
                        code: "321003",
                    }, {
                        name: "江都区",
                        left: "119.569684",
                        right: "32.43571",
                        code: "321012",
                    }, {
                        name: "宝应县",
                        left: "119.358389",
                        right: "33.241125",
                        code: "321023",
                    }, {
                        name: "仪征市",
                        left: "119.184468",
                        right: "32.272833",
                        code: "321081",
                    }, {
                        name: "高邮市",
                        left: "119.45892",
                        right: "32.781606",
                        code: "321084",
                    },

                ]
            },
            {
                name: "镇江市",
                ename: "zhenjiang",
                left: "119.424441",
                right: "32.188141",
                code: "3211",
                center: { left: "119.424441", right: "32.188141" },
                bounds: [118.58, 31.37, 119.58, 32.19],
                area: [
                    {
                        name: "京口区",
                        left: "119.470186",
                        right: "32.198285",
                        code: "321102",
                    }, {
                        name: "润州区",
                        left: "119.411383",
                        right: "32.195146",
                        code: "321111",
                    }, {
                        name: "丹徒区",
                        left: "119.433854",
                        right: "32.132118",
                        code: "321112",
                    }, {
                        name: "丹阳市",
                        left: "119.606071",
                        right: "32.010035",
                        code: "321181",
                    }, {
                        name: "扬中市",
                        left: "119.796816",
                        right: "32.236476",
                        code: "321182",
                    }, {
                        name: "句容市",
                        left: "119.168693",
                        right: "31.945732",
                        code: "321183",
                    },
                ]
            },
            {
                name: "泰州市",
                ename: "taizhou",
                left: "119.922883",
                right: "32.456692",
                code: "3212",
                center: { left: "119.924622", right: "32.455809" },
                bounds: [119.3824, 32.0157, 120.3220, 33.1059],
                area: [
                    {
                        name: "海陵区",
                        left: "119.923825",
                        right: "32.49248",
                        code: "321202",
                    }, {
                        name: "高港区",
                        left: "119.88154",
                        right: "32.31923",
                        code: "321203",
                    }, {
                        name: "姜堰区",
                        left: "120.12807",
                        right: "32.51029",
                        code: "321204",
                    }, {
                        name: "兴化市",
                        left: "119.85255",
                        right: "32.911952",
                        code: "321281",
                    }, {
                        name: "靖江市",
                        left: "120.277124",
                        right: "31.98325",
                        code: "321282",
                    },
                    {
                        name: "泰兴市",
                        left: "120.051475",
                        right: "32.173072",
                        code: "321283",
                    },
                ]
            },
            {
                name: "宿迁市",
                ename: "suqian",
                left: "118.275228",
                right: "33.963186",
                code: "3213",
                center: { left: "118.275228", right: "33.963186" },
                bounds: [117.619, 33.1217, 119.1250, 34.2438],
                area: [
                    {
                        name: "宿城区",
                        left: "118.242048",
                        right: "33.963891",
                        code: "321302",
                    }, {
                        name: "宿豫区",
                        left: "118.330423",
                        right: "33.94813",
                        code: "321311",
                    }, {
                        name: "沭阳县",
                        left: "118.804321",
                        right: "34.110642",
                        code: "321322",
                    }, {
                        name: "泗阳县",
                        left: "118.703636",
                        right: "33.723576",
                        code: "321323",
                    }, {
                        name: "泗洪县",
                        left: "118.223941",
                        right: "33.476575",
                        code: "321324",
                    },
                ]
            }

            ],
            intervalId: null,
            jiangsuurl: "https://geo.datav.aliyun.com/areas_v3/bound/320000_full.json",
            Maplist: null
        }
    },
    async mounted() {
        axios.get(baseURL + '/api/get-location',).then((response) => {
            if (response.data.lon) {
                axios.get('https://api.tianditu.gov.cn/geocoder', {
                    params: {
                        tk: "f81f3e41ea1066126db34240109023d1",
                        type: "geocode",
                        postStr: "{'lon':" + response.data.lon + ",'lat':" + response.data.lat + ",'ver':1}"
                    }
                }).then((res) => {
                    for (let i in this.air) {
                        if (this.air[i].name == res.data.result.addressComponent.city) {
                            this.city = i * 1;
                            this.cityobj();
                            return;
                        }
                    }
                })
            } else {
                this.areaobj();
            }

        })
        // await this.areaobj();
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
            const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1并补0  
            const day = String(yesterday.getDate()).padStart(2, '0'); // 补0  

            const formattedYesterday = `${year}-${month}-${day}`;
            return formattedYesterday;
        },
        cityobj() {
            if (this.city == "全省") {
                // 直接将节点给删掉
                const parentEl = document.getElementById('mainMap');
                const cahildrenEl = document.getElementById('mapDiv');
                if (cahildrenEl) parentEl.removeChild(cahildrenEl);
                // 然后再手动将节点加进来
                const newCahildrenEl = document.createElement("div");
                newCahildrenEl.id = 'mapDiv'
                newCahildrenEl.style = 'width:100%; height:70vh;margin: auto;'
                parentEl.appendChild(newCahildrenEl);

                this.$store.commit('setAreaname', "江苏省");
                let arr = sessionStorage.getItem("areaarr")
                sessionStorage.setItem('arr', arr)
                this.areaobj();
                this.$emit('callParentFunction');
                return;
            }
            this.$store.commit('setAreaname', this.air[this.city].name);
            sessionStorage.removeItem("arr")
            // this.$store.commit('setLoading', true);
            // 获取当前时间
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            this.time = `${hours}:${minutes}:${seconds}`;

            // 获取年、月、日  
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            // 格式化月份和日期
            month = month.toString().padStart(2, '0');
            day = day.toString().padStart(2, '0');

            // 将它们组合成一个字符串并输出  
            let date = `${year}-${month}-${day}`;
            // 用户名称和密码  
            // const username = 'cold_wave_warning';
            // const password = 'cold_wave_warning_2022';
            let that = this;
            // 将用户名和密码编码为 Base64  
            // const auth = `Basic ${btoa(`${username}:${password}`)}`;
            let arr = JSON.parse(JSON.stringify(that.air[that.city].area));

            // 存储所有的 Promise
            const promises = [];
            //  for (let i of this.air[this.city].area) {
            //     promises.push(axios.post('https://cdc-iehs.itrialedc.cn/api/cma_external/cww_warning_daily/', {
            //         date: date,
            //         area_code: i.code
            //     }, {
            //         headers: {
            //             'Authorization': auth,
            //             'Content-Type': 'application/json'
            //         }
            //     }).then((response) => {
            //         let res = response.data.result.data[0];
            //         for (let i of arr) {
            //             if (i.name === res.area_name) {
            //                 i.min_temp = res.min_temp;
            //                 i.type = res.temp_level;
            //                 if (res.min_temp == "") {
            //                     i.min_temp = "暂无";
            //                     i.type = -1;
            //                 }
            //                 break;
            //             }
            //         }
            //     }));
            // }
            promises.push(axios.get(baseURL + '/CwwData/list?time=' + date + "&city_code=" + this.air[this.city].code,).then((response) => {
                let res = response.data.data;
                if (res.length == 0) {
                    axios.get(baseURL + '/CwwData/list?time=' + this.last() + "&city_code=" + this.air[this.city].code,).then((response) => {
                        let obj = response.data.data;
                        for (let i of arr) {
                            for (let j of obj) {
                                if (i.name === j.areaName) {
                                    i.min_temp = j.minTemp;
                                    i.type = j.tempLevel;
                                    i.time = j.time;
                                    if (j.tempLevel == "" || !j.tempLevel) {
                                        i.min_temp = "暂无";
                                        i.type = -1;
                                    }
                                }
                            }
                        }
                        for (let z of arr) {
                            console.log(z.min_temp == undefined);
                            if (z.min_temp == undefined) {
                                z.min_temp = "暂无";
                                z.type = -1;
                            }

                        }
                    })
                } else {
                    for (let i of arr) {
                        for (let j of res) {
                            console.log(i.name, j.areaName);

                            if (i.name === j.areaName) {
                                i.min_temp = j.minTemp;
                                i.type = j.tempLevel;
                                i.time = j.time;
                                if (j.tempLevel == "") {
                                    i.min_temp = "暂无";
                                    i.type = -1;
                                }
                            }
                        }
                    }

                    for (let z of arr) {
                        console.log(z.min_temp == undefined);
                        if (z.min_temp == undefined) {
                            z.min_temp = "暂无";
                            z.type = -1;
                        }

                    }
                }
            }));
            // 使用 Promise.all 等待所有请求完成
            Promise.all(promises).then(() => {
                setTimeout(() => {
                    sessionStorage.setItem("arr", JSON.stringify(arr));
                    this.$store.commit('setLoading', false);
                    this.$store.commit('setRes', arr);
                    this.$emit('callParentFunction');
                    this.destructionTMap(arr)
                }, 500);
            });

        },
        destructionTMap(arr) {
            // 直接将节点给删掉
            const parentEl = document.getElementById('mainMap');
            const cahildrenEl = document.getElementById('mapDiv');
            if (cahildrenEl) parentEl.removeChild(cahildrenEl);
            // 然后再手动将节点加进来
            const newCahildrenEl = document.createElement("div");
            newCahildrenEl.id = 'mapDiv'
            newCahildrenEl.style = 'width:100%; height:70vh;margin: auto;'
            parentEl.appendChild(newCahildrenEl);
            this.Maplist = null;
            this.selectcity(arr)
        },
        selectcity(arr) {
            let result = this.air[this.city];
            var map, zoom = 9;

            //初始化地图对象
            map = new T.Map("mapDiv");
            this.Maplist = map;
            //设置显示地图的中心点和级别
            map.centerAndZoom(new T.LngLat(result.center.left, result.center.right), zoom);
            // // 设置最小缩放
            map.setMinZoom(8);
            //创建缩放平移控件对象
            let control = new T.Control.Zoom();
            let controlPosition = T_ANCHOR_TOP_RIGHT;
            control.setPosition(controlPosition);
            //添加缩放平移控件
            map.addControl(control);

            //创建比例尺控件对象
            var scale = new T.Control.Scale();
            //添加比例尺控件
            scale.setPosition(T_ANCHOR_BOTTOM_RIGHT);
            map.addControl(scale);

            // var bounds = result.bounds;
            // map.setMaxBounds(new T.LngLatBounds(new T.LngLat(bounds[0], bounds[1]), new T.LngLat(bounds[2], bounds[3])));

            // this.intervalId = setInterval(() => {
            // if (sessionStorage.getItem("arr")) {
            for (var i = 0; i < arr.length; i++) {
                //创建图片对象
                var icon = new T.Icon({
                    iconUrl: "",
                    iconSize: new T.Point(40, 40),
                    iconAnchor: new T.Point(10, 25)
                });
                if (arr[i].type == -1) {
                    icon = new T.Icon({
                        iconUrl: require("@/assets/wendu.png"),
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    })
                } else if (arr[i].type == 0) {
                    icon = new T.Icon({
                        iconUrl: require("@/assets/guanzhu.png"),
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    })
                } else if (arr[i].type == 1) {
                    icon = new T.Icon({
                        iconUrl: require("@/assets/yujing1.png"),
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    })
                } else if (arr[i].type == 2) {
                    icon = new T.Icon({
                        iconUrl: require("@/assets/yujing2.png"),
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    })
                } else if (arr[i].type == 3) {
                    icon = new T.Icon({
                        iconUrl: require("@/assets/yujing3.png"),
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    })
                }
                //向地图上添加自定义标注
                var marker = new T.Marker(new T.LngLat(arr[i].left, arr[i].right), { icon: icon });

                this.addMouseoverHandler(marker, map, arr[i]);
                map.addOverLay(marker);
            }
            // }



            map.enableScrollWheelZoom()
            let name = this.air[this.city].ename
            let url = '/GeoJson/' + name + '.geojson'
            console.log(name);

            // 获取行政区划边界信息
            axios.get(globalConfig.backend.protocol + "://" + window.location.host + (globalConfig.backend.path == '' ? '' : '/' + globalConfig.backend.path) + url).then(res => {
                var countries = res.data.features
                var sc = countries.find(item => item.properties.name == result.name)
                var bounds = sc.geometry.coordinates[0][0]
                if (name == "changzhou") {
                    bounds = sc.geometry.coordinates[1][0]
                } else if (name == "lianyungang") {
                    bounds = sc.geometry.coordinates[5][0]
                }

                this.drawLine(bounds, map)
            })

        },
        maplogin(arr) {
            var map, zoom = 1;

            //初始化地图对象
            map = new T.Map("mapDiv");

            this.Maplist = map;

            //设置显示地图的中心点和级别
            map.centerAndZoom(new T.LngLat(119.49872, 32.97117), zoom);
            // // 设置最小缩放
            map.setMinZoom(7);
            //创建缩放平移控件对象
            let control = new T.Control.Zoom();
            let controlPosition = T_ANCHOR_TOP_RIGHT;
            control.setPosition(controlPosition);
            //添加缩放平移控件
            map.addControl(control);

            //创建比例尺控件对象
            var scale = new T.Control.Scale();
            //添加比例尺控件
            scale.setPosition(T_ANCHOR_BOTTOM_RIGHT);
            map.addControl(scale);
            var bounds = [116.355183, 30.76028, 121.927472, 35.127197]
            map.setMaxBounds(new T.LngLatBounds(new T.LngLat(bounds[0], bounds[1]), new T.LngLat(bounds[2], bounds[3])));

            // this.intervalId = setInterval(() => {
            console.log(sessionStorage.getItem("arr") + "-------------------------");

            if (sessionStorage.getItem("arr")) {
                for (var i = 0; i < arr.length; i++) {

                    //创建图片对象
                    var icon = new T.Icon({
                        iconUrl: "",
                        iconSize: new T.Point(40, 40),
                        iconAnchor: new T.Point(10, 25)
                    });
                    console.log(arr[i].type);
                    if (arr[i].type == -1) {
                        icon = new T.Icon({
                            iconUrl: require("@/assets/wendu.png"),
                            iconSize: new T.Point(40, 40),
                            iconAnchor: new T.Point(10, 25)
                        })
                    } else if (arr[i].type == 0) {
                        icon = new T.Icon({
                            iconUrl: require("@/assets/guanzhu.png"),
                            iconSize: new T.Point(40, 40),
                            iconAnchor: new T.Point(10, 25)
                        })
                    } else if (arr[i].type == 1) {
                        icon = new T.Icon({
                            iconUrl: require("@/assets/yujing1.png"),
                            iconSize: new T.Point(40, 40),
                            iconAnchor: new T.Point(10, 25)
                        })
                    } else if (arr[i].type == 2) {
                        icon = new T.Icon({
                            iconUrl: require("@/assets/yujing2.png"),
                            iconSize: new T.Point(40, 40),
                            iconAnchor: new T.Point(10, 25)
                        })
                    } else if (arr[i].type == 3) {
                        icon = new T.Icon({
                            iconUrl: require("@/assets/yujing3.png"),
                            iconSize: new T.Point(40, 40),
                            iconAnchor: new T.Point(10, 25)
                        })
                    }
                    //向地图上添加自定义标注
                    var marker = new T.Marker(new T.LngLat(arr[i].left, arr[i].right), { icon: icon });

                    this.addMouseoverHandler(marker, map, arr[i]);
                    map.addOverLay(marker);
                }
                // clearInterval(this.intervalId);
            }
            // }, 500)


            map.enableScrollWheelZoom()
            // 获取行政区划边界信息
            // this.$axios.get('https://geo.datav.aliyun.com/areas_v3/bound/320000.json').then(res => {
            console.log(window.location.host);
            axios.get(globalConfig.backend.protocol + "://" + window.location.host + (globalConfig.backend.path == '' ? '' : '/' + globalConfig.backend.path) + '/GeoJson/data.geojson').then(res => {
                var countries = res.data.features
                var sc = countries.find(item => item.properties.name == '江苏省')
                var bounds = sc.geometry.coordinates[5][0];
                this.drawLine(bounds, map);
                this.$store.commit('setLoading', false);
            })
        },
        areaobj() {
            this.maplogin(JSON.parse(sessionStorage.getItem("arr")));
            // setTimeout(() => {this.maplogin(JSON.parse(sessionStorage.getItem("arr")));},500)
        },
        drawLine(lines, map) {
            // 绘制边界线
            let style = {
                color: 'blue',
                weight: 3,
                opacity: 1,
                lineStyle: 'dashed', // 实线;dashed虚线
                fillColor: 'blue',
                fillOpacity: 0.1// 透明度
            }
            let points = []
            lines.forEach(line => { // lines是边界经纬度组成的数组
                var point = new T.LngLat(line[0], line[1])
                points.push(point)
            })
            // console.log(points)
            var poly = new T.Polygon(points, style)
            map.addOverLay(poly)
        },
        addMouseoverHandler(marker, map, air) {
            marker.addEventListener("mouseover", function (e) {
                var point = e.lnglat;
                // 创建信息窗口对象
                var markerInfoWin = new T.InfoWindow()
                var sContent =
                    `
				<div  style="height: auto; ">
                    <div>${air.name} (${air.time})</div>
                   <div>预警等级:<span >无</span></div>
                   <div>当日最低气温:${air.min_temp}°c</div>
                   <div>建议:关注低温寒潮健康风险，注意添衣保暖</div>
				</div>
				`;
                if (air.type == 0) {
                    sContent =
                        `
				<div  style="height: auto; ">
                    <div>${air.name} (${air.time})</div>
                   <div>预警等级:<span style="color:blue">关注</span></div>
                   <div>当日最低气温:${air.min_temp}°c</div>
                   <div>建议:关注低温寒潮健康风险，注意添衣保暖</div>
				</div>
				`;
                } else if (air.type == 1) {
                    sContent =
                        `
				   <div  style="height: auto; ">
                       <div>${air.name} (${air.time})</div>
                   <div>预警等级:<span style="color:yellow">黄色预警</span></div>
                   <div>当日最低气温:${air.min_temp}°c</div>
                   <div>建议:适时采取室内供暖措施；外出或户外活动注意添衣保暖。儿童、老年人、心肺疾病患者尽量减少在户外活动时间</div>
				   </div>
				`;
                } else if (air.type == 2) {
                    sContent =
                        `
				   <div  style="height: auto; ">
                       <div>${air.name} (${air.time})</div>
                   <div>预警等级:<span style="color:orange">橙色预警</span></div>
                   <div>当日最低气温:${air.min_temp}°c</div>
                   <div>建议:采取室内供暖措施；尽量避免长时间和激烈的户外工作和活动，儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖；保持通讯畅通，如有不适请及时就医。</div>
				   </div>
				`;
                } else if (air.type == 3) {
                    sContent =
                        `
				   <div  style="height: auto; ">
                       <div>${air.name} (${air.time})</div>
                   <div>预警等级:<span style="color:red">红色预警</span></div>
                   <div>当日最低气温:${air.min_temp}°c</div>
                   <div>建议:加强室内供暖措施；避免长时间和激烈的户外和工作，儿童、老年人、心肺疾病患者非必要不外出；外出注意防寒保暖、热餐热饮；保持通讯畅通，如有不适及时就医。</div>
				   </div>
				`;
                }
                //设置信息窗口要显示的内容
                markerInfoWin.setContent(sContent);
                //setOffset设置信息浮窗显示时向右下角偏移量（像素）。-30则代表向上偏移
                markerInfoWin.setOffset(new T.Point(0, -10))
                //开启信息窗口
                map.openInfoWindow(markerInfoWin, point);
            }
            );

            marker.addEventListener('mouseout', function () {
                map.closeInfoWindow();
            })
        },

    },
}
</script>

<style lang="scss" scoped>
::v-deep .tdt-infowindow-content-wrapper,
.tdt-infowindow-tip {
    border-radius: 2vh;
}

::v-deep .el-select__wrapper {
    background: #2C2582;
}

::v-deep .el-select__placeholder {
    color: white;
}

::v-deep .el-select__placeholder.is-transparent {
    color: white;
}
</style>
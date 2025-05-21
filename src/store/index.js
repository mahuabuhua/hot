import { createStore } from 'vuex'

export default createStore({
  state: {
    Loading: true,
    res: [],
    areaname: '江苏省',
    arr: [],
    code: '320000',
    btn: '',
    chooseareaname: "",
    oldcode:""
  },
  getters: {
  },
  mutations: {
    setLoading(state, isLoading) {  
      state.Loading = isLoading;  
    },
    setRes(state, res) {  
      state.res = res;  
    },
    setAreaname(state, res) {  
      state.areaname = res;  
    },
    setarr(state, arr) {  
      state.arr = arr;  
    },
    setCode(state, code) {  
      state.code = code;  
    },
    setOldCode(state, oldcode) {  
      state.oldcode = oldcode;  
    },
    setbtn(state, btn) {  
      state.btn = btn;  
    },
    setchooseareaname(state, chooseareaname) {  
      state.chooseareaname = chooseareaname;  
    }
  },
  actions: {
  },
  modules: {
  }
})

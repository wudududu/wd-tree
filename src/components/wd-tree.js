import wdTree from '../components/wd-tree.vue'
// const wdTree = Vue.component('wd-tree', {
//   name: 'wd-tree',
//   render: function (createElement) {
//     return createElement('p', ['ahah'])
//   }
// })
const init = {
  install: function (Vue) { // Vue.use()
    Vue.component('wdTree', wdTree)
  }
}

export default init

import Vue from 'vue'

const wdTree = Vue.component('wd-tree', {
  name: 'wd-tree',
  render: function (createElement) {
    return createElement('p', ['ahah'])
  }
})

export default wdTree

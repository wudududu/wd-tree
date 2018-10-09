<template>
  <div id="app">
    <wd-tree :treeNodes="treeNodes"
      :checkBox="true"/>
    <button @click="addNodes">click me</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
// import wdTree from './components/wd-tree.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    // wdTree
  },
  data() {
    return {
      treeNodes: [
        {
          name: 'node1',
          nodeType: 'parent',
          childs: [{name: 'node1-1', nodeType: 'child'}, {name: 'node1-2', nodeType: 'parent', childs: [{name: 'node1-2-1', nodeType: 'child'},
          {name: 'node1-2-2', nodeType: 'child'}]}]
        },
        {
          name: 'node2',
          nodeType: 'child'
        }
      ]
    }
  },
  methods: {
    addNodes() {
      let parentNode = {
        name: 'newParent',
        nodeType: 'parent',
        childs: new Array(10000)
      }
      let childNode = {
        name: 'newChild',
        nodeType: 'child'
      }
      parentNode.childs.fill(childNode)
      this.treeNodes.push(parentNode)
    }
  }
}
</script>

<style>
</style>

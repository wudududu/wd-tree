<template>
  <div id="app">
    <wd-tree :treeNodes="treeNodes" />
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
          childs: [{name: 'node1-1', nodeType: 'child'}, {name: 'node1-2', nodeType: 'parent', childs: [{name: 'node1-2-1', nodeType: 'child'}]}]
        },
        {
          name: 'node2',
          nodeType: 'child'
        }
      ]
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="tree-container">
    <ul class="root-ul">

    </ul>
  </div>
</template>

<script>
export default {
  name: 'wd-tree',
  props: {
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
  },
  data () {
    return {

    }
  }
}
</script>

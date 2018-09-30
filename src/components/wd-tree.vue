<template>
  <div class="tree-container">
    <ul class="root-ul">
      <li v-for="item in treeNodes"
        :key="item.name"
        :class="{li_parent: item.nodeType !== 'parent'}">
        <img v-if="item.nodeType == 'parent'"
          src="../../static/arr_right.png"
          @click="opclTree($event.target)" />
        {{ item.name }}
        <wd-tree :treeNodes="item.childs" style="display: none"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'wd-tree',
  props: {
    treeNodes: {type: Array},
    checkBox: {type: Boolean}
  },
  data () {
    return {
      nodeStatus: {
        openChild: false // 子节点展开与否
      }
    }
  },
  methods: {
    /** 控制节点打开与关闭状态 */
    opclTree(target) {

    }
  }
}
</script>
<style lang="scss" scoped>
  $base_padding:16px;
  ul {
    padding: 0px 0px 0px $base_padding;
    margin: 0px
  }
  li {
    list-style: none;
  }
  li img {
    width: $base_padding;
    height: $base_padding;
    float: left;
  }
  .li_parent {
    padding-left: $base_padding
  }
</style>

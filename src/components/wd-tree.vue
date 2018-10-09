<template>
  <!-- <div class="tree-container"> -->
    <ul class="root-ul">
      <li v-for="item in treeNodes"
        :class="[item.nodeType !== 'parent' ? 'li_parent' : 'li_leaf']">
        <img v-if="item.nodeType == 'parent'"
          src="../../static/arr_right.png"
          @click="opclTree($event.target)" />
        {{ item.name }}
        <wd-tree :treeNodes="item.childs" style="display: none; height: auto; overflow: hidden;"/>
      </li>
    </ul>
  <!-- </div> -->
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
      target.style.transform = target.style.transform == 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)'
      target = target.parentNode.childNodes[2]
      // target.style.height = (target.offsetHeight == 0 ? '50px' : '0px')
      if (target.style.display == 'none') {
        target.style.display = 'block'
        let height = target.scrollHeight
        target.style.height = '0px'
        this.$nextTick(function() {
          target.style.height = height + 'px'
        })

      } else {
        if (target.heightStatus && target.style.height == '0px') {
          let height = target.heightStatus
          target.style.height = height + 'px'
          // 递归设置父容器的height方式

        } else {
          // 修复点击过快的bug,使用scrollHeight代替offsetHeight
          target.heightStatus = target.scrollHeight // 保存高度状态
          // 修复展开子节点，父节点的动画失效
          target.style.height = target.scrollHeight + 'px'
          // target.style.height = 'auto'
          this.$nextTick(function() {
            target.style.height = '0px'
          })

        }
      }
      this.changeHeight(target)
    },
    /** 递归改变父元素的height */
    changeHeight(target) {
      if (target.parentNode) {
        if(target.parentNode.className == 'li_parent' || target.parentNode.className == 'li_leaf' || target.parentNode.className == 'root-ul') {
          target.parentNode.style.height = 'auto'
          this.changeHeight(target.parentNode)
        }
      }
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
    // vertical-align: middle;
    float: left;
    transition: all 0.5s ease
  }
  .li_parent {
    padding-left: $base_padding
  }
  // 展开与关闭动画设置
  .root-ul {
    height: auto;
    transition: all 1s ease;
    -webkit-transition: all 0.5s ease
  }
</style>

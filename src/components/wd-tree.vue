<template>
  <!-- <div class="tree-container"> -->
    <ul class="root-ul">
      <li v-for="item in treeNodes"
        :class="[item.nodeType !== 'parent' ? 'li_leaf' : 'li_parent']">
        <img v-if="item.nodeType == 'parent'"
          src="../../static/arr_right.png"
          @click="opclTree($event.target)" />
        <i v-if="checkBox" class="check_box" @click="checkCheck($event.target)"></i>
        {{ item.name }}
        <wd-tree :treeNodes="item.childs"
         :checkBox="checkBox"
         style="display: none; height: auto; overflow: hidden;"/>
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
      target = target.parentNode.getElementsByClassName('root-ul')[0]
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
      this.setParentHeight(target)
    },
    /** 递归改变父元素的height */
    setParentHeight(target) {
      if (target.parentNode) {
        if(target.parentNode.className == 'li_parent' || target.parentNode.className == 'li_leaf' || target.parentNode.className == 'root-ul') {
          target.parentNode.style.height = 'auto'
          this.setParentHeight(target.parentNode)
        }
      }
    },
    /** 递归遍历子元素 */
    getChilds(target, checkStatus) {
      let uls = target.getElementsByTagName('ul')[0]
      target.getElementsByClassName('check_box')[0].innerText = checkStatus
      let lis = uls.getElementsByTagName('li')
      for (let i = 0; i < lis.length; i++) {
        if (lis[i].className == 'li_parent') {
          this.getChilds(lis[i], checkStatus)
        } else {
          lis[i].getElementsByClassName('check_box')[0].innerText = checkStatus
        }
      }
    },
    /** 递归设置父元素的check状态 */
    setParentCheck(target, checkStatus) {
      let newTarget = target.parentNode.parentNode
      if (newTarget) {
        if (newTarget.className == 'li_parent') {
          if (checkStatus == '#') {
            newTarget.getElementsByClassName('check_box')[0].innerText = '#'
            this.setParentCheck(newTarget, '#')
            return true
          }
          let lis = target.parentNode.children
          // console.log(target.parentNode.children)
          // console.log(target.parentNode)
          // console.log(lis)
          for (let i = 0; i < lis.length; i++) {
            if (checkStatus == '√') {
              // console.log(lis[i].getElementsByClassName('check_box')[0].innerText)
              if (lis[i].getElementsByClassName('check_box')[0].innerText == '' || lis[i].getElementsByClassName('check_box')[0].innerText == '#') { // 如果有子节点为勾选状态为‘’或‘#’
                newTarget.getElementsByClassName('check_box')[0].innerText = '#'
                this.setParentCheck(newTarget, '#')
                return true
              }
            } else if (checkStatus == '') {
              if (lis[i].getElementsByClassName('check_box')[0].innerText == '√' || lis[i].getElementsByClassName('check_box')[0].innerText == '#') {
                newTarget.getElementsByClassName('check_box')[0].innerText = '#'
                this.setParentCheck(newTarget, '#')
                return true
              }
            }
          }
          newTarget.getElementsByClassName('check_box')[0].innerText = checkStatus
          this.setParentCheck(newTarget, checkStatus)
        }
      }
    },
    /** 勾选事件 */
    checkCheck(target) {
      /** 改变勾选框状态 */
      console.log(target.parentNode)
      let checkStatus = target.innerText == '√' ? '' : '√'
      // 判断是否是父节点
      if (target.parentNode.className == 'li_parent') {
        // 向下遍历所有子节点
        this.getChilds(target.parentNode, checkStatus)
      } else {
        target.innerText = checkStatus
      }
      // 向上遍历父节点
      this.setParentCheck(target.parentNode, checkStatus)
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
  li .check_box {
    display: inline-block;
    width: $base_padding;
    height: $base_padding;
    border: 1px solid red
  }
  .li_leaf {
    padding-left: $base_padding
  }
  // 展开与关闭动画设置
  .root-ul {
    height: auto;
    transition: all 1s ease;
    -webkit-transition: all 0.5s ease
  }
</style>

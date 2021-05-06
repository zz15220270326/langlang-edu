<template>
  <Card class="accident-info">
    <div class="class">
      <div class="tag">所在班级:</div>
      <div class="content">{{ className }}</div>
    </div>
    <div class="name">
      <div class="tag">幼儿姓名:</div>
      <div class="content">{{ nickname }}</div>
    </div>
    <div class="accident-name">
      <div class="tag">状况名称:</div>
      <div class="content">{{ outBurstName }}</div>
    </div>
    <div class="outBurstScene">
      <div class="tag">发生场景:</div>
      <div class="content">{{ outBurstScene }}</div>
    </div>
    <div class="outBurstContent">
      <div class="tag">处理情况:</div>
      <div class="content">{{ outBurstContent }}</div>
    </div>
    <div class="realname">
      <div class="tag">当班教师:</div>
      <div class="content">{{ realname }}</div>
    </div>
    <div class="pictures">
      <div class="tag">状况图片:</div>
      <div class="content" v-if="pictures.length > 0">
        <div class="img" v-for="(item, index) in pictures" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
      <div class="content" v-else>
        暂无
      </div>
    </div>
  </Card>
</template>

<script>
import './index.less';

export default {
  name: 'AccidentInfo',
  props: {
    className: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    outBurstName: {
      type: String,
      default: ''
    },
    outBurstScene: {
      type: String,
      default: ''
    },
    outBurstContent: {
      type: String,
      default: ''
    },
    realname: {
      type: String,
      default: ''
    },
    pictures: {
      type: Array,
      default: () => []
    }
  }
};
</script>

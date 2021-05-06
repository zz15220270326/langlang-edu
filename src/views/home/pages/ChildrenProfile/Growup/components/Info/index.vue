<template>
  <div class="info-content">
    <div class="current-class">
      <div class="tag">
        <Tag>所在班级:</Tag>
      </div>
      <div class="content">
        <Tag size="large" color="lime">{{ className }}</Tag>
      </div>
    </div>
    <div class="child-name">
      <div class="tag">
        <Tag>幼儿姓名:</Tag>
      </div>
      <div class="content">
        <Tag size="large" color="blue">{{ infantName }}</Tag>
      </div>
    </div>
    <div class="select-month">
      <div class="tag">
        <Tag>月份:</Tag>
      </div>
      <div class="content">
        <Tag size="large" color="blue">{{ date }}</Tag>
      </div>
    </div>
    <div class="honor">
      <div class="tag">
        <Tag>获得荣誉:</Tag>
      </div>
      <div class="content">
        <Rate disabled :value="honor" />
      </div>
    </div>
    <div class="teacher-comment">
      <div class="tag">
        <Tag>教师评语:</Tag>
      </div>
      <div class="content">
        <Tag size="large" color="blue">{{ comment }}</Tag>
      </div>
    </div>
    <div class="life-images">
      <div class="tag">
        <Tag>生活剪影:</Tag>
      </div>
      <div class="content">
        <img v-for="(item, key) in imgs" :key="key" :src="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoContent',

  components: {},

  data: () => ({}),

  props: {
    className: {
      type: String,
      default: ''
    },
    infantName: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    imgs: {
      type: Array,
      default: () => []
    },
    honor: {
      type: Number,
      default: 0
    }
  },

  computed: {},

  methods: {}
}
</script>

<style lang="less" scoped>
.info-content {
  height: 36rem;
  padding: 1.2rem 0;
  width: 100%;
  overflow-y: auto;
  .current-class {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      font-size: 1.2rem;
    }
  }
  .child-name {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      font-size: 1.2rem;
    }
  }
  .select-month {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      font-size: 1.2rem;
    }
  }
  .honor {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      width: 100%;
    }
  }
  .teacher-comment {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      font-size: 1.2rem;
    }
  }
  .life-images {
    margin-top: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .tag {
      flex: 3;
      text-align: right;
      margin-right: 0.8rem;
      font-size: 1rem;
    }
    .content {
      flex: 7;
      img {
        width: 6.6rem;
        height: 6.6rem;
        margin: 0 0.5rem;
      }
    }
  }
}
</style>

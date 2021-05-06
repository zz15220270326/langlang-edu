<template>
  <div class="bottom-account">
    <div v-show="total > pageSize" class="pages">
      <Page
        :total="total"
        :page-size="pageSize"
        :show-sizer="showSizer"
        :show-elevator="true"
        :size="size"
        :prev-text="preText"
        :next-text="nextText"
        @on-change="changeTableData"
      />
    </div>
    <!-- <BackTop>
      <Button class="top" type="info" shape="circle">
        <Icon type="md-arrow-dropup-circle" />
      </Button>
      <Icon class="top" size="large" type="md-arrow-dropup-circle" />
    </BackTop> -->
    <div class="account">
      <Tag :size="tagSize" :color="renderAccount()">
        共有数据: {{ total }} 条
      </Tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomAccount',
  props: {
    total: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    // ? 属性
    size: {
      type: String,
      default: undefined
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    tagSize: {
      type: String,
      default: 'large'
    },
    preText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    }
  },
  methods: {
    changeTableData(page) {
      const { pageSize } = this;
      const params = {
        page,
        page_size: pageSize,
        pageSize
      };
      document.documentElement.scrollTo({
        top: 0,
        left: 0
      });
      this.$emit('changeTableData', params);
    },
    renderAccount() {
      return this.total < 16
        ? 'success'
        : this.total < 37
        ? 'primary'
        : this.total < 50
        ? 'warning'
        : 'error';
    }
  },
  created() {
    // console.log(this.renderAccount());
  }
};
</script>

<style lang="less" scoped>
.bottom-account {
  margin: 1.2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .pages {
    flex: 3;
    text-align: center;
  }
  .ivu-back-top {
    .top {
      color: #0094ff;
      position: absolute;
      right: 5.4rem;
      bottom: 0.5rem;
      i {
        width: 5rem;
        height: 5rem;
      }
    }
  }
  .account {
    flex: 1;
    text-align: right;
    right: 0;
    bottom: 0;
  }
}
</style>

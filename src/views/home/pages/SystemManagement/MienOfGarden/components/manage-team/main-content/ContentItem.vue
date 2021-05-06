<template>
  <Checkbox class="box" v-model="item.isChecked" @on-change="handleBoxChange">
    <div class="top">
      <img :src="item.avatar ? item.avatar : ''" alt="" />
    </div>
    <div class="bottom">
      <div class="left">
        <Tag color="blue" size="large">{{ item.teacherName }}</Tag>
        <Tag color="gold" size="large">{{ item.teacherAge }}</Tag>
      </div>
      <div class="middle">
        <Button type="primary" @click.native="editItem(key)">
          编辑
        </Button>
        <Button type="error" @click.native="deleteItem(key)">
          删除
        </Button>
      </div>
      <div class="right">
        <Tag color="pink" size="large">
          教师 (身份)
        </Tag>
      </div>
    </div>
  </Checkbox>
</template>

<script>
export default {
  name: 'ContentItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  .full_flex();
  flex-direction: column;
  .top {
    flex: 2;
    .full_flex();
    flex-direction: row;
    img {
      height: 7.2rem;
      width: 8.1rem;
    }
  }
  .bottom {
    flex: 2;
    .full_flex();
    // flex-wrap: wrap;
    .left {
      flex: 2;
    }
    .middle {
      flex: 3;
      .full_flex();
    }
    .right {
      flex: 2;
      .full_flex();
    }
  }
  .ivu-btn {
    margin: 0 0.3rem;
  }
}
</style>

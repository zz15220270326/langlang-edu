<template>
  <Card class="parents-info">
    <div class="container" v-for="(item, key) in pList" :key="key">
      <div class="parent-name">
        <div class="tag">
          家长姓名
        </div>
        <div class="content">
          <Input
            :readonly="true"
            class="parent-name-input"
            :value="item.realname"
          />
        </div>
      </div>
      <div class="gender">
        <div class="tag">性别</div>
        <div class="content">
          <Tag
            size="large"
            :color="item.sex === 1 ? 'blue' : item.sex === 2 ? 'pink' : ''"
          >
            {{ item.sex === 1 ? '男' : item.sex === 2 ? '女' : '未知' }}
          </Tag>
        </div>
      </div>
      <div class="phone">
        <div class="tag">
          联系手机
        </div>
        <div class="content">
          <Input
            placeholder="请输入联系手机"
            style="width: 300px"
            :value="item.mobile"
            :readonly="true"
          />
        </div>
      </div>
      <Divider />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'ParentInfo',

  data: () => ({}),

  props: {
    pList: {
      type: Array,
      default: () => []
    }
  },

  watch: {},

  computed: {},

  methods: {
    selectGender(item, key) {
      this.addList[key].currentGender = item
    }
  }
}
</script>

<style lang="less" scoped>
.parents-info {
  overflow-y: auto;
  .container {
    .parent-name {
      margin-top: 1.2rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tag {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        flex: 7;
      }
    }
    .gender {
      margin-top: 1.2rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tag {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        flex: 7;
      }
    }
    .phone {
      margin-top: 1.2rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .tag {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        flex: 7;
      }
    }
  }
}
</style>

<template>
  <div class="parent-base-wrapper" v-if="pList.length > 0">
    <div class="parent-info" v-for="(item, key) in pList" :key="key">
      <div class="tag">家长信息</div>
      <div class="content">
        <div class="base">
          <div class="select-type">
            <Tag size="large" color="success">
              {{ item.Relationship }}
            </Tag>
          </div>
          <div class="input">
            <Input
              placeholder="家长姓名"
              v-model="item.realname"
              style="width: 8rem;"
              readonly
            />
            <Input
              placeholder="平台绑定手机"
              v-model="item.mobile"
              type="tel"
              style="width: 10rem"
              maxlength="11"
              readonly
            />
            <Input
              placeholder="考勤卡号"
              v-model="item.card"
              style="width: 10rem;"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParentInfo',
  props: {
    pList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="less" scoped>
#flex-style {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.parent-base-wrapper {
  .parent-info {
    position: relative;
    bottom: 0.6rem;
    #flex-style;
    .tag {
      flex: 3;
      #flex-style;
    }
    .content {
      flex: 17;
      .base {
        padding-top: 1rem;
        #flex-style;
        justify-content: space-evenly;
        .select-type {
          flex: 1;
          margin: auto;
        }
        .input {
          flex: 6;
          #flex-style;
          justify-content: space-evenly;
        }
        .op {
          flex: 1;
          width: 100%;
          margin: auto;
          margin-left: 0.5rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="select-noon">
    <Button
      v-for="(itm, idx) of noonList"
      :key="idx"
      size="large"
      :type="itm.type"
      @click.native="selectNoon(idx)"
    >
      {{ itm.tag }}
    </Button>
  </div>
</template>

<script>
export default {
  name: 'SelectNoon',
  data: () => ({
    noonList: [
      {
        tag: '上午',
        type: 'error'
      },
      {
        tag: '下午',
        type: 'default'
      }
    ],
    noonIndex: 0
  }),
  watch: {
    noonIndex(noonIndex) {
      this.noonList.forEach((item, index) => {
        index === noonIndex ? (item.type = 'error') : (item.type = 'default');
        this.$bus.$emit('selectNoon', noonIndex);
      });
    }
  },
  methods: {
    selectNoon(noonIndex) {
      this.noonIndex = noonIndex;
    },
    handleDayChange() {
      this.$bus.$on('selectWorkDay', () => {
        this.noonIndex = 0;
      });
    },
    handleTimePlanChange() {
      this.$bus.$on('updateAddedPlan', () => {
        this.noonIndex = 0;
      });
    }
  },
  mounted() {
    this.handleDayChange();
    this.handleTimePlanChange();
  }
};
</script>

<style lang="less" scoped>
.select-noon {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .ivu-btn {
    width: 10rem;
    margin: 0.8rem;
    &:hover {
      border: 1px solid rgb(207, 139, 150);
      color: #f00;
    }
  }
}
</style>

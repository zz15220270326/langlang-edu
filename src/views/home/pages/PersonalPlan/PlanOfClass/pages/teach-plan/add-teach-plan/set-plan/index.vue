<template>
  <div class="set-plan">
    <Dropdown v-for="(item, key) in modalButtonGroup" :key="key">
      <Button :type="item.type" @click.native="settingPlanType(key)">
        {{ item.tag }}
      </Button>
      <DropdownMenu v-if="key === 0" slot="list">
        <DropdownItem
          v-for="(item, key) in setPlanList"
          :key="key"
          @click.native="selectPlanListItem(key)"
        >
          {{ item.info }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'SetPlan',
  props: {
    modalButtonGroup: {
      type: Array,
      defualt: () => []
    },
    setPlanList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    settingPlanType(key) {
      this.$emit('settingPlanType', key);
    },
    selectPlanListItem(key) {
      this.$emit('selectPlanListItem', key);
    }
  }
};
</script>

<style lang="less" scoped>
.flex_full() {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.set-plan {
  flex: 2;
  height: 100%;
  .flex_full();
  margin-bottom: 2rem;
  .ivu-btn {
    margin-left: 0.8rem;
  }
}
</style>

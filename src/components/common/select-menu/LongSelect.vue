<template>
  <div class="select-menu">
    <!-- 上面单选, 下面多选  -->
    <Select
      v-if="defaultList === []"
      v-model="selectIndex"
      filterable
      :clearable="false"
      remote
      :multiple="isMultiple"
      :style="propStyle"
      @on-change="handleSelect"
    >
      <Option v-for="(item, key) in propList" :key="key" :value="item.key">
        {{ item.info }}
      </Option>
    </Select>
    <div v-else>
      <Select
        v-if="propList.length > 0"
        v-model="selectIndex"
        filterable
        :clearable="false"
        remote
        :default-label="defaultLabelList"
        :multiple="isMultiple"
        :style="propStyle"
        @on-change="handleSelect"
      >
        <template v-if="propList[0].info">
          <Option v-for="(item, key) in propList" :key="key" :value="item.key">
            {{ item.info || '' }}
          </Option>
        </template>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LongSelect',
  data: () => ({
    selectIndex: 0,
    defaultLabelList: []
  }),
  props: {
    propStyle: {
      type: String,
      default: ''
    },
    // propItem: { key: Number, info: String }
    propList: {
      type: Array,
      default: () => []
    },
    propIndex: {
      type: Number,
      default: 0
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    defaultList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    propIndex(newValue) {
      if (newValue > 0) {
        this.selectIndex = newValue
      }
    },
    defaultList(newValue) {
      if (newValue.length > 0) {
        this.defaultLabelList = []
        this.defaultLabelList = newValue
      }
    }
  },
  methods: {
    handleSelect(idx) {
      if (this.isMultiple) {
        this.$emit('handleSelect', this.selectIndex, idx)
      } else {
        this.$emit('handleSelect', this.propList[idx])
      }
    }
  }
}
</script>

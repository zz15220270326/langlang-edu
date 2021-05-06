<template>
  <div class="teacher-special-content">
    <div class="teacher-card-wrapper">
      <div
        class="teacher-card"
        v-for="(item, index) in teacherInfo"
        :key="index"
        @mouseenter="showButton(index)"
        @mouseleave="hideButton(index)"
      >
        <div class="img-content">
          <img :src="item.img_url" />
          <div class="operations" v-show="item.showButton">
            <Button type="info" @click="checkInfo(index)">
              详情
            </Button>
            <Button type="primary" @click.native="editItem($event, index)">
              编辑
            </Button>
            <Button type="error" @click.native="deleteItem($event, index)">
              删除
            </Button>
          </div>
        </div>
        <div class="text-content">
          <div class="top">
            <div class="name">{{ item.name }}</div>
            <div class="identify">{{ item.identify }}</div>
          </div>
          <div class="bottom">
            <div class="age">{{ item.age }}</div>
            <div class="manage-class">{{ item.manage_class }}</div>
            <Checkbox
              class="check-teacher"
              :value="item.isChecked"
              @on-change="checkedItem($event, index)"
            ></Checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less';

export default {
  name: 'MienContent',
  props: {
    teacherInfo: {
      type: Array,
      default: () => []
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  methods: {
    checkInfo(index) {
      this.$emit('checkInfo', index);
    },
    showButton(index) {
      this.$emit('showButton', index);
    },
    hideButton(index) {
      this.$emit('hideButton', index);
    },
    editItem(event, index) {
      this.$emit('editItem', event, index);
    },
    deleteItem(event, index) {
      this.$emit('deleteItem', event, index);
    },
    checkedItem(isChecked, index) {
      this.$emit('checkedItem', isChecked, index);
    }
  }
};
</script>

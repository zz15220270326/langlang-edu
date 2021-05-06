<template>
  <div class="ablums-content">
    <Card class="ablums-item" v-for="(item, key) in ablumItems" :key="key">
      <div
        class="top"
        @mouseenter="handleItemShow(key)"
        @mouseleave="handleItemLeave(key)"
      >
        <div class="operations" v-show="item.isShowOperations">
          <Button
            v-for="(btn, btnIdx) in itemOperations"
            :key="btnIdx"
            :type="btn.type"
            @click.native="itemBtnOperations(key, btnIdx)"
          >
            {{ btn.tag }}
          </Button>
        </div>
        <img :src="item.cover || platformUrl" alt="" />
      </div>
      <div class="bottom">
        <div class="left">
          <div class="author">
            <Checkbox
              v-model="item.isChecked"
              @on-change="handleCheckbox($event, key)"
            >
              <Tag color="lime" size="large"> {{ item.title }} </Tag>
            </Checkbox>
          </div>
          <div class="current_class">
            <Tag color="blue" size="large"> 班级:{{ item.className }} </Tag>
          </div>
        </div>
        <div class="right">
          <Tag class="total-number" color="red" size="large">
            总数:{{
              item.gardenBoardIds ? item.gardenBoardIds.split(',').length : 0
            }}
          </Tag>
          <Button type="info" @click.native="showInfo(key)">查看详情</Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import './index.less';
// ? request
import { getAlbumDetail } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? eventBus
import caBus from '../../caBus';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'ClassAblumContent',
  data: () => ({
    renderItems: [],
    checkedGroup: [],
    itemOperations: [
      {
        tag: '上传',
        type: 'info'
      },
      {
        tag: '编辑',
        type: 'primary'
      },
      {
        tag: '删除',
        type: 'error'
      }
    ]
  }),
  props: {
    ablumItems: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    ablumItems(newValue) {
      this.ablumItems = newValue;
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    handleCheckbox(isChecked, index) {
      this.$emit('handleCheckbox', isChecked, index);
    },
    showInfo(crtIdx) {
      this.$emit('showInfo', this.ablumItems[crtIdx]);
    },
    handleItemShow(key) {
      this.$emit('handleItemShow', key);
    },
    handleItemLeave(key) {
      this.$emit('handleItemLeave', key);
    },
    itemBtnOperations(itemIdx, btnIdx) {
      switch (btnIdx) {
        case 0: // 上传
          this.handleUploadItem(itemIdx);
          break;
        case 1: // 编辑
          this.handleEditItem(itemIdx);
          break;
        case 2: // 删除
          this.handleDeleteItem(itemIdx);
          break;
        default:
          break;
      }
    },
    async handleUploadItem(itemIdx) {
      const { id } = this.ablumItems[itemIdx],
        result = await getAlbumDetail({ id }),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.$Message.info(`上传第${itemIdx + 1}项`);
        const { album_id } = deepCopyObj(dataSource);
        caBus.$emit('getUploadItemInfo', parseInt(album_id));
        this.$emit('handleUploadItem', itemIdx);
      }
    },
    handleEditItem(itemIdx) {
      this.$Message.info(`编辑第${itemIdx + 1}项`);
      this.$emit('handleEditItem', itemIdx);
    },
    handleDeleteItem(itemIdx) {
      this.$Message.info(`删除第${itemIdx + 1}项`);
      this.$emit('handleDeleteAlbum', itemIdx);
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  mounted() {},
  beforeDestroy() {}
};
</script>

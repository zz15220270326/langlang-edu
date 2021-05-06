<template>
  <div class="class-card-list">
    <my-menu
      :varifyValue="varifyValue"
      @setDataContent="setDataContent"
      @handleSort="handleSort"
      @handlePlayByOrder="handlePlayByOrder"
      @handleRemovePlay="handleRemovePlay"
    />
    <div class="content">
      <my-content
        :titleList="videoColumns"
        :dataList="videoData"
        :tableIsLoading="tableIsLoading"
        @handleChangeSort="handleChangeSort"
        @getSelectItem="getSelectItem"
        @editItem="playItem"
      />
    </div>
    <div-page
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
      @changeTableData="getContentByPage"
    />
  </div>
</template>

<script>
// ? import components
import MyMenu from './ClassCardMenu';
import MyContent from 'HomePage/SystemManagement/SMTable';

import DivPage from '@common/bottom-account';
// ? request
import {
  orderPlaylist,
  playVideo,
  removeVideoFromList
} from '@/request/system-management';
// ? utils
import { handleOpResult } from '@/utils';
// ? import mixins
import videoContentMix from '../../videoContentMix';

export default {
  name: 'ClassCardList',
  components: {
    MyMenu,
    DivPage,

    MyContent
  },
  mixins: [videoContentMix],
  data: () => ({
    // ? menus
    // ? contents
    videoColumns: [
      {
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '缩略图',
        slot: 'image',
        align: 'center',
        width: 200
      },
      {
        title: '视频名称',
        key: 'videoName',
        align: 'center',
        width: 300
      },
      {
        title: '时长',
        key: 'totalTime',
        align: 'center'
      },
      {
        title: '排序',
        slot: 'sort',
        align: 'center'
      },
      {
        title: '操作',
        slot: 'operation',
        align: 'center'
      }
    ],
    selectItem: [],
    pageSize: 20
    // ,videoData: [],
    // page: 0,
    // total: 0,
    // totalPage: 0,
    // tableIsLoading: false
  }),
  props: {},
  computed: {},
  methods: {
    // ? menus
    async handleSort() {
      const sort = this.videoData.map(v => `${v.videoId}|${v.sort}`).toString();
      const classId = this.crtId;
      const params = { classId, sort };
      const result = await orderPlaylist(params);
      this.checkResult(result);
    },
    handlePlayByOrder() {
      const params = {
        board_id: this.crtId,
        type: 'inOrder'
      };
      this.$Modal.confirm({
        title: '顺序播放',
        content: '确认操作 ?',
        onOk: () => this.confirmPlay(params)
      });
    },
    handleRemovePlay(class_id) {
      if (!this.selectItem.length) {
        this.$Message.warning('请先选择要移出的视频内容');
        return;
      }
      this.$Modal.confirm({
        title: '移出当前班牌选中的视频',
        content: '移除视频后需要重新添加, 确认操作 ?',
        onOk: () => {
          const params = {
            class_id,
            id: this.selectItem.map(v => v.videoId).toString()
          };
          this.confirmRemoveVideos(params);
        }
      });
    },
    async confirmRemoveVideos(params) {
      const result = await removeVideoFromList(params);
      this.checkResult(result);
    },
    // ? contents
    handleChangeSort({ index, value }) {
      this.videoData[index].sort = value;
    },
    getSelectItem(selectItem) {
      this.selectItem = selectItem;
    },
    playItem(itemIndex) {
      this.$Message.info(`播放表格中第${itemIndex + 1}个视频`);
      const params = {
        class_id: this.crtId,
        id: this.videoData[itemIndex].videoId,
        type: 'inOrder'
      };
      console.log(params);
      this.$Modal.confirm({
        title: `播放当前班牌中第${itemIndex + 1}个视频`,
        content: '确认操作 ?',
        onOk: () => this.confirmPlay(params)
      });
    },
    async confirmPlay(params) {
      const result = await playVideo(params);
      this.checkResult(result);
    },
    checkResult(result) {
      if (handleOpResult(result)) {
        this.$Message.success('操作成功');
        this.varifyValue = `hasChanged! code: ${Math.floor(
          Math.random() * 100
        )}`;
      } else this.$Message.error(`操作失败, 原因: ${result.msg}`);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-card-list {
  height: 40rem;
  overflow-y: auto;
}
</style>

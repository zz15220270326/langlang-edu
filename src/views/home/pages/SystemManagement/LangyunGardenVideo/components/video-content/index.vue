<template>
  <div class="video-content">
    <div class="list-title">
      <Button
        size="large"
        :type="selectAllBtn.type"
        @click.native="handleSelectAll(selectAllBtn.tag)"
        :disabled="!videosInfo.length"
      >
        {{ selectAllBtn.tag }}
      </Button>
    </div>
    <div class="list-content">
      <Card
        class="list-item"
        v-for="(item, idx) in videosInfo"
        :key="idx + item"
      >
        <Checkbox
          class="check-content"
          v-model="item.isChecked"
          @on-change="handleSelectItem"
        >
          <div class="wrap">
            <img :src="item.src ? item.src : ''" alt="" />
          </div>
          <div class="content">
            <div class="title">
              <h2>{{ item.title }}</h2>
            </div>
            <div class="manage-class">
              <Tag color="green" size="large"
                >班级:{{ '  ' + item.className }}</Tag
              >
            </div>
            <div class="garden-card">
              <Tag size="large" color="purple">园牌:</Tag>
              {{ item.gardenBoardNames }}
            </div>
            <div class="other">
              <Tag size="large" color="blue">分类:{{ item.type }}</Tag>
              <Tag size="large" color="lime">时长:{{ item.duration }}</Tag>
              <Tag size="large" color="blue">大小:{{ item.size }}</Tag>
            </div>
            <div class="user-info">
              <Avatar :src="item.avatar" />
              <Tag size="large" color="pink">{{ item.manager }}</Tag>
              <Tag size="large" color="gold">{{ item.time }}</Tag>
            </div>
          </div>
          <div class="operations">
            <Button
              v-for="btn in item.operations"
              :key="btn.icon + btn.tag"
              :type="btn.type"
              @click.native="handleItemOperations(idx, btn.tag)"
            >
              <span>{{ btn.tag }}</span>
              <Icon :type="btn.icon" />
            </Button>
          </div>
        </Checkbox>
      </Card>
    </div>
  </div>
</template>

<script>
import './index.less';
// ? request
import { getPicById } from '@/request/Common';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'VideoContent',
  data: () => ({
    videosInfo: [],
    selectAllBtn: {
      tag: '全部选择',
      type: 'info'
    },
    selectItems: []
  }),
  props: {
    propItem: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    propItem(newVal) {
      if (newVal.length) {
        this.setVideoInfos(newVal);
      }
    }
  },
  computed: {
    ...mapState(['platformUrl', 'avatar', 'userName'])
  },
  methods: {
    setVideoInfos(infos = []) {
      // console.log(infos);
      this.videosInfo = [];
      infos.forEach(async item => {
        this.videosInfo.push({
          number: item.number,
          id: item.id,
          uid: item.uid,
          gardenId: item.gardenId,
          isChecked: item.isChecked,
          // src: await this.getImgBySourceId(item.sourceId),
          src: item.thumbnails,
          avatar: this.avatar,
          manager: this.userName,
          title: item.videoName,
          className: item.className || '暂无班级',
          gardenBoardNames: item.GardenBoardNames || '暂无园牌',
          type: item.type || '',
          duration: item.duration || '',
          time: item.time || '',
          size: item.size || '',
          operations: [
            {
              tag: '添加至播放列表',
              type: 'primary',
              icon: 'md-add'
            },
            {
              tag: '删除',
              type: 'error',
              icon: 'ios-trash-outline'
            }
          ]
        });
      });
    },
    async getImgBySourceId(icon) {
      const result = await getPicById({ icon });
      // console.log(result);
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    },
    handleSelectAll(currentTag) {
      // todo " videosInfo "
      switch (currentTag) {
        case '全部选择':
          this.videosInfo.map(item => (item.isChecked = true));
          this.selectAllBtn.tag = '全部取消';
          this.selectAllBtn.type = 'warning';
          break;
        case '全部取消':
          this.videosInfo.map(item => (item.isChecked = false));
          this.selectAllBtn.tag = '全部选择';
          this.selectAllBtn.type = 'info';
      }
      this.getSelectItem();
      this.$emit('selectItemChange', this.selectItems);
    },
    handleSelectItem() {
      const isSelectAll = this.videosInfo.every(item => item.isChecked);
      if (!isSelectAll) {
        this.selectAllBtn.tag = '全部选择';
        this.selectAllBtn.type = 'info';
      } else {
        this.selectAllBtn.tag = '全部取消';
        this.selectAllBtn.type = 'warning';
      }
      this.getSelectItem();
      this.$emit('selectItemChange', this.selectItems);
    },
    getSelectItem() {
      this.selectItems = [];
      this.videosInfo.forEach(item => {
        if (item.isChecked) {
          this.selectItems.push(item);
        }
      });
    },
    handleItemOperations(itemIdx, btnTag) {
      switch (btnTag) {
        case '添加至播放列表':
          this.handleAddtoList(itemIdx);
          break;
        case '删除':
          this.handleDeleteItem(itemIdx);
          break;
      }
    },
    handleAddtoList(itemIdx) {
      this.$emit('addToList', itemIdx);
    },
    handleDeleteItem(itemIdx) {
      this.$Modal.confirm({
        title: `删除第${itemIdx + 1}项`,
        content: '是否删除? 删除后数据无法恢复',
        onOk: () => {
          const { id } = this.videosInfo[itemIdx];
          this.$emit('deleteItem', id);
        }
      });
    }
  }
};
</script>

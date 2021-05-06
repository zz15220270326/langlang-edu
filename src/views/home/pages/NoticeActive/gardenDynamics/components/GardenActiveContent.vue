<template>
  <div class="garden-notice-content">
    <Card class="content-card">
      <div slot="title" class="card-title">
        <Checkbox v-model="checkAll" @on-change="handleAllItems">
          {{ selectAllText }}
        </Checkbox>
      </div>
      <CheckboxGroup
        v-model="checkAllGroup"
        class="card-content"
        v-for="(item, key) in totalList"
        :key="key + item.title"
        @on-change="selectSingleItem"
      >
        <div class="left">
          <Checkbox
            class="article-content"
            :label="key + 1"
            v-model="item.isChecked"
          />
          <div class="img">
            <img :src="item.imgs || $store.state.platformUrl" alt="" />
          </div>
          <div class="content">
            <h2>{{ item.title }}</h2>
            <div class="article-content">
              {{ item.summary }}
            </div>
            <div class="info">
              <Avatar :src="item.avatar" />
              <span>{{ item.author }}</span>
            </div>
            <div class="op">
              <Button
                v-for="(itm, idx) in item.userOperations"
                :key="idx + itm.tag"
                :type="itm.type"
                :icon="itm.icon"
                @click.native="handleUserOperations(key, itm.tag)"
              >
                {{ itm.tag }}
              </Button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="operations">
            <Button
              v-for="(itm, idx) in item.itemOperations"
              :key="idx + itm.tag"
              :type="itm.type"
              @click.native="handleItemOperations(key, itm.tag)"
            >
              {{ itm.tag }}
            </Button>
            <div class="time">
              <Tag size="large" color="green">{{ item.time }}</Tag>
            </div>
          </div>
        </div>
        <Divider />
      </CheckboxGroup>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'GardenActiveContent',
  components: {},
  data: () => ({
    isCheckedAll: false,
    selectAllText: '全部选择',
    checkAll: false,
    checkAllGroup: []
  }),
  props: {
    topList: {
      type: Array,
      default: () => []
    },
    commonList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalList() {
      return [...this.topList, ...this.commonList];
    }
  },
  methods: {
    handleUserOperations(itemIndex, currentTag) {
      switch (currentTag) {
        case '删除':
          this.$emit('delItem', itemIndex);
          break;
        case '置顶':
          this.$emit('setTop', itemIndex, 1);
          break;
        case '取消置顶':
          this.$emit('setTop', itemIndex, 0);
          break;
        case '编辑':
          this.$emit('editItem', itemIndex);
          break;
      }
    },
    handleItemOperations(itemIndex, currentTag) {
      switch (currentTag) {
        case '详情':
          this.$emit('openInfo', itemIndex);
          break;
        case '预览':
          this.$emit('openInfo', itemIndex);
          break;
        case '发布':
          this.$emit('releaseItem', itemIndex);
          break;
      }
    },
    handleAllItems() {
      if (this.checkAll) {
        for (let index in this.totalList) {
          this.checkAllGroup.push(index * 1);
        }
        this.selectAllText = '取消全选';
        this.$emit('getSelectItems', this.totalList);
      } else {
        this.checkAllGroup = [];
        this.selectAllText = '全部选择';
        this.$emit('getSelectItems', []);
      }
    },
    selectSingleItem(selectList) {
      if (selectList.length === this.totalList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      const list = selectList.map(idx => this.totalList[idx]);
      this.$emit('getSelectItems', list);
    }
  }
};
</script>

<style lang="less" scoped>
.common_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.full_content() {
  width: 100%;
  height: 60rem;
}
.over_to_dot() {
  white-space: nowrap;
  text-overflow: ellipsis; /* for internet explorer */
  overflow: hidden;
  width: 190px;
  display: block;
}
.garden-notice-content {
  background-color: #fff;
  .content-card {
    height: 100%;
    width: 100%;
    .card-title {
      margin: 0.8rem 1rem;
      font-size: 1.2rem;
    }
    .card-content {
      .left {
        .common_flex();
        width: 50%;
        margin: 0.8rem 0;
        .img {
          flex: 1;
          text-align: center;
          padding-top: 0.8rem;
          img {
            width: 12rem;
            height: 10rem;
          }
        }
        .content {
          flex: 2;
          padding-left: 1.6rem;
          .article-content {
            .over_to_dot();
          }
          .info {
            padding: 0.75rem 0;
            span {
              margin: 0 0.6rem;
            }
          }
        }
        .ivu-btn {
          margin: 0 0.5rem;
        }
      }
      .right {
        text-align: right;
        .ivu-btn {
          position: relative;
          bottom: 5rem;
          right: 1rem;
          width: 6rem;
          margin: 0 0.5rem;
        }
        .time {
          position: relative;
          bottom: 3rem;
          right: 0.5rem;
        }
      }
    }
  }
}
</style>

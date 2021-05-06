<template>
  <Card class="notice-content">
    <div slot="title" class="title" v-if="dataList.length === 0">
      <h1>{{ title }}</h1>
    </div>
    <div class="content">
      <div slot="title" class="card-title">
        <Checkbox
          v-if="isShowCheck"
          v-model="checkAll"
          :disabled="dataList.length === 0"
          @on-change="handleAllItems"
        >
          {{ selectAllText }}
        </Checkbox>
      </div>
      <CheckboxGroup
        v-model="checkAllGroup"
        class="card-content"
        v-for="(item, key) in dataList"
        :key="key"
        @on-change="selectSingleItem"
      >
        <div class="left">
          <h2>{{ item.title }}</h2>
          <Checkbox v-if="isShowCheck" class="show-content" :label="key" v-model="item.isChecked">
            {{ item.content }}
          </Checkbox>
          <div class="info">
            <Avatar v-show="item.avatar" :src="item.avatar" />
            <span>{{ item.charger }}</span>
            <Tag class="type-tag" :color="item.color">
              {{ item.type }}
            </Tag>
            <Button
              v-if="!item.isDeleted"
              type="error"
              icon="ios-trash-outline"
              @click.native="deleteItem(key)"
            />
          </div>
          <Divider />
        </div>
        <div class="right">
          <div class="operations">
            <Button
              v-for="(item, opKey) in item.operations"
              :key="item.tag"
              :type="item.type"
              @click.native="handleOperation(opKey, key)"
            >
              {{ item.tag }}
            </Button>
          </div>
          <div class="time">
            <Tag color="lime">{{ item.time }}</Tag>
          </div>
          <div class="is-read">
            {{ item.readStatus ? '已读:' + item.readStatus : '' }}
          </div>
          <Divider />
        </div>
      </CheckboxGroup>
      <!-- </CheckboxGroup> -->
    </div>
  </Card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NoticeContent',
  components: {},
  data: () => ({
    selectAllText: '全部选择',
    checkAllGroup: [],
    checkAll: false
  }),
  props: {
    isShowCheck: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '加载中。。。'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['avatar'])
  },
  methods: {
    handleAllItems() {
      if (this.checkAll) {
        for (let index in this.dataList) {
          this.checkAllGroup.push(index * 1);
        }
        this.selectAllText = '取消全选';
        this.$emit('getSelectItems', this.dataList);
      } else {
        this.checkAllGroup = [];
        this.selectAllText = '全部选择';
        this.$emit('getSelectItems', []);
      }
    },
    selectSingleItem(selectList) {
      if (selectList.length === this.dataList.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      const list = selectList.map(idx => this.dataList[idx]);
      this.$emit('getSelectItems', list);
    },
    deleteItem(itemIdx) {
      this.$emit('deleteItem', itemIdx);
    },
    handleOperation(opKey, key) {
      this.$emit('handleOperation', opKey, key);
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
  // height: 180rem;
  // overflow-y: auto;
}
.over_to_dot() {
  white-space: nowrap;
  text-overflow: ellipsis; /* for internet explorer */
  overflow: hidden;
  width: 190px;
  display: block;
}

.notice-content {
  margin-top: 2rem;
  .title {
    margin: 2rem 0;
    .common_flex();
  }
  .content {
    .card-title {
      position: relative;
      left: 1.2rem;
      top: -2.5rem;
    }
    .full_content();
    .card-content {
      width: 100%;
      height: 8rem;
      margin: 1rem 0;
      .common_flex();
      .left {
        flex: 1;
        .show-content {
          margin: 0.8rem 0;
          // height: 3rem;
          // overflow: scroll;
          .over_to_dot();
        }
        .info {
          margin: 0 1rem;
          .type-tag {
            margin: 0 0.6rem;
          }
        }
      }
      .right {
        flex: 1;
        text-align: right;
        .operations {
          .ivu-btn {
            margin: 0 1rem !important;
            width: 5.4rem !important;
          }
        }
        .time {
          margin: 0.8rem 0;
        }
        .is-read {
          font-weight: 560;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="m-c-settings">
    <Card class="item-list" :bordered="true">
      <div
        class="info-item"
        v-for="(item, idx) in controlInfos"
        :key="idx + item"
      >
        <div class="top">
          <div class="tag">
            <Tag size="large" color="pink">{{ item.name }}</Tag>
          </div>
          <div class="content" v-if="item.menu">
            <Select v-model="item.value">
              <Option
                v-for="item2 of item.menu"
                :key="item2.value"
                :value="item2.value"
              >
                {{ item2.label }}
              </Option>
            </Select>
          </div>
        </div>
        <div class="bottom">
          {{ item.desc }}
        </div>
        <Divider />
      </div>
      <div class="save">
        <Button size="large" type="success" @click.native="handleSave">
          保存
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
// ? request
import { getControlList, editControl } from '@/request/system-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  handleOpResult,
  // ? arr / obj
  deepCopyObj
} from '@/utils';

export default {
  name: 'MCSettings',
  data: () => ({
    controlInfos: [],
    desc:
      '注：数量限制后，每位幼儿能添加的家长数量不能超过限制数量，否则无法添加成功',
    total: 0
  }),
  methods: {
    async initInfo() {
      const result = await getControlList({}),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const { num, audit } = deepCopyObj(dataSource);
        this.controlInfos = [
          {
            name: '可添加幼儿家长数量：',
            menu: [
              {
                label: '无限制',
                value: 0
              },
              {
                label: '1',
                value: 1
              },
              {
                label: '2',
                value: 2
              },
              {
                label: '3',
                value: 3
              },
              {
                label: '4',
                value: 4
              },
              {
                label: '5',
                value: 5
              },
              {
                label: '6',
                value: 6
              }
            ],
            desc: this.desc,
            value: num
          },
          {
            name: '家长幼儿人脸录入审核：',
            menu: [
              {
                label: '关闭',
                value: 0
              },
              {
                label: '开启',
                value: 1
              }
            ],
            desc: this.desc,
            value: audit
          }
        ];
      }
    },
    async handleSave() {
      this.$Modal.confirm({
        title: '更新管控设置',
        content: '确认操作?',
        onOk: () => {
          const num = this.controlInfos[0].value,
            audit = this.controlInfos[1].value,
            params = {
              num,
              audit
            };
          this.confirmSave(params);
        }
      });
    },
    async confirmSave(body) {
      const result = editControl(body);
      if (handleOpResult(result)) {
        this.$Message.success('设置成功');
        this.initInfo();
      } else this.$Message.error(`设置失败, 原因: ${result.msg}`);
    }
  },
  created() {
    this.initInfo();
  }
};
</script>

<style lang="less" scoped>
.full_flex() {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-c-settings {
  .item-list {
    margin-top: 3rem;
    .info-item {
      .full_flex();
      flex-direction: column;
      .top {
        flex: 1;
        .full_flex();
        .tag {
          flex: 5;
          text-align: right;
          margin-right: 10rem;
        }
        .content {
          flex: 3;
          margin-right: 30rem;
        }
      }
      .bottom {
        flex: 1;
        padding: 1.6rem 0;
      }
    }
    .save {
      text-align: center;
      .ivu-btn {
        width: 6rem;
      }
    }
  }
}
</style>

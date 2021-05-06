<template>
  <div class="reminder">
    <Card :bordered="false" class="reminder-content">
      <Tag slot="title" color="gold" size="large">
        {{ header }}
      </Tag>
      <Tag slot="extra" color="green" size="large">
        {{ statistics }}
      </Tag>
      <List v-if="header === '打卡日期'">
        <ListItem
          v-show="renderList"
          v-for="(itm, idx) in renderList"
          :key="idx"
        >
          {{ itm }}
        </ListItem>
      </List>
      <List v-else>
        <!-- 显示多选框 -->
        <!-- :show-checkbox="true" -->
        <Tree v-show="renderTreeList" :data="renderTreeList" />
      </List>
    </Card>
  </div>
</template>

<script>
// ? components

// ? utils
import { getWeekDays, transformTimeStamp } from '@/utils';

export default {
  name: 'AttdanceReminder',
  components: {},
  props: {
    header: {
      type: String,
      default: '标题为空'
    },
    statistics: {
      type: String,
      default: '暂无内容'
    },
    // ? 重点处理list
    info: [Array, Object],
    attdenceType: {
      type: String,
      default: ''
    }
  },
  computed: {
    renderList() {
      const renderList = [];
      Array.isArray(this.info) &&
        this.info.map(item => {
          renderList.push(`${item} (${getWeekDays(item)})`);
        });
      return renderList;
    },
    renderTreeList() {
      const treeList = [];
      this.info &&
        Object.keys(this.info).length > 0 &&
        Object.keys(this.info).map(key => {
          // console.log(this.info[key])
          treeList.push({
            title: key,
            expand: true,
            children: this.info[key].map
              ? this.info[key].map(c => {
                  if (
                    this.attdenceType === 'overtime' ||
                    this.attdenceType === 'out' ||
                    this.attdenceType === 'leave'
                  ) {
                    return {
                      title: `时间段: ${transformTimeStamp(
                        c.work_time
                      )}-${transformTimeStamp(c.check_time)}`,
                      expand: true
                    };
                  }
                  if (c.check_time > 0) {
                    return {
                      title: `打卡时间 ${transformTimeStamp(
                        c.check_time
                      )} (${transformTimeStamp(c.work_time)})`
                    };
                  }
                  // if (this.attdenceType === 'actually') {
                  //   return {
                  //     title: `打卡时间`,
                  //     expand: true
                  //   }
                  // }
                  return {
                    title: `打卡时间: 无 (${transformTimeStamp(c.work_time)})`,
                    expand: true
                  };
                })
              : Object.keys(this.info[key]['checkResult']).map(k => {
                  const item = this.info[key]['checkResult'];
                  return {
                    title: `打卡时间: ${
                      item[k]['time']
                        ? `${transformTimeStamp(
                            item[k]['work_time']
                          )}-${transformTimeStamp(item[k]['time'])}`
                        : `无(${transformTimeStamp(item[k]['work_time'])})`
                    }`,
                    expand: true
                  };
                })
            // : Object.keys(this.info[key]).map(key1 => {
            //     console.log(key1, this.info[key][key1])
            //     return {
            //       title: `打卡时间`,
            //       expand: true
            //     }
            //   })
          });
        });
      // ? 遍历对象
      return treeList;
    }
  }
};
</script>

<style lang="less" scoped>
.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reminder {
  height: 25rem;
  .reminder-content {
    height: 25rem;
    overflow-y: auto;
  }
}
</style>

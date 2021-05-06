<template>
  <div class="content">
    <Table :columns="titleList" :data="dataList" :border="true">
      <!-- :height="dataList.length > 4 ? 600 : undefined" -->
      <template slot-scope="{ row }" slot="cardTime">
        <List v-if="row.cardTime === 2">
          <ListItem v-if="row.workTime['AM']['start']">
            上午上班打卡时间: {{ row.workTime['AM']['start'] || '' }}
          </ListItem>
          <ListItem v-if="row.workTime['PM'].end">
            下午下班打卡时间: {{ row.workTime['PM'].end || '' }}
          </ListItem>
        </List>
        <List v-if="row.cardTime === 4">
          <ListItem v-if="row.workTime['AM']['start']">
            上午上班打卡时间: {{ row.workTime['AM']['start'] || '' }}
          </ListItem>
          <ListItem v-if="row.workTime['AM'].end">
            上午下班打卡时间: {{ row.workTime['AM'].end || '' }}
          </ListItem>
          <ListItem v-if="row.workTime['PM']['start']">
            下午上班打卡时间: {{ row.workTime['PM']['start'] || '' }}
          </ListItem>
          <ListItem v-if="row.workTime['PM'].end">
            下午下班打卡时间: {{ row.workTime['PM'].end || '' }}
          </ListItem>
        </List>
      </template>
      <template slot-scope="{ row }" slot="weekday">
        <List>
          <Tag
            v-for="(itm, idx) of row.weekday"
            :key="idx"
            size="large"
            color="success"
          >
            {{ itm }}
          </Tag>
        </List>
      </template>
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          v-for="item of row.operations"
          :key="item.tag"
          :type="item.type"
          size="large"
          @click.native="handleOperations(index, item.tag)"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'ClassesManagementContentTable',
  props: {
    titleList: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  methods: {
    handleOperations(itemIdx, btnTag) {
      switch (btnTag) {
        case '编辑':
          this.$emit('openEditModal', itemIdx);
          break;
        case '删除':
          this.$Modal.confirm({
            title: `删除`,
            content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
            onOk: () => this.$emit('confirmDelete', itemIdx),
            onCancel: () => this.$Message.info('您取消了本次操作')
          });
          break;
        case '排班':
          this.$emit('openArrangeModal', itemIdx);
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  .ivu-btn {
    margin: 0 0.8rem;
    width: 6rem;
  }
}
</style>

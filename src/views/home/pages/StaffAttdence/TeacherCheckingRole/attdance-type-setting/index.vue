<template>
  <!-- 假期类型设置  -->
  <div class="attdance-type-setting">
    <div class="add-container">
      <Button class="add-type-btn" type="success" @click="openAddModal">
        添加节假日类型
      </Button>
    </div>
    <Table border :columns="titleList" :data="dataList" size="large">
      <!-- :height="dataList.length > 6 ? 500 : undefined" -->
      <!-- width="1000" -->
      <template slot-scope="{ row }" slot="holidayType">
        <strong>{{ row.holidayType }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="operations">
        <Button
          class="opration-button"
          :type="item.type"
          size="large"
          @click.native="handleItem(index, item.tag)"
          v-for="item in row.operations"
          :key="item.tag"
        >
          {{ item.tag }}
        </Button>
      </template>
    </Table>
    <bottom-account
      :page="page"
      :pageSize="pageSize"
      :total="total"
      :totalPage="totalPage"
    />
    <!-- 模态框内容 -->
    <Modal
      v-model="isShowAddModal"
      title="添加节假日类型"
      width="850"
      :footer-hide="true"
    >
      <add @closeModal="closeModal" @refreshPage="getHolidayTypeList" />
    </Modal>
    <Modal
      v-model="isShowEditModal"
      title="编辑假期类型"
      width="850"
      :footer-hide="true"
    >
      <add
        v-bind="edits"
        @closeModal="closeModal"
        @refreshPage="getHolidayTypeList"
      />
    </Modal>
  </div>
</template>

<script>
import './components/index.less';
// ? components
import Add from './components/Add';

import BottomAccount from '@common/bottom-account';

// ? request
import {
  getHolidayType,
  // addHolidayType,
  // editHolidayType,
  deleteHolidayType
} from '@/request/attdance';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,
  handleOpResult
} from '@/utils';

export default {
  name: 'AttdanceTypeSetting',
  components: {
    Add,

    BottomAccount
  },
  data: () => ({
    titleList: [
      {
        title: '假类名称',
        slot: 'holidayType',
        align: 'center'
      },
      {
        title: '操作',
        slot: 'operations',
        align: 'center'
      }
    ],
    dataList: [],
    page: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    // ? modal
    isShowAddModal: false,
    isShowEditModal: false,
    edits: {}
  }),
  computed: {
    gardenId() {
      return this.$store.state.gardenId;
    }
  },
  methods: {
    openAddModal() {
      this.isShowAddModal = true;
    },
    async getHolidayTypeList(
      params = { garden_id: this.gardenId, page_size: this.pageSize }
    ) {
      const result = await getHolidayType(params);
      const dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const info = JSON.parse(JSON.stringify(dataSource));
        this.page = info.page || 0;
        this.total = info.total || 0;
        this.totalPage = info.total_page || 0;
        if (info.items) {
          const { items } = info;
          this.dataList = [];
          items.map(item => {
            this.dataList.push({
              id: item.id,
              holidayType: item.name,
              type: item.type,
              comment: item.comment,
              operations:
                item.type === 0
                  ? [
                      {
                        tag: '删除',
                        type: 'error'
                      }
                    ]
                  : [
                      {
                        tag: '删除',
                        type: 'error'
                      },
                      {
                        tag: '编辑',
                        type: 'primary'
                      }
                    ]
            });
          });
        }
      } else
        this.$Message.error(`请求失败, 原因: ${handleErrorCode(result.code)}`);
    },
    handleItem(crtIdx, tag) {
      switch (tag) {
        case '删除':
          this.handleDelete(crtIdx);
          break;
        case '编辑':
          this.handleEdit(crtIdx);
          break;
      }
    },
    handleDelete(crtIdx) {
      const { id } = this.dataList[crtIdx];
      this.$Modal.confirm({
        title: '删除',
        content: '是否删除? 删除后数据无法恢复, 请谨慎操作',
        onOk: () => this.confirmDelete({ id, type: 'del' }),
        onCancel: () => this.$Message.info('您取消了本次操作')
      });
    },
    async confirmDelete(params) {
      const result = await deleteHolidayType(params);
      if (handleOpResult(result)) {
        this.$Message.success('删除成功');
        this.getHolidayTypeList();
      } else
        this.$Message.error(`删除失败, 原因: ${handleErrorCode(result.code)}`);
    },
    handleEdit(crtIdx) {
      const { id, holidayType, comment } = this.dataList[crtIdx];
      this.edits = {
        id,
        name: holidayType,
        comment
      };
      this.isShowEditModal = true;
    },
    closeModal() {
      this.isShowAddModal = false;
      this.isShowEditModal = false;
    }
  },
  created() {
    this.getHolidayTypeList();
  }
};
</script>

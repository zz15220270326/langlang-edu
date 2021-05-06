<template>
  <div class="daily-add-content">
    <add-menu
      @handleSearch="handleSearch"
      @handleOperations="handleOperations"
    />
    <div class="table-content">
      <h-b-table
        :titleList="titleList"
        :dataList="dataList"
        :tableIsLoading="tableIsLoading"
        @getTable="getTable"
        :height="dataList.length > 5 ? 320 : undefined"
      />
    </div>
    <bottom-account :total="dataList.length" :pageSize="10" />
  </div>
</template>

<script>
// ? import components
import AddMenu from './AddMenu';
import HBTable from '../../../HBTable';
import BottomAccount from '@common/bottom-account';

// ? utils
import { healthStatus, handleChildType } from '@/utils';

// ? import mixins
import getTableMix from '../../getTableMix';

export default {
  name: 'DailyAddContent',

  components: {
    AddMenu,
    HBTable,
    BottomAccount
  },

  mixins: [getTableMix],

  data: () => ({
    currentTable: {},
    titleList: [
      {
        title: '班级',
        key: 'className',
        width: 140,
        align: 'center'
      },
      {
        title: '姓名',
        key: 'childName',
        width: 140,
        align: 'center'
      },
      {
        title: '晨、午检',
        key: 'type',
        width: 140,
        align: 'center'
      },
      {
        title: '体温',
        key: 'temperature',
        width: 140,
        align: 'center'
      },
      {
        title: '健康状况',
        key: 'healthStatus',
        width: 180,
        align: 'center',
        render: (h, params) => healthStatus(h, params)
      },
      {
        title: '症状',
        key: 'symptom',
        align: 'center'
      },
      {
        title: '处理方式',
        key: 'processMode',
        width: 180,
        align: 'center',
        render: (h, params) => handleChildType(h, params)
      },
      {
        title: '登记人',
        key: 'teacherName',
        width: 180,
        align: 'center'
      }
    ]
  }),

  props: {},

  computed: {},

  methods: {
    // ? menu-functions
    handleSearch(params) {
      console.log(params);
      this.getTableData(params);
    },
    handleOperations(btnIndex) {
      switch (btnIndex) {
        case 0:
          this.printTable();
          break;
        case 1:
          if (this.currentTable !== {}) {
            this.currentTable.exportCsv({
              filename: '当前全部表格数据',
              original: false
            });
          }
          break;
      }
    },
    // ? table-functions
    printTable() {
      const newWin = window.open(''); //新打开一个空窗口
      const title = '哈哈哈哈哈';
      if (this.currentTable !== {}) {
        // ${this.currentTable.outerHTML}
        console.log(this.currentTable);
        newWin.document.write(`
          <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width,initial-scale=1.0">
              <title>
                ${title}
              </title>
            </head>
            <body>
              ${this.currentTable.innerHTML}
            </body>
          </html>`);
        newWin.document.close(); //在IE浏览器中使用必须添加这一句
        newWin.focus(); //在IE浏览器中使用必须添加这一句

        newWin.print(); //打印
        newWin.close(); //关闭窗口
      }
    },
    getTable(currentTable) {
      this.currentTable = currentTable;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.daily-add-content {
  height: 38rem;
  overflow-y: auto;
  .table-content {
    margin-top: 5/4rem;
  }
}
</style>

<template>
  <div class="garde-attdance">
    <grade-attdance-menu @handleSearch="handleSearch" />
    <div class="title">园所出勤状况</div>
    <div class="content">
      <column-picture :chartStyle="chartStyle" :render="render" />
    </div>
  </div>
</template>

<script>
// ? import components
import GradeAttdanceMenu from './components/GradeAttdanceMenu';
import ColumnPicture from '@common/echart/ColumnPicture';

// ? request
import { getGradeAnalyze } from '@/request/class-management';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj
} from '@/utils';
// ? configs

export default {
  name: 'GradeAttdance',
  components: {
    GradeAttdanceMenu,
    ColumnPicture
  },
  data: () => ({
    chartStyle: {
      width: '60rem',
      height: '33rem'
    },
    render: {}
  }),
  methods: {
    // ? menus
    handleSearch(params) {
      this.getContentData(params);
    },
    // ? contents
    async getContentData(params = {}) {
      const result = await getGradeAnalyze(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        this.$Message.success(`查询成功`);
        const data = deepCopyObj(dataSource);
        data.garden_checking && this.setGardenChecking(data.garden_checking);
      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
    },
    setGardenChecking(infos = {}) {
      const formatList = [];
      const { shiDao, yingDao } = infos;
      yingDao.map((item, index) => {
        formatList.push({
          class_type: this.getClassByIdx(index),
          attdance_students: shiDao[index],
          absence_students: item
        });
      });
      this.render = this.setColumnData(formatList);
    },
    getClassByIdx(index) {
      switch (index) {
        case 0:
          return '小班';
        case 1:
          return '中班';
        case 2:
          return '大班';
        case 3:
          return '全员情况';
      }
    },
    setColumnData(formatList, barBorderWidth = 6) {
      let legendDataList = ['实到人数', '应到人数'];
      let xAxisList = [];
      let yAxisList = [0, 0.1];
      let attdanceList = [];
      let allList = [];
      const sourceData = formatList;
      sourceData.map(item => {
        xAxisList.push(item.class_type);
        attdanceList.push(item.attdance_students);
        allList.push(item.absence_students);
      });
      const render = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // ? 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: params => {
            if (params) {
              return (
                params[0].name +
                '<br/>' +
                params[0].seriesName +
                ' : ' +
                params[0].value +
                '<br/>' +
                params[1].seriesName +
                ' : ' +
                (params[1].value + params[0].value)
              );
            }
          }
        },
        // ? 上面中间显示
        legend: {
          selectedMode: true,
          data: legendDataList
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: xAxisList
          }
        ],
        yAxis: [
          {
            type: 'value',
            boundaryGap: yAxisList
          }
        ],
        series: [
          {
            name: '实到人数',
            type: 'bar',
            stack: 'sum',
            barCategoryGap: '50%',
            itemStyle: {
              normal: {
                color: 'rgba(3, 169, 244, 0.9)',
                barBorderColor: 'rgba(3, 169, 244, 0.9)',
                barBorderWidth,
                barBorderRadius: 0,
                label: {
                  show: false,
                  position: 'insideTop'
                },
                'margin-top': '1.12rem'
              }
            },
            data: attdanceList
          },
          {
            name: '应到人数',
            type: 'bar',
            stack: 'sum',
            itemStyle: {
              normal: {
                color: 'rgb(167, 215, 247)',
                barBorderColor: 'rgb(167, 215, 247)',
                barBorderWidth: 6,
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: 'top',
                  formatter: function(params) {
                    for (
                      var i = 0, l = render.xAxis[0].data.length;
                      i < l;
                      i++
                    ) {
                      if (render.xAxis[0].data[i] === params.name) {
                        return render.series[0].data[i] + params.value;
                      }
                    }
                  },
                  textStyle: {
                    color: '#666',
                    'margin-top': '1.12rem'
                  }
                }
              }
            },
            data: allList
          }
        ]
      };
      return render;
    }
  },
  created() {
    this.getContentData();
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

.garde-attdance {
  .title {
    font-weight: bold;
    color: #464c5b;
    font-size: 1.6rem;
    margin: 1.6rem 0;
    .full_flex();
  }
  .content {
    .full_flex();
  }
}
</style>

export function formatInfoToList(infos = {}) {
  const formatList = [],
    total = {
      class_type: '全员情况',
      attdance_students: 0,
      absence_students: 0
    }
  for (let k in infos) {
    switch (k) {
      case 'grade1':
        formatList.push({
          class_type: '小班',
          attdance_students: infos[k]['Attendance'],
          absence_students: infos[k]['sumBabys'] - infos[k]['Attendance']
        })
        break
      case 'grade2':
        formatList.push({
          class_type: '中班',
          attdance_students: infos[k]['Attendance'],
          absence_students: infos[k]['sumBabys'] - infos[k]['Attendance']
        })
        break
      case 'grade3':
        formatList.push({
          class_type: '中班',
          attdance_students: infos[k]['Attendance'],
          absence_students: infos[k]['sumBabys'] - infos[k]['Attendance']
        })
        break
      default:
        break
    }
  }
  formatList.map(item => {
    total.attdance_students += item.attdance_students
    total.absence_students += item.absence_students
  })
  formatList.push(total)
  return formatList
}

export function setColumnData(formatList, barBorderWidth = 6) {
  let legendDataList = ['实到人数', '缺勤人数']
  let xAxisList = []
  let yAxisList = [0, 0.1]
  let attdanceList = []
  let absenceList = []
  const sourceData = formatList
  sourceData.map(item => {
    xAxisList.push(item.class_type)
    attdanceList.push(item.attdance_students)
    absenceList.push(item.absence_students)
  })
  const render = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // ? 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: (params) => {
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
          )
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
    xAxis: [{
      type: 'category',
      data: xAxisList
    }],
    yAxis: [{
      type: 'value',
      boundaryGap: yAxisList
    }],
    series: [{
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
        name: '缺勤人数',
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
              formatter: function (params) {
                for (
                  var i = 0, l = render.xAxis[0].data.length; i < l; i++
                ) {
                  if (render.xAxis[0].data[i] === params.name) {
                    return render.series[0].data[i] + params.value
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
        data: absenceList
      }
    ]
  }
  return render
}
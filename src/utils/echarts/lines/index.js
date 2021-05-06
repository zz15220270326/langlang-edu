export default function getLineOption(
  title = '',
  desc = '',
  legend,
  sourceList
) {
  const titleInfo = {
    text: title,
    subtext: desc
  }
  const legendList = [legend],
    xAxisList = [],
    dataInfo = [],
    dataList = sourceList
  dataList.map(item => {
    xAxisList.push(item.day)
    dataInfo.push(item.data)
  })
  const lineOption = setOption(
    titleInfo,
    legendList,
    xAxisList,
    dataInfo,
    legend
  )
  return lineOption
}

function setOption(titleInfo, legendList, xAxisList, dataInfo, legend) {
  const persentInfo = dataInfo.map(item => item * 10)
  return {
    title: titleInfo,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legendList
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
        magicType: {
          show: true,
          type: ['line', 'bar']
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
      boundaryGap: false,
      data: xAxisList
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        // formatter: '{value} °C'
        formatter: `{value} %`
      }
    }],
    series: [{
      name: legend,
      type: 'line',
      // data: dataInfo,
      data: persentInfo,
      markPoint: {
        data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ]
      },
      markLine: {
        data: [{
          type: 'average',
          name: '平均值'
        }]
      }
    }]
  }
}
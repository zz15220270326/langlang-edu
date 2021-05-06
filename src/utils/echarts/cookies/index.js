export function formatObjList(infos = {}) {
  const infoList = []
  for (let k in infos) {
    switch (k) {
      case '1':
        infoList.push({
          value: infos[k],
          name: '男生人数'
        })
        break
      case '2':
        infoList.push({
          value: infos[k],
          name: '女生人数'
        })
        break
      default:
        break
    }
  }
  return infoList
}

export function getCookiesData(infoList, optionList, colorList) {
  return setOptions(optionList, infoList, colorList)
}

export function setOptions(baseList, infoList, colorList) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: `{a} <br/>{b} : {c} ({d}%)`
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: baseList
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        // dataView: { show: true, readOnly: false },
        // magicType: {
        //   show: true,
        //   type: ['pie', 'funnel'],
        //   option: {
        //     funnel: {
        //       x: '25%',
        //       width: '50%',
        //       funnelAlign: 'center',
        //       max: 1548
        //     }
        //   }
        // },
        // restore: { show: true },
        saveAsImage: {
          show: true
        },
      }
    },
    calculable: true,
    series: [{
      name: '人数',
      type: 'pie',
      radius: ['50%', '70%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: params => {
            if (colorList[params.dataIndex]) {
              return colorList[params.dataIndex]
            } else {
              return
            }
          }
        },
        emphasis: {
          label: {
            show: true,
            position: 'center',
            textStyle: {
              // color: 'skyblue',
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        }
      },
      data: infoList
    }]
  }
}
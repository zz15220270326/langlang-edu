const gardenTypes = [{
  label: '省级示范',
  value: 1
},
{
  label: '省十佳',
  value: 2
},
{
  label: '市十佳',
  value: 3
},
{
  label: '市一类',
  value: 4
},
{
  label: '市二类',
  value: 5
},
{
  label: '市三类',
  value: 6
},
{
  label: '其他',
  value: 0
}
]

const gardenNatures = [{
  label: '教育办',
  value: 1
},
{
  label: '企业办',
  value: 2
},
{
  label: '事业办',
  value: 3
},
{
  label: '村办',
  value: 4
},
{
  label: '镇办',
  value: 5
},
{
  label: '普惠',
  value: 6
},
{
  label: '其他',
  value: 0
},
]

function formatPca(sourArr = []) {
  const arr = []
  sourArr.map(item => {
    if (item.children) {
      arr.push({
        value: item.code,
        label: item.name,
        children: formatPca(item.children)
      })
    } else {
      arr.push({
        value: item.code,
        label: item.name
      })
    }
  })
  return arr
}

const pccData = formatPca(require('@/source/pca'))

export {
  gardenTypes,
  gardenNatures,
  pccData,
}

<template>
  <div class="table-item">
    <div class="wrapper" v-if="isShowAm">
      <!-- 显示上午时间 -->
      <div class="item" v-for="(itm, idx) in row[day].am" :key="idx">
        <Tag class="item-type" color="gold" size="large" v-if="idx === index">
          类型:{{ itm.name }}
        </Tag>
        <Tag
          class="item-content"
          v-if="idx === index"
          color="blue"
          size="large"
        >
          内容:
          {{
            itm.content === '' || itm.content === '0\\'
              ? '暂无内容'
              : itm.content
          }}
        </Tag>
      </div>
    </div>
    <div class="wrapper" v-if="isShowPm">
      <div class="item" v-for="(itm2, idx2) in row[day].pm" :key="idx2">
        <Tag
          class="item-type"
          color="gold"
          size="large"
          v-show="idx2 === index && amEmpty"
        >
          类型:{{ itm2.name }}
        </Tag>
        <Tag
          class="item-content"
          v-show="idx2 === index && amEmpty"
          color="pink"
          size="large"
        >
          内容: {{ itm2.content === '' ? '暂无内容' : itm2.content }}
        </Tag>
        <Tag
          class="item-type"
          color="gold"
          size="large"
          v-show="
            !amEmpty && idx2 === index - (row[day].pm.length - amLength + 1)
          "
        >
          类型:{{ itm2.name }}
        </Tag>
        <Tag
          class="item-content"
          v-show="
            !amEmpty && idx2 === index - (row[day].pm.length - amLength + 1)
          "
          color="pink"
          size="large"
        >
          内容:
          {{ itm2.content === '' ? '暂无内容' : itm2.content }}
        </Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailItem',
  computed: {
    isShowAm() {
      // ? 判断时间是否为上午
      return (
        this.row.time.split('-')[0].split(':')[0] * 1 >= 0 &&
        this.row.time.split('-')[0].split(':')[0] * 1 < 13
      );
    },
    isShowPm() {
      // ? 判断时间是否为下午
      return (
        this.row.time.split('-')[0].split(':')[0] * 1 >= 13 &&
        this.row.time.split('-')[0].split(':')[0] * 1 < 24
      );
    },
    amEmpty() {
      return this.row[this.day].am.every(am => am.content === '');
    },
    amLength() {
      let amList = [];
      this.row[this.day].am.map(item => {
        if (item.name !== '其它' && item.content !== '') {
          amList.push(item);
        }
      });
      return amList.length;
    }
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },
  created() {
    // console.log(this.amLength)
  }
};
</script>

<style lang="less" scoped>
.table-item {
  margin: 0.5rem 0;
}
</style>

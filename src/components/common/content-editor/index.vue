<template>
  <div class="main">
    <div class="tag">
      <Tag color="green" size="large">内容:</Tag>
    </div>
    <div class="editor">
      <div ref="editor" />
      <!-- <textarea
        class="input-content"
        placeholder="请输入富文本内容"
        v-model="inputContent"
      /> -->
    </div>
  </div>
</template>

<script>
import './index.less';
/** 
* ! 子组件使用
<div class="editor" ref="editor"></div>

* ! 父组件使用时
<content-editor
  :propContent="propContent"
  @inputContentChange="inputContentChange"
/>
*/
import Editor from 'wangeditor';
// ? utils
// import { htmlToText } from '@/utils'

export default {
  name: 'ContentEditor',
  data: () => ({
    editor: null,
    inputContent: ''
  }),
  props: {
    propContent: {
      type: String,
      default: '编辑内容'
    },
    placeholder: {
      type: String,
      default: 'please input something...'
    }
  },
  watch: {
    propContent(newVal) {
      this.setHtml(newVal);
    }
  },
  methods: {
    initEditor() {
      const editorEl = this.$refs.editor;
      this.editor = new Editor(editorEl);
      // ? 配置 onchange 回调函数，将数据同步到 vue 中
      this.editor.config.onchange = this.inputChange;
      // ? 创建编辑器
      this.editor.create();
    },
    // ? 改变文字
    inputChange(newHtml) {
      this.inputContent = newHtml;
      this.$emit('inputContentChange', this.inputContent);
      // setTimeout(() => {
      //   this.$emit('inputContentChange', this.inputContent);
      // }, 100);
    },
    // ? 改变dom
    setHtml(newVal) {
      this.inputContent = newVal;
      this.editor.txt.html(newVal);
    }
  },

  // ! /* **life-hooks** */
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    // this.editor.destroy();
    this.editor = null;
  }
};
</script>

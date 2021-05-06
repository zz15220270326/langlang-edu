<template>
  <div class="editor" ref="editor"></div>
</template>

<script>
import Editor from 'wangeditor';

export default {
  name: 'RichEditor',
  data: () => ({
    editor: null,
    inputContent: ''
  }),
  props: {
    initContent: {
      type: String,
      default: ''
    }
  },
  watch: {
    initContent(newVal) {
      newVal.length && this.initInput(newVal);
    }
  },
  methods: {
    initEditor() {
      const editor = new Editor(this.$refs.editor);
      editor.config.onchange = newHtml => this.inputChange(newHtml);
      editor.create();
      this.editor = editor;
    },
    inputChange(newHtml) {
      this.inputContent = newHtml;
      this.$emit('handleInputChange', this.inputContent);
    },

    initInput(newVal) {
      this.inputContent = newVal;
      this.editor.txt.html(newVal);
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    this.editor = null;
  }
};
</script>


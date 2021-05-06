import { Message } from 'view-design';

export default {
  bind(el, binding, vNode) {
    // console.log('binding');
    el.addEventListener('click', () => switchPlayMode(el, {el, binding, vNode}), false);
  },

  update() {
    // console.log('update');
    // const btnGroup = el.querySelectorAll('.ivu-btn');
    // console.log(btnGroup);
    // el.addEventListener('click', (e) => switchPlayMode(e, btnGroup), false);
  }
}

function switchPlayMode(el, { binding }) {
  const crtIdx = parseInt(el.getAttribute('index')),
    { btnGroup } = binding.value;
  btnGroup.forEach((item, index) => {
    if (index === crtIdx) {
      Message.info(`切换到${item.tag}播放模式`);
      item.type = 'primary';
    } else {
      item.type = 'default';
    }
  });
}
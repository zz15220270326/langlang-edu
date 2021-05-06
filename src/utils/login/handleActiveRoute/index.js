function crtUrl() {
  const url = document.location.toString()
  const arrUrl = url.split('//');

  const start = arrUrl[1].indexOf('/');
  let relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}

function getCrtIdx(vueComponent) {
  const pathArr = vueComponent.$route.path.split('/');
  const lastSecondPath = pathArr[pathArr.length - 2];
  const crtIdx = vueComponent.routerList.map((item, idx) => {
    if (item.path === lastSecondPath) {
      return idx;
    }
  }).filter(i => i > 0)[0];
  return crtIdx;
}

export {
  crtUrl,
  getCrtIdx
};
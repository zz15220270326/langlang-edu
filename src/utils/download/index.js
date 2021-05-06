export function downloadFile(data, name = '导出的名称', type) {
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data], {
    type
  }));
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
}

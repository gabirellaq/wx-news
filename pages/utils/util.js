function formatTime(value) {
  if (!value) return '';
  var date = new Date(value);
  var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return (time / 1000).toFixed(0) + '秒前'
  } else if ((time / 60000) < 60) {
    return (time / 60000).toFixed(0) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return (time / 3600000).toFixed(0) + '小时前'
  } else if ((time / 86400000) < 31) {
    return (time / 86400000).toFixed(0) + '天前'
  } else {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
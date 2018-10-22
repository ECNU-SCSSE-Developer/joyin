const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTimeTwo = date => {
  return new Date(date).getFullYear().toString() + "年" + new Date(date).getMonth().toString() + "月" + new Date(date).getDate().toString() + "日"
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo
}

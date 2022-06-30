const getTime = function () {
  var nowDate = new Date();
  var date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    hours: nowDate.getHours(),
    minutes: nowDate.getMinutes(),
  };
  const newmonth = date.month > 10 ? date.month : "0" + date.month;
  const newday = date.date > 10 ? date.date : "0" + date.date;
  const newminutes = date.minutes > 10 ? date.minutes : "0" + date.minutes;
  const dateTime =
    date.year +
    "-" +
    newmonth +
    "-" +
    newday +
    " " +
    date.hours +
    ":" +
    newminutes;
  return dateTime;
};
export { getTime };

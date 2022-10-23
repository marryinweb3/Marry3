export function CountDown(date:any) {
  let now = new Date();
  let endDate = new Date(date);
  let leftTime = endDate.getTime() - now.getTime(); //计算剩余的毫秒数
  if (leftTime <= 0) {
    leftTime = 0;
  }
  let leftsecond = parseInt(leftTime / 1000 + ""); //计算剩余的秒数
  let countDay = Math.floor(leftsecond / (60 * 60 * 24));
  return countDay;
}
export function CountDown_(year, month, day, hours) {
  let now = new Date();
  let endDate = new Date(year, month - 1, day, hours);
  let leftTime = endDate.getTime() - now.getTime(); //计算剩余的毫秒数
  if (leftTime <= 0) {
    leftTime = 0;
  }
  let leftsecond = parseInt(leftTime / 1000 + ""); //计算剩余的秒数
  let countDay = Math.floor(leftsecond / (60 * 60 * 24));
  return countDay;
}

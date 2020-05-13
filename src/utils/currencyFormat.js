export default function currencyFormat(num,prefix) {
  let newNum = num.toString().replace(/[^,\d]/g, '');
  let split = newNum.split(',');
  let left = split[0].length % 3;
  let idr = split[0].substr(0, left);
  let comp = split[0].substr(left).match(/\d{3}/gi);

  if (comp) {
    let separator = left ? '.' : '';
    idr += separator + comp.join('.');
  }

  idr = split[1] !== undefined ? idr + ',' + split[1] : idr;
  return prefix === undefined ? idr : (idr ? prefix + idr : '');
}

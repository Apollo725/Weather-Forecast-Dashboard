export function formatDate(date) {
  const d = new Date(date);

  let month = '' + (d.getMonth() + 1);

  let day = '' + d.getDate();

  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
}

export function formatDateWithMonth(date) {
  const d = new Date(date);

  let month = '' + (d.getMonth() + 1);

  let day = '' + d.getDate();

  const year = d.getFullYear();

  if (day.length < 2) day = '0' + day;

  switch (month) {
    case 1:
      month = 'Jan';
      break;
    case 2:
      month = 'Feb';
      break;
    case 3:
      month = 'Mar';
      break;
    case 4:
      month = 'Apr';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'July';
      break;
    case 8:
      month = 'Aug';
      break;
    case 9:
      month = 'Sept';
      break;
    case 10:
      month = 'Oct';
      break;
    case 11:
      month = 'Nov';
      break;
    default:
      month = 'Dec';
  }
  return [day, month, year].join(' ');
}

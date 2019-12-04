export function getCellStyleHelper(rowInfo, columnName) {
  const { original } = rowInfo;
  if (original[columnName] === '100%') {
    return {
      style: {
        color: 'green',
      },
    };
  }
  if (original[columnName] === '0%') {
    return {
      style: {
        color: 'red',
      },
    };
  }
  return '';
}

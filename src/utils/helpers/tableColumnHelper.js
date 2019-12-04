import React from 'react';

export function generateMultiCell(row, param) {
  const length = row.row[param].length;
  return (
    <div>
      {row.row[param].map((prop, key) => (
        <div key={key}>
          <span>{prop[param + String(key + 1)]}</span>
          {key + 1 !== length && (
            <div>
              <br />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function customFilter(filter, row, param) {
  return row[param].reduce(
    (acc, cur, curIndex) =>
      String(acc[param + String(curIndex)]).startsWith(filter.value) ||
      String(cur[param + String(curIndex + 1)]).startsWith(filter.value),
  );
}

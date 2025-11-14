export function renderDataArr(arr) {
  if (arr.length > 0) {
    return arr.map((value, key) => (
      <li key={key}>
        {key}:{value}
      </li>
    ));
  }
}

// Hàm map theo object
export function renderDataObj(obj) {
  if (Object.keys(obj).length > 0) {
    return Object.keys(obj).map((key) => (
      <li key={key}>
        {key}:{obj[key]}
      </li>
    ));
  }
}
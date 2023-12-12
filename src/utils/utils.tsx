export const removeFromList = (arr:string[], item:string) => {
  return arr.filter((selected:string) => selected !== item);
};
  
export const groupBy = (arr, prop:string) => {
  var grouped = {};
  arr.map(row => {
    let value = row[prop];
    if (!grouped[value]) {
      grouped[value] = [];
    }
    grouped[value].push(row)
  })
  return grouped;
};

export const findValues = (arr,prop:string) => {
  let values = [...new Set(arr.map(item => item[prop]))];
  return values;
}

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}


export const sumArray = (r, a) => r.map((b, i) => a[i] + b);
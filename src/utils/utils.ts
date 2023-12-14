export type DataProps = {
  region: string,
  product: string,
  year: number,
  scenario: string,
  metric: {
    cost: number,
    profit: number,
    sales: number
  }
}

export const removeFromList = (arr:string[], item:string) => {
  return arr.filter((selected:string) => selected !== item);
};
  
export const groupBy = (arr:DataProps[], key:string, value:string[]) => {
  var grouped:any[][] = [];
    value.map((val,index)=>{
      grouped.push([])
      arr.map((row:DataProps) => {
        if (row[key]===val) {
          grouped[index].push(row)
        }
      })
    })
  return grouped;
};

export const findValues = (arr:any[],prop:string):string[] => {
  let values = [...new Set(arr.map((item:DataProps) => item[prop]))];
  return values;
}

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}


export const sumArray = (r, a) => r.map((b, i) => a[i] + b);


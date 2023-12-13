import { DataProps, groupBy,isObjectEmpty } from "./utils"

export const BuildTable = (
  data: DataProps[],
  rowVar:string[],
  columnVar:string[],
  rowList: string[][],
  columnList: string[][]
) => {

  let startIndex = 0
  let returnArr = []

  const build = (arr, count) => {
    if(count === 1) {
      returnArr = groupBy(arr,rowVar[0], rowList[0]);
      return returnArr;
    } else {
      let tempArr = groupBy(arr,rowVar[startIndex], rowList[startIndex]);
      startIndex=startIndex+1
      let testArr = []
      tempArr.map((mapArr, index)=>{
        let tempMap = groupBy(mapArr, rowVar[startIndex], rowList[startIndex])
        testArr.push(tempMap)
        if(count === 2){
          returnArr = testArr.flat()
        } else {
          let testFinalArr = []
          let test2 = testArr.flat()
          if (index === 1){
            test2.map(r=>{
              let thirdMap = groupBy(r,rowVar[startIndex+1], rowList[startIndex+1])
              testFinalArr.push(thirdMap);
            })
          }
          returnArr = testFinalArr.flat();
        }
      })
      return returnArr
    }
  }

  return build(data, rowVar.length);
}
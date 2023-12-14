import { useEffect } from "react";
import { DataProps, groupBy,isObjectEmpty } from "./utils"

export const BuildTable = (
  data: DataProps[],
  rowVar:string[],
  columnVar:string[],
  rowList: string[][],
  columnList: string[][],
  outputVar: string[]
):DataProps[][] => {
  let outputNoCols:DataProps[][] = [];
  let outputWithCols:DataProps[][][] = [];
  
  const recursionGen = (
    arr:any[],
    limit:number,
    init:number = 0
  ) => {
    
    if (limit === 1) {
      outputNoCols = groupBy(arr,rowVar[init],rowList[init])
    } else {
      
      if (init+1 === limit){
        outputNoCols = arr;
      } else {
        let tempArr:any[][] = arr;
        if(init === 0){
          tempArr = groupBy(tempArr,rowVar[init],rowList[init])
        }

        tempArr = groupAndFlatten(tempArr,rowVar[init+1],rowList[init+1]);

        let outputArr = tempArr;
        recursionGen(outputArr,limit,init+1)
      }
    }
  }

  const groupAndFlatten = (arr:any[][],key:string,values:string[]):any[][] => {
    let outputArr:any[][] = [];
    arr.map((subArr:any[])=>{
      outputArr.push(groupBy(subArr,key,values));
    })
    return outputArr.flat();
  }

  const groupAndNotFlat = (arr:any[][],key:string,values:string[]):any[][] => {
    let outputArr:any[][] = [];
    arr.map((subArr:any[])=>{
      outputArr.push(groupBy(subArr,key,values));
    })
    return outputArr;
  }

  const columnRecursion = (
    arr,
    limit,
    init = 0
  ) => {
    if (init === limit) {
      outputWithCols = arr;
    } else {
      let tempArrCol = arr;
      if(init === 0){
        tempArrCol = groupAndNotFlat(tempArrCol,columnVar[init],columnList[init]);
      } else {
        let splitTempArrCol = [];
        tempArrCol.map(down=>{
          splitTempArrCol.push(groupAndFlatten(down,columnVar[init],columnList[init]))
        })
        tempArrCol = splitTempArrCol;
      }
      let outputArrCol = tempArrCol;
      columnRecursion(outputArrCol, limit, init+1);
    }
  }

  const columnSplit = () => {
    if (outputNoCols.length > 0) {
      columnRecursion(outputNoCols,columnVar.length);
    }
  }


  recursionGen(data,rowVar.length);

  if(columnVar.length > 0){
    columnSplit();
  };
  
  if(columnVar.length > 0){
    return outputWithCols;
  } else {
    return outputNoCols;
  }
}
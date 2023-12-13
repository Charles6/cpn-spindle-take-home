import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { groupBy, sumArray } from '../utils/utils';
import { BuildTable } from '../utils/tableCalc';

const TableContainer = styled.table`
  width: 80rem;
  margin: 0.25rem auto;
  border: lightgray 1px solid;
  border-collapse: collapse;
  th,
  td {
    border: lightgray 1px solid;
  }
`;

const MetricsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  p {
    margin:0
  };
`;

const TableComponent = ({
  rowVar,
  columnVar,
  tableData,
  columnValues,
  outputVar,
  rowList,
  setRowList,
  columnList,
  setColumnList,
  rowHeaders
}) => {
  // const [rowList, setRowList] = useState<string[]>([]);
  // const [columnList, setColumnList] = useState<string[]>([]);
  const [tableValues, setTableValues] = useState([]);
  const [renderedTable, setRenderedTable] = useState([]);

  return (
    <table>
      <thead>

      </thead>
      <tbody>
        
      </tbody>
    </table>
  )

  // useEffect(()=>{
  //   if(rowList.length > 0){
  //     let finalTable = []
  //     rowList.map(row=>{
  //       let testGroup = groupBy(tableData[row],columnVar[0])
  //       let testTable = [];
  //       columnList.map(val=>{
  //         let testDataValues = [];
  //         testGroup[val].map(metric => {
  //           testDataValues.push(metric);
  //         })
  //         testTable.push(testDataValues);
  //       })
  //       finalTable.push(testTable);
  //     })
      
  //     setTableValues(finalTable);
  //   }
  // },[rowList]);

  // useEffect(()=>{
  //   const tempRenderTable = [];
  //   let tempRenderTotal = [];
  //   let testCount = 0
    
  //   tableValues.map((row, index)=>{
  //     let tempRow = [];
  //     let tempTotalRow = [];
      
  //     // console.log("Charles what is the TableValues row",rowList[index], row);
  //     row.map((col,index2)=>{
  //       const tempColSum = [];
        
  //       // outputVar.map(output=>{
  //       //   tempColSum[output] = 0;
  //       // })
  //       col.map(datum => {
  //         let tempDatumSet = [];
  //         //console.log("Charles what is the datum", rowList[index], columnList[index2], datum.metric);
  //         outputVar.map((output,index3)=>{
  //           tempDatumSet[index3] = tempDatumSet[index3] || 0
  //           //console.log("Charles what is the datum", tempDatumSet[index3], rowList[index], columnList[index2], datum.metric, datum.metric[output]);
  //           tempDatumSet[index3] = tempDatumSet[index3] + datum.metric[output];
  //         })
  //         //console.log("Charles tempDatumSet",rowList[index], columnList[index2], tempDatumSet)
  //         tempColSum.push(tempDatumSet);
  //         // if (tempColSum.sales !== undefined){
  //         //   tempColSum.sales = tempColSum.sales + datum.metric["sales"];
  //         // }
  //         // if (tempColSum.cost !== undefined){
  //         //   tempColSum.cost = tempColSum.cost + datum.metric["cost"];
  //         // }
  //         // if (tempColSum.profit !== undefined){
  //         //   tempColSum.profit = tempColSum.profit + datum.metric["profit"];
  //         // }
  //       })
  //       //console.log("Charles tempColSum",rowList[index], columnList[index2], tempColSum.reduce(sumArray))
  //       let tempSumArray = tempColSum.reduce(sumArray)
  //       tempRow = tempRow.concat(tempSumArray);
        
  //       tempTotalRow = tempTotalRow.concat(tempSumArray)
  //     })
  //     //console.log("Charles tempColSum",rowList[index], tempRow, tempTotalRow)
  //     // tempRow.unshift(rowList[index])
      
  //     tempRenderTable.push(tempRow)
  //     console.log("Charles can I get the row?", rowList[index], columnVar[0], tempTotalRow.length,tempRow.length, tempTotalRow)
  //     // if(tempRow.length > tempTotalRow.length) {
  //     //   console.log(testCount)
  //     //   testCount= testCount+1;
  //     //   tempTotalRow.unshift(rowVar[0]);
  //     // }
  //     tempRenderTotal.push(tempTotalRow)
  //   })
  //   //tempTotalRow.unshift(columnVar[0])
  //   if(tempRenderTotal.length > 0){
  //     tempRenderTable.push(tempRenderTotal.reduce(sumArray))
  //     setRenderedTable(tempRenderTable);
  //   }
  // },[tableValues])

  // useEffect(()=>{
  //   if(columnVar.length>0){
  //     columnVar.map((key:string)=>{
  //       setColumnList(columnValues[key])
  //     })
  //   }
  // },[columnVar])

  // return (
  //   <TableContainer>
  //     <thead>
  //       {/* <tr>
  //         <th colSpan={columnList.length * outputVar.length}>
  //           {columnVar.map(colLabel=>(
  //             " "+colLabel
  //           ))}
  //         </th>
  //       </tr> */}
  //       <tr>
  //       {columnList && columnList.map(val=>(
  //           <th colSpan={outputVar.length}>
  //             {/* { val } */}
  //             <MetricsContainer>
  //             {outputVar.map(metric => (
  //               <p>{metric}</p>
  //             ))}
  //             </MetricsContainer>
  //           </th>
  //       ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {renderedTable && renderedTable.map(row => {
  //         return(
  //           <tr>
  //             {
  //               row.map(col => (
  //                 <>
  //                   <td>{col}</td>
  //                 </>
  //               ))
  //             }
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </TableContainer>
  // );
};

export default TableComponent;



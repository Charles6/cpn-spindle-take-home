import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { DataProps } from '../utils/utils';

const TableContainer = styled.table`
  margin: 0.25rem auto;
  border: lightgray 1px solid;
  border-collapse: collapse;
  th,
  td {
    border: lightgray 1px solid;
    padding: 1rem;
  }
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
  const [tableValues, setTableValues] = useState([]);
  const [renderedTable, setRenderedTable] = useState([]);
  const [metricTitles, setMetricTitles] = useState([]);

const sumCell = (arr:DataProps[]) => {
  let cellTotal = {}
  arr.map(datum=>{
    let dataObj = datum.metric;
    Object.keys(datum.metric).map(metric=>{
      if (!(metric in cellTotal)) {
        cellTotal[metric] = dataObj[metric];
      } else {
        cellTotal[metric] = cellTotal[metric] + dataObj[metric]
      }
    })
    
  })
  return cellTotal;
}

useEffect(()=>{
  if(tableData.length > 0) {
    let tableRows = [];
    tableData.map(row=>{
      if(columnVar.length > 0){
        let colValues = [];
        row.map(col=>{
          colValues.push(sumCell(col));
        })
        tableRows.push(colValues);
      } else {
        tableRows.push([sumCell(row)])
      }
    })
    setTableValues(tableRows);
  }
 },[tableData])

 useEffect(()=>{
  let tempRowLabel = []
  tableData.map(rowLabel=>{
    let tempRowVal
    if(columnVar.length>0){
      tempRowVal=rowLabel[0][0]; 
    } else {
      tempRowVal=rowLabel[0];
    }
    let tempRowTitle = []
    rowVar.map(rowTitle=>{
      tempRowTitle.push(tempRowVal[rowTitle])
    })
    tempRowLabel.push(tempRowTitle);
  })
  
  let finalTableRender = []
  tempRowLabel.map((row,index)=>{
    let tempFinalRow = []
    tempFinalRow.push(row);
    tempFinalRow.push(tableValues[index]);
    finalTableRender.push(tempFinalRow);
  });
  setRenderedTable(finalTableRender)
 },[tableValues])

 useEffect(()=>{
  if(columnVar.length > 0){
    let interate = 0;
    for(let i=0; i<columnVar.length; i++){
      interate = interate + columnList[i].length
    }
    let loadMetrics = []
    for(let j=0; j<interate; j++){
      loadMetrics.push(outputVar);
    }
    setMetricTitles(loadMetrics.flat())
  } else {
    setMetricTitles(outputVar);;
  }

 },[outputVar,columnList])

  return (
    <TableContainer>
      <thead>
        <tr>
          {rowVar.length > 0 && rowVar.map(rowTitle=>(
              <th rowSpan={2}>{rowTitle}</th>
          ))}
          {
            columnList.map(colMetric=>{
              return (<>
              {
                colMetric.map(col=>(
                  <th colSpan={outputVar.length}>{col}</th>
                ))
              }
              </>)
            })
          }
        </tr>
        <tr>
          {metricTitles.length > 0 && metricTitles.map(metric=>{
            return (
              <th>{metric}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {renderedTable.length > 0 && renderedTable.map(row=> {
          return (
          <tr>
            {row[0].map((title, index)=>{
              return (
                <th>{title}</th>
              )
            })}

            {row[1].map((data,index)=>{
              return(
                <>
                {outputVar.length> 0 && outputVar.map(metric=>(
                    <td>{data[metric].toFixed(2)}</td>
                ))}
                </>
              )
            })}
          </tr>
        )})}
      </tbody>
    </TableContainer>
  )
};

export default TableComponent;



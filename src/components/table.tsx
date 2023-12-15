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
  const [columnLabel, setColumnLabel] = useState([]);

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
    let interate = 1;
    for(let i=0; i<columnVar.length; i++){
      interate = interate * columnList[i].length
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

 useEffect(()=>{
  if(columnVar.length>0){
    let tempColumnLabel = []
    let tempColRow = []
    columnVar.map((col,index)=>{
      let back = columnVar.length - index - 1;
      let revPower = Math.pow(columnList[index].length,back)
      let power = Math.pow(columnList[index].length,index)
      console.log(col, columnList[index], revPower, power);
      for(let i=0;i<power;i++){
        tempColRow.push({
          'labels':columnList[index],
          'width': revPower,
        })
        
      }
      tempColumnLabel.push(tempColRow)
      tempColRow=[];
    })

    setColumnLabel(tempColumnLabel);
   }

 },[columnList])

//  useEffect(()=>{
//   console.log(columnLabel)
//  },[columnLabel])


  return (
    <TableContainer>
      <thead>
        {
          (columnLabel.length > 0) && columnLabel.map((colLab,index)=>{
            //console.log("Charles test", colLab,)
            return (
              <tr>
                <th colSpan={rowVar.length}>{columnVar[index]}</th>
                {colLab.map(col=>{
                  //console.log("col", col, col.labels);
                  return (
                    <>
                      {col.labels.map(colLabel=>{
                        return (
                          <th colSpan={col.width * outputVar.length}>{colLabel}</th>
                        )
                      })

                      }
                    </>
                  )
                })

                }
              </tr>
            )
          })
        }
        <tr>
          {rowVar.length > 0 && rowVar.map(rowTitle=>(
              <th rowSpan={2}>{rowTitle}</th>
          ))}
          {}
          {/* {
            columnList.map(colMetric=>{
              return (<>
              {
                colMetric.map(col=>(
                  <th colSpan={outputVar.length}>{col}</th>
                ))
              }
              </>)
            })
          } */}
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



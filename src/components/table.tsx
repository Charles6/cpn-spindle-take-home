import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { groupBy, sumArray } from '../utils/utils';
import { BuildTable } from '../utils/tableCalc';

const TableContainer = styled.table`
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
  const [tableValues, setTableValues] = useState([]);
  const [renderedTable, setRenderedTable] = useState([]);

  console.log("What is the table getting?", tableData)

  return (
    <TableContainer>
      <thead>

      </thead>
      <tbody>
        {tableData && tableData.map(row=>(
          <tr>
            {row.map(datum=>{
              if (typeof datum !== 'object') {
                return(<th>{datum}</th>)
              } else {
                return (
                  <>
                  <td>{datum.sales}</td>
                  <td>{datum.cost}</td>
                  <td>{datum.profit}</td>
                  </>
                )
              }
})

            }
          </tr>
        ))}
        
      </tbody>
    </TableContainer>
  )
};

export default TableComponent;



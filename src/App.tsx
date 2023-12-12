import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import Drag from './components/drag';
import Table from './components/table';
import { TableCalculations } from './utils/tableCalc';
import { removeFromList } from './utils/utils';

function App() {
  const [data, setData] = useState([]);

  const [keyVar, setKeyVar] = useState<string[]>([]);
  const [columnVar, setColumnVar] = useState([]);
  const [rowVar, setRowVar] = useState([]);

  const [outputVar, setOutputVar] = useState([]);

  const [columnValues, setColumnValues] = useState({})

  const [rowList, setRowList] = useState<string[]>([]);
  const [columnList, setColumnList] = useState<string[]>([]);

  const [tableData, setTableData] = useState({});


  
  const getData = () => {
    fetch("http://localhost:3030/database", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(data.length > 0) {
      let tempKeys = Object.keys(data[0]);
      tempKeys = removeFromList(tempKeys, "metric");
      setKeyVar(tempKeys);
    };
  },[data]);

  return (
    <>
      <Drag
        data={data}
        keyVar={keyVar}
        setKeyVar={setKeyVar}
        columnVar={columnVar}
        setColumnVar={setColumnVar}
        rowVar={rowVar}
        setRowVar={setRowVar}
        tableData={tableData}
        setTableData={setTableData}
        outputVar={outputVar}
        setOutputVar={setOutputVar}
        columnValues={columnValues}
        setColumnValues={setColumnValues}
        rowList={rowList}
        setRowList={setRowList}
        columnList={columnList}
        setColumnList={setColumnList}
      >
      {tableData && 
        <Table
          columnVar={columnVar}
          rowVar={rowVar}
          tableData={tableData}
          columnValues={columnValues}
          outputVar={outputVar}
        />
      }
      </Drag>
    </>
  )
}

export default App

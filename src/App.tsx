import { useState, useEffect } from 'react'
import Drag from './components/drag';
import TableComponent from './components/table';
import { DataProps,removeFromList, findValues } from './utils/utils';
import { BuildTable } from './utils/tableCalc';

function App() {
  const [data, setData] = useState<DataProps[]>([]);

  const [keyVar, setKeyVar] = useState<string[]>([]);
  const [columnVar, setColumnVar] = useState<string[]>([]);
  const [rowVar, setRowVar] = useState<string[]>([]);

  const [outputVar, setOutputVar] = useState<string[]>([]);

  const [columnValues, setColumnValues] = useState<string[]>({})

  const [rowList, setRowList] = useState<string[][]>([]);
  const [columnList, setColumnList] = useState<string[][]>([]);

  const [rowHeaders, setRowHeaders] = useState<string[]>([]);

  const [tableData, setTableData] = useState<DataProps[][]>([]);

  const getData = () => {
    fetch("http://localhost:3030/database", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        let tempKeys = Object.keys(result[0]);
        tempKeys = removeFromList(tempKeys, "metric");
        setKeyVar(tempKeys);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => getData(), []);

  useEffect(()=>{
    let tempColumnList:string[] = [];
    columnVar.map((col:string)=>{
      tempColumnList.push(findValues(data,col));
    });
    setColumnList(tempColumnList);
  },[columnVar]);

  useEffect(()=>{
    let tempRowList:string[] = [];
    rowVar.map((row:string)=>{
      tempRowList.push(findValues(data,row));
    });
    setRowList(tempRowList);
  },[rowVar])

  useEffect(()=>{
    if(rowList.length>0){
      setTableData(BuildTable(data,rowVar,columnVar,rowList,columnList,outputVar))
    }
  },[
    rowList,
    columnList
  ])

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
        rowHeaders={rowHeaders}
        setRowHeaders={setRowHeaders}
      >
      {tableData && 
        <TableComponent
          tableData={tableData}
          rowVar={rowVar}
          rowList={rowList}
          columnVar={columnVar}
          columnList={columnList}
          outputVar={outputVar}
        />
      }
      </Drag>
    </>
  )
}

export default App

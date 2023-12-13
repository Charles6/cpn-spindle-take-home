import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { removeFromList,groupBy,findValues,isObjectEmpty } from '../utils/utils';
import { ThemeProvider } from 'styled-components';

const Header = styled.header`
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 1rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  h4 {
    margin:0;
  }
`;

const Main = styled.main`
  display:flex;
`;

const TableContainer = styled.div`
  flex-grow:8;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const OutputContainer = styled.div`
  flex-grow:1;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const OutputSelect = styled.div`

`;

const OutputCheckbox = styled.div`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 1rem 0;
  padding: 1rem;
  max-width: fit-content;
  border-radius: 6px;
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  };
  input {
    cursor:pointer;
  };
`;

const Variables = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  justify-content:center;
  align-items: center;
  flex-wrap: wrap;
`;

const Var = styled.div`
  height: 2rem;
  width: 10rem;
  border-radius: 2rem;
  margin: 0.5rem;
  cursor: pointer;
  background-color: lightgrey;
  border: solid 1px dimgrey;
  color: black;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  };
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const TableConfig = styled.div`
//   display:flex;
//   width: 100%;
// `;

const ColumnSelect = styled.div`
  border: solid DimGray 1px;
  background-color: #e7eeff;
  width: 30%;
  min-height: 4rem;
`;
const RowSelect = styled.div`
  border: solid DimGray 1px;
  background-color: #e7eeff;
  width: 30%;
  min-height: 4rem;
`;



const TableSelect = styled.div`
  width: 100%;
  display:flex;
  justify-content: space-around;
  align-items: center;
`;

const VarContainers = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
`

const TableDisplay = styled.div``;

const RowLabels = styled.div``;

const Drag = ({
  children,
  data,
  keyVar,
  setKeyVar,
  columnVar,
  setColumnVar,
  rowVar,
  setRowVar,
  outputVar,
  setOutputVar,
  setTableData,
  columnValues,
  setColumnValues,
  rowList,
  setRowList,
  columnList,
  setColumnList,
  tableData,
  rowHeaders,
  setRowHeaders
}) => {
  const [dragState, setDragState] = useState({
    "label":"",
    "from":""
  });
  // const [rowDepth, setRowDepth] = useState<number>(0);

  const handleOnDrag = (label:string, from:string) => {
    setDragState({
      "label":label,
      "from": from
    });
  };

  const handleOnDrop = (to:string) => {
    if (dragState.from === to) {
      return;
    };
    const tempLabel = dragState.label;
    const tempFrom = dragState.from;
    switch(tempFrom) {
      case "key":
        setKeyVar(removeFromList(keyVar, tempLabel));
        break;
      case "column":
        setColumnVar(removeFromList(columnVar, tempLabel));
        break;
      case "row":
        setRowVar(removeFromList(rowVar, tempLabel));
        break;
      default:
    };
    switch(to) {
      case "key":
        setKeyVar([...keyVar, tempLabel]);
        break;
      case "column":
        setColumnVar([...columnVar, tempLabel]);
        break;
      case "row":
        setRowVar([...rowVar, tempLabel]);
        break;
      default:
    };
  };

  const handleDragOver = (e:React.DragEvent) => {
    e.preventDefault();
  };

  const addOutput = (label) => {
    if(outputVar.includes(label)){
      setOutputVar(removeFromList(outputVar,label));
    } else {
      setOutputVar([...outputVar, label]);
    }
  }



  // const createNestedRow = (keys,obj,label) => {
  //   let outputObj = {}

  //   // const keys = Object.keys(obj);
  //   console.log("nested 1", obj, keys);
  //   keys.map((key)=>{
  //     let tempObj = groupBy(obj[key], label);
  //     const keys2 = Object.keys(tempObj);
  //     console.log("nested 2",keys, key, obj[key], keys2, tempObj)
  //     // createNestedRow(keys2, tempObj, key)
  //     keys2.map((key2, index)=>{
  //       //let tempObj2 = groupBy(obj[key2], key);
  //       console.log("nested 3", key2, tempObj[key2], index)
  //     })
  //   })

  //   return outputObj;
  // };

  // const createRows = (label:string) => {
  //   const tempValues = findValues(data, label);
  //   setRowList([...rowList,tempValues]);
  //   //console.log(tempValues)
  //   // let tempSourceObj = tableData;

  //   // let returnedObj = createNestedRow(tempSourceObj, label);

    

  //   if(isObjectEmpty(tableData)){

  //     setTableData(groupBy(data,label));
  //   } else {
  //     let sourceKeys = Object.keys(tableData);
  //     //console.log("Charles what are we starting with?", tableData, sourceKeys);
  //     let tempObj = tableData;
  //     sourceKeys.map((key,index)=>{
  //       let split = groupBy(tempObj[key], label)
  //       //console.log("This is the second set of keys", key, tempObj[key], label, split);
  //       tempObj[key] = split;
  //     })
  //     setTableData(tempObj)
  //     //console.log("Charles is this transformed", tempObj)
  //     // let returnedObj = createNestedRow(sourceKeys, tableData, label)
  //     // console.log("What is the returned object", sourceKeys,returnedObj)
  //     // const values = Object.keys(tableData);
  //     // const tempObj = {};
  //     // values.map((value)=>{
  //     //   let tempSplit = groupBy(tableData[value], label)
  //     //   console.log("Charles is this the data I need?", value, tableData[value], label, tempSplit)
  //     //   tempObj[value] = tempSplit;
  //     // })
  //     // console.log("Charles what is the tempObj?", tempObj)
  //     // //console.log("creating rows", tableData,values, groupBy(data,label))
  //   }
    
  // };

  // useEffect(()=>{
  //   //console.log("rowVar has updated", rowVar, rowVar.length, rowList, tableData)
  //   // const tempValues = findValues(data, rowVar[rowVar.length-1]);
  //   // console.log("tempValues", tempValues)
  //   // let tempList = rowList;
  //   // tempList.push(tempValues);
  //   // console.log(
  //   //   "tempList", tempList
  //   // )
  //   // setRowList(tempList);

  //   // if(isObjectEmpty(tableData)){
  //   //   setTableData(groupBy(data,rowVar[rowVar.length-1]));
  //   // }

  //   if(rowVar.length === 0) {
  //     setTableData({})
  //     console.log("new set")
  //   }
  //   if(rowVar.length === 1) {
  //     setTableData(groupBy(data,rowVar[rowVar.length-1]));
  //     console.log("first entry")
  //   }
  //   if(rowVar.length === 2) {
  //     let tempObj = tableData;
  //     console.log("second entry", tempObj, tempValues, rowVar[rowVar.length-1])
  //     // tempValues.map((row,index)=>{
  //     //   let tempData = groupBy(tableData[row], rowVar[rowVar.length-1])
  //     //   console.log("nested 2", tableData[row], tempData);
  //     //   tempObj[row] = tempData;
  //     // })
  //     setTableData(tempObj)
  //   }





  //   // if(rowVar.length > 0){
  //   //   rowVar.map((row,index)=> {
  //   //     const tempValues = findValues(data, row);
  //   //     const tempData = groupBy(data,row)
  //   //     console.log("rowVar row", row, rowVar.length-1, index, tempValues[rowVar.length-1], tempData);
  //   //     // setRowList([...rowList,tempValues]);
  //   //   })
  //   // }
  // },[rowVar])


  // useEffect(()=>{
  //   console.log("tableData has updated", tableData)
  // },[tableData])



  // const createColumns = (label:string) => {
  //   const tempObj = {};
  //   tempObj[label] = findValues(data, label);
  //   setColumnValues({...columnValues,...tempObj});
  // };

  


  // useEffect(()=>{
  //     const tempKeyArr = Object.keys(tableData);
  //     tempKeyArr.map(row=>{
  //       console.log("updated",tableData[row], isObjectEmpty(tableData[row]))
  //     })
  //     console.log("Table Data updated", tableData, isObjectEmpty(tableData), tempKeyArr)


  //     // const tempKeyArr = Object.keys(tableData);
  //     // console.log("Charles what is happening?", rowList,tableData,tempKeyArr > 0)
  //     // if(tempKeyArr.length > 0) {
  //     //   if (rowList.length == 0) {
  //     //     console.log("Charles what is the rowList", rowList)
  //     //     // setRowList(rowList.push(tempKeyArr))
  //     //   } else {
  //     //     setRowList([...rowList,tempKeyArr]);
  //     //   }
  //     // }
  // },[tableData]);


  // useEffect(()=>{
  //   console.log("Charles the rowList is updated", rowList)
  //   //setRowDepth(rowList.length);
  // },[rowList])

  // useEffect(()=>{
  //   if(columnVar.length>0){
  //     columnVar.map((key:string)=>{
  //       setColumnList(columnValues[key])
  //     })
  //   }
  // },[columnVar])

  // useEffect(()=>{
  //   console.log("Charles what is the rowList", rowList)

  // },[rowList])





  return (
    <>
    <Header>
      <h4>Drag the variables below to either the row or column to create pivot table</h4>
      <Variables
        onDrop={() => handleOnDrop("key")}
        onDragOver={handleDragOver}
      >

      {keyVar && keyVar.map((varKey:string, index:number)=>(
        <Var
          tabIndex={index}
          key={index}
          draggable
          onDragStart={()=>handleOnDrag(varKey,"key")}
        >
          {varKey}
        </Var>
      ))}
      </Variables>
    </Header>
    <Main>  
      <TableContainer>
      <VarContainers>
          <RowSelect
            onDrop={() => handleOnDrop("row")}
            onDragOver={handleDragOver}
          >
            <h3>Row</h3>
            <TableSelect>
              {rowVar && rowVar.map((varRow:string, index:number)=>(
                <Var
                  key={index}
                  draggable
                  onDragStart={()=>handleOnDrag(varRow,"row")}
                >
                  {varRow}
                </Var>
              ))}
            </TableSelect>
          </RowSelect>
    
          <ColumnSelect
            onDrop={() => handleOnDrop("column")}
            onDragOver={handleDragOver}
          >
            <h3>Column</h3>
            <TableSelect>
              {columnVar && columnVar.map((varCol:string, index:number)=>(
                <Var
                  key={index}
                  draggable
                  onDragStart={()=>handleOnDrag(varCol,"column")}
                >
                  {varCol}
                </Var>
              ))}
            </TableSelect>
          </ColumnSelect>
      </VarContainers>
      
      <TableDisplay>
        {/* <RowLabels>
          {rowVar && Object.keys(tableData).map((row, index)=> (
            <>
              <div>
                {row}
                {rowVar.length > 1 
                ? (Object.keys(tableData[row]).map((row2,index2)=>{
                  //console.log( row, tableData[row])
                    return(
                      <div>{row2}</div>
                    )
                }))
                :((<div></div>))
              }
              </div>
              <div>
                {row+" Total"}
              </div>
              </>
            )
          )}
          <div>{
            "Overall totals"
          }</div>


        </RowLabels> */}
        {children}
      </TableDisplay>
    </TableContainer>
    <OutputContainer>
        <h3>Output</h3>
        <OutputSelect>
          {(data.length > 0) && Object.keys(data[0].metric).map((varOutput, index:number)=>(
            <OutputCheckbox>
              <label>
                {varOutput}
                <input
                  type='checkbox'
                  onChange={()=>addOutput(varOutput)}
                />
              </label>
            </OutputCheckbox>
          ))}
        </OutputSelect>
    </OutputContainer>
    </Main>
    </>
  );
};

export default Drag;
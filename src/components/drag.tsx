import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import { removeFromList } from '../utils/utils';

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
  background-color: #4f75cb;
  color: white;
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

const ColumnSelect = styled.div`
  flex:3;
  min-height: 4rem;
  padding: 2rem;
  display:flex;
  flex-direction: column;
  border-radius: 6px;
  h3 {
    margin: 0;
  }
`;
const RowSelect = styled.div`
  flex:2;
  margin-right: 2rem;
  min-height: 4rem;
  padding: 2rem;
  display:flex;
  flex-direction: column;
  border-radius: 6px;
  h3 {
    margin: 0;
  }
`;

const TableSelect = styled.div`
  border: solid lightgray 1px;
  background-color: #e7eeff;
  width: 100%;
  display:flex;
  justify-content: space-around;
  align-items: center;
  min-height: 4rem;
  border-radius: 6px;
`;

const VarContainers = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
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
}) => {
  const [dragState, setDragState] = useState({
    "label":"",
    "from":""
  });

  const handleOnDrag = (label:string, from:string) => {
    setDragState({
      "label":label,
      "from": from
    });
  };

  const handleOnDrop = (to:string) => {
    const tempLabel = dragState.label;
    const tempFrom = dragState.from;

    if (dragState.from === to) {
      return;
    };
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
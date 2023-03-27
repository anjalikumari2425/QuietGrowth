import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Admin.css';
import { TextField, Button } from '@mui/material';

export default function Admin(props) {
  const {data, addData, updateData} = props;
  const [localData, setLocalData] = useState(data);
  const [isEditingAllowed, setIsEditingAllowed] = useState(false);
  const [addNewValue, setAddNewValue] = useState({});

  const removeItem = (index) => {
    const updatedLocalData = {...localData};
    delete updatedLocalData[index];
    setLocalData(updatedLocalData);
  }

  const update = () => {
    setIsEditingAllowed(!isEditingAllowed);
    updateData(localData);
  }

  const cancel = () => {
    setIsEditingAllowed(!isEditingAllowed);
    setLocalData(data);
  }

  const addItem = () => {
    console.log("local add item", addNewValue);
    addData(addNewValue);
    setAddNewValue({});
  }
  
  const handleInputChange = (index, key, value) => {
    const updatedLocalData = {...localData};
    updatedLocalData[index][key] = value;
    setLocalData(updatedLocalData);
  }

  const handleAddNewElementChange = (key, val) => {
    const newData = {...addNewValue};
    newData[key] = val;
    setAddNewValue(newData);
  }

  return (
    <div>
      <div>
          <TextField 
            size={'small'} 
            type={'number'}
            value={addNewValue['hh']}
            equired 
            onChange={(e) => {handleAddNewElementChange('hh', e.target.value)}}/>
            <TextField 
            size={'small'} 
            type={'number'} 
            value={addNewValue['mm']}
            required 
            onChange={(e) => {handleAddNewElementChange('mm', e.target.value)}}/>
            <Button onClick={() => {addItem()}}>Add</Button>
      </div>
      {Object.keys(localData).map((element) => {
        console.log(element);
        let item = localData[element];
        console.log(item);
        let index = element;
        return (
          <div id={index}>
            <TextField 
            value={item['hh']} 
            size={'small'} 
            type={'number'} r
            equired 
            disabled={!isEditingAllowed}
            onChange={(e) => {handleInputChange(index, 'hh', e.target.value)}}/>
            <TextField 
            value={item['mm']} 
            size={'small'} 
            type={'number'} 
            required 
            disabled={!isEditingAllowed}
            onChange={(e) => {handleInputChange(index, 'mm', e.target.value)}}/>
            {isEditingAllowed && <Button onClick={() => {console.log("remove", index);
          removeItem(index)}}>Remove</Button>}
          </div>
        )
      })}
      {/* Object.values(localData).map((item, index) => {
        return (
          <div id={index}>
            <TextField 
            value={item['hh']} 
            size={'small'} 
            type={'number'} r
            equired 
            disabled={!isEditingAllowed}
            onChange={(e) => {handleInputChange(index, 'hh', e.target.value)}}/>
            <TextField 
            value={item['mm']} 
            size={'small'} 
            type={'number'} 
            required 
            disabled={!isEditingAllowed}
            onChange={(e) => {handleInputChange(index, 'mm', e.target.value)}}/>
            {isEditingAllowed && <Button onClick={() => {console.log("remove", index);
          removeItem(index)}}>Remove</Button>}
          </div>
        )}
      ) */}
      {/* } */}
      <Button onClick={() => {update()}}>Update</Button>
      {isEditingAllowed && <Button onClick={() => {cancel()}}>Cancel</Button>}
  </div>
  )
}
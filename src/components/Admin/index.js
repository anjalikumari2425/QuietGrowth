import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, IconButton, Button, useMediaQuery} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Admin.css';
import { getDisplayName } from '@mui/utils';

export default function Admin(props) {
  const {data, addData, updateData} = props;
  console.log("Admin Admin", data);
  const [localData, setLocalData] = useState(data);
  const [isEditingAllowed, setIsEditingAllowed] = useState(false);
  const [addNewValue, setAddNewValue] = useState({});
  const [temp, setTemp] = useState({});

  const removeItem = (index) => {
    const updatedLocalData = {...localData};
    delete updatedLocalData[index];
    setLocalData(updatedLocalData);
  }

  useEffect (() => {
    console.log("useEffect", data);
    setLocalData(data);
  },[data]);

  const update = () => {
    if(isEditingAllowed) {
      updateData(temp);
    } else {
      setTemp(localData);
    }
    setIsEditingAllowed(!isEditingAllowed);
  }


  const cancel = () => {
    setIsEditingAllowed(!isEditingAllowed);
    console.log("cancel ", data);
    setLocalData(data);
  }

  const addItem = () => {
    console.log("local add item", addNewValue);
    if(Object.keys(addNewValue).length !== 0 && addNewValue['hh'] !== '' && addNewValue['mm'] !== '') {
      addData(addNewValue);
      setAddNewValue({'hh':'', 'mm':''});
    }
  }
  
  const handleInputChange = (index, key, value) => {
    console.log('handleInputChange', data);
    const updatedLocalData = {...temp};
    updatedLocalData[index][key] = value;
    setTemp(updatedLocalData);
  }

  const handleAddNewElementChange = (key, val) => {
    const newData = {...addNewValue};
    if (key === 'hh' && /^\d*$/.test(val) && val <= 23) {
      newData[key] = parseInt(val, 10);
    } else if(key === 'mm' && /^\d*$/.test(val) && val <= 59) {
      newData[key] = parseInt(val, 10);
    }
    setAddNewValue(newData);
  }

  const isMobile = !(
    useMediaQuery('(min-width:768px)', { noSsr: true }) &&
    window.screen.height < window.screen.width
  );

  const displayTable = () => {
    return (
      <div>
      <table>
         <thead>
         <tr>
           <th>
             HH
           </th>
           <th>
             MM
           </th>
         </tr>
         </thead>
         {Object.keys(localData).map((element) => {
           let item = localData[element];
            return (<tr>
              <td>{item?.hh}</td>
              <td>{item?.mm}</td>
            </tr>)})
          }
       </table> 
    </div>
    )
  }

  const getInputTable = () => {
    console.log("local data, data", localData, data);
    return (Object.keys(temp).map((element) => {
      // let item = temp[element];
      // let index = element;
      return (
        <div  style={{marginBottom: '0.5em'}} id={element}>
          <TextField
          sx={{width: '30%' , marginRight: '0.75em', marginLeft: '0.5em'}} 
          value={temp[element]['hh']} 
          size={'small'} 
          type={'number'}
          required={true} 
          disabled={!isEditingAllowed}
          onChange={(e) => {handleInputChange(element, 'hh', e.target.value)}}/>
          <TextField 
          sx={{width: '30%', marginRight: '0.75em', marginLeft: '0.5em'}}
          value={temp[element]['mm']} 
          size={'small'} 
          type={'number'} 
          required={true} 
          disabled={!isEditingAllowed}
          onChange={(e) => {handleInputChange(element, 'mm', e.target.value)}}/>
          {isEditingAllowed && <Button onClick={() => {console.log("remove", element);
        removeItem(element)}}>Remove</Button>}
        </div>
      )
    }))
  }

  return (
    <div className='admin-container'>
      <div className='admin'>
        <div className='admin-input'>
        <TextField
            sx={{marginRight: '1em', width: isMobile ? '30%': '100%'}} 
            size={'small'} 
            type={'number'}
            value={addNewValue['hh']}
            required={true} 
            placeholder={'HH'}
            onChange={(e) => {handleAddNewElementChange('hh', e.target.value)}}/>
            <TextField
            sx={{marginRight: '1em', width: isMobile ? '30%': '100%'}}
            size={'small'} 
            type={'number'} 
            value={addNewValue['mm']}
            placeholder={'MM'}
            required={true} 
            onChange={(e) => {handleAddNewElementChange('mm', e.target.value)}}/>
        </div>
        <Button disableRipple={true} onClick={() => {addItem()}}>Add</Button>
      </div>
      {isEditingAllowed ? getInputTable() : displayTable()}
      <div className='button'>
      <Button onClick={() => {update()}}>Update</Button>
      {isEditingAllowed && <Button onClick={() => {cancel()}}>Cancel</Button>}
      </div> 
  </div>
  )
}
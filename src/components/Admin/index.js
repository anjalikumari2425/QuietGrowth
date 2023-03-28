import React, { useState, useEffect } from 'react';
import './Admin.css';
import { TextField, Button, useMediaQuery} from '@mui/material';

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

  useEffect (() => {
    setLocalData(data);
  },[data]);

  const update = () => {
    setIsEditingAllowed(!isEditingAllowed);
    updateData(localData);
  }

  const cancel = () => {
    setIsEditingAllowed(!isEditingAllowed);
    setLocalData(data);
  }

  const addItem = () => {
    if(Object.keys(addNewValue).length !== 0 && addNewValue['hh'] !== '' && addNewValue['mm'] !== '') {
      addData(addNewValue);
      setAddNewValue({'hh':'', 'mm':''});
    }
  }
  
  const handleInputChange = (index, key, value) => {
    const updatedLocalData = {...localData};
    if (key === 'hh' && /^\d*$/.test(value) && value <= 23) {
      updatedLocalData[index][key] = parseInt(value, 10);
    } else if(key === 'mm' && /^\d*$/.test(value) && value <= 59) {
      updatedLocalData[index][key] = parseInt(value, 10);
    }
    setLocalData(updatedLocalData);
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
    return (Object.keys(localData).map((element) => {
      let item = localData[element];
      let index = element;
      return (
        <div  style={{marginBottom: '0.5em'}} id={index}>
          <TextField
          sx={{width: '30%' , marginRight: '0.75em', marginLeft: '0.5em'}} 
          value={item['hh']} 
          size={'small'} 
          type={'number'}
          required={true} 
          disabled={!isEditingAllowed}
          onChange={(e) => {handleInputChange(index, 'hh', e.target.value)}}/>
          <TextField 
          sx={{width: '30%', marginRight: '0.75em', marginLeft: '0.5em'}}
          value={item['mm']} 
          size={'small'} 
          type={'number'} 
          required={true} 
          disabled={!isEditingAllowed}
          onChange={(e) => {handleInputChange(index, 'mm', e.target.value)}}/>
          {isEditingAllowed && <Button onClick={() => {removeItem(index)}}>Remove</Button>}
        </div>
      )
    }))
  }

  const isMobile = !(
    useMediaQuery('(min-width:768px)', { noSsr: true }) &&
    window.screen.height < window.screen.width
  );

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
      <Button disableRipple={true} onClick={() => {addItem()}}>Add</Button>
      </div>
      {isEditingAllowed ? getInputTable() : displayTable()}
      <Button onClick={() => {update()}}>Update</Button>
      {isEditingAllowed && <Button onClick={() => {cancel()}}>Cancel</Button>}
      </div>
  </div>
  )
}
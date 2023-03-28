import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Admin from './components/Admin';
import User from './components/User';
import Role from './components/Role';

function App() {
  const initialData = JSON.parse(localStorage.getItem('data'));
  if(!initialData) {
    localStorage.setItem('data', JSON.stringify({}));
  }
  const [role, setRole] = useState('admin');
  const [persistedData, setPersistedData] = useState(JSON.parse(localStorage.getItem('data')));

  const addData = (newData) => {
    const index = Object.keys(persistedData).length;
    const updatedPersistedData = {...persistedData};
    updatedPersistedData[index] = newData;
    localStorage.setItem('data', JSON.stringify(updatedPersistedData));
    setPersistedData(updatedPersistedData);
  };

  const updateData = (newData) => {
    localStorage.setItem('data', JSON.stringify(newData));
    setPersistedData(newData);
  };

  const onChangeWrapper = useCallback(
    (_, newValue) => {
      setRole(newValue);
    },
  );

  const getRoleUI = () => {
    return (role === 'admin' 
    ? <Admin data={persistedData} addData={addData} updateData={updateData}/> 
    : <User data={persistedData}/>)
  }

  return (
    <div className="App">
      <div className='display-container'>
      <FormControl className='form'>
        <FormLabel className='form-label'>Select Role</FormLabel>
          <RadioGroup
            row={true}
            name="radio-buttons-group"
            onChange={onChangeWrapper}
            value={role}
          >
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>
      </FormControl>
        {/* {getRoleUI()} */}
        <Role role={role} data={persistedData} addData={addData} updateData={updateData}/>
      </div>
    </div>
  );
}

export default App;

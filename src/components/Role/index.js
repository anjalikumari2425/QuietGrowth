import React, { useState, useEffect, useRef, useCallback } from 'react';
import Admin from '../Admin';
import User from '../User';
// import './User.css';

export default function Role(props) {
  const {role, data, addData, updateData} = props;
  console.log("role role", data);

  const getRoleUI = () => {
    if(role === 'admin') {
      return <Admin data={data} addData={addData} updateData={updateData}/> 
    } else {
      return <User data={data}/>
    }
  }

  // useEffect(() => {
  //   console.log('Role use effect', data);
  // },[data]);

  return (
    <div>
      {getRoleUI()}
    </div>
  )
}
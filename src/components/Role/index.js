import React, { useState, useEffect, useRef, useCallback } from 'react';
import Admin from '../Admin';
import User from '../User';

export default function Role(props) {
  const {role, data, addData, updateData} = props;

  const getRoleUI = () => {
    if(role === 'admin') {
      return <Admin data={data} addData={addData} updateData={updateData}/> 
    } else {
      return <User data={data}/>
    }
  }

  return (
    <div>
      {getRoleUI()}
    </div>
  )
}
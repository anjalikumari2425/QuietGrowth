import React, { useState, useEffect, useRef, useCallback } from 'react';
import './User.css';

export default function User(props) {
  const {data} = props;
  console.log('user user', data);
  return (
    Object.values(data).map((item, index) => {
      return (
          <div>{item['hh']} : {item['mm']}</div>
      )
    })
  )
}
import React, { useState, useEffect } from 'react';
import './User.css';

export default function User(props) {
  const {data} = props;
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
         {Object.values(data).map((item, index) => {
            return (<tr>
              <td>{item['hh']}</td>
              <td>{item["mm"]}</td>
            </tr>)})
          }
       </table> 
    </div>
    
  )
}
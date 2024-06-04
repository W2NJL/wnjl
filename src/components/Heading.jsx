import React from 'react'

export default function Heading(props) {
  return (
    <>
   <h1 
   onClick={props.click}
   
   style={{fontSize: props.size + 'px', color: props.color}}>
      {props.children}</h1>
      <h2>something</h2>
      </>
  )
}

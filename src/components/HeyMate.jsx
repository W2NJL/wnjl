import React from 'react'
import { GlobalContext } from '../store/GlobalStore'

export default function HeyMate() {
  return (
   <GlobalContext.Consumer>
      {
            store => (
<div>
   
</div>
            )
        }
   </GlobalContext.Consumer>
  )
}

import React from 'react'
import './TableWrapper.css'

const TableWrapper = (props) => {
  return (
    <div className='table-wrapper' >
      {props.children}
    </div>
  )
}

export default TableWrapper
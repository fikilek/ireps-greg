import React from 'react'
import './TableHeader.css'
import { MdClose } from 'react-icons/md';
import useModal from '../../hooks/useModal';

const TableHeader = (props) => {
  console.log(`props`, props)
  const { trnType, handleSubmit } = props
  const {closeModal} = useModal()

  	const headerName =  <p className='thl-header-name' >	New {` ${trnType} `} Trn</p> ;

  return (
			<div className="th">
				<div className="th-left">
					{headerName}
					<div></div>
				</div>
				<div className="th-right">
					<button className="th-right-submit-btn" onClick={() => handleSubmit()}>
						submit
					</button>
					<button className="th-right-close-btn" onClick={() => closeModal()}>
						X
					</button>
				</div>
			</div>
		);
}

export default TableHeader
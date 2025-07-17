import React from 'react'

const Dropdown = ({title,options,func,styleDt}) => {
    return (
    <div className={`custom-dropdown ${styleDt}`}>
      <select id="sort-select" className="p-2 px-4" onChange={func}>
        <option>{title}</option>
        {
            options.map((o,i)=>(
                <option key={i} value={o} className='text-white'>{o.toUpperCase()}</option>
            ))
        }
      </select>
    </div>

    )
}

export default Dropdown
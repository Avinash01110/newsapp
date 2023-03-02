import React from 'react'
import loading from './loading.gif' 

const Spinner = ()=>{
    return (
        <div>
            <img className='h-8'src={loading} alt="loading" />
        </div>
    )
}

export default Spinner

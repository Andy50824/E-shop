import React from 'react'
import {Spinner} from 'react-bootstrap'

function Loader() {
  return (
    <Spinner animation="border" role="status" variant="info" 
        style={{
            margin: 'auto',
            height: '100px',
            width: '100px',
            display: 'block',
             }}>
        <span className='sr-only'>loader...</span>
    </Spinner>
  )
}

export default Loader
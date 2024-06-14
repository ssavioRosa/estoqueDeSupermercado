import './displayValor.css'

import React from 'react'

const displayValor = ({ valorTotal }) => {
  return (
    <div className='displayValor'>
      <h2>Valor total em produtos</h2>
      <p>{valorTotal}</p>
    </div>
  )
}

export default displayValor
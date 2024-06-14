import Axios from 'axios'
import './listar.css'
import React, { useState } from 'react'
import { FaTools } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { MdDeleteForever } from "react-icons/md"
import { FaSearch } from "react-icons/fa"

const listar = ({ setTelaFormulario, produtos }) => {

  const handleClickDelete = (id) => {
    Axios.delete(`http://localhost:3001/deleteProduto/${id}`).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.error(error)
    })
    window.location.reload()
  }

  const [busca, setBusca] = useState('')

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome_produto.toLowerCase().startsWith(busca.toLowerCase())
  );

  return (
    <div className='listar'>
      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th className='iconeTools'><FaTools /></th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto, index) => {
              return (
                <tr key={index}>
                  <td>{produto.nome_produto}</td>
                  <td>{produto.quantidade_produto} un</td>
                  <td>{produto.valor_produto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <div className="iconeToolsTd">
                    <td><FaEdit className='edita' onClick={() => setTelaFormulario(produto.id_produto)} /></td>
                    <td><MdDeleteForever className='deleta' onClick={() => handleClickDelete(produto.id_produto)} /></td>
                  </div>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
      <div className="buscar">
        <input type="text"
          placeholder='buscar'
          value={busca}
          onChange={(e) => setBusca(e.target.value)} />
        <FaSearch className='iconBusca' />
      </div>
    </div>
  )
}

export default listar
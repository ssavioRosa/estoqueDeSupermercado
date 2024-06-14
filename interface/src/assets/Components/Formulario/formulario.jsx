import './formulario.css'

import React, { useState } from 'react'
import Axios from 'axios'

const formulario = ({ telaFormulario, setTelaFormulario }) => {

    const [produto, setProduto] = useState({
        nomeProduto: '',
        quantidadeProduto: '',
        precoProduto: ''
    })
    const handleChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target

        setProduto({ ...produto, [name]: value })
    }

    const handleClickAdiciona = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/AdicionaProduto", {
            nomeProduto: produto.nomeProduto,
            quantidadeProduto: produto.quantidadeProduto,
            precoProduto: produto.precoProduto
        }).then((respota) => {
            console.log(respota.data)
        })
        window.location.reload()
    }

    const handleClickEdita = (e) => {
        e.preventDefault()
        Axios.put("http://localhost:3001/EditaProduto", {
            idEdita: telaFormulario,
            nomeEdita: produto.nomeProduto,
            quantidadeEdita: produto.quantidadeProduto,
            precoEdita: produto.precoProduto

        }).then((resposta) => {
            console.log(resposta.data)
        })
        window.location.reload()
    }

    console.log(produto)


    return (
        <>

            {telaFormulario < 0 && (
                <div className="cadastrar">
                    <h1>Adicionar Produto</h1>

                    <form>
                        <input
                            type="text"
                            placeholder='Nome do produto'
                            required
                            name='nomeProduto'
                            value={produto.nomeProduto}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder='Quantidade'
                            name='quantidadeProduto'
                            value={produto.quantidadeProduto}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder='Valor total do produto'
                            name='precoProduto'
                            value={produto.precoProduto}
                            onChange={handleChange}
                        />

                        <button onClick={handleClickAdiciona}> Adicionar </button>

                    </form>
                </div>
            )}
            {telaFormulario > 0 && (
                <div className="editar">
                    <h1>Editar Produto</h1>

                    <form>
                        <input
                            type="text"
                            placeholder='Nome do produto'
                            required
                            name='nomeProduto'
                            value={produto.nomeProduto}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder='Quantidade'
                            required
                            name='quantidadeProduto'
                            value={produto.quantidadeProduto}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            placeholder='Valor total do produto'
                            required
                            name='precoProduto'
                            value={produto.precoProduto}
                            onChange={handleChange}
                        />

                        <button onClick={handleClickEdita}> Editar </button>
                        <button onClick={() => setTelaFormulario(-1)} className="cancelaEdicao">Cancelar</button>
                    </form>
                </div>


            )}

        </>
    )
}

export default formulario
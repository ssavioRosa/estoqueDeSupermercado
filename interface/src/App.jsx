import './App.css'
import Formulario from './assets/Components/Formulario/formulario'
import DisplayValor from './assets/Components/Display/displayValor'
import Listar from "./assets/Components/Listar/listar"
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { IoMdAddCircleOutline } from "react-icons/io";

function App() {
  const [telaFormulario, setTelaFormulario] = useState(-1)
  const [produtos, setProdutos] = useState([])
  const [valorTotal, setValorTotal] = useState(0)
  const [telaInicial, setTelaInicial] = useState(0)

  useEffect(() => {
    Axios.get('http://localhost:3001/pegaDados').then((resposta) => {
      setProdutos(resposta.data);
      const somaValores = calcularTotal(resposta.data)
      setValorTotal(somaValores)
      salvarValorTotal(somaValores)
      if (resposta.data.length > 0) {
        setTelaInicial(1);
      } else {
        setTelaInicial(0);
      }
    });
  }, []);
  

  console.log(telaInicial)
  const calcularTotal = (produtos) => {
    return produtos.reduce((total, produto) => total + produto.valor_produto, 0)
  }


  const salvarValorTotal = (valor) => {
    localStorage.setItem('valorTotal', JSON.stringify(valor))
  }

  const handleClickInicia = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/inicializar')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

      setTelaInicial(1);
  }

  return (
    <>
      <div className="tituloTopo">
        <h1 >Estoque de Supermercado</h1>
      </div>
      <div className='interface '>
        {telaInicial === 1 && (
          <>
            <div className='telas'>
              <Formulario telaFormulario={telaFormulario} setTelaFormulario={setTelaFormulario} />
              <DisplayValor valorTotal={valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
            </div>
            <Listar setTelaFormulario={setTelaFormulario} produtos={produtos} />
          </>
        )}
        {telaInicial === 0 && (
            <>
              <div className="add">
                    <button onClick={handleClickInicia} className='newProduto'>
                          <IoMdAddCircleOutline className='iconAdd' />
                    </button>
                    <h3>Add.</h3>


              </div>
            
            </>
        )}

      </div>
    </>
  )
}

export default App

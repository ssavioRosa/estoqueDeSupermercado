//Inicia servidor
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3001, () => {
    console.log('servidor rodando na porta 3001')
})

//Cria conexão banco de dados
const mysql = require('mysql2')

const bancoDeDados = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "bruna",
    database: "estoque_supermarcado",
})

//Inicia cors
const cors = require("cors")
app.use(cors())

//Req HTTP

app.post('/AdicionaProduto', (req, res) => {
    const { nomeProduto } = req.body;
    const { quantidadeProduto } = req.body;
    const { precoProduto } = req.body;

    const sql = 'INSERT INTO produtos (nome_produto, quantidade_produto, valor_produto) VALUES (?, ?, ?)'

    bancoDeDados.query(sql, [nomeProduto, quantidadeProduto, precoProduto], (err, resul) => {
        if (err) {
            console.log(err)
        } else {
            console.log(resul)
        }
    })


})
app.post('/inicializar', (req, res) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS produtos (
        id_produto int NOT NULL AUTO_INCREMENT,
        nome_produto varchar(99) NOT NULL,
        quantidade_produto int NOT NULL,
        valor_produto float NOT NULL,
        PRIMARY KEY (id_produto)
      ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `;
    bancoDeDados.query(sql, (err, resul) => {
        if (err) {
            console.log(err)
        } else {
            console.log(resul)
        }
    })
  });
  

app.get('/pegaDados', (req, res) => {
    const sql = 'SELECT * FROM produtos'

    bancoDeDados.query(sql, (err, resul) => {
        if (err) {
            console.log(err)

        } else {
            res.send(resul)
        }
    })
})
app.put('/EditaProduto', (req, res) => {
    const { idEdita } = req.body;
    const { nomeEdita } = req.body;
    const { quantidadeEdita } = req.body;
    const { precoEdita } = req.body;



    const sql = ' UPDATE produtos SET nome_produto = ?, quantidade_produto = ?, valor_produto = ? WHERE id_produto = ?'

    bancoDeDados.query(sql, [nomeEdita, quantidadeEdita, precoEdita, idEdita], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })

})

app.delete('/deleteProduto/:id', (req, res) => {
    const { id } = req.params;

    console.log(id)

    const sql = 'DELETE FROM produtos WHERE id_produto = ?'

    bancoDeDados.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })

})
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

// TESTAR RETORNO
const tipo = 'acomodacoes'

// CONSULTA TODOS
router.get('/', login.optional, (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acomodacoes WHERE ativo = 1',
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    response: resultado //resultado
                })
            }
        )
    })
});

// RETORNO UNICO
router.get('/:id', login.optional, (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acomodacoes WHERE id = ?',
            [req.params.id],
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    response: resultado //resultado
                })
            }
        )
    })
});

// CONSULTA DATA
router.get('/listar-disponiveis', login.optional, (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acomodacoes WHERE ativo = 1 ',
            (error, resultado, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    response: resultado //resultado
                })
            }
        )
    })
});

// RESERVAS

// INSERIR USUARIO
router.post('/reserva/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
                    conn.query(
                        'call buscarCalendario (5, 5, 95, "24/11/2021", "26/11/2021", 2, 100, 200, "26/11/2021", 5,"26/11/2021", 5)',
                        //[req.body.usuario, hash, req.body.nome, req.body.data],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                mensagem: 'Cadastrado com sucesso'//,
                                //id: resultado.insertId,
                                //email: req.body.usuario
                            })
                        }
                    )

    });
});

module.exports = router;
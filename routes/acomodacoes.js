const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

// TESTAR RETORNO
const tipo = 'acomodacoes'

// CONSULTA TODOS
router.get('/', login.required, (req, res, next) => {    
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
router.get('/:id', login.required, (req, res, next) => {    
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

module.exports = router;
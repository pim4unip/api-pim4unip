const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

// TESTAR RETORNO
const tipo = 'produtos'

// CONSULTA TODOS
router.get('/', login.required, (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos_servicos WHERE ativo = 1 and PRODUTOS_SERVICOS = "P"',
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
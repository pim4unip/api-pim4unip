const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

// TESTAR RETORNO
const tipo = 'participantes'

// INSERIR USUARIO
router.post('/cadastrar/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query ('SELECT * FROM participantes WHERE email = ?', [req.body.usuario], (error,results)=>{
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0){
                res.status(409).send({mensagem: "Usuário já cadastrado"})
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt){ return res.status(500).send ({error: errBcrypt})}
                    conn.query(
                        'INSERT INTO participantes (ativo, id_finalidades, fisica_juridica, cpf_cnpj, nome_razao,DATA_ANIVER_FUNDAC, EMAIL, SENHA) VALUES (1, 25, "F", "0", ?, ?, ?, ?)',
                        [req.body.nomecompleto,
                         req.body.datanasc,
                         req.body.usuario, 
                         hash],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                mensagem: 'Cadastrado com sucesso',
                                id: resultado.insertId,
                                email: req.body.usuario
                            })
                        }
                    )
                })
            }
        });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

// TESTAR RETORNO
const tipo = 'acesso'

// CONSULTA TODOS
router.get('/', login.required, (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acomodacoes WHERE ativo = 1',
            (error, resultado, field)) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({
                    resultado //resultado
                })
            }
        )
    })
});

/*
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
                        'INSERT INTO participantes (email, senha) VALUES (?,?)',
                        [req.body.usuario, hash],
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


// INSERIR ADMIN
router.post('/cadastrar/admin/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query ('SELECT * FROM tb_acesso WHERE usuario = ?', [req.body.usuario], (error,results)=>{
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0){
                res.status(409).send({mensagem: "Usuário já cadastrado"})
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt){ return res.status(500).send ({error: errBcrypt})}
                    conn.query(
                        'INSERT INTO tb_acesso (usuario, senha, permissao) VALUES (?,?,1)',
                        [req.body.usuario, hash],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                mensagem: 'Cadastrado com sucesso',
                                id_acesso: resultado.insertId,
                                usuario: req.body.usuario
                            })
                        }
                    )
                })
            }
        });
    });
});


/*
// RETORNO UNICO
router.post('/login/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT email, senha FROM participantes WHERE EMAIL = ?';
        conn.query(query, [req.body.usuario], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send ({mensagem: 'Usuário ou senha inválida'})
            }

            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send ({mensagem: 'Usuário ou senha inválida'})
                }
                if (result) {
                    let token = jwt.sign({
                        id: results[0].id,
                        email: results[0].usuario
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: '15d'
                    });

                    conn.query(
                       // 'UPDATE tb_acesso SET token = ? WHERE usuario = ?',
                        [token, req.body.usuario])

                    return res.status(200).send ({
                        mensagem: 'Autenticado com sucesso',
                        id: results[0].id,
                        usuario: req.body.usuario,
                        token: token
                    });
                }
                return res.status(401).send ({mensagem: 'Usuário ou senha inválida'})
            })
        })
    });         
});


// ALTERAR SENHA USUARIO
router.put('/alterar-senha/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query ('SELECT * FROM tb_acesso WHERE usuario = ?', [req.body.usuario], (error,results)=>{
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0){
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt){ return res.status(500).send ({error: errBcrypt})}
                    conn.query(
                        'UPDATE tb_acesso SET senha = ? WHERE usuario = ?',
                        [hash, req.body.usuario],
                        (error, resultado, field) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            res.status(201).send({
                                mensagem: 'Senha redefinida com sucesso',
                                usuario: req.body.usuario
                            })
                        }
                    )
                })
            } else {
                res.status(409).send({mensagem: "Usuário não encontrado"})                
            }
        });
    });
});


// RETORNO UNICO
router.post('/login/confere-token/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT * FROM tb_acesso WHERE usuario = ?';
        conn.query(query, [req.body.usuario], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send ({mensagem: 'Usuário ou senha inválida'})
            } 
            else {
                    if (req.body.token != results[0].token) {
                        return res.status(401).send ({mensagem: 'False'})
                    }else{
                        return res.status(200).send ({mensagem: 'True'})
                    }    
                }
                return res.status(401).send ({mensagem: 'Usuário ou senha inválida'})
        })
    });         
});
*/
module.exports = router;

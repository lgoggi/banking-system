import db from '../models'
import {Request, Response } from "express"

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports = {
    //SIGNUP 
    async signup(req: Request, res: Response) {
        const username: string = req.body.name
        const hashedPassword: string = await bcrypt.hash(`${req.body.password}`, 10)
        const user = await db.User.findOne({ where: { username: username } })
        if (!user) {
            const newAccount = await db.Account.create({
                defaults: { balance: 100.00 }
            })
            const newUser = await db.User.create({
                username: username,
                password: hashedPassword,
                AccountId: newAccount.id
            })
            console.log('Novo usuário criado: ', newUser.username)
            res.send('Novo usuário criado')
        } else {
            console.log('Usuário já existe: ', user.username)
            res.send('Usuário já existe: ' + user.username)
        }
    },

    //LOGIN
    async login(req: Request, res: Response) {
        if (!req.body.name && !req.body.password) res.send("error")
        const username = req.body.name
        const password = req.body.password
        const currentUser = await db.User.findOne({ where: { username: username } })
        const generateToken = (username: string) => {
            return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "24h" })
        }

        if (currentUser) {
            if (await bcrypt.compare(password, currentUser.password)) { //compara a senha atual com a hashed
                console.log("Login realizado: ", username)
                const token: string = generateToken(username)
                const hashedToken = await bcrypt.hash(`${token}`, 10) //hashed para o token não ficar exposto no db
                await db.User.update(
                    { token: hashedToken },
                    { where: { username: username } }
                )
                console.log("token gerado com sucesso para: " + username)
                res.json({ auth: true, accessToken: token, userId: currentUser.id })
            } else {
                console.log("---------> senha incorreta para ", username)
                res.send("senha incorreta")
            }
        } else {
            console.log('Usuário "', username, '" não encontrado')
            res.send('Usuário "' + username + '" não encontrado')
        }
    },

    //Auth
    async auth(req: Request, res: Response) {
        const token = req.headers['x-access-token']
        const username = req.headers['username']
        const userId = req.headers['userid']

        if (token) {
            const currentUser = await db.User.findOne({ where: { username: username, id: userId } })
            if (currentUser) {
                const hashedToken = currentUser.token
                if (await bcrypt.compare(token, hashedToken)) {
                    console.log("Autenticação bem sucedida: " + username)
                    res.send('1')
                } else res.send('0')
            } else {
                console.log("username: ", username, "e userId: ", userId, " não existem")
                res.send("username: '" + username + "' e userId: '" + userId + "' não existem")
            }
        } else res.send("nenhum token fornecido")
    },

    //LOGOUT
    async logout(req: Request, res: Response) {
        const token = req.headers['x-access-token']
        const username = req.headers['username']
        const userId = req.headers['userid']

        if (token) {
            const currentUser = await db.User.findOne({ where: { username: username, id: userId } })
            if (currentUser) {
                const hashedToken = currentUser.token
                if (await bcrypt.compare(token, hashedToken)) {
                    await db.User.update(
                        { token: null },
                        { where: { username: username } }
                    )
                    console.log(username, "deslogou com sucesso!")
                    res.send(username + " deslogou com sucesso!")
                } else res.send('token inválido!')
            } else {
                console.log(username, " não encontrado!")
                res.send(username + " não encontrado!")
            }
        } else res.send("nenhum token fornecido")
    }
}
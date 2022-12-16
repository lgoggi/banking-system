import db from '../models'
import { Request, Response } from "express"
import { Op } from 'sequelize'

const bcrypt = require('bcrypt')


module.exports = {
    async getBalance(req: Request, res: Response) {
        const token = req.headers['x-access-token']
        const username = req.headers['username']
        console.log('request for balance made by: ', username)

        if (username) {
            const current = await db.User.findOne({
                where: { username: username },
                include: db.Account
            })
            if (await bcrypt.compare(token, current.token)) {
                console.log('balance for: ', current.username, ' is :', current.Account.dataValues.balance)
                res.send('' + current.Account.dataValues.balance)
            }
        }
    },

    async transaction(req: Request, res: Response) {
        const { token, username, targetUser, tempValue } = req.body
        const value = parseFloat(tempValue)
        console.log('request for transaction made by: ', username)

        if (username) {
            const current = await db.User.findOne({
                where: { username: username },
                include: db.Account
            })
            const target = await db.User.findOne({
                where: { username: targetUser },
                include: db.Account
            })
            //valida usuário target
            if (target && username!==target.username) {
                //valida token 
                if (await bcrypt.compare(token, current.token)) { 
                    //valida saldo do usuário
                    if ( current.Account.balance >= value) { 
                        let currentNewBalance =  parseFloat(current.Account.balance) - value
                        let targetNewBalance =value + parseFloat(target.Account.balance) 

                        await db.Account.update(
                            { balance: parseFloat(currentNewBalance.toFixed(2)) },
                            { where: { id: current.Account.id } }
                        )
                        await db.Account.update(
                            { balance: parseFloat(targetNewBalance.toFixed(2)) },
                            { where: { id: target.Account.id } }
                        )
                        await db.Transaction.create({
                            value: value,
                            creditedAccountId: target.Account.id,
                            debitedAccountId: current.Account.id,
                        })
                        console.log("Tranferência realizada no valor de: '", value, "' de: '", username, "' para: '", targetUser, "'")
                        res.send("Transação realizada")
                    } else {
                        console.log('saldo insuficiente para transferência: ', current.username)
                        res.send("Saldo insuficiente")
                    }
                }
            } else {
                console.log("usuário inválido: ", targetUser)
                res.send("usuário inválido")
            }
        }
    },

    async getTransactions (req: Request, res: Response) {
        const token = req.headers['x-access-token']
        const username = req.headers['username']

        if (username) {
            const current = await db.User.findOne({
                where: { username: username },
                include: db.Account
            })
            if (await bcrypt.compare(token, current.token)) {
                const history = await db.Transaction.findAll({
                    attributes: ['id', 'value', 'creditedAccountId', 'debitedAccountId', 'createdAt'],
                    order: ['createdAt'],
                    raw: true,
                    where: {
                        [Op.or]: [
                            { creditedAccountId: current.Account.id }, 
                            { debitedAccountId: current.Account.id }
                        ],
                    },
                    include: [
                        {model: db.Account, as: 'credited', attributes: [], include: {model: db.User, attributes: ['username'], raw: false} },
                        {model: db.Account, as: 'debited', attributes: [], include: {model: db.User, attributes: ['username']} }
                    ]
                })
                res.send(history)
            } else {
                res.send('token inválido!')
            }
        } else {
            res.send('informações inválidas!')
        }
    } 
}



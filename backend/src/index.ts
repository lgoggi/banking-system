import express, { Application} from 'express'
import db from './models'

const cors = require('cors')
const app: Application = express()
const port = 8000

const {signup, login, auth, logout} = require('./controllers/usersControllers')
const {getBalance, transaction, getTransactions} = require('./controllers/accountControllers')

app.use(cors())
app.use(express.json())

//USERS ROUTES
app.get('/', (req, res) => {
    res.send('hello world')
})
app.post('/signup', signup)

app.post('/login', login)

app.get('/IsAuth', auth)

app.get('/logout', logout)

//ACCOUNT ROUTES
app.get('/balance', getBalance)

app.get('/getTransactions', getTransactions)

app.post('/transaction', transaction)


db.sequelize.sync().then(() => {
    app.listen(port, () => { console.log(`Server running on http://localhost:${port}`) })
})


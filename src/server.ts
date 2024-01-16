import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// DEPENDENCIES
import DBConnectionManager from '@shared/database/services/DBConnectionManager'

// SERVER
dotenv.config()
const app: Express = express()
const port = process.env.PORT || 3000

// MIDDLEWARE
app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use('/', (req, res) => {
  res.send('Hello World!')
})

// DATABASE CONNECTION
const dbConnectionManager = DBConnectionManager.getInstance()
dbConnectionManager.connect()

app.listen(port, () => {
  console.log(`[server⚡️]: Server is running on port: ${port}`)
  console.log(`[server⚡️]: Server enviroment: ${process.env.NODE_ENV}`)
})
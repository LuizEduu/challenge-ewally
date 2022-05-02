import express from 'express'
import errorMiddleware from '../middlewares/ErrorMiddleware'
import { router } from '../routes'

import swagger from '../../../../swagger.json'

import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(express.json())
app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(errorMiddleware)

export { app }

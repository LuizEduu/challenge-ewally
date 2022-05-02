import 'reflect-metadata'

import 'express-async-errors'
import { env } from 'process'
import { config } from 'dotenv'
import { app } from './app/App'

config()

app.listen(env.PORT, () => {
  console.log(`Server is running at port ${env.PORT as string}`)
})

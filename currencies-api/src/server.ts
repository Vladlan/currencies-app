import cors from 'cors'
import express from 'express'
import { SERVER_PORT, SERVER_START_MSG } from './constants'
import { SequelizeInstance } from './databases/postgres/sequelize'
import {
  authGuard,
  errorLoggerMiddleware,
  nodeErrorEventsHandlerMiddleware,
  unhandledErrorsHandlerMiddleware,
} from './middleware'
import { routers } from './routers'
import {
  disableWinstonLoggerForTests,
  validateSwaggerSchema,
  winstonLogger,
} from './utils'
import * as dotenv from 'dotenv'
import * as path from 'path'

if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined')

const env = dotenv.config({
  path: path.resolve(__dirname, `./../.env.${process.env.NODE_ENV}`),
}).parsed
import swaggerUi from 'swagger-ui-express'

import { ROUTE_API_DOCS, ROUTE_API_DOCS_SWAGGER } from './constants/routes'
import { openApiConfig } from './routers/apiDocs/openApiConfig'
;(async () => {
  await SequelizeInstance.sync({ force: false })

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use(nodeErrorEventsHandlerMiddleware)

  validateSwaggerSchema(openApiConfig)
  app.get(ROUTE_API_DOCS_SWAGGER, (req, res) => res.json(openApiConfig))
  app.use(
    ROUTE_API_DOCS,
    swaggerUi.serve,
    swaggerUi.setup(openApiConfig, {
      swaggerOptions: {
        displayRequestDuration: true,
        tryItOutEnabled: true,
        requestSnippetsEnabled: true,
      },
    }),
  )

  app.use(authGuard)
  routers.forEach((router) => app.use(router))

  app.use(errorLoggerMiddleware)
  app.use(unhandledErrorsHandlerMiddleware)

  const APP_PORT = Number.parseInt(env?.PORT || `${SERVER_PORT}`)
  const APP_HOST = env?.HOST
  app.listen(APP_PORT, () => {
    winstonLogger.info(SERVER_START_MSG(APP_PORT, APP_HOST))
    disableWinstonLoggerForTests()
  })
})()

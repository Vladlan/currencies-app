import SwaggerParser from '@apidevtools/swagger-parser'
import { winstonLogger } from './winstonLogger'

export const validateSwaggerSchema = (openApiConfig) => {
  SwaggerParser.validate(openApiConfig, (err) => {
    if (err) {
      winstonLogger.error(err.message)
    } else {
      winstonLogger.info(
        `swagger.json is valid. API name: ${openApiConfig.info.title}, Version: ${openApiConfig.info.version}`,
      )
    }
  })
}

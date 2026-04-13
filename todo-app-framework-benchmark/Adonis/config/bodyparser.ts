import { defineConfig } from '@adonisjs/core/bodyparser'

const bodyParserConfig = defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  form: {
    convertEmptyStringsToNull: true,
    trimWhitespaces: true,
    types: ['application/x-www-form-urlencoded'],
  },
  json: {
    convertEmptyStringsToNull: true,
    trimWhitespaces: true,
    types: ['application/json'],
  },
  multipart: {
    autoProcess: true,
    convertEmptyStringsToNull: true,
    trimWhitespaces: true,
    processManually: [],
    limit: '20mb',
    types: ['multipart/form-data'],
  },
})

export default bodyParserConfig

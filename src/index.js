import Server from 'app'
import db from 'db'
import config from 'config'
import logger from 'logger'

import webApiRoutes from './webapi'

const start = async () => {
  await db.connect(config.db.uri, logger, {})
  await Server.start(webApiRoutes, logger, {
    env: process.env.NODE_ENV,
    port: config.server.port,
  })
}

start()

import { getConnectionState } from './helpers'
import logger from 'logger'

const logDbConnectionState = (event, { readyState }) => {
  const state = getConnectionState({ readyState })

  if (!state) {
    logger.warn(`DbConnector: Unknown Db Conn State - ${readyState}`)
  }

  logger.info(`DbConnector: Event ${event} - Db Conn State: ${state}`)
}

const onProcessTermination = async (dbConn) => {
  logger.warn('DbConnector: Database connection disconnected through app termination.')
  await dbConn.close()
}

export function register(dbConn) {
  const logOnlyEvents = [
    // pretty-ignore
    'connecting',
    'connected',
    'disconnecting',
    'disconnected',
    'reconnect',
    'close',
  ]

  logOnlyEvents.forEach((ev) => dbConn.on(ev, () => logDbConnectionState(ev, dbConn)))

  dbConn.on('error', (err) => {
    logger.error('DbConnector: Db connection error occured.')
    logger.error(err)
  })

  process.on('SIGTERM', () => onProcessTermination(dbConn))
}

import { connection as dbConn, connect as dbConnect } from 'mongoose'
import { merge } from 'ramda'
import { getConnectionState } from './helpers'
import { register as registerDbConnectionEventHandlers } from './eventHandlers'

const defaultOptions = {
  promiseLibrary: global.Promise,
  poolSize: 25,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

const db = {
  mongoose: dbConn.base,
  async connect(dbUri, logger, opts = {}) {
    const conn = dbConn
    const connOpts = merge(defaultOptions, opts)
    registerDbConnectionEventHandlers(conn)

    await dbConnect(dbUri, connOpts)

    return conn
  },

  async close() {
    await dbConn.close()
  },

  getConnectionStatus() {
    return getConnectionState(dbConn)
  },
}

Object.freeze(db)

export default db
export const { mongoose } = db

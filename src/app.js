import Koa from 'koa'
import Boom from '@hapi/boom'
import { forEach, map, mapObjIndexed, values } from 'ramda'
import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct'

import Router from '@koa/router'
import compose from 'koa-compose'

let server

const transformRoute = (router, route = {}, { routerName }) => {
  const { method, path, middlewares = [], handler } = route

  const composedMiddleware = () =>
    compose(map((middleware) => middleware.call(), middlewares))

  router[method].call(router, routerName, path, composedMiddleware(), handler())
}

const buildRouters = (allRoutes = {}) => {
  const routers = mapObjIndexed((routes, routerName) => {
    const router = new Router()
    forEach((route) => transformRoute(router, route, { routerName }), routes)
    return { router }
  }, allRoutes)
  return values(routers)
}

const Server = {
  async start(routes = {}, logger, { env, port = 8080, methods = {} }) {
    const app = new Koa({ env })

    app.context.methods = {}

    if (!isNilOrEmpty(methods)) {
      Object.assign(app.context.methods, { ...methods })
    }

    forEach(
      ({ router }) => {
        // normal route
        if (isNotNilOrEmpty(router)) {
          app.use(router.routes())
          app.use(
            router.allowedMethods({
              throw: true,
              notImplemented: () => Boom.notImplemented(),
              methodNotAllowed: () => Boom.methodNotAllowed(),
            })
          )
        }
      },
      [...buildRouters(routes)]
    )

    server = app.listen(port)
    logger.info(`Server listening at port ${port}`)
    process.on('SIGTERM', () => this.stop({ logger }))

    return server
  },
}

export default Server

const HttpError = Boom
export { HttpError }

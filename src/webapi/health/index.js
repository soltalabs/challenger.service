import Boom from '@hapi/boom'

import { getHealth, getVersion } from './controller'

const routes = [
  {
    method: 'get',
    path: '/error',
    handler: () => async () => {
      throw Boom.badImplementation('Deliberate error')
    },
  },
  {
    method: 'get',
    path: '/error-400',
    handler: () => async () => {
      throw Boom.badRequest('Deliberate 400')
    },
  },
  {
    method: 'get',
    path: '/health',
    handler: () => getHealth,
  },
  {
    method: 'get',
    path: '/version',
    handler: () => getVersion,
  },
  {
    method: 'get',
    path: '/',
    handler: () => getVersion,
  },
]

export default routes

import create from './create'
import read from './read'

const routes = [
  {
    method: 'post',
    path: '/notifications',
    handler: () => create,
  },
  {
    method: 'get',
    path: '/notifications/:id',
    handler: () => read,
  },
]

export default routes

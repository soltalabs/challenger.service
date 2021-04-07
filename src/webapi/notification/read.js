import Boom from '@hapi/boom'
import NotificationService from 'services/notification'
import { isNil } from 'ramda'

export default async (ctx) => {
  const notification = await NotificationService.read(ctx.request.params.id)
  if (isNil(notification)) {
    throw Boom.notFound('Notification Not Found')
  }
  ctx.body = notification
}

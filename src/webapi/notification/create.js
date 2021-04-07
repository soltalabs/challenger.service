import NotificationService from 'services/notification'

export default async (ctx) => {
  const notification = await NotificationService.create(ctx.request.body)
  ctx.status = 201
  ctx.body = notification
}

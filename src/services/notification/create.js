import NotificationModel from 'models/notification'

export default async (data) => {
  const notification = await NotificationModel.create(data)
  return notification.toObject()
}

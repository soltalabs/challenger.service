import NotificationModel from 'models/notification'
import { isNil } from 'ramda'

export default async (id) => {
  const notification = await NotificationModel.findById(id)
  if (isNil(notification)) {
    return null
  }
  return notification.toObject()
}

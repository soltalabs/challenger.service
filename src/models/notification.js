import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    content: String,
    recipient: String,
    deliveryMethod: {
      type: String,
      required: true,
      enum: ['web', 'push', 'sms'],
      default: 'web',
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toObject: {
      getters: true,
      versionKey: false,
      transform: (_, { _id, ...ret }) => ret,
    },
  }
)

const Notification = model('Notification', schema)

export default Notification

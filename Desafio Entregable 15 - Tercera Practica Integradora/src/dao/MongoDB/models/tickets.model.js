import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    required: true
  },
  products: {
    type: [
      {
        pid: {
          type: Schema.Types.ObjectId,
          required: true
        },
        product: {
          type: String,
          required: true
        },
        product: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        seller: {
          type: Schema.Types.ObjectId,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  },
  totalamount: {
    type: Number,
    min: 0,
    required: true
  },
  purchase_datetime: {
    type: Date,
    required: true
  },
  purcharser: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
})

const TicketModel = model('tickets', TicketSchema)

export default TicketModel
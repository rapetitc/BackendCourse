import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    require: true
  },
  products: {
    type: [
      {
        product: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        seller: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    require: true
  },
  totalamount: {
    type: Number,
    min: 0,
    require: true
  },
  purchase_datetime: {
    type: Date
  },
  purcharser: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

const TicketModel = model('tickets', TicketSchema)

export default TicketModel
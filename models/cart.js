import mongoose from 'mongoose'
const { Schema } = mongoose

const CartSchema = Schema({
    uid: Number,
    shopid: String,
    gid: String,
    account: Number,
    select: Object,
})

const CartModel = mongoose.model('cart', CartSchema)

export default CartModel
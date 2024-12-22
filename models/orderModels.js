const mongoose = require("mongoose");

const Schema = mongoose.Schema;


/**
 * Represents the schema for an Order.
 */
const OrderSchema = mongoose.Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: 'User'      
        },
        order:[{
            product: {
                type: Schema.ObjectId,
                ref:'Product'
            },
            quantity: Number
        }],
        
         total: {
            type: Number
         },
         customer: {
            type: String
         },
         note: {
            type: String
         }
    },
    {
        timestamps: true,
    }
);


/**
 * Represents the Order model.
 */
const Order = mongoose.model("Order", OrderSchema);
module.exports =  Order;
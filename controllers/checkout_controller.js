const apiResponse = require('../api-response');
const {CheckoutValidation, Checkout} = require('../models/checkout');

exports.createNewOrder = async function (req, res, next) {
    let userId = req.body.userId;
    let products = req.body.products;
    let totalPrice = req.body.totalPrice;
    let shippingAddress = req.body.shippingAddress;
    let paymentMethod = req.body.paymentMethod;

    const {error} = CheckoutValidation.validate(req.body);
    if (error) {
        return res.status(422).send(
            apiResponse.customResponse(
                'Fill all the fields',
                422,
                error.details[0].message
            )
        );
    }

    const checkout = new Checkout({
        userId: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
    });

    try {
        const result = await checkout.save();
        if (result) {
            return res.status(200).send(
                apiResponse.customResponse('Order placed!', 200, checkout)
            );
        } else {
            return res.status(422).send(
                apiResponse.customResponse('Failed to place the order', 422, {})
            );
        }
    } catch (err) {
        return res.status(422).send(
            apiResponse.customResponse('Error placing the order', 422, err.message)
        );
    }
};

exports.updateOrder = async function (req, res, next) {
    try {
        const orderId = req.params.id;
        const { userId, products, totalPrice, shippingAddress, paymentMethod } = req.body;

        const result = await Checkout.findByIdAndUpdate(
            orderId,
            {
                userId,
                products,
                totalPrice,
                shippingAddress,
                paymentMethod
            },
            { new: true }
        );

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Order updated!',
                    200,
                    result
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Order not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to update order',
                500,
                err.message
            )
        );
    }
};

exports.deleteOrder = async function (req, res, next) {
    try {
        const orderId = req.params.id;

        const result = await Checkout.findByIdAndDelete(orderId);

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'order deleted!',
                    200,
                    {}
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Order not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to delete order',
                500,
                err.message
            )
        );
    }
};

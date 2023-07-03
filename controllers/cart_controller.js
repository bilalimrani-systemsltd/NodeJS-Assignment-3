const apiResponse = require('../api-response');
const {CartValidation, Cart} = require('../models/cart');

exports.createNewCart = async function (req, res, next) {

    let userId = req.body.userId;
    let categoryId = req.body.categoryId;
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let discount = req.body.discount;

    const {error} = CartValidation.validate(req.body);
    if (error) return res.status(422).send(
        apiResponse.customResponse(
            'Fill all the fields',
            422,
            error.details[0].message
        )
    )

    const cart = new Cart({
        userId: userId,
        categoryId: categoryId,
        productId: productId,
        quantity: quantity,
        price: price,
        discount: discount,
    })
    try {
        const result = await cart.save();
        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Cart added!',
                    200,
                    cart)
            );
        } else {
            return res.status(422).send(
                apiResponse.customResponse(
                    'Failed to add cart',
                    422,
                    {}
                )
            )
        }
    } catch (err) {
        return res.status(422).send(
            apiResponse.customResponse(
                'Fill all the fields',
                422,
                err.message
            )
        )
    }
}

exports.updateCart = async function (req, res, next) {
    try {
        const cartId = req.params.id;
        const {userId, categoryId, productId, quantity, price, discount} = req.body;

        const result = await Cart.findByIdAndUpdate(cartId, {userId, categoryId, productId, quantity, price, discount}, {new: true});

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Cart updated!',
                    200,
                    result
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Cart not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to update cart',
                500,
                err.message
            )
        );
    }
};

exports.deleteCart = async function (req, res, next) {
    try {
        const cartId = req.params.id;

        const result = await Cart.findByIdAndDelete(cartId);

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Cart deleted!',
                    200,
                    {}
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Cart not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to delete cart',
                500,
                err.message
            )
        );
    }
};

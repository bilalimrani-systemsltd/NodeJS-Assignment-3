const apiResponse = require('../api-response');
const {ProductValidation, Product} = require('../models/product');

exports.createNewProduct = async function (req, res, next) {

    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let categoryId = req.body.categoryId;

    const {error} = ProductValidation.validate(req.body);
    if (error) return res.status(422).send(
        apiResponse.customResponse(
            'Fill all the fields',
            422,
            error.details[0].message
        )
    )

    const product = new Product({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        categoryId: categoryId
    })
    try {
        const result = await product.save();
        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Product added!',
                    200,
                    product)
            );
        } else {
            return res.status(422).send(
                apiResponse.customResponse(
                    'Failed to add product',
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

exports.updateProduct = async function (req, res, next) {
    try {
        const productId = req.params.id;
        const {name, description, price, quantity, categoryId} = req.body;

        const result = await Product.findByIdAndUpdate(productId, {name, description, price, quantity, categoryId}, {new: true});

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Product updated!',
                    200,
                    result
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Product not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to update product',
                500,
                err.message
            )
        );
    }
};

exports.deleteProduct = async function (req, res, next) {
    try {
        const productId = req.params.id;

        const result = await Product.findByIdAndDelete(productId);

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Product deleted!',
                    200,
                    {}
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Product not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to delete product',
                500,
                err.message
            )
        );
    }
};

exports.getAllProducts = async function (req, res, next) {
    try {

        const products = await Product.find();

        return res.status(200).send(
            apiResponse.customResponse(
                'All products retrieved',
                200,
                products
            )
        );
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to fetch products',
                500,
                err.message
            )
        );
    }
};

exports.searchProduct = async function (req, res, next) {
    try {
        const searchTerm = req.query.term;

        const products = await Product.find({ $text: { $search: searchTerm } });

        return res.status(200).send(
            apiResponse.customResponse(
                'Products found',
                200,
                products
            )
        );
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to search products',
                500,
                err.message
            )
        );
    }
};




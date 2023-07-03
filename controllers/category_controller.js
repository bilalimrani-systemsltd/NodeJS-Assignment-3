const apiResponse = require('../api-response');
const {CategoryValidation, Category} = require('../models/category');

exports.createNewCategory = async function (req, res, next) {

    let name = req.body.name;

    const {error} = CategoryValidation.validate(req.body);
    if (error) return res.status(422).send(
        apiResponse.customResponse(
            'Fill all the fields',
            422,
            error.details[0].message
        )
    )

    const category = new Category({
        name: name,
    })
    try {
        const result = await category.save();
        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Category added!',
                    200,
                    category)
            );
        } else {
            return res.status(422).send(
                apiResponse.customResponse(
                    'Failed to add category',
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

exports.updateCategory = async function (req, res, next) {
    try {
        const categoryId = req.params.id;
        const {name} = req.body;

        const result = await Category.findByIdAndUpdate(categoryId, {name}, {new: true});

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Category updated!',
                    200,
                    result
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Category not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to update category',
                500,
                err.message
            )
        );
    }
};

exports.deleteCategory = async function (req, res, next) {
    try {
        const categoryId = req.params.id;

        const result = await Category.findByIdAndDelete(categoryId);

        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'Category deleted!',
                    200,
                    {}
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'Category not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to delete category',
                500,
                err.message
            )
        );
    }
};

exports.getAllCategories = async function (req, res, next) {
    try {

        const categories = await Category.find();

        return res.status(200).send(
            apiResponse.customResponse(
                'All categories retrieved',
                200,
                categories
            )
        );
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Failed to fetch categories',
                500,
                err.message
            )
        );
    }
};



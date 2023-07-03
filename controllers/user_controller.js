const apiResponse = require('../api-response');
const userResponse = require('../custom/user-response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt-config.json');
const {UserValidation, User} = require('../models/user');

exports.createNewUser = async function (req, res, next) {

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;

    const {error} = UserValidation.validate(req.body);
    if (error) return res.status(422).send(
        apiResponse.customResponse(
            'Fill all the fields',
            422,
            error.details[0].message
        )
    )

    const emailExist = await User.findOne({email: email});
    if (emailExist) return res.status(422).send(
        apiResponse.customResponse(
            'Email already taken',
            422,
            {}
        )
    )

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: hashPassword,
    })
    try {
        const result = await user.save();
        if (result) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'User added!',
                    200,
                    user)
            );
        } else {
            return res.status(422).send(
                apiResponse.customResponse(
                    'Failed to add user',
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

exports.updateUser = async function (req, res, next) {
    let userId = req.params.id;
    let name = req.body.name;
    let phone = req.body.phone;

    const { error } = UserValidation.validateUpdate(req.body);
    if (error) return res.status(422).send(
        apiResponse.customResponse(
            'Validation error',
            422,
            error.details[0].message
        )
    );

    try {
        const user = await User.findByIdAndUpdate(userId, {
            name: name,
            phone: phone
        }, { new: true });

        if (user) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'User updated!',
                    200,
                    user
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'User not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Internal server error',
                500,
                err.message
            )
        );
    }
}

exports.deleteUser = async function (req, res, next) {
    let userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser) {
            return res.status(200).send(
                apiResponse.customResponse(
                    'User deleted!',
                    200,
                    deletedUser
                )
            );
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'User not found',
                    404,
                    {}
                )
            );
        }
    } catch (err) {
        return res.status(500).send(
            apiResponse.customResponse(
                'Internal server error',
                500,
                err.message
            )
        );
    }
}

exports.loginUser = async function (req, res, next) {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(422).send(
            apiResponse.customResponse(
                'Please fill email and password',
                422,
                {}
            )
        )
    }

    const checkUserExist = await User.findOne({email: email});
    try {
        if (checkUserExist) {
            const checkPassword = await bcrypt.compareSync(password, checkUserExist.password);
            if (checkPassword === true) {

                let jwtToken = jwt.sign({
                    userDetails: checkUserExist
                }, config.secret, {
                    expiresIn: config.tokenLife
                });

                checkUserExist['token'] = jwtToken;

                return res.status(422).send(
                    apiResponse.customResponse(
                        'Login Successfully',
                        200,
                        userResponse.customUserResponse(checkUserExist)
                    )
                )
            } else {
                return res.status(422).send(
                    apiResponse.customResponse(
                        'Failed to login! Email or password is incorrect',
                        401,
                        {}
                    )
                )
            }
        } else {
            return res.status(404).send(
                apiResponse.customResponse(
                    'User not found',
                    404,
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


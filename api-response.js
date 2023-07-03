function customResponse(message,code,data) {

    var response = {
        'message': message,
        'code':  code,
        'data': data
    };

    return response;
}

module.exports = { customResponse };

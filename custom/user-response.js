function customUserResponse(data) {

    return {
        '_id': data.id,
        'name': data.name,
        'email': data.email,
        'phone': data.phone,
        'date': data.date,
        'token': data.token,
    };
}

module.exports = { customUserResponse };


const STAGING = "http://dummy.restapiexample.com/api/v1/employees";
const ENVIRONMENT = STAGING;
const SERVER_URL = "http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service="

module.exports = {
    getDataList() {
        // console.log(params, "Params")
        return fetch(`${ENVIRONMENT}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    getLogin(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'Login'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    registerUser(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'Register'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    getConversionList(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'GetConversationList'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    getSearchUser(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'SearchUsers'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    getMessageApi(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'GetMessageList'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    console.log(data, "heyDATA")
                    data['other_user_id'] = params.other_user_id
                    return data;
                }))
    },
    updateProfileApi(params) {
        // console.log(params, "params in api")
        return fetch(`${SERVER_URL + 'ManageProfile'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    // console.log(data, "heyDATA")
                    // data['other_user_id'] = params.other_user_id
                    return data;
                }))
    }

}
class ApiAuth {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    signup(newUser) {
        return fetch(this._baseUrl + `/signup`, {
            method: 'POST',
            headers: this._token,
            body: JSON.stringify({
                password: newUser.password,
                email: newUser.email
              })
        })
        .then((response) => {
            return this._getResponseData(response)  
        })
    }

    signin(dataUser) {
        return fetch(this._baseUrl + `/signin`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                password: dataUser.password,
                email: dataUser.email
            })
        })
        .then((response) => {
            return this._getResponseData(response)  
        })
    }

    verification(jwt) {
        return fetch(this._baseUrl + `/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        })
        .then((response) => {
            return this._getResponseData(response)  
        })
    }
}

const mestoApiAuth = new ApiAuth('https://api.veselov.students.nomoredomainsmonster.ru', {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

export default mestoApiAuth;
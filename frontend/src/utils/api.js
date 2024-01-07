class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _sendRequest(url, options) {
        return fetch(url, options)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return this._sendRequest(this._baseUrl + 'users/me', { 
            headers: this._token
        })
    }

    patchUserInfo(newUserInfo) {
        return this._sendRequest(this._baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify({
              name: newUserInfo.name,
              about: newUserInfo.profession
            })
        })
    }

    getFirstCards() {
        return this._sendRequest(this._baseUrl + 'cards', {
            method: 'GET', 
            headers: this._token
        })
    }


    postNewCard(newCard) {
        return this._sendRequest(this._baseUrl + 'cards', {
            method: 'POST',
            headers: this._token,
            body: JSON.stringify({
              name: newCard.name,
              link: newCard.link
            })
        })
    }

    deleteCard(idCard) {
        return this._sendRequest(this._baseUrl + `cards/${idCard}`, {
            method: 'DELETE',
            headers: this._token
        })
    }

    putLike(idCard) {
        return this._sendRequest(this._baseUrl + `cards/${idCard}/likes`, {
            method: 'PUT',
            headers: this._token
        })
    }

    deleteLike(idCard) {
        return this._sendRequest(this._baseUrl + `cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: this._token
        })
    }

    changeAvatar(data) {
        return this._sendRequest(this._baseUrl + `users/me/avatar`, {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify({avatar: data.avatar})
        })
    }
}

const mestoApi = new Api('https://api.veselov.students.nomoredomainsmonster.ru', {
    authorization: 'a28ab119-f4d7-4d6c-a1e8-0ea16011e1f4',
    'Content-Type': 'application/json'
})


export default mestoApi;
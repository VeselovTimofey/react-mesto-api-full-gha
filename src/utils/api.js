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
            method: 'GET',
            credentials: 'include',
            headers: this._token
        })
    }

    patchUserInfo(newUserInfo) {
        return this._sendRequest(this._baseUrl + 'users/me', {
            method: 'PATCH',
            credentials: 'include',
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
            credentials: 'include', 
            headers: this._token
        })
    }


    postNewCard(newCard) {
        return this._sendRequest(this._baseUrl + 'cards', {
            method: 'POST',
            credentials: 'include',
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
            credentials: 'include',
            headers: this._token
        })
    }

    putLike(idCard) {
        return this._sendRequest(this._baseUrl + `cards/${idCard}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._token
        })
    }

    deleteLike(idCard) {
        return this._sendRequest(this._baseUrl + `cards/${idCard}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._token
        })
    }

    changeAvatar(data) {
        return this._sendRequest(this._baseUrl + `users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._token,
            body: JSON.stringify({avatar: data.avatar})
        })
    }
}

const mestoApi = new Api('https://api.veselov.students.nomoredomainsmonster.ru/', {
    'Content-Type': 'application/json'
})


export default mestoApi;
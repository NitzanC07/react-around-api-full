class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  customFetch(url, headers) {
    return fetch(url, headers)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
  } 

  // other methods for working with the API

  getInitialCards() {
    return this.customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'GET'
    })
  }
  
  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'GET'
    })
  }

  changeAvatar(newAvatar) {
    return this.customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(newAvatar)
    })
  }

  setUserInfo(data) {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  createCard(data) {
    return this.customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers, 
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  deleteCard(cardId) {
    return this.customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers, 
      method: 'DELETE',
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    const methodType = isLiked ? 'PUT' : 'DELETE'
    return this.customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers, 
      method: methodType,     
    })
  }
}


const api = new Api({
  baseUrl: "http://http://nitzancohen.students.nomoreparties.sbs/",
  headers: {
    authorization: `Bearer 38a23878-64ce-4abb-ae0d-d30d11cc9a38`,
    "Content-Type": "application/json"
  }
});

// Token: 38a23878-64ce-4abb-ae0d-d30d11cc9a38 Group ID: group-12
// const api = new Api({
//     baseUrl: "https://around.nomoreparties.co/v1/group-12",
//     headers: {
//       authorization: "38a23878-64ce-4abb-ae0d-d30d11cc9a38",
//       "Content-Type": "application/json"
//   }
// });

export default api;
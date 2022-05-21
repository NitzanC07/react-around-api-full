export const BASE_URL = "https://http://nitzancohen.students.nomoreparties.sbs/";

export const checkResponse = (res) => {
  console.log(`checkResponse: ${res}`);
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error in response from the server: ${res.status}`)
  }
}

export const register = ({email, password}) => {
  console.log(`register ${email}, ${password}`);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      "password": password,
      "email": email
    }),
  })
  .then(checkResponse)
  .then((res) => {
    console.log(`res: ${res.data}`);
    return res;
  }) 
}

export const login = (email, password) => {
  console.log(`Login: ${email}, ${password}`);
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      'email': email,
      'password': password
    }),
  })
  .then(checkResponse)
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`,
    }
  })
  .then(checkResponse)
  .then(data => data)
}
import fetch from 'isomorphic-fetch';


export function createNewUser(name, email, password) {
    return fetch('http://localhost:5000/user/new', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST',
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

export function loginServer(email, password) {
    return fetch('http://localhost:5000/user/login_user', {
        method: 'GET',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Type': 'application/json',
        }
    }).then(res => {
        return res;
    }).catch(err => err);
}

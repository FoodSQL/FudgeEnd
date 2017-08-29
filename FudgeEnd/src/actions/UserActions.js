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
        alert('User created!')
        return res;
    }).catch(err => err);
}

export function loginServer(email, password) {
    return fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify({
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
        if (res['status'] == 200) {
          console.log(res)
          alert('welcome '+ res['msg']);
        }else{
          alert('user not found');
        }
        return res;
    }).catch(err => err);
}

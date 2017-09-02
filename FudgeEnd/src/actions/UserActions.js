import fetch from 'isomorphic-fetch';
import history from '../history';

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
        return res.json();
    }).then( (json) => {
      alert('User created! - ' + json['email']);
      history.push('/');
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
        return res.json();
      }).then( (json) => {
        if (json['status'] == 200) {
          console.log(json['email']);
          alert('welcome '+ json['name']);
        }else{
          alert('user not found');
        }
        return res;
    }).catch(err => err);
}

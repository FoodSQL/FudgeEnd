// This file handles data manipulation

var user = {
    id: null,
    name: null,
    email: null
}

export default window.auth = {
    login: (email, password, callback) => {
        fetch('http://localhost:5000/user/login', {
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
            if (res.status === 200) {
                res.json().then((json) => {
                    user = {
                        id: json['id'],
                        email: json['email'],
                        name: json['name'],
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.reload()
                })
            }
            callback(res)
        }).catch(err => err);
    },

    getSavedUser: (callback) => {
        let localStorageUser = localStorage.getItem('user')
        if (localStorageUser) {
            user = JSON.parse(localStorageUser)
            console.log('[Auth] Retreived user from last session', user)
            callback(user)
        }
    },

    getUser: () => {
        return user
    },

    register: (email, name, password, callback) => {
        fetch('http://localhost:5000/user', {
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
        }).then((res) => {
            if (res.status === 200) {
                var json = res.json().then((json) => {
                    console.log('[Auth] Register Successful ', json)
                    user = {
                        id: json['id'],
                        email: json['email'],
                        name: json['name'],
                    }
                    localStorage.setItem('user', JSON.stringify(user))
                    window.location.reload()
                })
            } else {
                console.log('[Auth] Register Failed ', json)
            }
            callback(res)
        })
    },

    logout: () => {
        localStorage.removeItem('user')
        window.location.reload()
    },

    updateUser: (user_id, user_name, user_email, user_password, callback) => {
        fetch('http://localhost:5000/user/update', {
            method: 'POST',
            body: JSON.stringify({
                user_id: user_id,
                user_name: user_name,
                user_email: user_email,
                user_password: user_password,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then((json) => {
                    user = {
                        user_id: json['user_id'],
                        user_email: json['user_email'],
                        user_name: json['user_name'],
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.reload()
                    callback(user)
                })
            }
        }).catch(err => err);
    }


}
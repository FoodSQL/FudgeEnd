import auth from './auth'
import _ from 'lodash'
import moment from 'moment'

// This file handles data manipulation
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var pantry_list = {
    pantries : []
}
var pantry = {
    pantry_id : null,
    items : []
}
var ingredient = {
    id : null,
    name : null,
    amount : null,
    unit : 'kg',
}

export default window.pantry = {
    getPantry : (user_id,callback) => {
        fetch('http://localhost:5000/pantry/' + user_id, {
            method: 'GET'
            }).then((response) => {
                let data = response.json().then((data) => {
                    data['pantries'].forEach((pt) => {
                        pt.pantry_id = pt['pantry_id'];
                        pt['items'].forEach((item) => {
                            var ingredient = {
                                id : item['item_id'],
                                name : item['item_name'],
                                amount : item['amount'],
                                unit : 'kg',
                            }
                            pantry.items = pantry.items.push(ingredient);
                        })
                        pantry_list.pantries.push(pantry);
                    })
                })
            })  
    },

    addItem : (pantry_id,item_id,amount,unit,callback) => {
        fetch('http://localhost:5000/pantry/add_item', {
            method: 'POST',
            body : JSON.stringify({
                pantry_id : pantry_id,
                item_id : item_id,
                amount : amount,
                unit : unit,
            })
        }).then((response) => {
            var x = 1;
        });
    },

    subscribe : (storeName,callback) => {
        emitter.addListener( `${storeName}_update`, callback )
    },

    unsubscribe : (storeName,callback) => {
        emitter.removeListener( `${storeName}_update`, callback )
    },

}
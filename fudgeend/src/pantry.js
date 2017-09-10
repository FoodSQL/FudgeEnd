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
    pantry_name: null,
    items : []
}
var ingredient = {
    id : null,
    name : null,
    amount : null,
    unit : 'kg',
}

export default window.pantry = {
    getPantry1 : (user_id,callback) => {
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

    getPantry : (user_id) => {
        var data = {
            user_id : 1,
            pantries: [{
                pantry_id: 37,
                pantry_name:'Meu Apê',
                items: [{
                    id : 12,
                    name : 'Rice',
                    amount : 4,
                    unit : 'kg',
                    },
                    {
                    id : 233,
                    name : 'Pepper',
                    amount : 0.2,
                    unit : 'kg',
                    },
                ]},{
                    pantry_id: 38,
                    pantry_name:'Casa da Mami',
                    items: [{
                        id : 56,
                        name : 'Banana',
                        amount : 3,
                        unit : 'kg',
                        },
                        {
                        id : 234,
                        name : 'Beans',
                        amount : 2,
                        unit : 'kg',
                        },
                        {
                        id : 9,
                        name : 'Shrimp',
                        amount : 0.5,
                        unit : 'kg',
                        },
                    ]}
                ]
        }
        var pantry_list = []
            data['pantries'].forEach(function (pt) {
                var pantry = {
                        pantry_id : pt['pantry_id'],
                        pantry_name: pt['pantry_name'],
                        items : []
                    }
                var items = []
                pt['items'].forEach(function(item) {
                    var ingredient = {
                        id : item['id'],
                        name : item['name'],
                        amount : item['amount'],
                        unit : 'kg',
                    }
                    items.push(ingredient);
                })
                pantry['items'] = items;
                pantry_list.push(pantry);
            })
            return pantry_list
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
            
        });
    },

    subscribe : (storeName,callback) => {
        emitter.addListener( `${storeName}_update`, callback )
    },

    unsubscribe : (storeName,callback) => {
        emitter.removeListener( `${storeName}_update`, callback )
    },

}
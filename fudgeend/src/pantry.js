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
    item_id : null,
    item_name : null,
    item_amount : null,
    item_unit : 'kg',
}

export default window.pantry = {
    getPantry1 : (user_id) => {
        fetch('http://localhost:5000/pantry/' + user_id, {
            method: 'GET'
            }).then((response) => {
                let data = response.json().then((data) => {
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
                                id : item['item_id'],
                                name : item['item_name'],
                                amount : item['item_amount'],
                                unit : 'kg',
                            }
                            items.push(ingredient);
                        })
                        pantry['items'] = items;
                        pantry_list.push(pantry);
                    })
                    return pantry_list
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
                    item_id : 12,
                    item_name : 'Rice',
                    item_amount : 4,
                    item_unit : 'kg',
                    },
                    {
                    item_id : 233,
                    item_name : 'Pepper',
                    item_amount : 0.2,
                    item_unit : 'kg',
                    },
                ]},{
                    pantry_id: 38,
                    pantry_name:'Casa da Mami',
                    items: [{
                        item_id : 56,
                        item_name : 'Banana',
                        item_amount : 3,
                        item_unit : 'kg',
                        },
                        {
                        item_id : 234,
                        item_name : 'Beans',
                        item_amount : 2,
                        item_unit : 'kg',
                        },
                        {
                        item_id : 9,
                        item_name : 'Shrimp',
                        item_amount : 0.5,
                        item_unit : 'kg',
                        },
                    ]},
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
                        item_id : item['item_id'],
                        item_name : item['item_name'],
                        item_amount : item['item_amount'],
                        item_unit : 'kg',
                    }
                    items.push(ingredient);
                })
                pantry['items'] = items;
                pantry_list.push(pantry);
            })
            return pantry_list
    },

    addItem1 : (pantry_id,item_id,item_amount,item_unit,callback) => {
        fetch('http://localhost:5000/pantry/add_item', {
            method: 'POST',
            body : JSON.stringify({
                pantry_id : pantry_id,
                item_id : item_id,
                item_amount : item_amount,
                item_unit : item_unit,
            })
        }).then((response) => {
            callback(response)
        });
    },

    addItem : (pantry_id,item_id,item_amount,item_unit,callback) => {
        var response = {status : 200}
        callback(response)
    },


    
}
import auth from './auth'

const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var pantry_ids = [];
var current_pantry_index = null;

export default window.pantry = {

    getPantryIds: () => {
        return pantry_ids;
    },
    getCurrentPantryIndex: () => {
        return current_pantry_index;
    },
    setCurrentPantryIndex: (index) => {
        current_pantry_index = index;
        emitter.emit('ids_update', pantry_ids[index])
    },

    getPantry1: (user_id) => {
        fetch('http://localhost:5000/pantry/' + user_id, {
            method: 'GET'
        }).then((response) => {
            let data = response.json().then((data) => {
                var pantry_list = []
                data['pantries'].forEach(function (pt) {
                    pantry_ids.push(pt['pantry_id']);
                    emitter.emit('ids_update', pantry_ids[0])
                    var pantry = {
                        pantry_id: pt['pantry_id'],
                        pantry_name: pt['pantry_name'],
                        items: []
                    }
                    var items = []
                    pt['items'].forEach(function (item) {
                        var ingredient = {
                            item_id: item['item_id'],
                            item_name: item['item_name'],
                            item_amount: item['item_amount'],
                            item_unit: 'kg',
                        }
                        items.push(ingredient);
                    })
                    pantry['items'] = items;
                    pantry_list.push(pantry);
                })
                return pantry_list
            },
            )
        })
    },

    addItem1: (pantry_id, item_id, item_amount, item_unit, callback) => {
        fetch('http://localhost:5000/pantry/add_item', {
            method: 'POST',
            body: JSON.stringify({
                pantry_id: pantry_id,
                item_id: item_id,
                item_amount: item_amount,
                item_unit: item_unit,
            })
        }).then((response) => {
            callback(response)
        });
    },

    removeItem1: (pantry_id, deleted_items, callback) => {
        fetch('http://localhost:5000/pantry/remove_item', {
            method: 'POST',
            body: JSON.stringify({
                pantry_id: pantry_id,
                items: deleted_items
            })
        }).then((response) => {
            callback(response)
        });
    },

    newPantry1: (user_id, pantry_name) => {
        fetch('http://localhost:5000/pantry/new', {
            method: 'POST',
            body: JSON.stringify({
                user_id: user_id,
                pantry_name: pantry_name,
            })
        }).then((response) => {
            if (response.status === 200) {
                pantry_ids.push(response['pantry_id'])
                emitter.emit('ids_update', pantry_ids[0])
                var pantry = {
                    pantry_id: response['pantry_id'],
                    pantry_name: response['pantry_name'],
                    items: []
                }
                return pantry
            } else {
                return null
            }
        });
    },

    getPantry: (user_id) => {
        var data1 = {
            user_id: 1,
            pantries: []
        }
        var data = {
            user_id: 1,
            pantries: [{
                pantry_id: 37,
                pantry_name: 'Meu Apê',
                items: [{
                    item_id: 12,
                    item_name: 'Rice',
                    item_amount: 4,
                    item_unit: 'kg',
                },
                {
                    item_id: 233,
                    item_name: 'Pepper',
                    item_amount: 0.2,
                    item_unit: 'kg',
                },
                ]
            }, {
                pantry_id: 38,
                pantry_name: 'Casa da Mami',
                items: [{
                    item_id: 56,
                    item_name: 'Banana',
                    item_amount: 3,
                    item_unit: 'kg',
                },
                {
                    item_id: 234,
                    item_name: 'Beans',
                    item_amount: 2,
                    item_unit: 'kg',
                },
                {
                    item_id: 9,
                    item_name: 'Shrimp',
                    item_amount: 0.5,
                    item_unit: 'kg',
                },
                ]
            },
            ]
        }
        var pantry_list = []
        data1['pantries'].forEach(function (pt) {
            pantry_ids.push(pt['pantry_id']);
            emitter.emit('ids_update', pantry_ids[0])
            var pantry = {
                pantry_id: pt['pantry_id'],
                pantry_name: pt['pantry_name'],
                items: []
            }
            var items = []
            pt['items'].forEach(function (item) {
                var ingredient = {
                    item_id: item['item_id'],
                    item_name: item['item_name'],
                    item_amount: item['item_amount'],
                    item_unit: 'kg',
                }
                items.push(ingredient);
            })
            pantry['items'] = items;
            pantry_list.push(pantry);
        })
        return pantry_list
    },

    addItem: (pantry_id, item_id, item_amount, item_unit, callback) => {
        var response = { status: 200 }
        callback(response)
    },

    removeItem: (pantry_id, deleted_items, callback) => {
        var response = { status: 200 }
        callback(response)
    },

    newPantry: (user_id, pantry_name) => {
        var data = {
            pantry_id: 37,
            pantry_name: pantry_name,
            user_id: user_id,
        }
        pantry_ids.push(data['pantry_id'])
        emitter.emit('ids_update', pantry_ids[0])
        return data
    },


    subscribe: (storeName, callback) => {
        emitter.addListener(`${storeName}_update`, callback)
    },

    unsubscribe: (storeName, callback) => {
        emitter.removeListener(`${storeName}_update`, callback)
    },

}
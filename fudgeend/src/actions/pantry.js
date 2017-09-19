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

    getPantry: (user_id, callback) => {
        fetch('http://localhost:5000/pantry/' + user_id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET',
            }
        }).then(res => {
            var pantry_list = []
            if (res.status === 200) {
                let data = res.json().then((data) => {
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
                                item_amount: Math.floor((Math.random() * 10) + 1),//item['item_amount'],
                                item_unit: 'kg',
                            }
                            items.push(ingredient);
                        })
                        pantry['items'] = items;
                        pantry_list.push(pantry);
                    })
                })
            }
            callback(pantry_list)
        }).catch(err => err);
    },

    addItem: (pantry_id, item_id, item_amount, item_unit, callback) => {
        fetch('http://localhost:5000/pantry/add_item', {
            method: 'POST',
            body: JSON.stringify({
                pantry_id: pantry_id,
                item_id: item_id,
                amount: item_amount,
                unit: item_unit,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            callback(response)
        });
    },

    removeItem: (pantry_id, deleted_items, callback) => {
        console.log('p_id: '+pantry_id)
        console.log(deleted_items)
        fetch('http://localhost:5000/pantry/remove_item', {
            method: 'POST',
            body: JSON.stringify({
                pantry_id: pantry_id,
                items: deleted_items
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            callback(response)
        });
    },

    newPantry: (user_id, pantry_name, callback) => {
        fetch('http://localhost:5000/pantry/new', {
            method: 'POST',
            body: JSON.stringify({
                user_id: user_id,
                pantry_name: pantry_name,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            var pantry = null
            if (response.status === 200) {
                let data = response.json().then((data) => {
                    console.log('log: ' + data['pantry_name']);
                    pantry_ids.push(data['pantry_id'])
                    emitter.emit('ids_update', pantry_ids[0])
                    pantry = {
                        pantry_id: data['pantry_id'],
                        pantry_name: data['pantry_name'],
                        items: []
                    }
                    callback(pantry);
                })
            }
        });
    },

    getIngredients: (callback) => {
        fetch('http://localhost:5000/ingredients', {
            method: 'GET',
        }).then((response) => {
            console.log('status: ' + response.status);
            var ingredient_list = [];
            var ingredient_list_map = [];
            if (response.status === 200) {
                let data = response.json().then((data) => {
                    data['ingredients'].forEach(function (ingred) {
                        ingredient_list.push({
                            text: ingred['item_name'],
                            value: ingred['item_id'],
                        })
                        ingredient_list_map[ingred['item_name']] = ingred['item_id'];
                    })
                })
            }
            callback(ingredient_list, ingredient_list_map);
        });
    },

    subscribe: (storeName, callback) => {
        emitter.addListener(`${storeName}_update`, callback)
    },

    unsubscribe: (storeName, callback) => {
        emitter.removeListener(`${storeName}_update`, callback)
    },

    /*
        getIngredients: () => {
            var data = {
                ingredients: [
                    {
                        item_id: 0,
                        item_name: 'tapioca',
                    }, {
                        item_id: 1,
                        item_name: 'apple',
                    }, {
                        item_id: 2,
                        item_name: 'mandioca',
                    }, {
                        item_id: 3,
                        item_name: 'caju',
                    }, {
                        item_id: 4,
                        item_name: 'vodka',
                    }
                ]
            }
            var ingredient_list = []
            data['ingredients'].forEach(function (ingred) {
                ingredient_list[ingred['item_name']] = ingred['item_id'];
            })
            return ingredient_list;
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
    
    */
}
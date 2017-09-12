
export default window.recipe = {

    getRecipes1: (pantry_id) => {
        fetch('http://localhost:5000/recipes/' + pantry_id, {
            method: 'GET',
        }).then((response) => {
            let data = response.json().then((data) => {
                var recipe_list = []
                data['recipes'].forEach(function (recipe_item) {
                    var recipe = {
                        recipe_id: recipe_item['recipe_id'],
                        recipe_name: recipe_item['recipe_name'],
                        recipe_ingredients: []
                    }
                    var items = []
                    recipe_item['recipe_ingredients'].forEach(function (ingredient) {
                        var ingredient = {
                            ingredient_id: ingredient['ingredient_id'],
                            ingredient_name: ingredient['ingredient_name'],
                        }
                        items.push(ingredient);

                    })
                    recipe['recipe_ingredients'] = items;
                    recipe_list.push(recipe);
                })
                return recipe_list;
            })
        })
    },

    getRecipes: (pantry_id) => {
        var data = {
            pantry_id: 37,
            recipes: [{
                recipe_id: 2,
                recipe_name: 'Rice & Beans',
                recipe_ingredients: [{
                    ingredient_id: 3,
                    ingredient_name: 'Rice'
                }, {
                    ingredient_id: 1,
                    ingredient_name: 'Beans'
                }, {
                    ingredient_id: 31,
                    ingredient_name: 'Salt'
                }
                ]
            },{
                recipe_id: 3,
                recipe_name: 'Chilli Beans',
                recipe_ingredients: [{
                    ingredient_id: 3,
                    ingredient_name: 'Chille Pepper'
                }, {
                    ingredient_id: 1,
                    ingredient_name: 'Beans'
                }, {
                    ingredient_id: 31,
                    ingredient_name: 'Salt'
                }
                ]
            },{
                recipe_id: 2,
                recipe_name: 'Japanese Rice',
                recipe_ingredients: [{
                    ingredient_id: 3,
                    ingredient_name: 'Rice'
                }, {
                    ingredient_id: 31,
                    ingredient_name: 'Salt'
                }
                ]
            }
        ]
        }
        var recipe_list = []
        data['recipes'].forEach(function (recipe_item) {
            var recipe = {
                recipe_id: recipe_item['recipe_id'],
                recipe_name: recipe_item['recipe_name'],
                recipe_ingredients: []
            }
            var items = []
            recipe_item['recipe_ingredients'].forEach(function (ingredient) {
                var ingredient = {
                    ingredient_id: ingredient['ingredient_id'],
                    ingredient_name: ingredient['ingredient_name'],
                }
                items.push(ingredient);

            })
            recipe['recipe_ingredients'] = items;
            recipe_list.push(recipe);
        })
        return recipe_list;
    }
}
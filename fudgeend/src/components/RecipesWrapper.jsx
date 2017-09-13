import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Preloader from './Preloader'
import recipe from '../actions/recipe.js'
import pantry from '../actions/pantry.js'
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 0 7px 0',
    },
};

var user = null;
var recipe_list = [];

class RecipesWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
        }
    }
    componentWillMount() {
        user = JSON.parse(localStorage.getItem("user"));
        if (user['pantry_list']) {
            if (user['pantry_list'].length === 0) {
                this.setState({ message: "You don't have a Pantry yet, go ahead and create one" });
            } else {
                this.setState({
                    loading: true,
                    message: "Getting the best recipes for you!",
                });
            }
        }
        pantry.subscribe('ids', (dados) => {
            this.setState({
                loading: true,
                message: "Getting the best recipes for you!",
            });
            recipe_list = recipe.getRecipes(dados);
            if (recipe_list) {
                this.setState({
                    loading: false,
                    message: "Check-out everyone's Recipes here!",
                });
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Card>
                    <CardTitle title="Recipes" subtitle={this.state.message} />
                    <Preloader />
                </Card>
            );
        } else {
            return (
                <div>
                    <Card>
                        <CardTitle title="Recipes" subtitle={this.state.message} />
                        <div className='recipesContainer'>
                            {recipe_list.map((row, index) => (
                                <Card>
                                    <CardTitle title={row.recipe_name} subtitle={'The best ' + row.recipe_name + ' ever made!'} />
                                    <div style={styles.wrapper}>
                                        {row.recipe_ingredients.map((row, index) => (
                                            <Chip style={styles.chip}>
                                                {row.ingredient_name}
                                            </Chip>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            );
        }
    }
}
export default RecipesWrapper;
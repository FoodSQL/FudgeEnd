import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Preloader from './Preloader'
import recipe from '../actions/recipe.js'
import pantry from '../actions/pantry.js'
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {red400, red900} from 'material-ui/styles/colors';
import {orange400, orange900} from 'material-ui/styles/colors';
import {yellow400, yellow900} from 'material-ui/styles/colors';
import {greenA400, greenA700} from 'material-ui/styles/colors';
import {lightGreenA400, lightGreenA700} from 'material-ui/styles/colors';




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
            recipe.getRecipes(dados, (res) => {
                recipe_list = res
            });
            setTimeout(() => {
                if (recipe_list) {
                    this.setState({
                        loading: false,
                        message: "Check-out everyone's Recipes here!",
                    });
                }
            }, 250);
        })
    }
    
    handlePercentage = (percentage) => {
        var color = lightGreenA400;
        var darkerColor = lightGreenA700;
        var value = 'Perfect Match';
        if(percentage <= 20){
            color = red400;
            darkerColor = red900;
            value = "Bad Match";
        } else if( percentage <= 35){
            color = orange400;
            darkerColor = orange900;
            value = "Poor Match";
        }else if( percentage <= 70){
            color = yellow400;
            darkerColor = yellow900;
            value = "Fair Match";
        }else if( percentage < 100){
            color = greenA400;
            darkerColor = greenA700;
            value = "Fair Match";
        }
        return(
                <Chip
                backgroundColor={color}
                style={styles.chip}
                >
                <Avatar size={32} color={color} backgroundColor={darkerColor}>
                    {percentage}
                </Avatar>
                    {value}
                </Chip>
        )
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
                                    {this.handlePercentage(row.percentage)}
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
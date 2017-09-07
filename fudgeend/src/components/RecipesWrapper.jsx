import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Chip from 'material-ui/Chip';

const recipesData = [
    {
      item: 'Pasta & Pesto',
      ingredients: [{val : 'Pasta'},{val:'Pesto'},{val:'Cheese'},{val:'Love ❤️'}],
    },
    {
      item: 'Rice & Beans',
      ingredients: ['Rice','Beans'],
      ingredients: [{val : 'Rice'},{val:'Beans'}],
    },
    {
      item: 'Shrimp with cheese',
      ingredients: [{val : 'Riccota Cheese'},{val:'Shrimp'},{val:'Garlic'}],
    },
    {
      item: 'Pepper made Chicken',
      ingredients: [{val : 'Brocolli'},{val:'Malaysian Pepper'},{val:'Chicken'}],
    },
  ];

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
  

class RecipesWrapper extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardTitle title="Recipes" subtitle="Check-out everyone's Recipes here!" />
                    <div className='recipesContainer'>
                        {recipesData.map( (row, index) => (
                            <Card>
                                <CardTitle title={row.item} subtitle={'The best ' + row.item + ' ever made!'}/>
                                <div style={styles.wrapper}>
                                {row.ingredients.map( (row, index) => (
                                    <Chip style={styles.chip}>
                                        {row.val}
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

export default RecipesWrapper;
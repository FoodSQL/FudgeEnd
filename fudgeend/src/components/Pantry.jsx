import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';



import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const fruit = [
    'Apple', 'Apricot', 'Avocado',
    'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
    'Boysenberry', 'Blood Orange',
    'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
    'Coconut', 'Cranberry', 'Clementine',
    'Damson', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry',
    'Feijoa', 'Fig',
    'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
    'Honeydew', 'Huckleberry',
    'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
    'Kiwi fruit', 'Kumquat',
    'Lemon', 'Lime', 'Loquat', 'Lychee',
    'Nectarine',
    'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
    'Olive', 'Orange',
    'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
    'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
    'Quince',
    'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
    'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
    'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
    'Ugli fruit',
    'Watermelon',
  ];

const style = {
  marginRight: 20,
};

const styleTab = {
    backgroundColor: '#C20F00',
  };
  

const tableData = [
  {
    item: 'Rice',
    amount: '2kg',
  },
  {
    item: 'Beans',
    amount: '3kg',
  },
  {
    item: 'Shrimp',
    amount: '400g',
  },
  {
    item: 'Pepper',
    amount: '3x',
  },
];


class Pantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            value: 0,
            open: false,
            qtd: 1,
            searchText: '',
            amount: '',
        };   
    }

    handleOpen = () => {
        this.setState({open: true});
    };
    
    handleClose = () => {
        this.setState({open: false});
    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleToggle = (event, toggled) => {
        this.setState({
          [event.target.name]: toggled,
        });
      };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    handleChangeTab = (value) => {
        this.setState({
          value: value,
        });
      };

    handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
    };

    handleChangeSelect = (event, index, value) => this.setState({qtd : value});
    
    handleAdd = (event) => {
        if(this.state.searchText.length > 0){
            tableData.push(
                {
                    item: this.state.searchText,
                    amount: this.state.amount+this.state.qtd,
                },
            )
            this.forceUpdate()
        }
    }

    handleUpdateInput = (searchText) => {
        this.setState({
          searchText: searchText,
        });
      };

    handleNewRequest = () => {
        this.setState({
          searchText: '',
        });
      };

    handleChangeAmount = (event) => {
        this.setState({
          amount: event.target.value,
        });
      };
    
    render() {

        const actions = [
            <FlatButton
              label="Add"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleAdd}
            />,
          ];

        return (
            <div>
                <Dialog
                title="Add item to your Pantry"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                    <div className='dialogContainer'>
                        <AutoComplete
                        fullWidth
                        floatingLabelText="Ingredients"
                        searchText={this.state.searchText}
                        onUpdateInput={this.handleUpdateInput}
                        filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                        openOnFocus={true}
                        dataSource={fruit}/>
                        <TextField
                        fullWidth
                        floatingLabelText="Amount"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                        floatingLabelFixed={true}/>
                        <SelectField
                        floatingLabelText="Unit"
                        value={this.state.qtd}
                        onChange={this.handleChangeSelect}>
                            <MenuItem value={"Kg"} primaryText="Kg" />
                            <MenuItem value={"g"} primaryText="g" />
                            <MenuItem value={"lb"} primaryText="lb" />
                        </SelectField>
                    </div>
                </Dialog>
                <Card>
                    <CardTitle title="Pantry" subtitle="Your pantry" />
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChangeTab}>
                        <Tab style={styleTab} label="Tab A" value={0}/>
                        <Tab style={styleTab} label="Tab B" value={1}/>
                    </Tabs>
                    <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeTab}>
                        <Table 
                            onRowSelection={this.handleRowSelection}
                            selectable
                            multiSelectable>
                            <TableHeader
                            enableSelectAll
                            adjustForCheckbox>
                            <TableRow>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Amount</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                                <TableBody displayRowCheckbox deselectOnClickaway={false}>
                                {tableData.map( (row, index) => (
                                <TableRow key={index} selected={this.isSelected(index)}>
                                    <TableRowColumn>{row.item}</TableRowColumn>
                                    <TableRowColumn>{row.amount}</TableRowColumn>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table 
                            onRowSelection={this.handleRowSelection}
                            selectable
                            multiSelectable>
                            <TableHeader
                            enableSelectAll
                            adjustForCheckbox>
                            <TableRow>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Amount</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                                <TableBody displayRowCheckbox deselectOnClickaway={false}>
                                {tableData.map( (row, index) => (
                                <TableRow key={index} selected={this.isSelected(index)}>
                                    <TableRowColumn>{row.item}</TableRowColumn>
                                    <TableRowColumn>{row.amount}</TableRowColumn>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SwipeableViews>
                    <CardActions>
                        <FloatingActionButton 
                                mini={true} 
                                style={style}
                                onClick={this.handleOpen}
                                backgroundColor='#FF2B19'>
                            <ContentAdd />
                        </FloatingActionButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Pantry;
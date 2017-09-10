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
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Snackbar from 'material-ui/Snackbar';
import pantry from '../pantry.js'

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


var pantry_list = [];
var deletedItems = [];

class Pantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            value: 0,
            open: false,
            unit: '',
            searchText: '',
            amount: '',
            message: 'Item(s) removed from your pantry',
            open: false,
        };   
    }

    componentWillMount(){
        pantry_list = pantry.getPantry(localStorage.user['id'])
        console.log(pantry_list)
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
          selected: [],
        });
      };

    handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
    };

    handleChangeSelect = (event, index, value) => this.setState({unit : value});
    
    handleAdd = (event) => {
        if(this.state.searchText.length > 0){

            pantry.addItem(pantry_list[this.state.value]['pantry_id'],122,this.state.amount,this.state.unit,(result) => {
                if(result.status == 200){
                    pantry_list[this.state.value]['items'].push(
                        {
                            item_id: 122,
                            item_name: this.state.searchText,
                            item_amount: this.state.amount,
                            item_unit: this.state.unit
                        },
                    )
                    this.state.searchText = '',
                    this.state.amount = '',
                    this.state.unit = '',           
                    this.forceUpdate()      
                }else{
                    alert("Something went wrong with the input")
                }
            })
        }
    };

    handleDelete = (event) => {
        var current_pantry = this.state.value;
        this.setState({message: 'Selected items deleted from ' + pantry_list[current_pantry]['pantry_name']});
        if(this.state.selected === 'all'){
            deletedItems = pantry_list[current_pantry]['items'];
            pantry_list[current_pantry]['items'] = []
        }else{
            this.state.selected.map( function (item) {
                deletedItems.push(pantry_list[current_pantry]['items'][item]);
                pantry_list[current_pantry]['items'].splice(item, 1);
            })
        }
        this.handleTouchTap(deletedItems);
        this.setState({selected: []});
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
    
    handleTouchTap = () => {
        this.setState({
        undo: true,
        });
    };

    handleActionTouchTap = () => {
        var worked = false;
        var pantry_id = pantry_list[this.state.value]['pantry_id'];
        deletedItems.forEach(function(item){
            pantry.addItem(pantry_id,item.item_id,item.item_amount,item.item_unit,(result) => {
                if(result.status == 200){           
                    worked = true;
                }else{
                    worked = false;
                }
            })
        })
        if(worked){
            console.log(pantry_list[this.state.value]['items']);
            pantry_list[this.state.value]['items'].push.apply(pantry_list[this.state.value]['items'],deletedItems);
            console.log(pantry_list[this.state.value]['items']);
            deletedItems = [];
        }
        this.forceUpdate()
        this.setState({
        undo: false,
        });
    };

    handleRequestClose = () => {
        this.setState({
        undo: false,
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
                <Snackbar
                open={this.state.undo}
                message={this.state.message}
                action="undo"
                autoHideDuration={4000}
                onActionTouchTap={this.handleActionTouchTap}
                onRequestClose={this.handleRequestClose}/>
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
                        value={this.state.unit}
                        onChange={this.handleChangeSelect}>
                            <MenuItem value={"Kg"} primaryText="Kg" />
                            <MenuItem value={"g"} primaryText="g" />
                            <MenuItem value={"lb"} primaryText="lb" />
                        </SelectField>
                    </div>
                </Dialog>
                <Card>
                    <CardTitle title={
                        <div>
                        Pantry  
                        <IconButton tooltip="New Pantry" tooltipPosition="top-right">
                            <SvgIcon>
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/>
                            </SvgIcon>
                        </IconButton>
                        </div>
                    } 
                    subtitle="Your pantry" />
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChangeTab}>
                    {pantry_list.map( (row, index) => (
                        <Tab style={styleTab} label={row['pantry_name']} value={index}/>
                    ))}
                    </Tabs>
                    <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeTab}>
                    {pantry_list.map( (pantry, index) => (
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
                                {pantry['items'].map( (row, index) => (
                                <TableRow key={index} selected={this.isSelected(index)}>
                                    <TableRowColumn>{row.item_name}</TableRowColumn>
                                    <TableRowColumn>{row.item_amount}{row.item_unit}</TableRowColumn>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ))}
                    </SwipeableViews>
                    <CardActions>
                        <FloatingActionButton 
                                mini={true} 
                                style={style}
                                onClick={this.handleOpen}
                                backgroundColor='#FF2B19'>
                            <ContentAdd />
                        </FloatingActionButton>
                        {this.state.selected.length > 0 && this.state.selected != "none" ? 
                            <IconButton 
                            tooltip="Delete Selected"
                            onClick={this.handleDelete}>
                                <SvgIcon color='black'>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                </SvgIcon>
                            </IconButton>  
                            : null
                        }
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Pantry;
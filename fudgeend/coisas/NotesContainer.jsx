import React, { Component } from 'react';
import Masonry from 'react-masonry-component'
import TextField from 'material-ui/TextField'
import Note from './Note'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ReactTooltip from 'react-tooltip'
import Avatar from 'material-ui/Avatar';

import store from './helpers/store.js'
// var Packery = require('react-packery-component')(React);

class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            inputText: '',
            errorText: null,
            inputColor: '#ffffff',
            private: false,
            title : ''
        }

    }

    componentWillMount() {
        store.getPublicNotes()
        store.subscribe('notes',(notes) => {
            notes.forEach((note) => {
                this.addNote(note)
            })
        })
    }

    componentDidMount() {
        // for (let i=0;i < 5;i++){
        //     this.addNote('teste')
        // }

    }

    componentWillUnmount() {

    }

    addNote = (noteObject) => {
        let currentData = this.state.data
        currentData.push(<Note key={'note-'+noteObject.id} info={noteObject} />)
        this.setState({ data : currentData, inputText : '', errorText : null, title : '' })
    }

    handleInputChange = (event) => {
        this.setState({
            inputText : event.target.value,
            errorText : this.state.title.length > 40 ? this.state.errorText : null
        });
    };

    handleTitleChange = (event) => { 
        this.setState({ 
            title : event.target.value,
            errorText : this.state.title.length > 40 ? "Você atingiu o tamanho máximo para o título" : null 
        })
    }
        

    handleNoteSubmit = (event) => {
        if(event.key === 'Enter' && this.state.inputText != ''){
            let currentText = this.state.inputText
            this.setState({ inputText :  currentText + '\n'})
        }
        if (this.state.inputText != '' && this.state.title.length <= 40){
            store.addNote( new store.Note (
                this.state.title,this.state.inputText,this.state.inputColor,this.state.private
            ))
        } else {
            this.setState({ errorText : this.state.errorText ? '' : "Texto vazio" + ', por favor corrija' })
        }
        
    }

    handleLockPress = () => {
        this.setState({ private : !this.state.private })
    }

    render() {

        const masonryOptions = {
            transitionDuration: 200,
            enableResizableChildren: true,
            horizontalOrder: true
            // gutter: 40,
            // columnWidth:{ width : 20 + '%' }
        }

        const masonryStyle = {
        }

        const packeryOptions = {
            transitionDuration: 250
        }
    
        const colorPicker = () => {
            let colors = ['#ffffff','#ffcdd2','#e1bee7','#bbdefb','#b2ebf2','#dcedc8','#ffeb3b']
            return colors.map((color) => <Avatar
                key={color}
                backgroundColor={color}
                style={{margin:5}}
                onClick={()=> { this.setState({ inputColor : color })} }
                className='color-samples'
            />)
            
        }

        return (
            <div 
                style={ this.props.margin ? { marginLeft:275,marginRight:25 } : { marginLeft : 0 }}
            >
                <div className='row centered'>
                    <div className='note-input-wrapper' style={{backgroundColor : this.state.inputColor }}>
                        <TextField
                            id="text-field-controlled"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            className='note-input-title'
                            hintText='Título'
                            underlineStyle={{width:95+'%',border:'none'}}
                            underlineFocusStyle={{width:95+'%',borderColor:'#808080'}}
                            inputStyle={{color:'gray'}}
                        />

                        <TextField
                            multiLine
                            id="text-field-controlled"
                            value={this.state.inputText}
                            onChange={this.handleInputChange}
                            errorText={ this.state.errorText }
                            className='note-input-text'
                            hintText='Escreva algo aqui...'
                            underlineStyle={{width:100+'%',color:'#808080'}}
                            underlineFocusStyle={{width:100+'%',borderColor:'#808080'}}
                        />
                        <div className='note-input-options'>
                            <IconButton onClick={this.handleLockPress}>
                                <FontIcon className="material-icons" > {this.state.private ? 'lock' : 'lock_open'} </FontIcon>
                            </IconButton>

                            <IconButton 
                                data-tip data-for='colorPicker'
                            >
                                <FontIcon className="material-icons" >format_paint</FontIcon>
                            </IconButton>
                            <ReactTooltip id='colorPicker' class='extraClass' delayHide={500} effect='solid' place='bottom'>
                                {colorPicker()}
                            </ReactTooltip>

                            <IconButton onClick={this.handleNoteSubmit}>
                                <FontIcon className="material-icons" >add</FontIcon>
                            </IconButton>
                            
                        </div>
                        
                    </div>
                </div>


                <div className='row container'>
                <Masonry
                    enableResizableChildren={true}
                    className={'masonry'} // default '' 
                    elementType={'div'} // default 'div'
                    style={masonryStyle}
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false}  // default false and works only if disableImagesLoaded is false
                >
                    { this.state.data }
                </Masonry>
                {/* <Packery
                className={'grid-item'} // default ''
                elementType={'div'} // default 'div'
                options={packeryOptions} // default {}
                disableImagesLoaded={false} // default false>
                >
                    { this.state.data }
                </Packery> */}
                </div>

                
            </div>
        );
    }
}


export default NotesContainer;
import React from 'react'
import uuid from "uuid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import dummyStore from '../dummy-store';
import '../AddFolder/AddFolder.css'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

       pushFolder = () => {

        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uuid.v4(),
                name: this.state.value.replace(/\s+/g, '')
            })
        })
        // this.props.history.goBack()
        window.location.href = window.location.origin
    }

    validateFolder = () => {
        if (this.state.value) {
            this.pushFolder();
        }
        else {
            alert("THE NAME FIELD IS REQUIRED");
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <div>
                <h1>
                    Add Folder
                </h1>
                <form>
                    <label>
                        <h3>
                            Name:
                        </h3>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <button type="Button" onClick={this.validateFolder}>Submit</button>
                </form>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='AddFolderNav__back-button'>
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
                    Back
            </CircleButton>
            </div>
        )
    }
}
export default AddFolder;

//no prop validation needed, this component
//only uses props to navigate


import React from 'react'
import uuid from "uuid";
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import dummyStore from '../dummy-store';
import '../AddNote/AddNote.css';

class AddNote extends React.Component {

    state = {
        notes: [],
        folders: [],
        folderId: '',
        folderName: '',
        noteName: '',
        noteContent: ''
    };

    componentDidMount() {
        this.getFolders()
    }

    getFolders() {
        fetch('http://localhost:9090/folders')
            .then(response => response.json())
            .then(data => {
                this.setState({ folders: data })
            })
    }

    setFolder = (id, name) => {
        this.setState({ folderId: id });
        this.setState({ folderName: name });
    }

    validateNote = () => {
        if (
            this.state.folderId &&
            this.state.noteName &&
            this.state.noteContent
        ) {
            this.pushNote();
        } else {
            alert("ERROR: ALL 3 FIELDS ARE REQUIRED");
        }
    }

    handleName = (event) => {
        this.setState({ noteName: event.target.value });
    }
    handleNote = (event) => {
        this.setState({ noteContent: event.target.value });
    }

    pushNote = () => {

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uuid.v4(),
                name: this.state.noteName,
                modified: format(new Date()),
                folderId: this.state.folderId,
                content: this.state.noteContent
            })
        })
        window.location.href = window.location.origin
    }

    render() {
        const folders = Object.keys(this.state.folders)
            .map(i =>
                <div className="summary__option" key={this.state.folders[i].id}>

                    <input type="radio" name="name" value={this.state.folders[i].name}
                        onClick={() => this.setFolder(this.state.folders[i].id, this.state.folders[i].name)}>
                    </input>
                    <li>
                        {this.state.folders[i].name}
                    </li>
                </div>
            )
        return (
            <div>
                <h3>
                    Select a folder to append a note to below
                </h3>
                <div className='folder__select__wrapper'>
                    {folders}
                </div>


                <form>
                    <div className="folder__append__to">
                        <h3>
                            Folder
                    </h3>
                        <li>
                            {this.state.folderName}
                        </li>
                    </div>

                    <h3>
                        Name
                    </h3>
                    <input type="text" value={this.state.noteName} onChange={this.handleName} />
                    <h3>
                        Note
                    </h3>
                    <input type="text" value={this.state.noteContent} onChange={this.handleNote} />
                </form>
                <br></br>
                <button type="Button" onClick={this.validateNote}>Submit</button>
                <br></br>
                <br></br>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='AddNoteNav__back-button'>
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
                    Back
            </CircleButton>
            </div>
        )
    }
}



export default AddNote;

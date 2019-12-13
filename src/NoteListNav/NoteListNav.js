import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types';
import './NoteListNav.css'

export default function NoteListNav(props) {
  
  let deleteFolder = (id) => {
    const url = "http://localhost:9090/folders/" + id;
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(url, requestOptions).then((response) => {
    }).then(() => {
      window.location.href = window.location.origin
    });
  }

  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink

              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>

                {countNotesForFolder(props.notes, folder.id)}
                <button className='Folder__delete' type='button' onClick={() => { deleteFolder(folder.id) }}>
                  <FontAwesomeIcon icon='trash-alt' />
                  {' '}
                  remove
                </button>
              </span>
              {folder.name}
            </NavLink>

          </li>

        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
</CircleButton>
      </div>
    </div>
  )
}


NoteListNav.defaultProps = {
  folders: []
}

NoteListNav.propTypes = {
  notes: PropTypes.array
};


import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import PropTypes from 'prop-types';
import './NoteListMain.css'

export default function NoteListMain(props) {
  // console.log('\n\nNoteListMain.js says....');
  // console.log(props);
  //console.log(props.notes);
  return (
    <section className='NoteListMain'>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
      <ul>
        {props.notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
    </section>
  )
}

NoteListMain.defaultProps = {
  notes: [],
}

NoteListMain.propTypes = {
  notes: PropTypes.array
};

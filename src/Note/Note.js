import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import './Note.css'

export default function Note(props) {
  //console.log(props);

  let deleteNote = () => {
    console.log('click');
    console.log(props.id)

    const requestOptions = {
      method: 'DELETE'
    };
  
    fetch("http://localhost:9090/notes/" + props.id, requestOptions).then((response) => {
    }).then(() => {
      window.location.href = window.location.origin
    });

  }

  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={deleteNote}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
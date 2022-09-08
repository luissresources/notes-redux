import React from 'react';
import ReactDOM from 'react-dom';
import { legacy_createStore as createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer)

const generateId = () => 
  Number((Math.random()*1000000).toFixed(0))

const createNote = (content) => {
  return ({
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  })
}

const toggleImportanceOf = (id) => {
  return ({
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  })
}

const App = () => {

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    console.log({ content })
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input 
          type="text" 
          name='note' 
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {
          store.getState().map(note => 
            <li
              key={note.id}
              onClick={() => toggleImportance(note.id)}
            >
              {note.content} <strong>{ note.important ? 'important' : ''}</strong>
            </li>
          )
        }
      </ul>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

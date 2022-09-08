import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const NewNote = () => {

  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    console.log({ content })
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
        <input 
          type="text" 
          name='note' 
        />
        <button type='submit'>add</button>
      </form>
  )
}

export default NewNote
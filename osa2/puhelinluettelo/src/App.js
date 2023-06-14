import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName
    }
  
    const nameExists = persons.some(person => person.name === noteObject.name)
  
    if (nameExists) {
      alert(noteObject.name + " already exists")
      return
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <p key={person.name}>
            {person.name}
          </p>
        )}
    </div>
  )

}

export default App
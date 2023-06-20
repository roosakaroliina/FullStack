import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      <p>
        filter shown with <input
        value={props.value}
        onChange={props.handleFilterChange}
        />
      </p>
    </div>
  )
}

const PersonFrom = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}
        />
      </div>
      <div>number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        /></div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.filterPersons.map(person => 
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    const nameExists = persons.some(person => person.name === personObject.name)
  
    if (nameExists) {
      alert(personObject.name + " already exists")
      return
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
  }

  const filterPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonFrom newName={newName} newNumber={newNumber} 
      addPerson={addPerson} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}

export default App
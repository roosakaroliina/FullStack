import { useState, useEffect } from 'react'
import personService from './services/persons'


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
        />
      </div>
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
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.removePerson(person.id, person.name)}>delete</button>
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
  
    const nameExists = persons.some(person => person.name === personObject.name)
  
    if (nameExists) {
      alert(personObject.name + " already exists")
      return
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert('Error occurred while deleting the person.');
        })
    }
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
      handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
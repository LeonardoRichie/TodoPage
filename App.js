import { useEffect, useState } from 'react'
import Name from './components/Name'
import AlertMessage from './components/AlertMessage'
import './App.css';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [nameList, setNameList] = useState([])
  const [query, setQuery] = useState('')
  const [state, setState] = useState({
    query: '',
    list: []
  })
  const [alertState, setAlertState] = useState(0)
  const [btnClicked, setBtnClicked] = useState(false)
  const [isCleared, setIsCleared] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      date: new Date().toISOString(),
      id: persons.length+1,
    }
    if(isCleared === false && nameObject.name === '') {
      alert('Invalid inputs.')
    }
    else {
    const namecheck = personExists(nameList, nameObject)
    if(namecheck === false) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      nameList.push(nameObject.name)
      setState({
        query: '',
        list: persons.concat(nameObject)
      })
    } 
    else if(namecheck === true){
      setAlertState(1)
    }
    else {
      setAlertState(2)
    }
    }
  }

  const personExists = (nameList, nameObject) => {
    let nameExists = nameList.includes(nameObject.name)
    return(nameExists)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setQuery(event.target.value)
    const results = persons.filter(person => {
      if(event.target.value === '' ) {
        return persons
      }
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setState({
      query: event.target.value,
      list: results
    })
  }

  const clearContacts = () => {
    setPersons([])
    setState({
      query: '',
      list: []
    })
    setNameList([])
    setIsCleared(true)
  }

  return (
    <div class ="Body">
      <h2>To Do List App</h2>
      <h3> Leonardo Richie <br>
      </br>2502005856</h3>
      <form>
        <div>Filter: <input type='search' value={query} onChange={handleFilterChange}/></div>
      </form>
      <br/>
      <form onSubmit={addName}>
        <div>Task: <input value={newName} onChange={handleNameChange}/></div>
        <div>
          <button onClick={()=> {setBtnClicked(true); setAlertState(0)}}>Add</button>
          {btnClicked && <AlertMessage btnClicked={btnClicked} alertState={alertState} newName={nameList[0]} />}
        </div>
        <div>
          <button onClick={()=> clearContacts()}>
            Clear
          </button>
        </div>
      </form>
      <h2>Tasks</h2>
      <ul>
        {state.list.map(person => 
          <Name key={person.id} person={person}/>
        )}
      </ul>
    </div>
  )
}

export default App
const Name = ({ person, isCompleted, handleClick}) => {
    return (
      <li>{person.name} 
        <input type='checkbox' onClick={handleClick} completed={isCompleted} />
      </li>
    )
  }
  
  export default Name
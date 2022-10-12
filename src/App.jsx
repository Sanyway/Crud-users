import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Form from './assets/components/Form'
import UserCard from './assets/components/UserCard'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsOpen, setFormIsOpen] = useState(true)
  
  


  // para hacer el get de los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {

    getAllUsers()

  }, [])

  // para crear un usuario

  const createNewUser = data => {

    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))

  }

  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }
  console.log(users)



  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res)
        getAllUsers()
      })
      .then()
  }

  const handleOpenForm = () => {
    setFormIsOpen(false)
    setUpdateInfo()
  }


  console.log(updateInfo)
  return (
    <div className="App">
      <div className='App_container_title'>
        <h1 className='App_title'>Users CRUD</h1>
        <button onClick={handleOpenForm} className='App_btn'>Create a new user</button>
      </div>
      <div className={formIsOpen ? 'disable_form' : 'form_container'}>
        <Form
          createNewUser={createNewUser}
          updateUserById={updateUserById}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          setFormIsOpen={setFormIsOpen} />
      </div>
      <div className='conf_button'>
      
      </div>
      <div className='users_container'>
        {
          users?.map(user => (
            <UserCard
              deleteUserById={deleteUserById}
              setUpdateInfo={setUpdateInfo}
              setFormIsOpen={setFormIsOpen}
              updateUserById={updateUserById}
              key={user.id}
              user={user} />
          ))

        }


      </div>

    </div>
  )
}

export default App

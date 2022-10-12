import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles/userCard.css'



const UserCard = ({ user, deleteUserById, setUpdateInfo, setFormIsOpen, updateUserById }) => {

  const [delConfirm, setDelConfirm] = useState(false)
  const [buttonStatus, setButtonStatus] = useState(false)
  const { handleSubmit, register } = useForm()

  const submit = data => {
    updateUserById(user.id, data)
    console.log(data)
    console.log(user.id)

  }



  const handleOpenEdit = () => {
    setFormIsOpen(false)
  }

  const handleEdit = () => {

    setUpdateInfo(user)
    handleOpenEdit()
  }

  const deleteConfirmation = () => {
    setDelConfirm(true)
  }

  const deleteNot = () => {
    setDelConfirm(false)
  }

  const hideButton = () => {
    setButtonStatus(!buttonStatus)
  }

  return (
    <article className='user'>
      <div className='delete_container'>
        <div className={delConfirm ? 'delete_card' : 'delete_hidden'}>
          <h1 className='delete_name'>¿Delete user?</h1>
          <div className='delete_buttons'>
            <button className='yes_button' onClick={() => deleteUserById(user.id)}>Yes</button>
            <button className='no_button' onClick={deleteNot}>No</button>
          </div>
        </div>
      </div>
      <div className='edit_user'>
        <h2 className={buttonStatus ? 'name_hide' : 'user_name'}>{`${user.first_name} ${user.last_name}`}</h2>
        <form className='form_single hide_form_name' onSubmit={handleSubmit(submit)}>
          <input className={buttonStatus ? 'form_input' : 'input_hide'} placeholder={`${user.first_name} ${user.last_name}`} type="text" id={user.id} {...register('first_name')} />
          <button  className={buttonStatus ? 'update_button' : 'update_hide'}>Update</button>
          <button onClick={hideButton} className={buttonStatus ? 'edit_hide' : 'edit_button'}>Edit</button>
        </form>
      </div>

      <ul className='user_list'>
        <li className='user_item'>
          <span className='user_span'>Email</span>{user.email}
        </li>
        <li className='user_item'>
          <span lassName='user_span'>Birthdate</span>
          <div className='user_item-container'>
            <i className='fa-solid  fa-gift user_gift'></i> {user.birthday}
          </div>
        </li>
      </ul>
      <footer className='user_footer'>
        <button className='user_btn' onClick={deleteConfirmation}>
          <i className="fa-regular fa-trash-can user_trash"></i>
        </button>
        <button className='user_btn' onClick={handleEdit}>
          <i className="fa-solid fa-pen-to-square user_edit"></i>
        </button>

      </footer>
    </article>
  )
}

export default UserCard
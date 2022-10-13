import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './styles/userCard.css'

const defaultValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: ''

}

const UserCard = ({ user, deleteUserById, setUpdateInfo, setFormIsOpen, updateUserById, updateInfo, setStopProps, stopProps }) => {

  const [delConfirm, setDelConfirm] = useState(false)
  const [buttonStatus, setButtonStatus] = useState(false)
  const { handleSubmit, register, reset } = useForm()

  useEffect(() => {

    if (updateInfo) {
      reset(updateInfo)
    } else if (updateInfo === undefined) {
      reset(defaultValues)
    }
  }, [updateInfo])

  useEffect(() => {
    if (!stopProps) {
      setDelConfirm(false)
    }
  }, [stopProps])


  const submit = data => {
    if (updateInfo) {
      setButtonStatus(!buttonStatus)
      updateUserById(updateInfo.id, data)
    } else {
      setButtonStatus(!buttonStatus)
    }

  }


  const handleOpenEdit = () => {
    setFormIsOpen(false)
  }

  const handleEdit = () => {

    setUpdateInfo(user)
    handleOpenEdit()

  }

  const editButton = (e) => {
    if (e) {
      setUpdateInfo(user)
      setButtonStatus(e)
    } else {
      setUpdateInfo(user)
      setButtonStatus(!buttonStatus)
    }
  }

  const deleteConfirmation = () => {
    setDelConfirm(true)
  }

  const deleteNot = () => {
    setDelConfirm(false)
  }


  const runLi = (event) => {
    event.stopPropagation()
    deleteConfirmation()
    setStopProps(true)
    console.log(stopProps)

  }



  return (
    <article className='user'>
      <div className='delete_container' >
        <div className={delConfirm && stopProps ? 'delete_card' : 'delete_hidden'}>
          <h1 className='delete_name'>¿Delete user?</h1>
          <div className='delete_buttons'>
            <button className='yes_button' onClick={() => deleteUserById(user.id)}>Yes</button>
            <button className='no_button' onClick={deleteNot}>No</button>
          </div>
        </div>
      </div>
      {/*------------------------------------------First Name----------------------------------------*/}
      <div className='user_full_name'>
        <i className="fa-solid fa-user icon_user"></i>
        <div>
          <div className='edit_user'>
            <h2 className={buttonStatus == 1 ? 'name_hide' : 'name_user'}>{`${user.first_name}`}</h2>
            <form className='name_single_form' onSubmit={handleSubmit(submit)}>
              <input className={buttonStatus == 1 ? 'name_form_edit' : 'name_edit_hide'} placeholder={`${user.first_name}`} type="text" id={user.id} {...register('first_name')} />
              <button className={buttonStatus == 1 ? 'name_update_button' : 'name_update_hide'}>Update</button>
            </form>
            <button onClick={() => editButton(1)} className={buttonStatus == 1 ? 'name_edit_hide' : 'name_edit_button'}>
              <i className="fa-solid fa-pen-to-square user_edit"></i>
            </button>
          </div>

          {/*------------------------------------------Last name----------------------------------------*/}

          <div className='edit_last'>
            <h2 className={buttonStatus == 2 ? 'last_hide' : 'last_name'}>{user.last_name}</h2>
            <form className='last_single_form' onSubmit={handleSubmit(submit)}>
              <input className={buttonStatus == 2 ? 'last_form_edit' : 'last_edit_hide'} placeholder={`${user.last_name}`} type="text" id={user.id} {...register('last_name')} />
              <button className={buttonStatus == 2 ? 'last_update_button' : 'last_update_hide'}>Update</button>
            </form>
            <button onClick={() => editButton(2)} className={buttonStatus == 2 ? 'last_edit_hide' : 'last_edit_button'}>
              <i className="fa-solid fa-pen-to-square user_edit"></i>
            </button>
          </div>
        </div>
      </div>
      <ul className='user_list'>
        {/*------------------------------------------Email----------------------------------------*/}
        <div className='user_full_email'>
          <i className="fa-solid fa-envelope icon_email"></i>
          <li className='edit_email'>
            <div className='div_email'>
              <span className='user_span'>Email</span>
              <h2 className={buttonStatus == 3 ? 'email_hide' : 'email_name'}>{user.email}</h2>
              <form className='email_single_form' onSubmit={handleSubmit(submit)}>
                <input className={buttonStatus == 3 ? 'email_form_edit' : 'email_edit_hide'} placeholder={`${user.email}`} type={buttonStatus ? 'email' : 'text'} id={user.id} {...register('email')} />
                <button className={buttonStatus == 3 ? 'email_update_button' : 'email_update_hide'}>Update</button>
              </form>
            </div>
            <button onClick={() => editButton(3)} className={buttonStatus == 3 ? 'email_edit_hide' : 'email_edit_button'}>
              <i className="fa-solid fa-pen-to-square user_edit"></i>
            </button>
          </li>

        </div>
        {/*------------------------------------------Birthday----------------------------------------*/}
        <div className='user_full_birthday'>
        <i className="fa-solid fa-cake-candles icon_birthday"></i>
          <li className='birthday_div'>
            <div className='edit_birthday'>
              <span className='user_span'>Birthdate</span>
              <h2 className={buttonStatus == 4 ? 'birthday_hide' : 'birthday_name'}>{user.birthday}</h2>
              <form className='birthday_single_form' onSubmit={handleSubmit(submit)}>
                <input className={buttonStatus == 4 ? 'birthday_form_edit' : 'birthday_edit_hide'} placeholder={`${user.birthday}`} type={buttonStatus ? 'date' : 'text'} id={user.id} {...register('birthday')} />
                <button className={buttonStatus == 4 ? 'birthday_update_button' : 'birthday_update_hide'}>Update</button>
              </form>
            </div>
            <button onClick={() => editButton(4)} className={buttonStatus == 4 ? 'birthday_edit_hide' : 'birthday_edit_button'}>
              <i className="fa-solid fa-pen-to-square user_edit"></i>
            </button>
          </li>
        </div>
      </ul>
      <footer className='user_footer'>
        <button className='user_btn' onClick={runLi}>
          <i className="fa-regular fa-trash-can user_trash"></i>
        </button>
        <button className='user_btn' onClick={handleEdit}>
          <i className="fa-solid fa-user-pen"></i>

        </button>

      </footer>
    </article>
  )
}

export default UserCard
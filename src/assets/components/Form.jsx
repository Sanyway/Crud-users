import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/form.css'

const defaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''

}

const Form = ({ createNewUser, updateInfo, setUpdateInfo, updateUserById, setFormIsOpen }) => {

    useEffect(() => {

        if (updateInfo) {
            reset(updateInfo)
        }else if(updateInfo === undefined){
            reset(defaultValues)
        }
    }, [updateInfo])

    const { handleSubmit, register, reset } = useForm()

    const submit = data => {
        if (updateInfo) {
            updateUserById(updateInfo.id, data)
        } else {
            createNewUser(data)
        }
        setFormIsOpen(true)
        reset(defaultValues)
        setUpdateInfo()
    }

    const handleFormIsClosed = () => {
         setFormIsOpen(true)
    }


    return (
        <form className='form' onSubmit={handleSubmit(submit)}>
            <i onClick={handleFormIsClosed} className="fa-regular fa-circle-xmark form_x"></i>
            <h2 className='form_title'>{updateInfo ? 'Edit info' : 'New User'}</h2>
            <div className='form_object'>
                <label className='form_label' htmlFor="email">Email</label>
                <input className='form_input' placeholder='Enter your email' type="email" id="email" {...register('email')} />
            </div>
            <div className='form_object'>
                <label className='form_label' htmlFor="password">Password</label>
                <input className='form_input' placeholder='Enter password' type="password" id="password" {...register('password')} />
            </div>
            <div className='form_object'>
                <label className='form_label' htmlFor="first_name">First Name</label>
                <input className='form_input' placeholder='Enter your first name' type="text" id="first_name" {...register('first_name')} />
            </div>
            <div className='form_object'>
                <label className='form_label' htmlFor="last_name">Last Name</label>
                <input className='form_input' placeholder='Enter your last name' type="text" id="last_name" {...register('last_name')} />
            </div>
            <div className='form_object'>
                <label className='form_label' htmlFor="birthday">Birthday</label>
                <input className='form_input' placeholder='Enter your birthday' type="date" id="birthday" {...register('birthday')} />
            </div>
            <button className='form_btn'>{updateInfo ? 'Update' : 'Add User'}</button>

        </form>
    )
}

export default Form


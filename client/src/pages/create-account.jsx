import React from 'react'
import '../styles/form.css'
import AccountForm from '../components/AccountForm/AccountForm'

const CreateAccount = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <h2 className="col-md-12 subHeader">stuff</h2>
                    <h1 className="col-md-12 headerBlue">written <span className="headerBlack">here,</span> and more stuff..</h1>
                    <div className="block col-md-3"></div>
                    <h3 className="col-md-12 paragraphTitle">stuff written here too.</h3>
                    <hr className="m-2" />
                </div>
            </div>
            <AccountForm />
        </>
    )
}

export default CreateAccount
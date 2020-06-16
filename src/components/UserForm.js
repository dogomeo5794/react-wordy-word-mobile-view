import React, { Component } from 'react'
import FormUserDetails from './FormDetails'

export class UserForm extends Component {

    state = {
        step: 1,
        firstname: '',
        lastname: '',
        contact: '',
        email: '',
        address: '',
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState( {
            step: step + 1
        } )
    }

    // Proceed to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState( {
            step: step - 1
        } )
    }

    handleChange = input => e => {
        this.setState( {
            [ input ]: e.target.value
        } );
    }

    render() {
        return (
            <FormUserDetails />
        )
    }
}

export default UserForm

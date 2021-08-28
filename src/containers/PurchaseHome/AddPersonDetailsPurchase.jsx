import React, { useState } from 'react'

import { toast } from 'react-toastify'
import API from '../../components/constant/api'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'

export default function AddPersonDetailsPurchase({details, callback}) {
	const [name, setName] = useState(details ? details.name : '')
	const [mobile, setMobile] = useState(details ? details.mobile : '')
	const [validMobile, setValidMobile] = useState(true)
	const [valid, setValid] = useState(true)
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const handleOnChange = (e) => {
		setName(e.target.value)
		setValid(true)
		setErrorMsg('')
	}

	const handleOnChangeMobile = e => {
		setMobile(e.target.value)
		setValidMobile(true)
	}

	const handleAdd = async () => {
		if (!name) {
			setValid(false)
			return
		}
		if (!mobile || mobile.toString().length !== 10) {
			setValidMobile(false)
			return
		}
		setLoading(true)
		const res = await fetch(`${API.API_URL}${API.PERSON_PATH}${details ? `/${details.id}` : ''}`, {
			method: details ? 'PUT' : 'POST',
			body: JSON.stringify({ name, mobile, featureType: 'CREDIT_DEBIT', ...(details ? {id: details.id} : {}) }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const newEmployee = await res.json()
			if (newEmployee.error) {
				toast.error(newEmployee.error)
				setLoading(false)
			} else {
				callback(true)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
			setLoading(false)
		}	
	}

	return (
		<Modal
			heading="Add Person"
			onClose={callback}
			handleAction={handleAdd}
			actionLabel="Save"
			loadingAction={loading}
		>
			<TextField
				required
				value={name}
				error={!valid}
				errorMsg={errorMsg || 'Please enter name'}
				name="name"
				label="Name"
				onChange={handleOnChange}
			/>
			<TextField
				required
				value={mobile}
				error={!validMobile}
				errorMsg="Please enter valid mobile"
				name="mobile"
				label="Mobile"
				onChange={handleOnChangeMobile}
				type="number"
			/>
		</Modal>
	)
}

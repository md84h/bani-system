import React, { useState } from 'react'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import Dropdown from '../../components/Dropdown'
import { createRequestParam, getInitialState, validate } from './helper'

export default function AddComponent({employeeId, handleClose, values}) {
	const [state, setState] = useState(getInitialState(values))
	const [errorType, setErrorType] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const handleOnChange = (e) => {
		setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
		setErrorType('')
		setErrorMsg('')
	}

	const handleDateChange = (e) => {
		setState(prevState => ({...prevState, date: e}))
	}

	const handleAdd = async () => {
		const isValid = validate(state)
		if (!isValid.success) {
			setErrorType(isValid.type)
			setErrorMsg(isValid.msg)
			return
		}
		setLoading(true)
		const reqBody = createRequestParam(employeeId, state, values)
		const res = await fetch(`${API.API_URL}${API.PURCHASE_PATH}${values ? `/${values.id}` : ''}`, {
			method: values ? 'PUT' : 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const newEntry = await res.json()
			if (newEntry.error) {
				toast.error(newEntry.error)
				setLoading(false)
			} else {
				handleClose(true)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
			setLoading(false)
		}
	}
	
	return (
		<Modal
			heading="Add"
			onClose={handleClose}
			handleAction={handleAdd}
			actionLabel="Save"
			loadingAction={loading}
		>
			<DatePicker
				value={state.date}
				onChange={handleDateChange}
			/>
			<Dropdown
				required
				name="type"
				label="Select Type"
				value={state.type}
				options={[{value: 'CREDIT', name: 'Credit'}, {value: 'DEBIT', name: 'Debit'}]}
				onChange={handleOnChange}
			/>
			<TextField
				value={state.description}
				error={errorType === 'description'}
				errorMsg={errorMsg}
				name="description"
				label="Description"
				onChange={handleOnChange}
				multiline
				rows={3}
			/>
			<TextField
				required
				value={state.amount}
				error={errorType === 'amount'}
				errorMsg={errorMsg}
				name="amount"
				label="Amount"
				onChange={handleOnChange}
				type="number"
			/>
		</Modal>
	)
}

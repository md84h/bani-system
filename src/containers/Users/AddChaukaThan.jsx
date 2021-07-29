import React, { useState } from 'react'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import { createRequestParamChaukaThan, getInitialStateChaukaThan, validateChaukaThan } from './helper'

export default function AddChaukaThan({employeeId, handleClose, values}) {
	const [state, setState] = useState(getInitialStateChaukaThan(values))
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
		const isValid = validateChaukaThan(state)
		if (!isValid.success) {
			setErrorType(isValid.type)
			setErrorMsg(isValid.msg)
			return
		}
		setLoading(true)
		const reqBody = createRequestParamChaukaThan(employeeId, state, values)
		const res = await fetch(`${API.API_URL}${API.THAN_PATH}${values ? `/${values.id}` : ''}`, {
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
			heading="Add Chauka"
			onClose={handleClose}
			handleAction={handleAdd}
			actionLabel="Save"
			loadingAction={loading}
		>
			<DatePicker
				value={state.date}
				onChange={handleDateChange}
			/>
			<TextField
				required
				value={state.quantity}
				error={errorType === 'quantity'}
				errorMsg={errorMsg}
				name="quantity"
				label="Chauka Quantity"
				onChange={handleOnChange}
				type="number"
			/>
		</Modal>
	)
}

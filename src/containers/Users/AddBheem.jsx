import React, { useState } from 'react'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import { createRequestParamLungiBheem, getInitialStateLungiBheem, validateLungiBheem } from './helper'

export default function AddBheem({employeeId, handleClose, values, product}) {
	const [state, setState] = useState(getInitialStateLungiBheem(values))
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
		const isValid = validateLungiBheem(state)
		if (!isValid.success) {
			setErrorType(isValid.type)
			setErrorMsg(isValid.msg)
			return
		}
		setLoading(true)
		const reqBody = createRequestParamLungiBheem(employeeId, state, values, product)
		const res = await fetch(`${API.API_URL}${API.BANA_TANA_PATH}${values ? `/${values.id}` : ''}`, {
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
			heading="Add Bheem"
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
				value={state.weight}
				error={errorType === 'weight'}
				errorMsg={errorMsg}
				name="weight"
				label="Bheem Weight(Kg)"
				onChange={handleOnChange}
				type="number"
			/>
			<TextField
				required
				value={state.pipeWeight}
				error={errorType === 'pipeWeight'}
				errorMsg={errorMsg}
				name="pipeWeight"
				label="Pipe Weight(Kg)"
				onChange={handleOnChange}
				type="number"
			/>
			<TextField
				required
				value={state.length}
				error={errorType === 'length'}
				errorMsg={errorMsg}
				name="length"
				label="Bheem Length(Meter)"
				onChange={handleOnChange}
				type="number"
			/>
		</Modal>
	)
}

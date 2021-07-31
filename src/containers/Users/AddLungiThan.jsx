import React, { useState } from 'react'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import { createRequestParamLungiThan, getInitialStateLungiThan, validateLungiThan } from './helper'

export default function AddLungiThan({employeeId, handleClose, values}) {
	const [state, setState] = useState(getInitialStateLungiThan(values))
	const [errorType, setErrorType] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const handleOnChange = (e) => {
		setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
		setErrorType('')
		setErrorMsg('')
	}

	const handleOnQuantity = ({target: {name, value}}) => {
		setState(prevState => {
			return {...prevState, [name]: value, weight: value ? parseInt(value)*2.5 : ''}
		})
	}

	const handleDateChange = (e) => {
		setState(prevState => ({...prevState, date: e}))
	}

	const handleAdd = async () => {
		const isValid = validateLungiThan(state)
		if (!isValid.success) {
			setErrorType(isValid.type)
			setErrorMsg(isValid.msg)
			return
		}
		setLoading(true)
		const reqBody = createRequestParamLungiThan(employeeId, state, values)
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
			heading={`${values ? 'Edit' : 'Add'} Than`}
			onClose={handleClose}
			handleAction={handleAdd}
			actionLabel={values ? 'Update' : 'Save'}
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
				label="Than Quantity"
				onChange={handleOnQuantity}
				type="number"
			/>
			<TextField
				value={state.extraLungi}
				error={errorType === 'extraLungi'}
				errorMsg={errorMsg}
				{...(errorType === 'extraLungi' ? { helperText: errorMsg } : {})}
				name="extraLungi"
				label="Extra Lungi Quantity"
				onChange={handleOnChange}
				type="number"
			/>
			<TextField
				required
				value={state.weight}
				error={errorType === 'weight'}
				errorMsg={errorMsg}
				name="weight"
				label="Total Weight(Kg)"
				onChange={handleOnChange}
				type="number"
			/>
		</Modal>
	)
}

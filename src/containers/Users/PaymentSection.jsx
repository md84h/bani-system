import React, { useState } from 'react'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'

export default function PaymentSection({type, handleUpdate, validDetails, closeCallback, isEdit }) {
	const getCurrentAmount = (current) => {
		if (type === 'THAN') {
			return (parseInt(current.quantity) * 11 * 13 + (current.extraLungi ? parseInt(current.extraLungi) * 13 : 0))
		}
		return parseInt(current.quantity) * 18
	}
	const cAmount = validDetails.reduce((acc, current) => acc + getCurrentAmount(current), 0)
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		paymentDate: isEdit ? new Date(validDetails[0].paymentDate) : new Date(),
		computedAmount: cAmount,
		totalAmount: isEdit ? validDetails.reduce((acc, current) => acc + current.totalAmount || 0, 0) : cAmount,
		comment: '',
		cutPiece: isEdit ? validDetails.reduce((acc, current) => acc + current.cutPiece || 0, 0) : ''
	})
	const [errorType, setErrorType] = useState('')
	const [errorMsg, setErrorMsg] = useState('')


	const handleOnChange = (e) => {
		setState(prevState => ({...prevState, [e.target.name]: e.target.value}))
		setErrorType('')
		setErrorMsg('')
	}

	const handleDateChange = (e) => {
		setState(prevState => ({...prevState, paymentDate: e}))
	}

	const handlePay = async () => {
		if (!state.totalAmount) {
			setErrorType('totalAmount')
			setErrorMsg('Please add amount')
			return
		}

		setLoading(true)
		let totalAmount = state.totalAmount
		const reqBody = {
			list: validDetails.map((details, i) => {
				const computedAmount = getCurrentAmount(details)
				const tAmount = i !== validDetails.length -1  ? computedAmount : totalAmount
				totalAmount -= computedAmount
				return {
					id: details.id,
					computedAmount: computedAmount,
					totalAmount: tAmount,
					...(i === validDetails.length - 1 && state.cutPiece ? {cutPiece: state.cutPiece} : {})
				}
			}),
			paymentDate: state.paymentDate,
			comment: state.comment
		}

		const res = await fetch(`${API.API_URL}${API.THAN_PATH}/pay`, {
			method: 'POST',
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
				toast.success(newEntry.message)
				handleUpdate()
			}
		} else {
			toast.error('Something went wrong, Please try again!')
			setLoading(false)
		}
	}

	return (
		<Modal
			heading="Payment"
			onClose={closeCallback}
			showEdit={false}
			handleAction={handlePay}
			actionLabel="Pay"
			loadingAction={loading}
		>
			<DatePicker
				value={state.paymentDate}
				onChange={handleDateChange}
			/>
			<TextField
				required
				value={state.totalAmount}
				error={errorType === 'totalAmount'}
				errorMsg={errorMsg}
				name="totalAmount"
				label="Total Amount"
				onChange={handleOnChange}
				type="number"
			/>
			<TextField
				value={state.cutPiece}
				name="cutPiece"
				label="Cut Piece"
				onChange={handleOnChange}
				type="number"
			/>
		</Modal>
	)
}

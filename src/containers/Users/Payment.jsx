import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'

export default function Payment({id, computedAmount, handleUpdate, preData = null }) {
	const [showPayment, setShowPayment] = useState(false)
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		paymentDate: new Date(),
		computedAmount: computedAmount,
		totalAmount: preData ? preData.totalAmount : computedAmount,
		comment: '',
		cutPiece: ''
	})
	const [errorType, setErrorType] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	const handleShowPayment = () => setShowPayment(true)

	const handleHidePayment = () => setShowPayment(false)

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

		const reqBody = {
			id,
			computedAmount,
			totalAmount: state.totalAmount,
			paymentDate: state.paymentDate,
			status: 'DONE',
			comment: state.comment,
			...(state.cutPiece ? {cutPiece: state.cutPiece} : {})
		}
		const res = await fetch(`${API.API_URL}${API.THAN_PATH}/${id}/pay`, {
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
				handleUpdate()
			}
		} else {
			toast.error('Something went wrong, Please try again!')
			setLoading(false)
		}
	}

	return (
		<>
			<Button variant="contained" onClick={handleShowPayment} color="primary">
				{preData ? 'Edit Payment' : 'Pay'}
			</Button>
			{showPayment && <Modal
				heading="Payment"
				onClose={handleHidePayment}
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
			}
		</>
	)
}

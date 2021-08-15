import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { toast } from 'react-toastify'

import API from '../../components/constant/api'
import DatePicker from '../../components/DatePicker'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'

export default function MultiplePayment({type, handleUpdate, data }) {
	const validDetails = data.filter(details => details.status !== 'DONE')
	const getCurrentAmount = (current) => {
		if (type === 'THAN') {
			return (parseInt(current.quantity) * 11 * 13 + (current.extraLungi ? parseInt(current.extraLungi) * 13 : 0))
		}
		return parseInt(data.quantity) * 18
	}
	const cAmount = validDetails.reduce((acc, current) => acc + getCurrentAmount(current), 0)
	const [showPayment, setShowPayment] = useState(false)
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		paymentDate: new Date(),
		computedAmount: cAmount,
		totalAmount: cAmount,
		comment: '',
		cutPiece: 0
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
    
		if (state.totalAmount != cAmount && !state.cutPiece) {
			setErrorType('cutPiece')
			setErrorMsg('Please add cut piece.')
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
					cutPiece: i === 0 ? state.cutPiece : 0
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
	const isPaymentPending = validDetails.length > 0
	return (
		<>
			{isPaymentPending ?
				<Button variant="contained" onClick={handleShowPayment} color="primary">
				Pay
				</Button>
				:
				<p>Payment Done</p>
			}
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
					required
					value={state.cutPiece}
					error={errorType === 'cutPiece'}
					errorMsg={errorMsg}
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

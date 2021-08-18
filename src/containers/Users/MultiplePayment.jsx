import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import Modal from '../../components/Modal'
import ViewPayment from './ViewPayment'
import PaymentSection from './PaymentSection'

export default function MultiplePayment({type, handleUpdate, data }) {
	const validDetails = data.filter(details => details.status !== 'DONE')
	const paidDetails = data.filter(details => details.status === 'DONE')
	const [showPayment, setShowPayment] = useState(false)
	const [viewPayment, setViewPayment] = useState(false)

	const handleShowPayment = () => setShowPayment(validDetails)

	const handleHidePayment = () => setShowPayment(false)

	const isPaymentPending = validDetails.length > 0
	return (
		<>
			{isPaymentPending ?
				<Button variant="contained" onClick={handleShowPayment} color="primary">
				Pay
				</Button>
				:
				<Button onClick={() => setViewPayment(true)}>
					Paid
				</Button>
			}
			
			{showPayment && <PaymentSection
				type={type}
				handleUpdate={handleUpdate}
				validDetails={showPayment}
				closeCallback={handleHidePayment}
				isEdit={viewPayment}
			/>}
			{viewPayment && <Modal
				heading="Paid"
				onClose={() => setViewPayment(false)}
				showEdit
				editOpenCallback={() => setShowPayment(paidDetails)}
			>
				<ViewPayment data={paidDetails} />
			</Modal>}
		</>
	)
}

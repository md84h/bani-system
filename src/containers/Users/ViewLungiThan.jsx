import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import { getItem } from '../../components/helper/localStorage'
import AddLungiThan from './AddLungiThan'
import Payment from './Payment'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function ViewLungiThan({data, showEdit, onEditClose, activeEmployee, handlePaymentDone }) {
	const classes = useStyles()

	const computedAmount = parseInt(data.quantity) * 11 * 13 + (data.extraLungi ? parseInt(data.extraLungi) * 13 : 0)
	const userRole = getItem('userRole')
	let isAdmin = false
	if (userRole) {
		isAdmin = JSON.parse(userRole).includes('admin')
	}
	return (
		<>
			<div className={classes.content}>
				<p><span>Date</span>{moment(data.date).format('Do MMM\'YY')}</p>
				<p><span>Quantity</span>{data.quantity}</p>
				<p><span>Weight</span>{data.weight} KG</p>
				{data.extraLungi && <p><span>Extra Lungi</span>{data.extraLungi}</p>}
				{ isAdmin &&
					<>
						<p><span>Calculated Amount</span> &#x20b9; {Number(computedAmount).toLocaleString('en-IN')}</p>
						{data.status === 'DONE' ?
							<>
								<p><span>Amount Paid</span> &#x20b9; {Number(data.totalAmount).toLocaleString('en-IN')}</p>
								{data.cutPiece > 0 && <p><span>Cut Piece</span>{data.cutPiece}</p>}
							</>
							
							: <Payment id={data.id} computedAmount={computedAmount} handleUpdate={handlePaymentDone} />}
					</>
				}
			</div>
			{showEdit && <AddLungiThan employeeId={activeEmployee} handleClose={onEditClose} values={data} />}
		</>
	)
}

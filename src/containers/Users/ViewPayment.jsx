import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function ViewPayment({data}) {
	const classes = useStyles()
	const total = data.reduce((accumulator, current) => {
		accumulator.computedAmount += current.computedAmount || 0
		accumulator.cutPiece += current.cutPiece || 0
		accumulator.totalAmount += current.totalAmount || 0
		return accumulator
	}, {computedAmount: 0, cutPiece: 0, totalAmount: 0 })
	return (
		<div className={classes.content}>
			<p><span>Payment Date</span>{moment(data[0].paymentDate).format('Do MMM\'YY')}</p>
			<p><span>Computed Amount</span>Rs. {total.computedAmount}</p>
			{total.cutPiece > 0 && <p><span>Cut Piece</span>{total.cutPiece}</p>}
			<p><span>Paid Amount</span>Rs. {total.totalAmount}</p>
		</div>
	)
}

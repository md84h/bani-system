import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import AddCone from './AddCone'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function ViewCone({data, showEdit, onEditClose, activeEmployee, product}) {
	const classes = useStyles()
	return (
		<>
			<div className={classes.content}>
				<p><span>Date</span>{moment(data.date).format('Do MMM\'YY')}</p>
				<p><span>Weight</span>{data.weight} KG</p>
				<p><span>Quantity</span>{data.quantity}</p>
			</div>
			{showEdit && <AddCone employeeId={activeEmployee} handleClose={onEditClose} values={data} product={product} />}
		</>
	)
}

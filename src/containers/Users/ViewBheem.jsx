import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import AddBheem from './AddBheem'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function ViewBheem({data, showEdit, onEditClose, activeEmployee, product}) {
	const classes = useStyles()
	return (
		<>
			<div className={classes.content}>
				<p><span>Date</span>{moment(data.date).format('Do MMM\'YY')}</p>
				<p><span>Net Wt.</span>{data.netWeight.toFixed(2)} KG</p>
				<p><span>Bheem</span>{data.weight} KG</p>
				<p><span>Pipe</span>{data.pipeWeight} KG</p>
				<p><span>Length</span>{data.length} mtr</p>
			</div>
			{showEdit && <AddBheem employeeId={activeEmployee} handleClose={onEditClose} values={data} product={product} />}
		</>
	)
}

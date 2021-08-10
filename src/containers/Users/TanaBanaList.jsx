import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function TanaBanaList({data, handleOpenDetails}) {
	const classes = useStyles()
	return (
		<Paper elevation={3} className={`${classes.paper} ${data.type === 'CONE' ? classes.cone : classes.bheem}`} onClick={handleOpenDetails}>
			<div className={classes.detailsItem}>
				<p>{moment(data.date).format('Do MMM\'YY - ddd')}</p>
				<p>{data.type}</p>
			</div>
			<div className={classes.detailsItem}>
				{data.type === 'CONE' ? <>
					<p>{data.weight} KG</p>
					<p>{data.quantity}</p>
				</>: <>
					<p>{data.netWeight.toFixed(2)} KG</p>
					<p>{data.length} mtr</p>
				</>}
			</div>
						
		</Paper>
	)
}

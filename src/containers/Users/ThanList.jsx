import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function ThanList({data, handleOpenDetails}) {
	const classes = useStyles()
	return (
		<Paper elevation={3} className={`${classes.paper} ${data.status === 'DONE' ? classes.done : ''}`} onClick={handleOpenDetails}>
			<div className={classes.detailsItem}>
				<p>{moment(data.date).format('Do MMM\'YY')}</p>
				<p>{data.product === 'LUNGI' ? 'Than' : 'Chauka'}</p>
			</div>
			<div className={`${classes.detailsItem} ${data.product === 'CHAUKA' && classes.chaukaDetails} ${data.extraLungi && classes.extraLungi}`}>
				{data.product === 'LUNGI' ? <>
					<p>{data.weight} KG</p>
					{data.extraLungi && <p>{data.extraLungi} Lungi</p>}
					<p>{data.quantity}</p>
				</> : <p>{data.quantity}</p>}
			</div>
						
		</Paper>
	)
}

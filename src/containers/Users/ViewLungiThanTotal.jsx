import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function ViewLungiThanTotal({data}) {
	const classes = useStyles()
	const total = data.reduce((accumulator, current) => {
		accumulator.quantity += current.quantity || 0
		accumulator.extraLungi += current.extraLungi || 0
		accumulator.weight += current.weight || 0
		return accumulator
	}, {quantity: 0, extraLungi: 0, weight: 0 })

	return (
		<div className={classes.content}>
			<p><span>Quantity</span>{total.quantity}</p>
			{total.weight > 0 && <p><span>Weight</span>{total.weight} KG</p>}
			{total.extraLungi > 0 && <p><span>Extra Lungi</span>{total.extraLungi}</p>}
		</div>
	)
}

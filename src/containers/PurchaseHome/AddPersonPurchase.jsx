import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PersonAdd } from '@material-ui/icons'

import styles from './styles'
import AddPersonDetailsPurchase from './AddPersonDetailsPurchase'

const useStyles = makeStyles(styles)

export default function AddPersonPurchase({addPersonCallback}) {
	const [showAdd, setShowAdd] = useState(false)

	const handleAddPersonClick = () => setShowAdd(true)
	
	const handleCloseAddPerson = (newEmployee) => {
		if (newEmployee === true) {
			addPersonCallback()
		}
		setShowAdd(false)
	}

	const classes = useStyles()
	
	return (
		<>
			<IconButton className={classes.button} onClick={handleAddPersonClick}>
				<PersonAdd />
			</IconButton>
			{showAdd && <AddPersonDetailsPurchase callback={handleCloseAddPerson} />}
		</>
	)
}

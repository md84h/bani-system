import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PersonAdd } from '@material-ui/icons'

import { toast } from 'react-toastify'
import API from '../../components/constant/api'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function AddPerson({addPersonCallback}) {
	const [showAdd, setShowAdd] = useState(false)
	const [name, setName] = useState('')
	const [mobile, setMobile] = useState('')
	const [validMobile, setValidMobile] = useState(true)
	const [valid, setValid] = useState(true)
	const [errorMsg, setErrorMsg] = useState('')
	const [loading, setLoading] = useState(false)

	const handleOnChange = (e) => {
		setName(e.target.value)
		setValid(true)
		setErrorMsg('')
	}

	const handleOnChangeMobile = e => {
		setMobile(e.target.value)
		setValidMobile(true)
	}

	const handleAddPersonClick = () => setShowAdd(true)
	
	const handleCloseAddPerson = (newEmployee) => {
		if (newEmployee === true) {
			addPersonCallback()
		}
		setShowAdd(false)
		setName('')
		setMobile('')
		setValidMobile(true)
		setValid(true)
		setErrorMsg('')
		setLoading(false)
	}

	const handleAdd = async () => {
		if (!name) {
			setValid(false)
			return
		}
		if (!mobile || mobile.length !== 10) {
			setValidMobile(false)
			return
		}
		setLoading(true)
		const res = await fetch(`${API.API_URL}${API.PERSON_PATH}`, {
			method: 'POST',
			body: JSON.stringify({ name, mobile }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const newEmployee = await res.json()
			if (newEmployee.error) {
				toast.error(newEmployee.error)
				setLoading(false)
			} else {
				handleCloseAddPerson(true)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
			setLoading(false)
		}	
	}

	const classes = useStyles()
	
	return (
		<>
			<IconButton className={classes.button} onClick={handleAddPersonClick}>
				<PersonAdd />
			</IconButton>
			{showAdd && <Modal
				heading="Add Person"
				onClose={handleCloseAddPerson}
				handleAction={handleAdd}
				actionLabel="Save"
				loadingAction={loading}
			>
				<TextField
					required
					value={name}
					error={!valid}
					errorMsg={errorMsg || 'Please enter name'}
					name="name"
					label="Name"
					onChange={handleOnChange}
				/>
				<TextField
					required
					value={mobile}
					error={!validMobile}
					errorMsg="Please enter valid mobile"
					name="mobile"
					label="Mobile"
					onChange={handleOnChangeMobile}
					type="number"
				/>
			</Modal>}
		</>
	)
}

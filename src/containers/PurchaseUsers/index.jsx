import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

import '../../App.css'
import API from '../../components/constant/api'
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import AddComponent from './AddComponent'
import CustomTable from './CustomTable'
import styles from './styles'

const useStyles = makeStyles(styles)

export default function PurchaseUsers(props) {
	const [employeeList, setEmployeeList] = useState(null)
	const [loadingList, setLoadingList] = useState(true)
	const [activeEmployee, setActiveEmployee] = useState(props.match.params.id || '')
	const [details, setDetails] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [editDetails, setEditDetails] = useState(null)
	const [deleteDetails, setDeleteDetails] = useState(null)
	const [loadingDelete, setLoadingDelete] = useState(false)

	useEffect(() => {
		getEmployeeList()
		if (props.match.params.id) {
			getDetails(props.match.params.id)
		}
	}, [])

	const getEmployeeList = async () => {
		const res = await fetch(`${API.API_URL}${API.PERSON_PURCHASE_PATH}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const employee = await res.json()
			if (employee.error) {
				toast.error(employee.error)
			} else {
				setEmployeeList(employee)	
			}
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoadingList(false)
	}

	const getDetails = async (id) => {
		setDetails(null)
		setLoading(true)
		const response = await fetch(`${API.API_URL}${API.PURCHASE_PATH}/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (response.ok) {
			const res = await response.json()
			if (res.error) {
				toast.error(res.error)
			} else {
				setDetails(res)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoading(false)
	}

	const handleEmployeeSelection = ({target: {value}}) => {
		setActiveEmployee(value)
		getDetails(value)
	}

	const handleAddBtnClick = () => {
		setShowModal(true)
	}

	const handleModalClose = (isNew = false) => {
		setShowModal(false)
		setEditDetails(null)
		if (isNew === true) {
			getDetails(activeEmployee)
		}
	}

	const handleEditClick = (details) => {
		setEditDetails(details)
		setShowModal(true)
	}

	const handleDeleteClick = (id) => {
		setDeleteDetails(id)
	}

	const handleDeleteClose = () => {
		setDeleteDetails(null)
	}

	const handleDelete = async() => {
		setLoadingDelete(true)
		const res = await fetch(`${API.API_URL}${API.PURCHASE_PATH}/${deleteDetails}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			setDeleteDetails(null)
			getDetails(activeEmployee)
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoadingDelete(false)
	}

	const classes = useStyles()
	return (
		<div className="App">
			{loadingList ?
				<CircularProgress />
				: <>
					{employeeList ? 
						<Grid container spacing={2}>
							<Grid item xs={12} md={3}>
								<Dropdown
									name="activeEmployee"
									label="Selected"
									value={activeEmployee}
									options={employeeList.map(employee => ({value: employee.id, name: employee.name}))}
									onChange={handleEmployeeSelection}
								/>
							</Grid>
						</Grid>
						: <p>No Person Found!</p>}
				</>}
			{activeEmployee &&
				<>
					<div className={classes.btn}>
						<Button variant="contained" onClick={handleAddBtnClick} color="primary" disabled={false}>
							{loading ? <CircularProgress size={25} /> : 'Add'}
						</Button>
					</div>
					{loading ? <div><CircularProgress /></div> : <>
						{details && details.length > 0 ?
							(
								<Grid container item xs={12}><CustomTable data={details} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} /></Grid>
							) : <p>No Data Found!</p>}
					</>}
					{showModal && <AddComponent values={editDetails} employeeId={activeEmployee} handleClose={handleModalClose} />}
				</>
			}
			{deleteDetails && <Modal
				heading="Confirm Delete"
				onClose={handleDeleteClose}
				handleAction={handleDelete}
				actionLabel="Delete"
				loadingAction={loadingDelete}
			>
				Are you sure, you want to delete?
			</Modal>}
		</div>
	)
}

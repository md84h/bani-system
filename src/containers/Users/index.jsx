import React, { Fragment, useEffect, useState } from 'react'
import { Button, CircularProgress, Divider, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

import '../../App.css'
import API from '../../components/constant/api'
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import AddBheem from './AddBheem'
import AddChaukaThan from './AddChaukaThan'
import AddCone from './AddCone'
import AddLungiThan from './AddLungiThan'
import styles from './styles'
import TanaBanaList from './TanaBanaList'
import ThanList from './ThanList'
import ViewBheem from './ViewBheem'
import ViewChaukaThan from './ViewChaukaThan'
import ViewCone from './ViewCone'
import ViewLungiThan from './ViewLungiThan'

const useStyles = makeStyles(styles)
const TYPES_OPTS = {
	LUNGI: [{name: 'Than', value: 'THAN'}, {name: 'Cone', value: 'CONE'}, {name: 'Bheem', value: 'BHEEM'}],
	CHAUKA: [{name: 'Chauka', value: 'CHAUKA'}, {name: 'Cone', value: 'CONE'}, {name: 'Bheem', value: 'BHEEM'}]
}
export default function Users(props) {
	const [employeeList, setEmployeeList] = useState(null)
	const [loadingList, setLoadingList] = useState(true)
	const [activeEmployee, setActiveEmployee] = useState(props.match.params.id || '')
	const [product, setProduct] = useState('LUNGI')
	const [loading, setLoading] = useState(false)
	const [dialogDetails, setDialogDetails] = useState(false)
	const [editDetails, setEditDetails] = useState(false)
	const [deleteDetails, setDeleteDetails] = useState(false)
	const [type, setType] = useState('THAN')
	const [details, setDetails] = useState(null)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		getEmployeeList()
		if (props.match.params.id) {
			getDetails(props.match.params.id, product, type)
		}
	}, [])

	const getEmployeeList = async () => {
		const res = await fetch(`${API.API_URL}${API.PERSON_PATH}`, {
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

	const handleProductChange = ({target: {value}}) => {
		setProduct(value)
		setType(TYPES_OPTS[value][0].value)
		getDetails(activeEmployee, value, TYPES_OPTS[value][0].value)
	}

	const getDetails = async (id, product, type) => {
		setDetails(null)
		setLoading(true)
		const response = await fetch(`${API.API_URL}${API.DETAILS_PATH}/${id}/${product}/${type}`, {
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

	const handleDelete = async () => {
		setLoading(true)
		const res = await fetch(`${API.API_URL}${type === 'CONE' || type === 'BHEEM' ? API.BANA_TANA_PATH : API.THAN_PATH}/${dialogDetails.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			const deleteItem = await res.json()
			if (deleteItem.error) {
				toast.error(deleteItem.error)
			} else {
				toast.success(deleteItem.message)
				handleOnDeleteClose(true)
			}
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoading(false)
	}

	const handleEmployeeSelection = ({target: {value}}) => {
		setActiveEmployee(value)
		getDetails(value, product, type)
	}

	const handleOpenDetails = (details) => () => setDialogDetails(details)

	const handleCloseDetails = (isEdited = false) => {
		setDialogDetails(false)
		setEditDetails(false)
		setDeleteDetails(false)
		if (isEdited === true) {
			getDetails(activeEmployee, product, type)
		}
	}
	
	const editOpenCallback = () => {
		setEditDetails(true)
	}

	const deleteOpenCallback = () => {
		setDeleteDetails(true)
	}

	const handleOnEditClose = (isEdited) => {
		setEditDetails(false)
		setDeleteDetails(false)
		if (isEdited === true) {
			setDialogDetails(false)
			getDetails(activeEmployee, product, type)
		}
	}

	const handleOnDeleteClose = (isDeleted) => {
		setEditDetails(false)
		setDeleteDetails(false)
		if (isDeleted === true) {
			setDialogDetails(false)
			getDetails(activeEmployee, product, type)
		}
	}

	const handleChangeType = ({target: {value}}) => {
		setType(value)
		getDetails(activeEmployee, product, value)
	}

	const handleAddBtnClick = () => {
		setShowModal(true)
	}

	const handleModalClose = (isNew = false) => {
		setShowModal(false)
		if (isNew === true) {
			getDetails(activeEmployee, product, type)
		}
	}

	const handlePaymentDone = () => {
		setDialogDetails(false)
		getDetails(activeEmployee, product, type)
	}

	const getAddComponent = () => {
		if (type === 'CONE') {
			return AddCone
		}
		if (type === 'BHEEM') {
			return AddBheem
		}
		if (product === 'LUNGI') {
			return AddLungiThan
		} else {
			return AddChaukaThan
		}
	}

	const getViewComponent = () => {
		if (type === 'CONE') {
			return ViewCone
		}
		if (type === 'BHEEM') {
			return ViewBheem
		}
		if (product === 'LUNGI') {
			return ViewLungiThan
		} else {
			return ViewChaukaThan
		}
	}

	const classes = useStyles()
	const AddComponent =  getAddComponent()
	const ViewComponent = getViewComponent()
	return (
		<div className="App">
			{loadingList ?
				<CircularProgress />
				: <>
					{employeeList ? 
						<Dropdown
							name="activeEmployee"
							label="Selected"
							value={activeEmployee}
							options={employeeList.map(employee => ({value: employee.id, name: employee.name}))}
							onChange={handleEmployeeSelection}
						/>
						: <p>No Person Found!</p>}
				</>}
			{activeEmployee &&
				<><Divider />
					<FormControl component="fieldset">
						<RadioGroup row aria-label="Product" name="product" value={product} onChange={handleProductChange}>
							<FormControlLabel value="LUNGI" control={<Radio color="primary" />} label="Lungi" />
							<FormControlLabel value="CHAUKA" control={<Radio color="primary" />} label="Chauka" />
						</RadioGroup>
					</FormControl>
					<div className={classes.dropBtn}>
						<div className={classes.dropdown}>
							<Dropdown
								name="type"
								label="Type"
								value={type}
								options={TYPES_OPTS[product]}
								onChange={handleChangeType}
							/>
						</div>
						<div className={classes.btn}>
							<Button variant="contained" onClick={handleAddBtnClick} color="primary" disabled={false}>
								{loading ? <CircularProgress size={25} /> : 'Add'}
							</Button>
						</div>
					</div>
					
					{loading ? <div><CircularProgress /></div> : <>
						{details && details.length > 0 ?
							details.map(data => (
								<Fragment key={data.id}>
									{type === 'THAN' || type === 'CHAUKA' ? <ThanList data={data} handleOpenDetails={handleOpenDetails(data)} /> : <TanaBanaList data={data} handleOpenDetails={handleOpenDetails(data)} />}
								</Fragment>
							)) : <p>No Data Found!</p>}
					</>}
					{showModal && <AddComponent employeeId={activeEmployee} handleClose={handleModalClose} product={product} />}
				</>
			}
			{dialogDetails && <Modal
				heading="Details"
				onClose={handleCloseDetails}
				showEdit={dialogDetails.status !== 'DONE'}
				showDelete={dialogDetails.status !== 'DONE'}
				editOpenCallback={editOpenCallback}
				deleteOpenCallback={deleteOpenCallback}
			>
				<ViewComponent
					data={dialogDetails}
					showEdit={editDetails}
					onEditClose={handleOnEditClose}
					activeEmployee={activeEmployee}
					product={product}
					handlePaymentDone={handlePaymentDone}
				/>
			</Modal>}
			{deleteDetails && <Modal
				heading="Confirm Delete"
				onClose={handleOnDeleteClose}
				handleAction={handleDelete}
				actionLabel="Delete"
				loadingAction={loading}
			>
				Are you sure, you want to delete?
			</Modal>}
		</div>
	)
}

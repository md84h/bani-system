import React, { useEffect, useState } from 'react'
import { CircularProgress, Card, CardContent, Grid, Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import '../../App.css'
import API from '../../components/constant/api'
import { getItem } from '../../components/helper/localStorage'
import Modal from '../../components/Modal'
import AddPerson from './AddPerson'
import AddPersonDetails from './AddPersonDetails'
import styles from './styles'
import CONSTANT from './constant'

const useStyles = makeStyles(styles)

export default function Home() {
	const [employeeList, setEmployeeList] = useState(null)
	const [loading, setLoading] = useState(true)
	const [deleteDetails, setDeleteDetails] = useState(null)
	const [editDetails, setEditDetails] = useState(null)
	const [loadingDelete, setLoadingDelete] = useState(false)
	const [anchorEl, setAnchorEl] = useState(null)
	const [active, setActive] = useState(null)

	useEffect(() => {
		getEmployeeList()
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
		setLoading(false)
		
	}

	const addPersonCallback = () => {
		setLoading(true)
		setEmployeeList(null)
		getEmployeeList()
	}

	const handleOnDeleteClose = () => setDeleteDetails(null)

	const handleDelete = async () => {
		setLoadingDelete(true)
		const res = await fetch(`${API.API_URL}${API.PERSON_PATH}/${deleteDetails.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (res.ok) {
			setDeleteDetails(null)
			addPersonCallback()
		} else {
			toast.error('Something went wrong, Please try again!')
		}
		setLoadingDelete(false)
	}

	const editCallback = () => {
		setEditDetails(null)
		addPersonCallback()
	}

	const handleClick = (event, emp) => {
		event.stopPropagation()
		setActive(emp)
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleEditClick = () => {
		setAnchorEl(null)
		setEditDetails(active)
	}

	const handleDeleteClick = () => {
		setAnchorEl(null)
		setDeleteDetails(active)
	}

	const classes = useStyles()
	const userRole = getItem('userRole')
	let isAdmin = false
	if (userRole) {
		isAdmin = JSON.parse(userRole).includes('admin')
	}
	return (
		<div className="App">
			<AddPerson addPersonCallback={addPersonCallback} />
			{loading ? <CircularProgress /> : <>
				{employeeList ? <Grid container spacing={3}>{
					employeeList.map((employee, i) => (
						<Grid key={employee.id} item xs={6} md={3} lg={2} className={classes.container}>
							<Link to={`/users/${employee.id}`} className={classes.link}>
								<Card className={classes.root} variant="outlined">
									<CardContent className={classes.cardContent}>
										<Avatar className={classes.avatar} style={{background: CONSTANT.COLOR[i%CONSTANT.COLOR.length]}}>{employee.name[0]}</Avatar>
										<h2 className={classes.name}>{employee.name}</h2>
										<h6 className={classes.mobile}>{employee.mobile}</h6>
									</CardContent>
								</Card>
							</Link>
							{isAdmin &&
										<>
											<IconButton onClick={(event) => handleClick(event, employee)} className={classes.action}>
												<ExpandMore />
											</IconButton>
											<Menu
												id="action-menu"
												anchorEl={anchorEl}
												keepMounted
												open={Boolean(anchorEl)}
												onClose={handleClose}
											>
												<MenuItem onClick={handleEditClick}>
													Edit
												</MenuItem>
												<MenuItem onClick={handleDeleteClick}>
													Delete
												</MenuItem>
											</Menu>
										</>
							}
						</Grid>
						
					))
				}
				</Grid> : <p>No Person Found!</p>}
			</>
			}
			{deleteDetails && <Modal
				heading="Confirm Delete"
				onClose={handleOnDeleteClose}
				handleAction={handleDelete}
				actionLabel="Delete"
				loadingAction={loadingDelete}
			>
				Are you sure, you want to delete?
			</Modal>}
			{editDetails && <AddPersonDetails details={editDetails} callback={editCallback} />}
		</div>
	)
}

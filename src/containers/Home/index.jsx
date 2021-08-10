import React, { useEffect, useState } from 'react'
import { CircularProgress, Card, CardContent, CardActions, Grid, Avatar, IconButton } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
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
						<Grid key={employee.id} item xs={6} md={3} lg={2}>
							<Card className={classes.root} variant="outlined">
								<CardContent className={classes.cardContent}>
									<Avatar className={classes.avatar} style={{background: CONSTANT.COLOR[i%CONSTANT.COLOR.length]}}>{employee.name[0]}</Avatar>
									<h2 className={classes.name}>{employee.name}</h2>
									<h6 className={classes.mobile}>{employee.mobile}</h6>
								</CardContent>
								<CardActions>
									<Link key={employee.id} to={`/users/${employee.id}`} className={classes.link}>
										Visit
									</Link>
									{isAdmin &&
										<div className={classes.action}>
											<IconButton aria-label="edit" className={classes.editButton} onClick={() => setEditDetails(employee)}><Edit /></IconButton>
											<IconButton aria-label="delete" className={classes.deleteButton} onClick={() => setDeleteDetails(employee)}><Delete /></IconButton>
										</div>
									}
								</CardActions>
							</Card>
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

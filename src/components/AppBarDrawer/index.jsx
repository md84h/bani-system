import React from 'react'
import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronLeft, CreditCard, Home, Menu, People } from '@material-ui/icons'
import clsx from 'clsx'
import { NavLink, useHistory } from 'react-router-dom'


import CONSTANT from '../constant/color'
import { setCookie } from '../helper/cookie'

const drawerWidth = 195

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		overflow: 'auto'
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: '24px 12px',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
		background: '#fafafa',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	listItemIcon: {
		minWidth: 36
	},
	navLink: {
		textDecoration: 'none',
		color: CONSTANT.BLACK
	},
	selectedNavLink: {
		'& .MuiListItemText-primary': {
			fontWeight: 600
		}
	},
	bodyContent: {
		height: '100%'
	},
	logout: {
		position: 'absolute',
		bottom: 0,
		margin: 20,
		color: '#4051b5',
		cursor: 'pointer'
	}
}))

export default function AppBarDrawer({children}) {
	const classes = useStyles()
	const history = useHistory()
	const [open, setOpen] = React.useState(false)

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleBodyContentClick = () => {
		if (open) {
			setOpen(false)
		}
	}

	const handleLogout = () => {
		setCookie('userToken', '', -1)
		history.push('/login')
	}

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<Menu />
					</IconButton>
					<Typography variant="h6" noWrap>
            ZA7 Fabrics
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<List>
					<NavLink to="/home" className={classes.navLink} activeClassName={classes.selectedNavLink} onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon className={classes.listItemIcon}>
								<Home />
							</ListItemIcon>
							<ListItemText primary={'Home'} />
						</ListItem>	
					</NavLink>
					<NavLink to="/users" className={classes.navLink} activeClassName={classes.selectedNavLink} onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon className={classes.listItemIcon}>
								<People />
							</ListItemIcon>
							<ListItemText primary={'Users'} />
						</ListItem>	
					</NavLink>
					<NavLink to="/purchase" className={classes.navLink} activeClassName={classes.selectedNavLink} onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon className={classes.listItemIcon}>
								<CreditCard />
							</ListItemIcon>
							<ListItemText primary={'Purchase'} />
						</ListItem>
					</NavLink>
					<NavLink to="/purchase-users" className={classes.navLink} activeClassName={classes.selectedNavLink} onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon className={classes.listItemIcon}>
								<CreditCard />
							</ListItemIcon>
							<ListItemText primary={'Purchase Users'} />
						</ListItem>
					</NavLink>
				</List>
				<p className={classes.logout} onClick={handleLogout}>Logout</p>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<div className={classes.bodyContent} onClick={handleBodyContentClick}>
					{children}
				</div>
			</main>
		</div>
	)
}

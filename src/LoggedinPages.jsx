import React from 'react'
import { Switch } from 'react-router-dom'

import AppBarDrawer from './components/AppBarDrawer'
import Route from './components/PrivateRoute'
import Home from './containers/Home'
import Users from './containers/Users'

export default function LoggedinPages() {
	return (
		<AppBarDrawer>
			<Switch>
				<Route path="/" component={Home} exact authRequired={true} />
				<Route path="/users" component={Users} exact authRequired={true} />
				<Route path="/users/:id" component={Users} authRequired={true} />
				<Route path="/home" component={Home} authRequired={true} />
			</Switch>
		</AppBarDrawer>
	)
}

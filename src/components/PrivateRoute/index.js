/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getCookie } from '../helper/cookie'

const AuthRoute = (props) => !!getCookie('userToken') ? <Route { ...props } /> : <Redirect to="/login" />

export default AuthRoute

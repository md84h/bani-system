export const getInitialStateLungiThan = values => {
	if (values) {
		return {
			date: new Date(values.date),
			weight: values.weight,
			quantity: values.quantity || '',
			extraLungi: values.extraLungi
		}
	}
	return {
		date: new Date(),
		weight: '',
		quantity: '',
		extraLungi: ''
	}
}

export const validateLungiThan = values => {
	const {weight, quantity} = values
	if (!quantity) {
		return {
			type: 'quantity',
			msg: 'Please add quantity.'
		}
	}
	if (!weight) {
		return {
			type: 'weight',
			msg: 'Please add weight.'
		}
	}
	return {success: true}
}

export const createRequestParamLungiThan = (employeeId, values, preValues) => {
	const { date, weight, quantity, extraLungi} = values
	const reqBody = {
		employeeId,
		date: date.valueOf(),
		product: 'LUNGI',
		quantity,
		weight
	}
	
	if (extraLungi) {
		reqBody.extraLungi = extraLungi
	}
	
	if (preValues) {
		reqBody.id = preValues.id
	}
	return reqBody
}

export const getInitialStateLungiCone = values => {
	if (values) {
		return {
			date: new Date(values.date),
			weight: values.weight,
			quantity: values.quantity
		}
	}
	return {
		date: new Date(),
		weight: '',
		quantity: ''
	}
}

export const createRequestParamLungiCone = (employeeId, values, preValues, product) => {
	const { date, weight, quantity} = values
	const reqBody = {
		employeeId,
		date: date.valueOf(),
		product,
		type: 'CONE',
		weight,
		quantity
	}
	if (preValues) {
		reqBody.id = preValues.id
	}
	return reqBody
}

export const getInitialStateLungiBheem = values => {
	if (values) {
		return {
			date: new Date(values.date),
			weight: values.weight,
			pipeWeight: values.pipeWeight,
			length: values.length
		}
	}
	return {
		date: new Date(),
		weight: '',
		pipeWeight: '',
		length: ''
	}
}

export const validateLungiBheem = values => {
	const {weight, pipeWeight, length} = values
	if (!weight) {
		return {
			type: 'weight',
			msg: 'Please add total bheem weight.'
		}
	}

	if (!pipeWeight) {
		return {
			type: 'pipeWeight',
			msg: 'Please add pipe weight.'
		}
	}

	if (!length) {
		return {
			type: 'length',
			msg: 'Please add length.'
		}
	}
	return {success: true}
}

export const createRequestParamLungiBheem = (employeeId, values, preValues, product) => {
	const { date, weight, length, pipeWeight} = values
	const reqBody = {
		employeeId,
		date: date.valueOf(),
		product,
		type: 'BHEEM',
		weight,
		length,
		pipeWeight
	}
	if (preValues) {
		reqBody.id = preValues.id
	}
	return reqBody
}

export const getInitialStateChaukaThan = values => {
	if (values) {
		return {
			date: new Date(values.date),
			quantity: values.quantity
		}
	}
	return {
		date: new Date(),
		quantity: ''
	}
}

export const validateChaukaThan = values => {
	const {quantity} = values
	if (!quantity) {
		return {
			type: 'quantity',
			msg: 'Please add quantity.'
		}
	}
	return {success: true}
}

export const createRequestParamChaukaThan = (employeeId, values, preValues) => {
	const { date, quantity} = values
	const reqBody = {
		employeeId,
		date: date.valueOf(),
		product: 'CHAUKA',
		quantity
	}
	if (preValues) {
		reqBody.id = preValues.id
	}
	return reqBody
}
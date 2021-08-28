export const getInitialState = values => {
	if (values) {
		return {
			type: values.type,
			date: new Date(values.date),
			description: values.description,
			amount: values.amount
		}
	}
	return {
		type: 'CREDIT',
		date: new Date(),
		description: '',
		amount: ''
	}
}

export const validate = values => {
	const {amount} = values
	if (!amount) {
		return {
			type: 'amount',
			msg: 'Please add Amount'
		}
	}
	return {success: true}
}

export const createRequestParam = (employeeId, values, preValues) => {
	const { date, type, description, amount} = values
	const reqBody = {
		employeeId,
		date: date.valueOf(),
		type,
		description,
		amount
	}
	
	if (preValues) {
		reqBody.id = preValues.id
	}
	return reqBody
}
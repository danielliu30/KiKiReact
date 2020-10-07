import { combineReducers } from 'redux'
import token from './JWTSlice'
import cardContent from './CartSlice'
const allReducers = combineReducers({
        token,
        cardContent
})

export default allReducers;
// import objek useReduce dan useContext dari liblary react
import {useReducer, createContext} from 'react';
import {setAuthToken} from '../Config/api'

// export objek useContext agar bisa gunakan di komponen lain
export const MessageContext = createContext();

// membuat variable initialState untuk menampung nilai awal dari form login
const initialState = {
	isMEssage: false,
	status: '',
	message: '',
}

// membuat function reducer untuk membuat kondisi 
const reducer = (state, action) => {
	const {type, payload} = action;

	switch(type){
		case "MESSAGE":
			return{
				...state,
				isMEssage: true,
				status: payload.status,
				message: payload.message				
			};
		case "HIDE_MESSAGE":
			return{
				...state,
				isMEssage: false,
				status: '',
				message: ''				
			};
		default:
			throw new Error();
	}
}

export const MessageContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<MessageContext.Provider value={[state, dispatch]}>
		    {children}
		</MessageContext.Provider>
	);
};
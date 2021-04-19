
export default function AuthReducer (state = [], action) {
	switch (action.type){
		case 'TOKEN':
			return [...state, action.data];
		case 'READY':
			return [...state, action.data];
		default:
			return state;
	}
}

export default function ChangeReducer (state = [], action) {
	switch (action.type){
		case 'CHANGE':
			return [...state, action.data];
		default:
			return state;
	}
}
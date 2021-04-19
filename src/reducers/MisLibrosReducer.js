
export default function  MisLibrosReducer (state = [], action) {
	switch (action.type){
		case 'LIBROS':
			return [...state, action.data];
		case 'POST':
			return [...state, action.data];
		default:
			return state;
	}
}
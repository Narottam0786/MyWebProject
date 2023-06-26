import {
  ERRORSTATE,
  LOADINGSTATE,
  SETCART,
  TOGGLEVIEW,
  SETCARTBYREDUCER,
  EMPTYCART,
  REMOVECART,
  RESETLOGIN,
  CHANGELOGINSTATUS,
  DELETEUSER,
  ADDUSER,
  EDITUSER,SET_DATA
} from "./action";



const initialState = {
  users: []
}; 

function reducer(state = initialState, { type, payload }) {
  switch (type) {

    case SET_DATA:
      console.log("SET_DATA", payload);
      return {
        ...state,
        data:payload
      };
    
    case ADDUSER:
      console.log("ADDUSER",state, payload);
      return {
        ...state,
        data: [...state.data, payload],
        
      };
    case EDITUSER:
      console.log("Edit Data",payload);
      return {
        ...state,
        data: state.data.map((user) =>
          user.id === payload.id ? payload : user
        )
      };
    case DELETEUSER:
      console.log("DELETEUSER ak", payload);
      return {
        ...state,
        data: state.data.filter((user) => user.id !== payload)
      };
    
    default: {
      return state;
    }
  }
}
export default reducer;

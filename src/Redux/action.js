export const LOADINGSTATE = "LOADINGSTATE";
export const ERRORSTATE = "ERRORSTATE";
export const SETCART = "SETCART";
export const TOGGLEVIEW = "TOGGLEVIEW";
export const SETCARTBYREDUCER = "SETCARTBYREDUCER";
export const EMPTYCART = "EMPTYCART";
export const REMOVECART = "REMOVECART"
export const RESETLOGIN="RESETLOGIN"
export const CHANGELOGINSTATUS="CHANGELOGINSTATUS"
export const DELETEUSER="DELETEUSER"
export const ADDUSER="ADDUSER"
export const EDITUSER="EDITUSER"
export const SET_DATA = 'SET_DATA';


export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data
  };
};


export const addUser = (user) => {
  return {
    type: 'ADDUSER',
    payload: user
  };
};

export const editUser = (user) => {
  return {
    type: 'EDITUSER',
    payload: user
  };
};

export const deleteUser = (userId) => {
  return {
    type: 'DELETEUSER',
    payload: userId
  };
};


export const loadingState = () => ({
  type: LOADINGSTATE,
});
export const errorState = () => ({
  type: ERRORSTATE,
});
export const setCartProduct = (data) => ({
  type: SETCART,
  payload: data,
});
export const toggleView = (data) => ({
  type: TOGGLEVIEW,
  payload: data,
});
export const setCartProductRReducer = (data) => ({
  type: SETCARTBYREDUCER,
  payload: data
});
export const EmptyCart = () => ({
  type: EMPTYCART,
});
export const removeCartRedux = (data) => ({
  type: REMOVECART,
  payload: data
})
export const removeLogin = () => ({
  type: RESETLOGIN,
})
export const changeLoginStatus = (data) => ({
  type: CHANGELOGINSTATUS,
  payload:data
})


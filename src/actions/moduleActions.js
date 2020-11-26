export const DELETE_MODULE = "DELETE_MODULE";
export const CREATE_MODULE = "CREATE_MODULE";
export const UPDATE_MODULE = "UPDATE_MODULE";

export const deleteModule = (dispatch, module) =>
dispatch({type: DELETE_MODULE, module:module})

export const createModule = (dispatch) =>
 dispatch({type: CREATE_MODULE })

export const updateModule = (dispatch, module) =>
dispatch({type:UPDATE_MODULE, module})

export const editModule = (dispatch, module) =>
dispatch({type:UPDATE_MODULE, module:{...module, editing:true}})

export const okModule = (dispatch, module) =>
dispatch({type:UPDATE_MODULE, module:{...module, editing:false}})
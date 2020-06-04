import {
    ADD_CLASSROOM, 
    ADD_CLASSROOM_ERROR,
    DELETE_CLASSROOM,
    TOGGLE_PUBLIC,
    EDIT_CLASSROOM,
    SAVE_EDIT_DATA,
    CANCEL,
    GET_CLASSROOM,
    GET_CLASSROOM_ERROR,
    DELETE_ERROR,
    EDIT_ERROR,
    SEND_REQ_RESPONSE,
    SEND_REQ_RESPONSE_ERROR,
    CLEAR_REQ_STATE,
    ANY_USER_DATA,
    ANY_ERROR_USER_DATA,
    REMOVE_MEMBER_SUCCESS,
    REMOVE_MEMBER_ERROR,
    CLEAR_REMOVE_STATE,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    GET_POST_SUCCESS,
    GET_POST_ERROR,
    CLEAR_ERROR_SAVE,
    GET_JOINED_CLASSROOM,
    GET_JOINED_CLASSROOM_ERROR
} from '../../types'

export default (state, {type, payload}) => {
    switch(type){
        case REMOVE_MEMBER_SUCCESS:
            return{
                ...state,
                remove_member:payload
            }
        case ANY_USER_DATA:
            //console.log(payload[0])
            return{
                ...state,
                anyUserData:payload
            }
        case ANY_ERROR_USER_DATA:
            return{
                ...state,
                anyUserDataError:payload
            }
        case GET_CLASSROOM:
            return{
                ...state,
                classrooms:payload
            }
        case GET_CLASSROOM_ERROR:
        case ADD_CLASSROOM_ERROR:
        case EDIT_ERROR:
        case DELETE_ERROR:
            return{
                ...state,
                errors:payload
            }
        case ADD_CLASSROOM:
            return{
                ...state,
                classrooms:[...state.classrooms, payload]
            }
        case TOGGLE_PUBLIC:
            return{
                ...state,
                classrooms: state.classrooms.map(room => room._id === payload._id ? payload:room)
            }
        case EDIT_CLASSROOM:
            return{
                ...state,
                editAble: payload
            }
        case SAVE_EDIT_DATA:
            return{
                ...state,
                classrooms: state.classrooms.map(room => room._id === payload._id ? payload:room)
            }
        case CANCEL:
            return{
                ...state,
                editAble: null
            }
        case DELETE_CLASSROOM:
            return{
                ...state,
                classrooms: state.classrooms.filter(room => room._id !== payload)
            }
        //REQUESTS SEND AND RESPONSE STATE MANAGEMENT START
        case SEND_REQ_RESPONSE:
            return{
                ...state,
                req_state:payload
            }
        case SEND_REQ_RESPONSE_ERROR:
            return{
                ...state,
                req_state:payload
            }
        case CLEAR_REQ_STATE:
            return{
                ...state,
                req_state:null
            }
        case CLEAR_REMOVE_STATE:{
            return{
                ...state,
                remove_member:null
            }
        }
        //REQUESTS SEND AND RESPONSE STATE MANAGEMENT END
        // reducer - get joined classroom
        case GET_JOINED_CLASSROOM:
            return{
                ...state,
                joinedClassrooms:payload
            }
        //POSTS -----------
        case ADD_POST_SUCCESS:{
            return{
                ...state,
                add_post_state: payload,
                error_save_post:null
            }
        }
        case ADD_POST_ERROR:
            console.log(payload)
            return{
                ...state,
                error_save_post:payload
            }

        case GET_POST_SUCCESS:
            return{
                ...state,
                posts_data:payload
            }
        case CLEAR_ERROR_SAVE:
            return{
                ...state,
                error_save_post:null
            }
               default:
            return state
    }

}
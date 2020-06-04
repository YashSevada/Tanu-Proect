import React, {useReducer} from 'react'
import ClassroomContext from './classroomContext'
import classroomReducer from './classroomReducer'
import setToken from '../../utils/setToken'
import axios from 'axios'
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

const ClassroomState = (props) => {
    const initialState = {

        editAble:null,
        errors:null,
        classrooms:[],
        req_state:null,
        anyUserData:null,
        remove_member:null,
        add_post_state:null,//for adding post
        posts_data:null, //for fetching all posts
        error_save_post:null, //error for adding post
        joinedClassrooms:[]
    }
    const [state, dispatch] = useReducer(classroomReducer, initialState)
    
    const addClassroom = async (classroom) => {
        classroom.isPrivate = false
        const config = {
            'Content-Type':'application/json'
        }
        
        try {
            const res = await axios.post('/classroom', classroom, config)
            dispatch({
                type: ADD_CLASSROOM,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type:ADD_CLASSROOM_ERROR,
                payload:error.response
            })
        }
    }

    const getClassroom = async () => {
        try {
            const res = await axios.get('/classroom')
            dispatch({
                type:GET_CLASSROOM,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:GET_CLASSROOM_ERROR,
                payload:error.response
            })
        }

    }

    const deleteClassroom = async (id) => {
        try {
            await axios.delete(`/classroom/${id}`)
            dispatch({
                type: DELETE_CLASSROOM,
                payload:id
            })
        } catch (error) {
            console.log({error})
            dispatch({
                type: DELETE_ERROR,
                payload:error.response.data
            })
        }
        

    }

    const togglePublic = async (classroom) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put(`/classroom/${classroom._id}`, classroom, config)
            dispatch({
                type: TOGGLE_PUBLIC,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type: EDIT_ERROR,
                payload:error.response.msg
            })
        }
        
    }

    const editData = (editData) => {
        
            dispatch({
                type:EDIT_CLASSROOM,
                payload: editData
            })
     
        
    }
    const saveEditData = async (editAbleclassroom) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put(`/classroom/${editAbleclassroom._id}`, editAbleclassroom, config)
            dispatch({
                type:SAVE_EDIT_DATA,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: EDIT_ERROR,
                payload:error.response.msg
            })
        }
       
    }

    const cancel = () => {
        dispatch({
            type:CANCEL
        })
    }


    //------------------------NOW THIS IS FOR JOINCLASSROOM.JS ----------------------//
    const sendRequest = async (location) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put('/classroom/request/member', location, config)
            dispatch({
                type:SEND_REQ_RESPONSE,
                payload:res.data
            })
        } catch (error) {
            console.log({error})
            dispatch({
                type:SEND_REQ_RESPONSE_ERROR,
                payload:error.request.response
            })
        }
    }
    const clearReqState = () => {
        dispatch({
            type: CLEAR_REQ_STATE
        })
    }
    const clear_remove_member = () => {
        dispatch({
            type: CLEAR_REMOVE_STATE
        })
    }



    const removeMember = async (info) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put('/classroom/removeMember/member', info, config)
            dispatch({
                type:REMOVE_MEMBER_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log({error})
            // dispatch({
            //     type:REMOVE_MEMBER_ERROR,
            //     payload:error.request.response
            // })
        }
    }
    const banMember = async (info) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put('/classroom/banMember/member', info, config)
            dispatch({
                type:REMOVE_MEMBER_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log({error})
            // dispatch({
            //     type:REMOVE_MEMBER_ERROR,
            //     payload:error.request.response
            // })
        }
    }
    const acceptMember = async (info) => {
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put('/classroom/addMember/member', info, config)
            dispatch({
                type:REMOVE_MEMBER_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log({error})
            // dispatch({
            //     type:REMOVE_MEMBER_ERROR,
            //     payload:error.request.response
            // })
        }
    }

    const postData = async (post_data) => {
       
        const config = {
            'Content-Type':'application/json'
        }
        try {
            const res = await axios.put('/classroom/addPost/post', post_data, config)
            
            dispatch({
                type:ADD_POST_SUCCESS,
                payload:res.data
            })
        } catch (error) {
            console.log()
            dispatch({
                type:ADD_POST_ERROR,
                payload:error.response.data.msg
            })
        }
    }

    const fetchPosts = async (d_id) => {
        if(localStorage.token){
            setToken(localStorage.token)
        }
        const config = {
            'Content-Type': 'application/json'
        }
        try {
            const res = await axios.get(`/classroom/getPosts/p/${d_id}`, config)
            dispatch({
                type:GET_POST_SUCCESS,
                payload:res.data.posts[0]
            })
        } catch (error) {
            console.log(error)
            // dispatch({
            //     type:GET_POST_ERROR,
            //     payload:error
            // })
        }

    }

    // state function - get joined classroom
    const getJoinedClassroom = async () => {
        try {
            const res = await axios.get('/classroom/getJoinedClass')
            dispatch({
                type:GET_JOINED_CLASSROOM,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:GET_JOINED_CLASSROOM_ERROR,
                payload:error.response
            })
        }

    }

    const clear_error_save = () => {
        dispatch({
            type:CLEAR_ERROR_SAVE
        })
    }
    
    return (
        <ClassroomContext.Provider
        value={
            {
                classrooms:state.classrooms,
                editAble: state.editAble,
                req_state:state.req_state,
                remove_member:state.remove_member,
                add_post_state:state.add_post_state,
                posts_data:state.posts_data,
                error_save_post:state.error_save_post,
                joinedClassrooms:state.joinedClassrooms,
                getClassroom,
                editData,
                saveEditData,
                addClassroom,
                deleteClassroom,
                togglePublic,
                cancel,
                sendRequest,
                clearReqState,
                removeMember,
                clear_remove_member,
                banMember,
                acceptMember,
                postData,
                fetchPosts,
                clear_error_save,
                getJoinedClassroom
            }
        }
        >
            {props.children}
        </ClassroomContext.Provider>
    )
}

export default ClassroomState

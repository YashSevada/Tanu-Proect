const express = require('express')
const router = express.Router()
const Classroom = require('../../models/Classroom')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const randomstring = require('randomstring')

const {check, validationResult }= require('express-validator')


//CREATE - adding the classroom for that user
router.post('/',
auth,
[
check('classroom_name','Please enter a Classroom Name').not().isEmpty(),
check('classroom_institute','Please enter Classroom Institute Name').not().isEmpty(),
check('classroom_author','Please enter an Author Name').not().isEmpty(),
check('classroom_subject','Please enter a Subject Name').not().isEmpty()
],
async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    const {classroom_name , classroom_institute, classroom_author, classroom_subject, isPrivate} = req.body

    try {
        let classroom = new Classroom({
            user: req.user.id,
            classroom_name,
            classroom_subject,
            classroom_institute,
            classroom_author,
            isPrivate
        })


        classroom.uniqueID = randomstring.generate({
            length: 5,
            charset: 'alphabetic'
          });

        classroom = await classroom.save()

        res.json(classroom)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error - POST")
    }
})


//READ - Fetching all classrooms for that user

router.get('/',
auth,
async (req,res)=>{
    try {
        const classroom = await Classroom.find({user:req.user.id})
        .populate({ path: 'members.user', model: User })
        .populate({ path: 'requests.user', model: User })
        .populate({ path: 'banned.user', model: User })
        res.json(classroom)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error - GET")
    }
})


//UPDATE - Updating the values of Classroom with parameter (id)

router.put('/:id',
auth,
    [
    check('classroom_name','Please enter a Classroom Name').not().isEmpty(),
    check('classroom_institute','Please enter Classroom Institute Name').not().isEmpty(),
    check('classroom_author','Please enter an Author Name').not().isEmpty(),
    check('classroom_subject','Please enter a Subject Name').not().isEmpty()
    ]
,
async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    try {
        let classroom = await Classroom.findById(req.params.id)
        try {
            classroom =  await Classroom.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.json(classroom)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error - PUT")
        }
    } catch (error) {
        res.status(400).json({error:"This Classroom does not exist."})
    }
    

})

//DELETE - Deleting the classrooms

router.delete('/:id',
auth,
async (req,res)=>{

    try {
        let classroom = await Classroom.findById(req.params.id)
        try {
            classroom = await Classroom.findByIdAndRemove(req.params.id)
            res.send("Classroom Removed !")
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error - DELETE")
        }
    } catch (error) {
        res.status(400).json({error:"This Classroom does not exist."})
    }
    
})

router.post('/anyUserData',
auth,
async (req,res)=>{
    try {
        const user = await User.findById(req.body.user_id)
        res.json({user})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error - GET")
    }
})

//BASIC CRUD DONE // NOW WE WILL DO ADVANCE TASKS
//1) ADD MEMBERS REQUEST TO THE CLASSROOM - perfect working and tested
//2) ADD MEMBERS TO THE CLASSROOM UPON APPROVAL
//3) REMOVE MEMBERS FROM THE CLASSROOM
//4) BAN MEMBERS REQUEST FROM THE CLASSROOM


//5) ADD PERMISSIONS TO THE CLASSROOM
//6) ADD POSTS TO THE CLASSROOM
//7) ADD NOTES / DOCUMENTS SHARING FOR THE CLASSROOM
//8) ADD TASKS TO THE CLASSROOM


//1) ADD MEMBERS REQUEST TO THE CLASSROOM - WORKING

router.put('/request/member',
auth,
check('location', 'Please Enter A Valid Unique ID').not().isEmpty(),
async (req,res)=>{
    try {
        const {location} = req.body
        //lets check some cases
        let check = await Classroom.findOne({uniqueID:location})
        //first we will check if the user is banned or not
        if(check.banned[0] && check.banned[0].user == req.user.id){
            res.json({msg:`Your are banned from entering this classroom with reason: ${check.banned[0].reason}`})
        }
        //now if the user is not banned, lets check if the user is already a member
        else if(check.members[0] && check.members[0].user == req.user.id){
            res.json({msg:`Your are already a member`})
        }
        //now if the user is not banned, lets check if the user is sendding request to himself
        else if(check.user == req.user.id){
            res.json({msg:`Your can not send request to join your own Classroom.`})
        }
        //lets check if the user is sendding request repeatedly
        else if(check.requests[0] && check.requests[0].user == req.user.id){
            res.json({msg:'Request already sent !'})
        }else{
            
            try {
                let isPrivate = await Classroom.findOne({uniqueID:location})
                if(!isPrivate.isPrivate){
                    await Classroom.findOneAndUpdate({uniqueID:location},{$push:{members:[{user:req.user.id}]}},{new:true})
                    res.send("Joined Classroom!")
                }else{
                    let classroom = await Classroom.findOneAndUpdate({uniqueID:location},{$push:{requests:[{user:req.user.id}]}},{new:true})
                    res.send("Request Sent !")
                }
                
                } catch (error) {
                    console.error(error.message)
                    res.status(500).send("Server Error - PUSH")
                }
        }
        
    } catch (error) {
        res.status(400).json({msg:`Classroom does not exist!`})
    }
})

//2) ADD MEMBERS TO THE CLASSROOM UPON APPROVAL - WORKING

router.put('/addMember/member',
auth,
async (req,res)=>{
    
    try {
        //we will destructure the request body
        const {user_to_be_added, classroom_id} = req.body


        //check if the user is the owner of the classroom
        let classroom_check = await Classroom.findOne({_id:classroom_id, user:req.user.id})

        //if he is not authorised or owner of classroom
        if(!classroom_check){
            res.json({msg:`Your are not authorised to add members to this classroom`})
        }else{
            
            
            //now we will remove the member from the requests list and add in members list
            try {
                //removing from requests list
               let remove_member = await Classroom.findOneAndUpdate({_id:classroom_id}, {$pull:{requests:{user:user_to_be_added}}}, {new:true})
               //adding the removed member to members list
               let add_member = await Classroom.findOneAndUpdate({_id:classroom_id},{$push:{members:[{user:user_to_be_added}]}},{new:true})
               res.json("Member Added Succesfully")
            } catch (error) {
                console.error(error.message)
                res.status(500).send("Server Error - Removing the user from Request List")
            }
        }
        
    } catch (error) {
        res.status(400).json({msg:`Classroom does not exist!`})
    }
})



//3) REMOVE MEMBERS FROM THE CLASSROOM - WORKING

router.put('/removeMember/member',
auth,
async (req,res)=>{
    
    try {
        //we will destructure the request body
        const {user_to_be_removed, classroom_id} = req.body


        //check if the user is the owner of the classroom
        let classroom_check = await Classroom.findOne({_id:classroom_id, user:req.user.id})

        //if he is not authorised or owner of classroom
        if(!classroom_check){
            res.json({msg:`Your are not authorised to remove members from this classroom - ERROR 31`})
        }else{
            
            
            //now we will remove the member from the requests list 
            try {
                //removing from requests list
               let remove_member = await Classroom.findOneAndUpdate({_id:classroom_id}, {$pull:{members:{user:user_to_be_removed}}}, {new:true})
               
               res.json('Member Removed')
            } catch (error) {
                console.error(error.message)
                res.status(500).send("Server Error - Removing the user from Members List - ERROR 32")
            }
        }
        
    } catch (error) {
        res.status(400).json({msg:`Classroom  does not exist! - ERROR 33`})
    }
})



//4) BAN MEMBERS FROM  THE CLASSROOM - WORKING
//chech if user exists
//add to 'banned' with details 'user' and 'reason'

router.put('/banMember/member',
auth,
async (req,res)=>{
    
    try {
        //we will destructure the request body
        const {user_to_be_banned, classroom_id} = req.body


        //check if the user is the owner of the classroom
        let classroom_check = await Classroom.findOne({_id:classroom_id, user:req.user.id})

        //if he is not authorised or owner of classroom
        if(!classroom_check){
            res.json({msg:`Your are not authorised to ban members from this classroom - ERROR 41`})
        }else{
            
            
            //now we will remove the member from the members list and add to banned list
            try {
                //removing from members list
               let remove_member_from_members = await Classroom.findOneAndUpdate({_id:classroom_id}, {$pull:{members:{user:user_to_be_banned}}}, {new:true})
                //adding to banned list
               let add_member_to_banned_list = await Classroom.findOneAndUpdate({_id:classroom_id},{$push:{banned:[{user:user_to_be_banned}]}},{new:true})
               res.json("Member Banned Permanently")
            } catch (error) {
                console.error(error.message)
                res.status(500).send("Server Error - Removing the user from Members List - ERROR 42")
            }
        }
        
    } catch (error) {
        res.status(400).json({msg:`Classroom  does not exist! - ERROR 43`})
    }
})


router.get('/getAll', auth, async(req, res)=>{
    const d = req.body.id
    try {
        const data = await Classroom.find({"members.user":req.user.id})
        .populate({ path: 'members.user', model: User })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})


//FOR ADDING NEW POST - WORKING
router.put('/addPost/post',
auth,
async (req,res) => {

    const data = {
        user: req.user.id,
        post: req.body.post
    }
    if(!req.body.post){
        return res.status(400).json({msg:"Please enter something to post."})
    }
    try {
        let save = await Classroom.findOneAndUpdate({_id:req.body.classroom_id},{$push:{posts:[data]}},{new:true})
        res.json(save)
        
    } catch (error) {
        res.status(400).json({msg:"Please enter a Post"})
    }
})

router.get('/getPosts/p/:id',
auth,
async (req,res)=>{
    try {
        const posts = await Classroom.find({_id:req.params.id})
        .populate({ path: 'posts.user', model: User })
        res.json({posts})
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error - GET")
    }
})


// joined classroom - classroom_route 
router.get('/getJoinedClass', auth, async(req, res)=>{
    const d = req.body.id
    try {
        const data = await Classroom.find({"members.user":req.user.id})
        .populate({ path: 'members.user', model: User })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router


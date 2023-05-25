const Contact =  require('../models/contactModel');
//@desc Get all contacts
//@route get /api/contacts
//@acess Private
const asyncHandler = require('express-async-handler');
const getContacts = asyncHandler(async(req, res) =>{
const contacts = await Contact.find({user_id: req.user.id});
res.json({contacts});
});
//@desc Create New contact
//@route post /api/contacts
//@acess Private

const createContact = asyncHandler(async(req, res)=>{
    console.log("the body is: " ,req.body);
    const {name,email,phone}= req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = Contact.create({name,email,phone,user_id: req.user.id});
    res.status(201).json(contact);
});
//@desc get contact
//@route get /api/contacts
//@acess Private

const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    res.status(200).json(contact);
});
//@desc update contact
//@route put /api/contacts
//@acess Private

const updateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() === req.user.id){
        res.status(403);
        throw new Error("user does not have permission to edit this contact");
    }
    const updatedContact = Contact.findById(req.params.id,req.body,{new: true});
    res.status(200).json(updatedContact);
});
//@desc delete contact
//@route delete /api/contacts
//@acess Private

const deleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() === req.user.id){
        res.status(403);
        throw new Error("user does not have permission to delete this contact");
    }
    await Contact.remove();
    res.status(200).json(updatedContact);
});

module.exports={
    getContacts,deleteContact,updateContact,getContact,createContact,
};
 //ALL USER DATA
const mongoose=require('mongoose')
// const mojiOglasi=require('./mojiOglasiSchema')

const userDataSchema = new mongoose.Schema({
  regEmail:String,
  regName:String,
  regPassword:String,
  regRepeatPassword:String,
  googleUserDataSub:String,
  registrationDate:String,
  lastLogin:String,
  mojiOglasi:[{
    cena:String,
    datum:String,
    grad:String,
    hitno:Boolean,
    id:String,
    imeKorisnika:String,
    izabranaKategorija:String,
    mesec:String,
    poruke:String,
    naslovOglasa:String,
    ponudaPotraznja:String,
    pregleda:Number,
    telefon:Number,
    textOglasa:String,
    uploadedImages:Array,
    valuta:String,
    zamena:Boolean
  }],
  poruke:String,
  oglasiKojePratim:Array,
  pozitivneOcene:Number,
  negativneOcene:Number,
  },
 );

const schemaAllUsers=mongoose.model("allUsers",userDataSchema)
const User=mongoose.model("allUsers")

module.exports=User

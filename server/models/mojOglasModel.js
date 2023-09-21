 //ALL USER DATA
 const mongoose=require('mongoose')
 // const mojiOglasi=require('./mojiOglasiSchema')
 
 const mojOglasSchema = new mongoose.Schema({
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
   },
  );
 
 const mojOglas=mongoose.model("mojOglas",mojOglasSchema)
 const Oglas=mongoose.model("mojOglas")
 
 module.exports=Oglas
 
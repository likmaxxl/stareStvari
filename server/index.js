const express = require("express");
const bodyParser = require("body-parser"); //zadnje
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors");

const nodemailer = require("nodemailer");

require("dotenv").config();

app.use(cors());

//treba
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'})); 

// app.use(express.json());
// app.use(express.urlencoded());

//treba
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json());

/*********************CONNECT MONGOS DB *********/
const db = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database!");
  })
  .catch((e) => {
    console.log(e);
  });

/*********************END CONNECT MONGOS DB *********/
const User = require("./models/userDataModel");

// const Oglas = require("./models/mojOglasModel");
//SCHEMA
// const userDataSchema = new mongoose.Schema({
//   regEmail:String,
//   regName:String,
//   regPassword:String,
//   regRepeatPassword:String,
//   googleUserDataSub:String,
//   registrationDate:String,
//   lastLogin:String,
//   mojiOglasi:String,
//   poruke:String,
//   oglasiKojePratim:String,
//   pozitivneOcene:Number,
//   negativneOcene:Number,
//   },
//  );
// mongoose.model("allUsers",userDataSchema)
// const User=mongoose.model("allUsers")

//POST REQUEST DODAVANJE NOVOG KORISNIKA U MONGO DB SA SVIM PRATECIM PODACIMA
app.post("/addUser", (req, res) => {
  var myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.send("item saved to database");
      
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

//GET REQUEST FROM MONGO DB
app.get("/svi-korisnici", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

//DODAVANJE NOVOG OGLASA
app.post("/postavi-oglas/:id", async (req, res) => {
  try{
    await User.updateOne(
      { _id: req.params.id },
     
      { $push: { mojiOglasi: req.body.postaviOglasPolja } }
   
    );
   
  }catch{
    console.log('greska');
  }

});



//DODAVANJE U LISTU PRACENJA
app.post("/pratim/:id", async (req, res) => {
  try{
    await User.updateOne(
      { _id: req.params.id },
     
      { $push: { oglasiKojePratim: req.body.oglasiKojePratim} }
   
    );
   
  }catch{
    console.log('greska');
  }

});


/*************OGLASI KOJE PRATIM OBRISI */
app.delete("/pratim/:idUser/:trenutniOglasKojiPratim", async (req, res) => {

  try {
    await User.updateOne(
      { _id:req.params.idUser },
      { $pull: { oglasiKojePratim: { _id:req.params.trenutniOglasKojiPratim} } }
    );

    res.status(200).json({ message: "Objekat uspešno obrisan." });
    console.log(req.body.idUser)
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom brisanja objekta." });
    console.log(res.statusCode)
  }
});




//GET KORISNIKOVI OGLASI
// app.get("/moji-oglasi/:id",async(req,res)=>{
//   try{
//     const allUser=await User.find({_id:req.params.id})
//     res.send({status:"ok",data:allUser})
//   }catch(error){
// console.log(error);
//   }
// })

//GET SVI OGLASI SVIH KORISNIKA
app.get("/svi-oglasi", async (req, res) => {
  try {
    const allUser = await User.find({});
    const sviOglasi = allUser.map((all) => {
      return all.mojiOglasi;
    });

    const combinedList = sviOglasi.flatMap((obj) => Object.entries(obj));
    // const combinedObject = Object.assign({}, ...sviOglasi);
    const showOnlyObjects = combinedList.flat();
    const filteredObjects = showOnlyObjects.filter(
      (item) => typeof item === "object" && !Array.isArray(item)
    );
    res.send({ status: "ok", data: filteredObjects });
  } catch (error) {
    console.log(error);
  }
});

/***************OBRISI OGLAS */

app.delete("/moji-oglasi/:idUser/:idOglas", async (req, res) => {

  try {
    await User.updateOne(
      { _id:req.params.idUser },
      { $pull: { mojiOglasi: { id:req.params.idOglas} } }
    );

    res.status(200).json({ message: "Objekat uspešno obrisan." });
    console.log(req.body.idUser)
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom brisanja objekta." });
    console.log(res.statusCode)
  }
});

/******************END OBRISI OGLAS */

//SEND EMAIL WITH EMAIL AND PASSWORD WHEN USER CLICK ON REGISTAR BUTTON
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// function sendEmail({ regEmail, regName, regPassword }) {
//   return new Promise((resolve, reject) => {
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });

//     const mail_configs = {
//       from: "starestvari.com <automatska poruka>",
//       to: "", //regEmail
//       subject: "Korisničko ime i lozinka starestvari.com",
//       html: `<!DOCTYPE html>
//   <html lang="en" >
//   <head>
//     <meta charset="UTF-8">
//     <title>Korisničko ime i lozinka</title>

//   </head>
//   <body>
//   <!-- partial:index.partial.html -->
//   <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//     <div style="margin:50px auto;width:70%;padding:20px 0">
//       <div style="border-bottom:1px solid #eee">
//         <a href="" style="font-size:1.4em;color: #993816;text-decoration:none;font-weight:600">starestvari.com</a>
//       </div>
//       <p style="font-size:1.1em">Zdravo {regName},</p>
//       <p>Uspešno ste napravili nalog na starestvari.com</p>
//       <p>Ovu poruku sačuvajte jer ukoliko zaboravite vaše podatke za logovanje uvek možete ovde da se podsetite.</p>

//      <p> Korisničko ime: <strong>{regEmail}</strong></p>
//      <p> Lozinka: <strong>{regPassword}</strong> </p>

//       <p style="font-size:0.9em;">Srdačan Pozdrav!</p>
//       <hr style="border:none;border-top:1px solid #eee" />
//       <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//         <p>Najveći web sajt za kupovinu i prodaju antikviteta</p>
//         <p>1starestvari.com</p:
//       </div>
//     </div>
//   </div>
//   <!-- partial -->

//   </body>
//   </html>`,
//     };
//     transporter.sendMail(mail_configs, function (error, info) {
//       if (error) {
//         console.log(error);
//         return reject({ message: `An error has occured` });
//       }
//       return resolve({ message: "Email sent succesfuly" });
//     });
//   });
// } OVO TREBA DA UNKOMENT

// app.get("/", (req, res) => {
//   sendEmail()
//     .then((response) => res.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// });

// app.post("/send_email", (req, res) => {
//   sendEmail(req.body)
//     .then((response) => res.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// }); OVO TREB AUNKOMENT




app.listen(3001, () => {
  console.log("success 3001 server!");
});

const { request, response } = require("express");
const express = require("express"); //import export package for server
require("./db/config");
// const User = require("./db/User");
const Account = require("./db/Useraccounts");
const Order = require("./db/Order");

// const Jwt = require("jsonwebtoken");
// const jwtkey = "e-commerence";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port=8080; 

//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   Jwt.sign({ result }, jwtkey, (err, token) => {
//     if (err) {
//       resp.send({ result: "Something went wrong,PLease try after sometimes" });
//     }
//     resp.send({ result, auth: token });
//   });
// });



app.post("/add-user", async (req, resp) => {
  let account = new Account(req.body);
  let result = await account.save();
  resp.send(result);
});

app.get("/users", async (req, resp) => {
  let users = await Order.find();
  if (users.length > 0) {
    resp.send(users);
  } else {
    resp.send({ result: "no result found" });
  }
});
// app.delete("/delete-user/:id", async (req, resp) => {
//   let result = await Account.deleteOne({ _id: req.params.id });
//   resp.send(result);
// });

// app.put("/update-user/:id", async (req, resp) => {
//   try {
//     const updatedUser = await Account.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } 
//     );

//     if (!updatedUser) {
//       resp.status(404).send({ error: "User not found" });
//     } else {
//       resp.send({ message: "User updated successfully", user: updatedUser });
//     }
//   } catch (error) {
//     resp.status(500).send({ error: "Internal server error" });
//   }
// });


// function verifyToken(req,resp,next){
//   let token=req.headers["authorization"];
  
//   if(token){
//     token=token.split(" ")[1];
//     Jwt.verify(token,jwtkey,(err,valid)=>{
//       if(err){
//         resp.send({result:"please provide valid token"});
//       }else{
//         next();
//       }
//     })

//   }else{
//     resp.send({result:"please add token with the headers"})
//   }
  
// }

app.listen(process.env.PORT || port); 

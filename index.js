const { request, response } = require("express");
const express = require("express"); //import export package for server
require("./db/config");
const Order = require("./db/Order");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port=8080; 
app.post("/add-user", async (req, resp) => {
  let account = new Order(req.body);
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
app.delete("/delete-user/:id", async (req, resp) => {
  let result = await Order.deleteOne({ _id: req.params.id });
  resp.send(result);
});

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




app.listen(process.env.PORT || port); 

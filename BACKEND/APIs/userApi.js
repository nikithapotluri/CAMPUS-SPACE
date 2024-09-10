//create mini-express app
const exp = require("express");

require('dotenv').config() //access process.env.SECRET_KEY in the .env file

const userApp = exp.Router(); 
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

//add body parser middleware
userApp.use(exp.json());

//create sample rest api(req handlers- routes)

//route to get users(protected route)
userApp.get("/users",(async (req, res) => {
  //get usersCollection obj
  const usersCollection = req.app.get("usersCollection");
  try{
      //get users data from usersCollection of DB
    let usersList = await usersCollection.find().toArray();
    //send users data to client
    res.send({ message: "users", payload: usersList });
  }
  catch(err){
    console.error('Error fetching users:', err)
    res.status(500).send({message:'Error fetching users'})
  }

}));



//route to send one user by id(protected route)
userApp.get("/users/:username",(async(req, res) => {
  //get usersCollection obj
  const usersCollection = req.app.get("usersCollection");
  //get id from url
  const usernameOfUrl=req.params.username;
  //find user by id
  let user=await usersCollection.findOne({username:{$eq:usernameOfUrl}})
  //send res
  res.send({message:"one user",payload:user})
}));


//user login(authentication)(public route)
userApp.post('/login',(async(req,res)=>{
  //get usersCollection obj
const usersCollection = req.app.get("usersCollection");
//get new UserCredentials from client
const userCred=req.body;
//verify username
let dbUser=await usersCollection.findOne({username:userCred.username})
//if user not existed
if(dbUser===null){
 res.send({message:"Invalid username"})
}
//if user found,compare passwords
else{
  //hash the password
  let hashedPassword = await bcryptjs.hash(dbUser.password, 7);
  dbUser.password=hashedPassword;

   let result=await bcryptjs.compare(userCred.password,dbUser.password)
   //if passwords not matched
   if(result==false){
     res.send({message:"Invalid password"})
   }
   //if passwords are matched
   else{
     //create JWT token
      let signedToken= jwt.sign(
        {username:userCred.username},
        'sdfghjkksdcvjicvboiuytertyqwertyuioplkjhgfdsazxcbnmkiuytrdcvbnkugv',
        {expiresIn:'1h'}) //process.env.SECRET_KEY is secret token

     //send res
     res.send({message:"login success",token:signedToken,user:dbUser})
   }
}

}))

// Route to handle slot booking
userApp.post('/book-slot', async (req, res) => {
  const bookedSlotsCollection = req.app.get("bookedSlotsCollection"); // Assuming bookedSlotsCollection exists
  const newBooking = req.body;

  try {
    // Check for clashes with existing bookings
    const conflictingSlots = await bookedSlotsCollection.find({
      roomNo: newBooking.roomNo, 
      date: newBooking.date,
      timeSlots: { $in: newBooking.timeSlots }
    }).toArray();

    if (conflictingSlots.length > 0) {
      // If any slot is already booked, return an error
      return res.status(400).send({ message: 'Selected time slot is already booked.' });
    }

    // If no conflicts, insert the new booking
    await bookedSlotsCollection.insertOne(newBooking);

    res.send({ message: 'Slot booked successfully!' });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).send({ message: 'Failed to book slot.' });
  }
});



//export userApp
module.exports = userApp;
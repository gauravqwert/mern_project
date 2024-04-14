const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
// Controllers 

// In a Express.js applications, a "controller" refers to a part of your code that is responsible for handling the applications logic. Controllers are typically used to process incoming requests,interact with models(data sources) , and send responses back to clients. They help organize your application by separating concerns and following the MVC(Model View Controller) design pattern.


// home
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Mern Website Using Controllers");
    }
    catch (error) {
        console.log(error);
    }
}
// register 
// 1. get Registration Data: Retrieve user data(username,email,password,phone)
// 2. Check Email Existence : check if the email is already registered
// 3. Hash Password : security hash the password
// 4. create User : Create a new user with hashed password
// 5. save to DB : save user data to the database
// 6 Respond : respond with "registration successfully" or handle errors.

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists" });
        }
        const userCreated = await User.create({ username, email, phone, password, });
        res.status(201).json({
            msg: "register Successfully", token: await userCreated.generateToken(), userId: userCreated._id.toString(),
        }
        );
    }
    catch (error) {
        // res.status(500).json({ msg: "Internal Server Error" });
        next(error);
    }
}


// User login logic
const login = async(req,res) =>{
    try{
      const {email,password} = req.body;
    //   email valid or not
     const userExist = await User.findOne({email});
     console.log(userExist);
     if(!userExist) {
        return res.status(400).json({message : "Invalid Credentails"});
     }
    //   const user = await bcrypt.compare(password,userExist.password);
    const user = await  userExist.comparePassword(password);
       if(user){
        res.status(200).json({
            msg: "Login Successfully", token: await userExist.generateToken(), userId: userExist._id.toString(),
        });
       }
       else{
        res.status(401).json({message : "Invalid Email or password"});
       }
    }
    catch(error){
       res.status(500).json("Internal server error");
    }
}

//In most cases,converting _id to a string is a good practice because it ensures consistency and compatibility across different JWT libraries and System .It also aligns with the exceptation that claims in a JWT are represented as Strings.

// to send  users data -user logic
const user = async(req,res) => {
    try{
       const userData = req.user;
       console.log(userData);
      return res.status(200).json({userData});
    }
    catch(error){
        console.log(`error from the user route ${error}`);
    }
}

module.exports = { home, register,login ,user};
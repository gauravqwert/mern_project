// what is schema 
//  Schema: Defines the structure of the documents within a collection. It specifies the fields, their fields,their types,and any additional constraints or validations.

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin : {
        type:Boolean,
        default:false,
    },
});

// model : Acts as a higher-level abstraction that interacts aith the database based on the defined schema.It represents a collection and provides an interface for querying,creating,updating,and deleting documents in that collection.Models are created from schemas and enable you to work with MongoDB data in a more structured mannner in your application.


// secure the password with the bcrypt
userSchema.pre("save",async function(next){
    const user = this;

    if(!user.isModified("password")){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    }
    catch(error){
        next(error);
    }
})

// what is jwt ?
// - JSON web token(jwt) is an open standard (RFC 7519) that defines a compact and self-contained way  for securly transmitting information between partials as a Json object.
//  - JWT are often used for authentication and authorization in web application.
// 1 ** Authentication ** Verifying the identity of auser or client
// 2 **Authorization ** Deternmining what actions a user or client is allowed to perform

// **Components of a JWT **
// header : contains metadata about the token,such as the type of token and the signing algorithm being used.
// Payload : Contains claims or statements about an entity (typically,the user) and additional data. Common claims include userID,username,and expiration time.

// signature : To verify thatthe sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

// Json web token : Tokens , such asJWTs (JSON Web Tokens),are typically not stored in the database along with other user details.Instead, they are issued by the server during the authentication process and then stored on the client-side ( e.g., in cookies or local storage) for later use.

// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}


//json web token
userSchema.methods.generateToken = async function(){
  try{
      return jwt.sign({
        userId: this._id.toString(),
        email : this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,{
        expiresIn : "30d",
      }
      );
  }
  catch(error){
    console.log(error);
  }
}

// define the model or the collection name
const User = new mongoose.model("User",userSchema);

module.exports=User;
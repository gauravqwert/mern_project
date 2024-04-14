// await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.

// https://github.com/colinhacks/zod#parseasync

// '.parse(data: unknown):T'
// given any Zod schema , you can call its '.parse' method to check 'data' is valid.If it is a value is returned eith full type information! otherwise an error is thrown

// `.parseAsync(data:unknown):Promise<T>`

const validate =(schema) =>async(req,res,next) => {
 try{
     const parseBody = await schema.parseAsync(req.body);
     req.body = parseBody;
     next();
 }
 catch(err){
  const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    const error ={
      status,
      message,
      extraDetails,
    }

    console.log(error);
  //  res.status(400).json({msg : message});
  next(error);
 }
} 

module.exports = validate;
import jwt from 'jsonwebtoken'

//user authentication middleware
const authUser = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not authorized. Login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)     
        req.userId = token_decode.id

        next()

    } catch (error) {
        console.error(error); // Log the error for better debugging
        res.json({ success: false, message:error.message});
    }
}

export default authUser
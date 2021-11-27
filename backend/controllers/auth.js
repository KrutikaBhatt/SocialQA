const User = require('../models/user')

module.exports.signUp = (req, res) => {
    // Try to find the user
    User.findOne({email : req.body.email}, (err, user) => {
        if(err) {
            console.log(`Error in finding user: ${err}`)
            return res.status(404).json({
                success: 0,
                error: "Error in finding user !!"
            })
        }
        if(!user) {
            User.create(req.body, (err, user) => {
                console.log(req)
                console.log(req.body)
                if(err){
                    console.log(`Error in creating user: ${err}`)
                    return res.status(404).json({
                        success: 0,
                        error: "Error in creation of user"
                    })
                }
                return res.status(203).json({
                    success: 1,
                    message: "User successfully registered"
                })
            })
        }
        else{
            console.log('An account with this email already exists !!')
            return res.status(203).json({
                success: 0,
                message: "Account already exists with this email"
            })
        }
    })
}

module.exports.login = (req, res) => {
    // find the user
    User.findOne({email : req.body.email}, (err, user) => {
        if(err) {
            console.log(`Error in finding user: ${err}`)
            return res.status(404).json({
                success: 0,
                error: "Error in finding user !!"
            })
        }
        // handle user found
        if(user){
            // handle password incorrect
            const matchPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if(!matchPassword){
                console.log(user.password)
                console.log(req.body.password)
                console.log('Password Incorrect !!')
                return  res.status(203).json({
                    success: 0,
                    error: "Incorrect Password Entered !!"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Login successful"
            })
        }
        else{
            // handle user not found
            console.log('No user with such email exists !!')
            return res.status(203).json({
                success: 0,
                error: "Invalid Email !!"
            })
        }
    })
}
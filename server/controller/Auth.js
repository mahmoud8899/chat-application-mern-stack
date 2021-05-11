const User = require('../model/Auth')
const bcrypt = require('bcrypt')
const getToken = require('../token/jwt_sing')
const ObjectID = require('mongoose').Types.ObjectId


// login faecbook .... 
exports.faecbookLogin = async (req, res) => {

    const { email, username, image, facebookId } = req.body

    try {

        let user = await User.findOne({ email })
        if (user) return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            facebookId: user.facebookId,
            isAdmin: user.isAdmin,
            image: user.image,
            followers: user.followers,
            following: user.following,
            token: getToken(user._id)
        })
        user = new User({
            email,
            username,
            image,
            facebookId,
        })

        let newXP = await user.save()

        return res.json({
            _id: newXP._id,
            username: newXP.username,
            email: newXP.email,
            facebookId: newXP.facebookId,
            isAdmin: newXP.isAdmin,
            image: newXP.image,
            followers: newXP.followers,
            following: newXP.following,
            token: getToken(newXP._id)
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


/// google login...
exports.googleLogin = async (req, res) => {
    const { email, username, image, googleId } = req.body

    try {

        let user = await User.findOne({ email })
        if (user) return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            googleId: user.googleId,
            isAdmin: user.isAdmin,
            image: user.image,
            followers: user.followers,
            following: user.following,
            token: getToken(user._id)
        })
        user = new User({
            email,
            username,
            image,
            googleId,
        })

        let newXP = await user.save()

        return res.json({
            _id: newXP._id,
            username: newXP.username,
            email: newXP.email,
            googleId: newXP.googleId,
            isAdmin: newXP.isAdmin,
            image: newXP.image,
            followers: newXP.followers,
            following: newXP.following,
            token: getToken(newXP._id)
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// Post Singup....
exports.singUp = async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(404).json({ message: `we have some ${email}` })

        const hasPassword = await bcrypt.hash(password, 10)
        user = new User({
            username,
            email,
            password: hasPassword
        })
        const newUser = await user.save()
        return res.json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            image: newUser.image,
            token: getToken(newUser._id)
        })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// POST login.....
exports.Login = async (req, res) => {
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: `we have some ${email}` })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(404).json({ message: 'dont match' })

        const usName = await user.save()

        return res.json({
            _id: usName._id,
            username: usName.username,
            email: usName.email,
            isAdmin: usName.isAdmin,
            image: usName.image,
            followers: usName.followers,
            following: usName.following,
            token: getToken(usName._id)
        })


    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// user id Profile.... 
exports.profile = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).json({ message: `id ${req.params.id}` })

    }

    try {
        let user = await User.findById(req.params.id).select('-password')
        if (user) return res.json(user)
        else res.status(404).json({ message: 'We have not UserList....' })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// userList.... 
exports.userList = async (req, res) => {
    const keyword = req.query.keyword ? {
        username: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    let user = await User.find({ ...keyword }).select('-password')
    if (user) return res.json(user)
    else res.status(404).json({ message: 'We have not UserList....' })
}
// update User....
exports.updateUserId = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).json({ message: `id ${req.params.id}` })
    }
    const { username, email } = req.body
    try {

        let user = await User.findById({ _id: req.params.id })
        if (user) {

            user.username = username,
                user.email = email
            const newus = await user.save()
            return res.status(201).json(newus)
        } else {
            return res.status(404).json({ message: 'we have not samma User.' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// update Image... 
exports.updateImage = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })

    try {
        let user = await User.findById(req.params.id)
        if (user) {
          
                user.image = `/${req.file.path}`
                const newUse = await user.save()
                return res.status(201).json(newUse)
       

        } else {
            return res.status(404).json({ message: 'error from User...' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
// add adres... put...
exports.addAdress = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    const { city, land, work, description } = req.body

    try {

        let user = await User.findById(req.params.id)
        if (user) {
            user.adress.city = city,
                user.adress.land = land,
                user.adress.work = work,
                user.adress.description = description
            const neAdress = await user.save()
            return res.status(201).json(neAdress)

        } else {
            return res.status(404).json({ message: 'we have not user... ' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

}
// followers... 
exports.followers = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })
    try {

        if (req.user._id !== req.params.id) {

            let user = await User.findById(req.params.id)
            let userId = await User.findById(req.user._id)

            if (!user.followers.includes(req.user._id)) {
                await user.updateOne({ $push: { followers: req.user._id } })
                await userId.updateOne({ $push: { following: req.params.id } })

                return res.status(200).json({ message: 'user has been followed' })
            } else {
                return res.status(200).json({ message: 'you allready follow this user' })
            }

        } else {
            return res.status(404).json({ message: 'you cant follow yourself' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }



}

// unfollowers... 
exports.unfollowers = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })

    if (req.params.id !== req.user._id) {
        try {
            const user = await User.findById(req.params.id)
            const userId = await User.findById(req.user._id)
            if (user.followers.includes(req.user._id)) {
                await user.updateOne({ $pull: { followers: req.user._id } })
                await userId.updateOne({ $pull: { following: req.params.id } })
                return res.status(201).json({ message: 'user Okej' })
            } else {
                return res.status(201).json({ message: 'you allready follow this user' })
            }
        } catch (error) {
            return res.status(404).json({ message: error.message })
        }

    } else {
        return res.status(403).json("you allready follow this user");
    }

}

// visa frien to User... 
exports.Friend = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `error id: ${req.params.id}` })
        try {
            const user = await User.findById(req.params.id);
            const friends = await Promise.all(
              user.followers.map((friendId) => {
                return User.findById(friendId);
              })
            );
            let friendList = [];
            friends.map((friend) => {
              const { _id, username, image } = friend;
              friendList.push({ _id, username, image });
            });
         return   res.status(200).json(friendList)
          } catch (err) {
            res.status(500).json(err);
          }

}



// visa frien to User... 
exports.followingList = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(404).json({ message: `error id: ${req.params.id}` })
        try {
            const user = await User.findById(req.params.id);
			
			
            const friends = await Promise.all(
              user.following.map((friendId) => {
                return User.findById(friendId);
              })
            );
            let friendList = [];
            friends.map((friend) => {
              const { _id, username, image } = friend;
              friendList.push({ _id, username, image });
            });
         return   res.status(200).json(friendList)
          } catch (err) {
            res.status(500).json(err);
          }

}

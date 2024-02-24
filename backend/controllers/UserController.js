import User from '../models/User.js';
import bcrypt from 'bcrypt';

const UserController = {
    get: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
            // console.log('users', users);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
        const user = await User.findOne({ id }); 
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
        } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        }    
    },
    post: async (req, res) => {
        const password = "123456";
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = new User({
                "id": "1",
                "firstName": "Chris",
                "lastName": "Arunyamitanon",
                "email": "krisana@gmail.com",
                "userName": "ChrisZa",
                "password": hashedPassword,
                "age": 2,
                "kidInfo": {
                    "kidID": 1
                },
                "hearingIssue": "None",
                "hearingTestResult": "Normal"
            });
            await newUser.save();
            res.send('User created successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updateFields = req.body;
    
        try {
          const user = await User.findOneAndUpdate({ id }, updateFields, { new: true });
          if (!user) {
            return res.status(404).send('User not found');
          }
          res.json(user);
        } catch (error) {
          console.error(error.message);
          res.status(500).send('Server Error');
        }
    },

    // recheck 
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
          const user = await User.findOne({ email });
          if (!user) return res.status(400).send("Cannot find user");
    
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            const userWithoutPassword = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            };
            res.status(200).json(userWithoutPassword);
            console.log("Login Success");
          } else {
            res.status(404).json({ message: "Not Found", statusCode: 404 });
            console.log("Login Not Success");
          }
        } catch (error) {
          console.error(error.message);
          res.status(501).send("Server Error");
        }
      }
};

export default UserController;

import User from '../models/User.js';
import bcrypt from 'bcrypt';

const UserController = {
    get: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
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
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = { email: req.body.email, password: hashedPassword };
          // users.push(user);
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
    signup: async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { email: req.body.email, password: hashedPassword };
        User.create(user).then(() => {
          res.status(201).send();
        });
      } catch (error) {
        res.status(501).send();
        console.log(error);
      }
    },
    
    // recheck 
    login: async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(async (user) => {
        if (user === undefined) {
          return res.status(400).send("Cannot find user");
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const userWithoutPassword = {
            // id: user.id,
            // firstName: user.firstName,
            // lastName: user.lastName,
            email: user.email,
          };
          res.status(200).json(userWithoutPassword);
          console.log("Success");
        } else {
          res.status(404).json({ message: "Not Found", statusCode: 404 });
          console.log("Not success");
        }
      })
      .catch((error) => res.status(500).json(`Error found: ${error}`));
  }
};

export default UserController;

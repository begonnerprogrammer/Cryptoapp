const express = require('express');
const router = new express.Router();
const Collection = require('../schema/schema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors=require("cors")
const path = require("path");
const multer = require("multer");
const PostModel = require('../schema/postmodel');
const Contact = require("../schema/contact");
const api=require('../../api');
const Money=require('../schema/money');

const Coinmodel=require('../schema/coins');
const MoneyModel = require('../schema/money');
//context api part
const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("the token is missing")
    }
    else {
        jwt.verify(token, "jwt-swcret-key", (err, decoded) => {
            if (err) {
                return res.json("the token is wrong")
            }
            else {
                req.email = decoded.email;
                req.username = decoded.name;
                next();
            }
        })
    }
}

//Authorization
const verify = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.json("the token is not there")
    }
    else {
        jwt.verify(token, "jwt-swcret-key", (err, decoded) => {
            if (err) return res.json("token is wrong")
            next();
        })
    }
}

 

router.get("/",(req,res)=>{
       res.json("Hello")
})

//logout functionality
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json("success");
})



//authentication at home page
router.get("/home", verify, (req, res) => {
    //responce to use effect after next is executed
    return res.json("success")
})



//authentication
router.get("/test", verifyuser, (req, res) => {
    //responce to use effect after next is executed
    //responce will come with assigning jwt not before you fool
    return res.json({ email: req.email, username: req.username })
})



router.get('/api/coins', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Collection.findOne({ email });
    if (!user) return res.json({ status: "error", message: "No record existed" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ status: "error", message: "Invalid credentials" });

    // create token
    const token = jwt.sign({ email: user.email, name: user.name }, "jwt-swcret-key", { expiresIn: 100000 });
    res.cookie("token", token);

    // get user's money
    const moneyDoc = await MoneyModel.findOne({ email: user.email });
    const money = moneyDoc?.money || 0;

    res.json({ status: "success", money });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});



//contact form
router.post("/contact", (req, res) => {
    const { name, email, subject, massage } = req.body;

    const user = new Contact({ name, email, subject, massage });


    user.save().then(() => {
        res.status(201).json({ massage: "Massage send" });
    })
        .catch((e) => { console.log(e) })

})




router.post('/postcoin',async(req, res) => {
  try {
    const { coins,userEmail } = req.body;
    console.log("Received from frontend:", coins,userEmail);

 if (!coins || !userEmail) {
      return res.status(400).json({ success: false, message: "Missing coins or userEmail" });
    }

  // Save the coin document
     const updatedUser = await Coinmodel.findOneAndUpdate(
      { userEmail },         // Find by email
      { $addToSet: { coins: { $each: coins } } }, // add new coins, keep previous ones
      { new: true, upsert: true } // Create if doesn't exist
    );

    console.log("✅ Saved or updated:", updatedUser);

    // Respond properly as JSON
    res.status(201).json({
      success: true,
      message: "Coin saved successfully",
      data: coins
    });


  } catch (error) {
     console.error("🔥 Error in /postcoin route:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

    
router.put('/updatemoney', async (req, res) => {
  const { money, email } = req.body;

  try {
    if (!money || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing Money or userEmail"
      });
    }

    const updated = await MoneyModel.findOneAndUpdate(
      { email },            // Find by email
      { $set: { money } },  // Update money
      { new: true, upsert: true } // Create if doesn't exist, return new doc
    );

    console.log("✅ Money updated:", updated);

    res.status(201).json({
      success: true,
      message: "Money updated successfully",
      data: updated.money   // send the actual new value from DB
    });
  } catch (error) {
    console.error("🔥 Error in /updatemoney route:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});





router.get('/getbuycoins', async (req, res) => {
  try {
    const { email } = req.query; // make sure this is the same as frontend
    if (!email) return res.status(400).json({ message: "Email is required" });

    const userCoins = await Coinmodel.findOne({ userEmail: email });
    if (!userCoins) return res.status(404).json({ message: "Email not found" });

    res.json(userCoins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




router.get('/getmoney', async (req, res) => {
  try {
    const { email } = req.query; // make sure this is the same as frontend
    if (!email) return res.status(400).json({ message: "Email is required" });

    const userCoins = await MoneyModel.findOne({ email: email });
    if (!userCoins) return res.status(404).json({ message: "Email not found" });

    res.json(userCoins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


//signUp
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

     


    //hashing password

    bcrypt.hash(password, 10).then(hash => {
        Collection.findOne({ email: email }).then(user => {

           

            if (user) {
               return res.json("already have an acount");
            }
            else {
                const coinmoney=new Money({email,money:200});
                const user = new Collection({ name, email, password: hash });


                coinmoney.save()

                user.save().then(() => {
                    res.status(201).json({ massage: "Massage send and Money stored" });
                })
                    .catch((e) => { console.log(e) })








            }
        }
        )
    })
        .catch(err => console.log(err))





})


router.delete('/deletepost/:id', (req, res) => {
    PostModel.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.json("Success"))
        .catch(e => console.log(e))
})



router.get('/data/coins.json',(req,res)=>{
    const { name, allCoins } = req.query;
    if(name,allCoins){
         if(name==='null' && allCoins==='allcoins'){
res.json(api);
    }
 else if(name!=='null' && allCoins==='allcoins'){
  res.json(api.filter(coin => coin.symbol.toLowerCase() === name.toLowerCase()));
    }
   
  else{
   res.status(400).json({ error: "No valid parameters provided" });
  }
  
    }
  
   
 
})



router.delete('/deletecoin', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  try {
    const result = await Coinmodel.deleteOne({ userEmail: email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No record found to delete" });
    }

    res.json({ success: true, message: "Coin record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});




router.get('/admin', async (req, res) => {
  try {
    const data = await Collection.find(); // wait for data
    res.json(data); // send actual data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});




//using multer library
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({
    storage: storage
})

//file upload
router.post("/create", upload.single('file'), (req, res) => {
    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename,
        //cratiung another field for user authntication for edit or delete
        email: req.body.email
    })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})



router.get('/getposts', (req, res) => {
    PostModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
})




router.get('/getpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

router.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate(
        { _id: id }, {
        title: req.body.title,
        description: req.body.desc
    }
    )
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})

module.exports = router;

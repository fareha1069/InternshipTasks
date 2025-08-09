const express = require("express")
const router = express.Router()
const db = require("../../models/index")
// const { where } = require("sequelize")

//sequelize connection
db.sequelize.sync()
    .then(()=> console.log("connected sequelize"))
    .catch(()=>console.log("cannot connect sequelize"))
/**
 * @swagger
 * /AllUsers:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: get all users from user db
 */

router.get("/AllUsers" , async(req , res)=>{
    try{
        const data = await db.MyUser.findAll()
        res.status(200).json(data); 
    }
    catch(err){
        res.status(200).json("no exist"); 

    }
    // res.send("hello")
})
/**
 * @swagger
 * /AddUser:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               role:
 *                 type: string
 *                 description: Role of the user (e.g., admin, user)
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/AddUser", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = await db.MyUser.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("User creation failed:", err);
    res.status(500).json({
      error: "Failed to create user",
      details: err.message
    });
  }
});

//delete user

/**
 * @swagger
 * /deleteUser/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Remove a user from the database by specifying their numeric ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */

router.delete("/deleteUser/:id" , async(req , res)=>{
    try{
        const {id} =  req.params;
        const deleted = await db.MyUser.destroy({where: {id}})
        if(deleted)
            res.status(200).send("user deleted succesfully")
        else
            res.status(400).send("cannot  found user")
    }
    catch(err)
    {
        res.status(500).send("cannot delete user")
    }
} )

/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user details by specifying their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const [updated] = await db.MyUser.update(
      { name, email, password, role },
      { where: { id } }
    );

    if (updated) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Cannot update user");
  }
});

module.exports = router
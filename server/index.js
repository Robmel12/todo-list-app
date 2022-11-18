const express = require("express");
const app = express();
const cors = require("cors")
const pool = require('./db')
//middleware
app.use(cors())
app.use(express.json())
//ROUTES
//create a todo
app.post("/users.todos", async(req, res)=>{
    try{
        const {description,completed, user_id} = req.body
        const newTodo = await pool.query("INSERT INTO users.todos (description, completed, user_id) VALUES($1, $2, $3) RETURNING *",
        [description, completed, user_id]);
        res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message)
    }
});
//get all todos
app.get("/users.todos", async(req, res)=>{
    try {
        const allTodos =  await pool.query("SELECT * FROM users.todos")
        res.json(allTodos.rows); 
    } catch (err) {
        console.error(err.message)
    }
})
//get a todo
app.get("/users.todos/:id", async(req, res)=>{
    try {
      const {id} = req.params
      const todo = await pool.query("SELECT * FROM users.todos WHERE todo_id =$1", [id])
      res.json(todo.rows[0]);
    }catch (err) {
    console.error(err.message)
}
})
//update a todo
app.put("/users.todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {description, completed, user_id} = req.body;
     
        if(description){const updateTodo = await pool.query(
            "UPDATE users.todos SET description = $1 WHERE todo_id = $2 AND user_id=$3",
 [description, id, user_id]
 );
 res.json(console.log('Id updated'))}
 if(typeof(completed) ===  "boolean"){
    const updateTodo = await pool.query(
        "UPDATE users.todos SET completed = $1 WHERE todo_id = $2 AND user_id=$3",
[completed, id, user_id]
);
res.json(console.log('status updated'))}
        
    }catch (err) {
        console.error(err.message)
    }
})

//delete a todo

app.delete("/users.todos/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {user_id} = req.body;
       const deleteTodo = await pool.query("DELETE FROM users.todos WHERE todo_id = $1 AND user_id=$2", [id, user_id])
 res.json("Todo was deleted!")
    }catch (err) {
        console.error(err.message)
    }
})

//create an account
app.post("/users.login", async(req, res)=>{
    try{
        const {username, email, password} = req.body
        const newTodo = await pool.query("INSERT INTO users.login (username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, password]);
        res.json(console.log(`new user: ${username} created..`))
    }catch(err){
        res.json(err.message)
    }
});
//validate password
app.get("/users.login", async(req, res)=>{
        try {
            const {username, email, password} = req.body
            const user_id =  await pool.query("SELECT * FROM users.login WHERE username = $2 AND password = $1 OR email = $3 AND password = $1", [password, username, email])
            res.json(console.log("user: ", user_id.rows)); 
    } catch (err) {
      res.json(err.message)
    }
})
//get account details


app.listen(5000, ()=> {
    console.log('server has started on port 5000')
})

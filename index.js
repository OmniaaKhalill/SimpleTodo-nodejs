//Omnia Abd El-mawgoud day 2

const express = require('express')
const fs=require('fs')

const app = express()
app.use(express.json())


//get

app.get("/todos",(req,res)=>{

   let todos= JSON.parse(fs.readFileSync('./todos.json',{encoding:'utf8'}));
   res.json(todos)
})

//post
app.post("/todos",(req,res)=>{

 let newTodo= req.body// return json
 let todos= JSON.parse(fs.readFileSync('./todos.json',{encoding:'utf8'}));

  todos.push(newTodo);
  fs.writeFileSync('./todos.json', JSON.stringify(todos));
  res.json(newTodo)

 })

//delete
 app.delete("/todos/:title", (req, res) => {

    const todoTitle = req.params.title;
    let todos = JSON.parse(fs.readFileSync('./todos.json', { encoding: 'utf8' }));
    
    const index = todos.findIndex(todo => todo.title === todoTitle);

    if (index !== -1) {
        todos.splice(index, 1);
        fs.writeFileSync('./todos.json', JSON.stringify(todos));
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});







const port =3000;
app.listen(port,()=>{
    console.log(`server is listening  sucesssfilly on port ${port}`);

});


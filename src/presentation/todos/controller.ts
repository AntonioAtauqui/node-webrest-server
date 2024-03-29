import { Request, Response } from "express";
import { json } from "stream/consumers";


const todos = [
    {id: 1, text: "Buy fish", createAt: new Date()},
    {id: 2, text: "Buy chicken", createAt: new Date()},
    {id: 3, text: "Buy rabbit", createAt: new Date()}
];

export class TodosController {

    //* DI
    constructor () {}

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        
        const id = + req.params.id;
        if (isNaN(id)) res.status(400).json({error: `ID argument is not a number`});

        const todo = todos.find( todo => todo.id === id );

        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found`});
    };

    public createTodo = (req: Request, res: Response) => {
        const {text} = req.body;

        if (!text) return res.status(400).json({ error: "Text property is required" });
        const newTodo = {
            id: todos.length + 1,
            text: text,
            createAt: new Date(),
        };

        todos.push(newTodo);
        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({error: `ID argument is not a number`});

        const todo = todos.find( todo => todo.id === id );
        if (!todo) return res.status(404).json({error: `TODO with id ${id} not found`});

        const {text} = req.body;
        if (!text) return res.status(400).json({ error: "Text property is required" });
        todo.text = text;

        /*const  {text, createAt} = req.body;

        todo.text = text || todo.text;
        (createAt === "null")
            ? todo.createAt = null
            : todo.createAt = new Date(createAt || todo.createAt)*/

        /*todos.forEach( (todo, index) => {
            if ( todo.id === id ) {
                todos[index] = todo;
            }
        })*/

        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({error: `ID argument is not a number`});
        
        const todo = todos.find( todo => todo.id === id );
        if (!todo) return res.status(404).json({error: `TODO with id ${id} not found`});

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    };


}
import { Body, Controller, Delete, Get,Head, Headers, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {
        this.todos = []
    }
    todos: Todo[];
    @Get()
    getTodos(){
    
        return this.todos;
    } 
    // Récupérer le Todo via son Id
    @Get('/:id')
    getTodoById(
    @Param('id', new ParseIntPipe(
      {
        errorHttpStatusCode: HttpStatus.NOT_FOUND
      }
        )) id
    ) {
    return this.todoService.getTodoById(id);
  }

    @Post()
    addTodos(
        @Body() newTodo: Todo
    ){
        if (this.todos.length) {
            newTodo.id = this.todos[this.todos.length -1].id +1;
        }else {
            newTodo.id =1;
        }
        this.todos.push(newTodo)
        return newTodo;
    } 
    // Supprimer un TODO via son id
    @Delete(`/:id`)
    deleteTodos(
        @Param('id') id
    ){
        // Chercher l'objet via son id dans le tableau des todos
        const index = this.todos.findIndex(todo => todo.id === +id);
        // Utiliser la methode pour supprimer le todo si il existe
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
        }
        return {
            message : `Le todo d'id ${id}a été supprimé`,
            count: 1
        };

    }

    @Put(':id')
    modifierTodo(
      @Param('id', ParseIntPipe) id,
      @Body() newTodo: Partial<Todo>
    ) {
        return this.todoService.updateTodo(id, newTodo);
    }
}

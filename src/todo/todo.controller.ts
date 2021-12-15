import { Body, Controller, Delete, Get,Head, Headers, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { GetPaginatedTodoDto } from './DTO/get-paginated-todo.dto';
import { AddTodoDto } from './DTO/add-todo.dto';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe';


@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {
    
    }
    todos: Todo[];

    @Get()
    getTodos(
        @Query() mesQueryParams: GetPaginatedTodoDto
    ): Todo[] {
        
        return this.todoService.getTodos();
    } 


    // Récupérer le Todo via son Id
    @Get(`/:id`)
    getTodoById(
    @Param(`id`, new ParseIntPipe(
      {
        errorHttpStatusCode: HttpStatus.NOT_FOUND
      }
        )) id
    ) {
            return this.todoService.getTodoById(+id);
     }

    @Post()
    addTodos(
        @Body() newTodo: AddTodoDto
    ) : Todo {
        return this.todoService.addTodo(newTodo);
    } 
    // Supprimer un TODO via son id
    @Delete(`/:id`)
    deleteTodos(
        @Param(`id`, ParseIntPipe) id
    ){
        return this.todoService.deleteTodo(id);

    }

    @Put(`/:id`)
    modifierTodo(
      @Param(`id`, ParseIntPipe) id,
      @Body() newTodo: Partial<AddTodoDto>
    ) {
        
        return this.todoService.updateTodo(id, newTodo);
    }

    @Post(`pipe`)
    testPipe(
        @Param(`data`, UpperAndFusionPipe) paramData,
        @Body() data
    ){
        return data;
    }

}

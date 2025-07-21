import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { createTodoSchema, CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { ZodValidationPipe } from './validation.pipe';
// import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

// @UseFilters(new HttpExceptionFilter())

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UsePipes(new ZodValidationPipe(createTodoSchema))
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    const todos = this.todosService.findAll();
    return { todos };
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.todosService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateTodoDto: UpdateTodoDto,
  // ) {
  //   return this.todosService.update(id, updateTodoDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}

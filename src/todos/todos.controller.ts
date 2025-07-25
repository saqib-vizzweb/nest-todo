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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ValidationPipe } from 'src/common/validation/validation.pipe';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from '../common/logger/logger.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
// import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('todos')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}

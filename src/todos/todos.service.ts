import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todos: CreateTodoDto[] = [];

  create(createTodoDto: CreateTodoDto) {
    this.todos.push(createTodoDto);
    return createTodoDto;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return `This action removes a #${id} todo`;
  }
}

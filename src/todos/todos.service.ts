import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService implements OnModuleInit {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  onModuleInit() {
    console.log('TodosService initialized');
    // You can perform any initialization logic here if needed
  }

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  async findAll() {
    const todos = await this.todosRepository.find();
    return todos;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.update(id, updateTodoDto);
  }

  async findOne(id: number) {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  remove(id: number) {
    return this.todosRepository.delete(id);
  }
}

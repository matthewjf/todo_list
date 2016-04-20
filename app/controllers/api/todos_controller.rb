class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: {errors: @todo.errors.full_messages, status: 400}
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      render json: {success: "todo destroyed"}
    else
      render json: {errors: @todo.errors.full_messages, status: 400}
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: {errors: @todo.errors.full_messages, status: 400}
    end
  end

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end

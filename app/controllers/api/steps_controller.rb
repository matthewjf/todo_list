class Api::StepsController < ApplicationController
  def index
    @steps = Todo.find(params[:todo_id]).steps
    render json: @steps
  end

  def create
    @todo = Todo.find(params[:todo_id])
    @step = @todo.steps.build(step_params)
    if @step.save
      render json: @step
    else
      render json: {status: 400, errors: @step.errors.full_messages}
    end
  end

  def update
    @step = Step.find(params[:id])
    if @step.update(step_params)
      render json: @step
    else
      render json: {status: 400, errors: @step.errors.full_messages}
  end

  def destroy
    @step = Step.find(params[:id])
    if @step.destroy
      render json: {success: 'step destroyed'}
    else
      render json: {status: 400, errors: @step.errors.full_messages}
    end
  end
end

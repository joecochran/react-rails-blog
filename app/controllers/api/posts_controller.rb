module API
  class PostsController < ApplicationController
    def index
      @posts = Post.all
    end

    def show
      @post = Post.find(params[:id])
    end

    def create
      post = Post.new(post_params)

      if post.save
        render status: :created
      else
        render json: { errors: post.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      post = Post.find(params[:id])

      post.destroy

      head :ok
    end

    def update
      post = Post.find(params[:id])

      post.update(post_params)

      render json: { id: post.id }
    end

    private

    def post_params
      params.require(:post).permit(:title, :body)
    end
  end
end

module API
  class PostsController < ApplicationController
    def index
      @posts = Post.all
    end

    def show
      @post = Post.find(params[:id])
    end

    def create
      post = Post.create(title: params[:post_title], body: params[:post_body])

      render json: { id: post.id }
    end

    def destroy
      post = Post.find(params[:id])
      
      post.destroy

      render json: { post: post }
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

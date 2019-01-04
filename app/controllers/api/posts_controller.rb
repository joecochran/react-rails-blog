module API
  class PostsController < ApplicationController
    def index
      posts = Post.all
      
      render json: { posts: posts }
    end

    def show
      post = Post.find(params[:id])

      render json: { post: post }
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
  end
end

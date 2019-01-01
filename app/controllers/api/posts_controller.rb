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
      Post.create(title: params[:post_title], body: params[:post_body])
    end

    def destroy
      post = Post.find(params[:id])
      
      post.destroy

      render json: { post: post }
    end
  end
end

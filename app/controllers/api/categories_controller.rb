module API
  class CategoriesController < ApplicationController
    def index
      @categories = Category.all
    end
  end
end

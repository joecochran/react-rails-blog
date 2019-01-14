# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create(id: 1, title: 'General')
Category.create(id: 2, title: 'Ruby')
Post.create(title: 'Hello world!', body: 'This is the first post!', category_id: 1)
Post.create(title: 'Ruby is nice', body: 'I like ruby', category_id: 2)

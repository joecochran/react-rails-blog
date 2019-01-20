web: bundle exec puma -C config/puma.rb
release: heroku pg:reset && rake db:migrate && rake db:seed

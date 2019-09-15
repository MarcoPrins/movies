ActiveRecord::Base.transaction do
  @user_1 = User.create!
  @user_2 = User.create!
  @user_3 = User.create!

  def generate_random_ratings(movie)
    Rating.create!(stars: rand(0..5), user_id: @user_1.id, movie_id: movie.id)
    Rating.create!(stars: rand(0..5), user_id: @user_2.id, movie_id: movie.id)
    Rating.create!(stars: rand(0..5), user_id: @user_3.id, movie_id: movie.id)
  end

  10.times do |index|
    movie = Movie.create!(
      title: "Star Wars #{index}",
      text: 'Example text about this movie',
      category: (index % Movie.categories.size) + 1
    )

    generate_random_ratings(movie)
  end
end

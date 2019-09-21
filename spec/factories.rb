FactoryBot.define do
  factory :movie do
    sequence(:title) { |i| "Movie #{i}" }
    text { 'Example text' }
    category { 1 }
    user
  end

  factory :rating do
    stars { 5 }
    movie
    user
  end

  factory :user do
    sequence(:email) { |i| "test#{i}@gmail.com" }
  end
end

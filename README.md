# Endpoints

## Ping

- method: GET
- url: https://luis-caballe-final-project-back-202304.onrender.com/
- body:
- response: 200 OK, { "message": "🏓 Pong }

## Login User

- method: POST
- url: https://luis-caballe-final-project-back-202304.onrender.com/user/login
- body: { "username": "admin", "password": "admin" }
- response: 200 OK, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3NzVhNjE1Y2Q5ZTMzODhjYTkiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODU4NzM4MDcsImV4cCI6MTY4NjMwNTgwN30.QLv3TLBZH2Agy_OSEgq5iA6ukeHcLguhRfW1KtT0eRg"
  }

## Get recipes

- method: GET
- url: https://luis-caballe-final-project-back-202304.onrender.com/recipes
- request: { auth: { bearer: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3NzVhNjE1Y2Q5ZTMzODhjYTkiLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2ODU4NzM4MDcsImV4cCI6MTY4NjMwNTgwN30.QLv3TLBZH2Agy_OSEgq5iA6ukeHcLguhRfW1KtT0eRg"}}}
- response: 200 OK, {
  "recipes": [
  {
  "name": "Fried egg",
  "imageUrl": "https://i.blogs.es/b9b3c5/huevos-fritos-en-abundante-aceite/1366_2000.jpg",
  "cookingTime": 10,
  "difficulty": "Easy",
  "directions": "Just fry a egg",
  "ingredients": "Oil, egg",
  "user": "646fa0775a615cd9e3388ca9",
  "id": "647102ea5a615cd9e3388caf"
  },
  {
  "name": "Boiled egg",
  "imageUrl": "https://cdn.elcocinerocasero.com/imagen/receta/1000/2021-06-17-12-54-08/como-cocer-huevos.jpeg",
  "cookingTime": 10,
  "difficulty": "Moderate",
  "directions": "Just boil a egg",
  "ingredients": "Water, egg",
  "user": "646fa0775a615cd9e3388ca9",
  "id": "647104435a615cd9e3388cb1"
  }
  ]
  }

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA3NzVhNjE1Y2Q5ZTMzODhjYTkiLCJpYXQiOjE2ODUxMjM5NTAsImV4cCI6MTY4NTU1NTk1MH0.r08grkhb0oemJ4QeVVPgIYHwm2QE8lay7nNdWv7X9_U"
  }

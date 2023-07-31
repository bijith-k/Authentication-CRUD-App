
# Auth App

This is an authentication app with crud operations.
Created user signin,signup,forgot password and crud operations like, notes adding,editing and deleting


## Installation

Install project with npm

```bash
In client side
  cd .\client\
  npm install
  npm run dev


In server side
   cd .\server\
   npm install
   npm start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In the server folder

`PORT` = 4000

`CORS_ORIGIN` = "http://localhost:5173"

`DB_CONNECTION` = "mongodb://0.0.0.0:27017/auth"

`SECRET` = jwt secret

`EMAIL`  = email id for nodemailer

`PASSWORD` = password of that email
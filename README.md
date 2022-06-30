# todoapp
Simple to do app


Heroku URL: 
You may access the app from http://todoappeytan.herokuapp.com
IMPORTANT NOTE: make sure the url starts with HTTP NOT HTTPS


Instructions:
- after cloning the repo do "npm start". Backend and frontend running on the same port, go to http://localhost:8000 to see the app. 
- You will not be able to see the app unless you're authenticated.
- .env is not gitignored on purpose

Credenitials: 
You may create your own todo app acount from the signup page or you can register with the following credentials:
- email: admin@admin.com
- password: 111111

Checklist:
- Login/Signup functionality✅
- Create todo✅
- Edit todo✅
- Re-order (drag-drop) todo✅
- Mark todo as done✅
- Save changes to the db✅
- Bootstrap UI✅
- Disable save button if there is no change in the editted todo✅

Additional features:
- deployed to heroku 
- App routes are protected, you can't access the app unless you have a valid authentication token
- Your passwords are encrypted and are not saved in the db as is. 
- App state persistence on page refresh, data does not disappear
- Responsive for phones
- Show the last update date 




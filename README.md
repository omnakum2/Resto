Installation process

1 - download the zip file from the github and extract

2 - now change directory goto client folder
    cd client  
    npm install  // install node modules
    create the .env file in client folder manually and paste it
    REACT_APP_BASE_URL=YOUR-URL
    REACT_APP_BASE_URL_NEW=YOUR-URL
    npm start  // run the react-app

3 - now change directory goto server folder
    cd server  
    npm install  // install node modules
    create the .env file in server folder manually and paste it
    JWT_SECRET=mysecretkey
    MONGODB_URI=YOUR MONGODB URL
    IMAGE_URI=http://YOUR-IP:3001/uploads/
    EMAIL_USER=YOUR_EMAIL
    EMAIL_PASS=YOUR_PASS
    npm start  // run the server

4 - Now your project can be run on the browser
    

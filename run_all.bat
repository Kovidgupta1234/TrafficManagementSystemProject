@echo off
echo Starting Traffic Management System Services...

echo Starting Java Backend (Port 8080)...
start "Java Backend" cmd /k "cd backend-java && mvn spring-boot:run"

echo Starting Python Analytics Backend (Port 8000)...
start "Python Backend" cmd /k "cd backend-python && pip install -r requirements.txt && python main.py"

echo Starting React Frontend (Port 5173)...
start "React Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo All services are starting up in separate windows!
echo Once the React Frontend is fully loaded, you can access the application at http://localhost:5173
pause

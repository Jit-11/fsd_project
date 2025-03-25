♻️ Urban Waste Recycling Platform
Project Overview
The Urban Waste Recycling platform connects sellers who want to sell waste materials with buyers looking to purchase them. The admin manages product listings and user activities.

🚀 Features
Sellers: List waste materials for sale
Buyers: Browse and purchase waste materials
Admin: Manage users, edit existing listings
Secure Authentication: User login/signup via email verification
Database: MySQL
Real-time Calling ans Mail: Order updates and product availability

Tech Stack:
Frontend: React.js, Redux, react-bootstrap
Backend: Spring Boot (Java)
Database: MySQL (waste listings, user data)
Authentication: Spring Security with JavaMailSender
Storage: via Link

⚙️ Installation Guide
Clone the Repository
Copy Command
git clone https://github.com/yourusername/urban-waste-recycling.git
cd urban-waste-recycling


Backend Setup (Spring Boot)
Navigate to the backend folder:
copy Command
cd backend
Install dependencies and start the Spring Boot application:

Copy Comnmad
mvn clean install
mvn spring-boot:run
Ensure MySQL is running and create the database.

Frontend Setup (React)
Navigate to the frontend folder:
Copy Command
cd frontend
Install dependencies:

copy
npm install
Start the React development server:

copy
npm start

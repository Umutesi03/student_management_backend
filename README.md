# 🎓 Student Management System – Backend

This is the backend of a full-stack Student Management System built with **Node.js**, **Express**, and **Drizzle ORM**, using **PostgreSQL** as the database. It provides RESTful APIs for authentication, profile management, and role-based student management functionalities.

> 📦 Deployed on: [Render] https://student-management-backend-0ef8.onrender.com/
> hoste on  The PostgreSQL database is hosted on **Neon**

---

## 🚀 Features

- JWT-based Authentication
- Role-based Access Control (`admin` and `student`)
- Student CRUD (Admins only)
- Profile Management (Students)
- PostgreSQL with Drizzle ORM
- Modular folder structure
- Environment variable support

---

## 🛠 Tech Stack

| Tool           | Description                            |
|----------------|----------------------------------------|
| Node.js        | JavaScript runtime                     |
| Express        | Backend framework                      |
| PostgreSQL     | Relational database (local & Neon)     |
| Drizzle ORM    | Type-safe SQL ORM for Node.js          |
| JWT            | Authentication and authorization       |
| Render         | Deployment platform for backend        |
| Neon           | Cloud PostgreSQL for production use    |


---

#Installation
# 1. Clone the repository
git clone https://github.com/Umutesi03/student_management_backend.git
cd student_backend

# 2. Install dependencies
npm install

# 3. Set up environment variables


# 4. Run database migrations & seed
npm run generate
npm run migrate
npm run seed

# 5. Start the server
npm run dev



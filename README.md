# Fullstack Todo List Application

This repository contains a simple fullstack todo list application built with:

- **Backend:** Node.js (v22.12.0) with Express, Sequelize ORM, PostgreSQL
- **Frontend:** Angular 18
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

---

## Features

- Create, read, update, and delete todo items
- Responsive Angular frontend
- PostgreSQL database with Sequelize ORM
- Containerized backend, frontend, and database using Docker Compose

---

![app-screenshot](https://github.com/user-attachments/assets/f8e0c927-4ee7-47ad-9740-9776d67f3504)

---

## Requiremtns

- Node.js v22.12.0+
- Angular CLI
- Docker & Docker Compose

---

## Running Locally

### Backend

1. Clone the repository:

```bash
git clone https://github.com/SiandjaRemy/fullstack-todo-app.git
cd fullstack-todo-app/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.example` and fill in your local PostgreSQL credentials:

```
   PORT=5001
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=your_db_name
   DB_HOST=localhost
   DB_PORT=5432
```

4. Start your local PostgreSQL server and ensure the database exists.

5. Run database migrations:

```bash
npm run migrate
```

6. Start the backend server:

```bash
npm run dev
```

---

### Frontend

1. Open a new terminal and navigate to the frontend folder

2. Install dependencies:

```bash
npm install
```

3. Start the Angular development server:

```bash
ng serve
```

4. The frontend will be available at http://localhost:4200

## Running with Docker

1. At the root of the repository, create a `.env` similar to the `.env.local` file.

2. Build and start all containers:

```bash
docker-compose up --build
```

3. The app will be accessible at:

   - Frontend: http://localhost:4200

   - Backend API: http://localhost:5001

4. To run database migrations inside the backend container:

```bash
docker-compose exec backend npm run migrate
```

---

### Using the Todo List Application

    - Add new todo items using the input field with a strict validation.

    - View all your tasks in the list.

    - Edit or delete existing tasks.

    - Mark tasks as completed.

    - The app syncs with the backend API and stores data in PostgreSQL.

---

### Troubleshooting

    - Make sure the database is running and environment variables are correct.

    - Verify ports 4200, 5001, and 5432 are free or change them in config.

    - Ensure you have Docker and Docker Compose installed and running.

    - Mark tasks as completed.

    - Run npm run migrate in backend container or locally before starting.

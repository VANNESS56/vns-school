---
description: Setup dan menjalankan School Laravel project
---

# School Laravel - Setup Guide

## Prerequisites
- PHP 8.2+
- Composer
- Node.js 20.19+ atau 22.12+ (untuk Vite 7)
- MySQL/SQLite

## Installation Steps

// turbo-all

### 1. Install PHP Dependencies
```bash
composer install
```

### 2. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Configure Database
Edit `.env` file and set database credentials:
```
DB_CONNECTION=sqlite
# atau untuk MySQL:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=school_laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

### 4. Run Migrations & Seeder
```bash
php artisan migrate:fresh --seed
```

### 5. Install Node Dependencies
```bash
npm install
```

### 6. Start Development Servers
Terminal 1 - Laravel Server:
```bash
php artisan serve
```

Terminal 2 - Vite Dev Server:
```bash
npm run dev
```

## Default Login Credentials
- **Email**: instructor@eduprime.id
- **Password**: password

## Available Routes
- **Landing Page**: http://localhost:8000/
- **Login**: http://localhost:8000/login
- **Instructor Dashboard**: http://localhost:8000/instructor/dashboard
- **Classes**: http://localhost:8000/instructor/classes
- **Students**: http://localhost:8000/instructor/students
- **Schedule**: http://localhost:8000/instructor/schedule

## Tech Stack
- Laravel 11 (Backend)
- React.js (Frontend)
- Inertia.js (SPA Bridge)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Lucide React (Icons)

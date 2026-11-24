# Dorm Assistant

A web application for convenient dormitory management. It helps students and dormitory staff manage maintenance requests, announcements, penalty points, and notifications in one place.

## User roles

| Role | Description |
| --- | --- |
| **ADMIN** | System administrator who creates dormitories and manages the system. |
| **STUDENT** | Dormitory resident who submits maintenance requests, views announcements, and receives notifications. |
| **COMMANDANT** | Dormitory manager who assigns work, publishes announcements, and issues penalties. |
| **STAFF** | Maintenance staff who handle requests, update their status, and leave comments. |
| **OPERATION_DETACHMENT** | Response team that handles critical and urgent requests. |

A user can have multiple roles at the same time.

## Features

### Dormitories and rooms
- Manage dormitories, including their number, address, and capacity.
- Manage rooms by floor and dormitory.
- Track students living in each room.

### Maintenance requests
- Categories: plumbing, electrical, furniture, heating, and other.
- Priorities: low, medium, high, and critical.
- Statuses: pending, in progress, resolved, and cancelled.
- Assign staff, attach photos or files, and add comments.

### Announcements
- Publish announcements for an entire dormitory or a specific floor.

### Penalties and notifications
- Assign penalty points to students.
- Notify users about request status updates, new announcements, laundry reminders, and penalties.

## Tech stack

| Area | Technologies |
| --- | --- |
| **Frontend** | <img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" width="18" height="18"> Next.js · <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" width="18" height="18"> React · <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" width="18" height="18"> Tailwind CSS · <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="18" height="18"> TypeScript |
| **Backend** | <img src="https://cdn.simpleicons.org/nestjs/E0234E" alt="NestJS" width="18" height="18"> NestJS |
| **Database** | <img src="https://cdn.simpleicons.org/prisma/2D3748" alt="Prisma" width="18" height="18"> Prisma · <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" width="18" height="18"> PostgreSQL |
| **Tools** | Swagger |

## Run locally

**Requirements:** Node.js and a PostgreSQL database.

1. Clone the repository and configure the backend database connection. In `server/`, create a `.env` file and set `DIRECT_URL` to your PostgreSQL connection string (required by Prisma).
2. In one terminal, install dependencies and start the backend:

   ```bash
   cd server
   npm install
   npx prisma migrate deploy
   npm run start:dev
   ```

   The API runs at `http://localhost:4000`; Swagger docs are at `http://localhost:4000/docs`.

3. In a second terminal, install dependencies and start the frontend:

   ```bash
   cd client
   npm install
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

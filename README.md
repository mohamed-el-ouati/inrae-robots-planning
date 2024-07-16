
# Web application for robots task planning


This web application allows users to plan and manage tasks for autonomous agricultural robots. Additionally, it supports CRUD operations (Create, Read, Update, Delete) for robots, equipment, and activities. It also handles geodata, including plots and robot paths. The goal is to enhance robot performance in agriculture, reduce human labor, and optimize resources usage.
## Features

- Task planning for robots
- Task calendar consultation
- Map visualization (plots and trajectories)
- Robots management
- Equipment management
- Polts management
- Trajectories management
- Agricultural activities management


## Tech Stack

**Client:** Nextjs (React), Zustand (state management), Mapbox, TailwindCSS and Shadcn/ui (UI component library)

**Server:** Nodejs, Express

**Database:** PostgreSQL
 

##  Project Structure

```
├── client                   # Next.js frontend
│   ├── app                  # App Router directory
│   │   ├── (activity)       # Components/pages related to Activity
│   │   ├── (equipment)      # Components/pages related to Equipment
│   │   ├── (itk)            # Components/pages related to ITK 
│   │   ├── (plot)           # Components/pages related to Plot
│   │   ├── (robots)         # Components/pages related to Robots
│   │   ├── (tasks)          # Components/pages related to Tasks management
│   │   ├── (trajectory)     # Components/pages related to Trajectories
│   │   ├── calendar         # Calendar view components/pages
│   │   ├── favicon.ico      # Favicon for the web application
│   │   ├── globals.css      # Global styles for the application
│   │   ├── layout.tsx       # Root layout component for the application
│   │   └── page.tsx         # Main page component for the application
│   ├── components           # Reusable UI components (Pages Router)
│   ├── lib                  # Helper functions/utilities
│   ├── public               # Static assets (images, etc.)
│   ├── Dockerfile           # Docker configuration
│   └── ...                  # Other project files (e.g., .gitignore, package-lock.json) 
├── server                   # Node.js backend
│   ├── controllers          # API endpoint logic (request handling)
│   ├── routes               # API routing definitions
│   ├── services    
│   │   └── db.js            # Database configuration
│   ├── utils                # Utility functions (helpers)
│   ├── Dockerfile           # Docker configuration 
│   ├── server.js            # Main server entry point
│   └── ...                  # Additional files (e.g., .gitignore, package-lock.json) 
└── docker-compose.yml       # Defines and configures Docker services for the project        
```

## Installation & Setup

**1. Clone the Repository:** 

```bash
git clone https://github.com/ayoubhatmi/inrae-robots-planning.git
cd inrae-robots-planning
```

**2. Setup Environment Variables:** 

Create a .env file in both the client and server directories, and fill in the values according to your environment.

**Backend (.env in server)**

    PG_HOST=
    PG_PORT=
    PG_USER=
    PG_PASSWORD=
    PG_DATABASE=

**Frontend (.env in client)**

    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=

## Running the Application
### Using Docker

**1. Build and Start the Services:** 

```bash
docker-compose up --build
```

The application should now be accessible at http://localhost:3000.

### Without Docker
 **1. Backend Setup:** 

```bash
cd server
npm install
npm run dev
```

 **2. Frontend Setup:** 

```bash
cd client
npm install
npm run dev
```

The application should now be accessible at http://localhost:3000.

## Additional Notes
- Ensure Docker and Docker Compose are installed on your machine.
- The environment variables need to be set correctly in the `.env` files before running the application.
- **Stopping the Application:** Use ``` docker-compose down ``` to stop and remove the containers.

## Database Relational Schema

Below is the database relational schema diagram for the application. It outlines the relationships between the various tables used to manage robots, equipment, activities, plots, and trajectories.

![alt text](database-schema.png)

# Deal Management System

Frontend application for managing deals and hotel of them. Consumes a backend Web API service to perform CRUD operations. The frontend is built using **Angular**, and the backend API is build using **ASP.NET Core Web API**.

## 🚀 Features

- View deals
- Create, update and delete deals
- View hotels of the deals
- Create, update and delete deals
- video support
- Responsive layout using Bootstrap

## 🛠️ Technologies Used

- Angular
- Bootstrap

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v22)
- [Angular CLI](https://angular.io/cli) (v19)
- [Git](https://git-scm.com/)
- A running instance of the **Web API** backend

## 📥 Clone and Setup

```bash
# Clone the repository
git clone https://github.com/virokalu/DealManagement.Client.git

# Navigate into the project directory
cd deal-management-frontend

# Install dependencies
npm install
```

## ▶️ Run the Application

```bash
ng serve
```

## 🚀 Navigate
[http://localhost:4200](http://localhost:4200)

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── deal/                # Deal components and services
│   │   ├── create/
│   │   ├── edit/
│   │   ├── index/
│   │   └── view/
│   ├── hotel/               # Hotel components and services
│   │   ├── create/
│   │   └── edit/
│   └── shared/              # Shared components
├── index.html
├── main.ts
└── style.css
```




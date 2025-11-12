# 🌍 Travel Planner App

A comprehensive, full-stack travel planning application built with Next.js 15, enabling users to create, manage, and organize their dream trips with an intuitive interface and powerful features.

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?logo=postgresql)
![NextAuth](https://img.shields.io/badge/NextAuth.js-v5-purple)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [GitHub OAuth Setup](#-github-oauth-setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Components](#-components)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication
- **GitHub OAuth Integration** - Secure social login via NextAuth.js v5
- **Session Management** - Persistent user sessions with JWT
- **Protected Routes** - Server-side authentication checks
- **User Profiles** - Automatic profile creation from GitHub data

### 📅 Trip Management
- **Create Trips** - Plan multiple trips with detailed information
- **Trip Dashboard** - View all your trips in one place
- **Date Management** - Set start and end dates for trips
- **Trip Details** - Add descriptions and notes

### 📍 Location & Itinerary
- **Location Tracking** - Add multiple destinations per trip
- **Activity Planning** - Organize daily activities and events
- **Location Notes** - Add detailed information for each location
- **Date-based Organization** - Timeline view of your itinerary

### 🎨 User Interface
- **Modern Design** - Clean, responsive interface with Tailwind CSS v4
- **Dark Mode Support** - Automatic dark/light theme switching
- **Mobile Responsive** - Optimized for all device sizes
- **Intuitive Navigation** - Easy-to-use navigation bar

### ⚡ Performance
- **Server Components** - Faster page loads with React Server Components
- **Edge Runtime** - Low-latency responses
- **Auto-scaling Database** - Neon's serverless PostgreSQL
- **Optimized Images** - Next.js Image optimization

### 🔒 Security
- **Type-safe** - End-to-end TypeScript coverage
- **SQL Injection Protection** - Prisma ORM parameterized queries
- **CSRF Protection** - Built-in NextAuth.js security
- **Environment Variables** - Secure credential management

---

## 🚀 Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.1.6 | React framework with App Router |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | v4 | Utility-first CSS framework |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Prisma** | 6.19.0 | Next-generation ORM |
| **NextAuth.js** | v5 (beta) | Authentication library |
| **PostgreSQL** | Latest | Relational database |
| **Neon** | Latest | Serverless Postgres platform |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Git** | Version control |
| **npm/yarn/pnpm** | Package management |

### Key Libraries

```json
{
  "next": "15.1.6",
  "react": "^19.0.0",
  "next-auth": "^5.0.0-beta",
  "@prisma/client": "^6.19.0",
  "@auth/prisma-adapter": "^2.7.4",
  "tailwindcss": "^4.0.0"
}

# Using HTTPS
git clone https://github.com/YOUR_USERNAME/travel-planner.git

# Or using SSH
git clone git@github.com:YOUR_USERNAME/travel-planner.git

# Navigate to project directory
cd travel-planner

# ==================================
# DATABASE CONFIGURATION
# ==================================
# Neon PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require&connect_timeout=10
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require&connect_timeout=10"

# ==================================
# NEXTAUTH CONFIGURATION
# ==================================
# Secret key for JWT encryption (generate with: npx auth secret)
AUTH_SECRET="your-generated-secret-here"

# Base URL for your application
NEXTAUTH_URL="http://localhost:3000"

# ==================================
# GITHUB OAUTH CONFIGURATION
# ==================================
# GitHub OAuth App Client ID
AUTH_GITHUB_ID="your-github-client-id"

# GitHub OAuth App Client Secret
AUTH_GITHUB_SECRET="your-github-client-secret"


generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// AUTHENTICATION MODELS (NextAuth.js)
// ==========================================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  trips         Trip[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ==========================================
// APPLICATION MODELS
// ==========================================

model Trip {
  id          String     @id @default(cuid())
  name        String
  description String?    @db.Text
  startDate   DateTime
  endDate     DateTime
  imageUrl    String?
  userId      String
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  locations   Location[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([userId])
  @@index([startDate])
}

model Location {
  id          String   @id @default(cuid())
  name        String
  description String?  @db.Text
  address     String?
  latitude    Float?
  longitude   Float?
  date        DateTime
  imageUrl    String?
  tripId      String
  trip        Trip     @relation(fields: [tripId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([tripId])
  @@index([date])
}

┌─────────────────┐
│      User       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ email (unique)  │
│ emailVerified   │
│ image           │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐       ┌─────────────────┐
│      Trip       │       │    Account      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──┐   │ id (PK)         │
│ name            │   │   │ userId (FK)     │
│ description     │   │   │ provider        │
│ startDate       │   │   │ type            │
│ endDate         │   │   │ access_token    │
│ imageUrl        │   │   └─────────────────┘
│ userId (FK)     │   │
│ createdAt       │   │   ┌─────────────────┐
│ updatedAt       │   │   │    Session      │
└────────┬────────┘   │   ├─────────────────┤
         │            └───┤ id (PK)         │
         │ 1:N            │ sessionToken    │
         │                │ userId (FK)     │
┌────────▼────────┐       │ expires         │
│    Location     │       └─────────────────┘
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ address         │
│ latitude        │
│ longitude       │
│ date            │
│ imageUrl        │
│ tripId (FK)     │
│ createdAt       │
│ updatedAt       │
└─────────────────┘






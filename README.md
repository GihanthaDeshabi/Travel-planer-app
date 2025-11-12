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
📋 Prerequisites
Required Software
Node.js: Version 18.17 or later

Bash

node --version  # Should output v18.17.0 or higher
Package Manager: npm (included with Node.js), yarn, or pnpm

Bash

npm --version
Git: For version control

Bash

git --version
Required Accounts
GitHub Account - For OAuth authentication

Sign up: https://github.com/signup
Neon Database Account - For PostgreSQL hosting

Sign up: https://neon.tech (Free tier available)
System Requirements
Operating System: Windows 10+, macOS 10.15+, or Linux
RAM: Minimum 4GB (8GB recommended)
Storage: At least 500MB free space
Internet: Required for installation and database
🛠️ Installation
Step 1: Clone the Repository
Bash

# Clone via HTTPS
git clone https://github.com/YOUR_USERNAME/travel-planner.git

# Or clone via SSH
git clone git@github.com:YOUR_USERNAME/travel-planner.git

# Navigate to directory
cd travel-planner
Step 2: Install Dependencies
Choose your preferred package manager:

Bash

# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

🔐 Environment Setup
Step 1: Create .env File
Bash

# Windows PowerShell
New-Item -Path .env -ItemType File

# macOS/Linux/Git Bash
touch .env
Step 2: Environment Variables Template
Create .env in the root directory with the following content:

env

# ========================================
# DATABASE CONFIGURATION
# ========================================
# Get this from Neon Console > Connection Details > Prisma
DATABASE_URL="postgresql://user:password@host.neon.tech/database?sslmode=require&connect_timeout=10"

# ========================================
# AUTHENTICATION CONFIGURATION
# ========================================
# Generate with: npx auth secret
AUTH_SECRET="your-32-character-random-secret-here"

# Your app URL (development)
NEXTAUTH_URL="http://localhost:3000"

# ========================================
# GITHUB OAUTH CONFIGURATION
# ========================================
# Get from GitHub > Settings > Developer Settings > OAuth Apps
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
Step 3: Generate AUTH_SECRET
Choose one method:

Bash

# Method 1: Using npx (recommended)
npx auth secret

# Method 2: Using OpenSSL
openssl rand -base64 32

# Method 3: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Method 4: Using PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
Copy the output and paste it as the value for AUTH_SECRET in .env.

Environment Variables Explained
Variable	Required	Description	Example
DATABASE_URL	Yes	PostgreSQL connection string	postgresql://user:pass@host/db
AUTH_SECRET	Yes	Secret key for JWT encryption	Random 32+ char string
NEXTAUTH_URL	Yes	Application base URL	http://localhost:3000
AUTH_GITHUB_ID	Yes	GitHub OAuth Client ID	Iv1.abc123...
AUTH_GITHUB_SECRET	Yes	GitHub OAuth Client Secret	ghp_xyz789...

🔑 GitHub OAuth Setup
Step 1: Create GitHub OAuth Application
Go to https://github.com/settings/developers
Click "OAuth Apps" in left sidebar
Click "New OAuth App"
Step 2: Configure OAuth App
Fill in the registration form:

Field	Development Value	Production Value
Application name	Travel Planner (Dev)	Travel Planner
Homepage URL	http://localhost:3000	https://yourdomain.com
Application description	Travel planning application	Travel planning application
Authorization callback URL	http://localhost:3000/api/auth/callback/github	https://yourdomain.com/api/auth/callback/github
Important: The callback URL must be exact. No trailing slashes.

Step 3: Get OAuth Credentials
After creating the app:

Copy the Client ID - starts with Iv1.
Click "Generate a new client secret"
Copy the Client Secret immediately (shown only once)
Step 4: Update .env File
env

AUTH_GITHUB_ID="Iv1.your-client-id-here"
AUTH_GITHUB_SECRET="ghp_your-client-secret-here"
Step 5: Test OAuth Flow
Start development server:

Bash

npm run dev
Open http://localhost:3000

Click "Sign in with GitHub"

Authorize the application

You should be redirected back and logged in

Troubleshooting OAuth
"Redirect URI mismatch" error
Solution: Ensure callback URL in GitHub matches exactly:

text

http://localhost:3000/api/auth/callback/github
Check for typos
No trailing slash
HTTP (not HTTPS) for local development
"Invalid client credentials" error
Solution:

Verify AUTH_GITHUB_ID and AUTH_GITHUB_SECRET in .env
Check for extra spaces or quotes
Regenerate client secret if needed

📁 Project Structure
text

travel-planner/
│
├── 📂 app/                                # Next.js 15 App Router
│   ├── 📂 api/                            # API Routes
│   │   └── 📂 auth/
│   │       └── 📂 [...nextauth]/
│   │           └── route.ts               # NextAuth.js API handler
│   │
│   ├── 📂 generated/                      # Auto-generated files
│   │   └── 📂 prisma/                     # Prisma Client
│   │       ├── index.d.ts
│   │       └── index.js
│   │
│   ├── 📂 trips/                          # Trip pages (future)
│   │   ├── page.tsx                       # All trips page
│   │   └── 📂 [id]/
│   │       └── page.tsx                   # Single trip page
│   │
│   ├── layout.tsx                         # Root layout with Navbar
│   ├── page.tsx                           # Home page
│   ├── globals.css                        # Global styles + Tailwind
│   ├── loading.tsx                        # Loading UI
│   ├── error.tsx                          # Error UI
│   └── not-found.tsx                      # 404 page
│
├── 📂 components/                         # Reusable React components
│   ├── Navbar.tsx                         # Navigation component
│   ├── TripCard.tsx                       # Trip display card
│   └── LocationCard.tsx                   # Location display card
│
├── 📂 lib/                                # Utility libraries
│   ├── prisma.ts                          # Prisma client singleton
│   ├── utils.ts                           # Helper functions
│   └── auth.ts                            # Auth utilities
│
├── 📂 prisma/                             # Prisma ORM
│   ├── schema.prisma                      # Database schema
│   └── migrations/                        # Migration files (if using)
│
├── 📂 public/                             # Static assets
│   ├── images/                            # Image files
│   ├── favicon.ico                        # App icon
│   └── robots.txt                         # SEO
│
├── 📂 types/                              # TypeScript type definitions
│   └── index.ts                           # Shared types
│
├── 📄 auth.ts                             # NextAuth.js configuration
├── 📄 middleware.ts                       # Next.js middleware (optional)
│
├── 📄 .env                                # Environment variables (gitignored)
├── 📄 .env.example                        # Environment template
├── 📄 .gitignore                          # Git ignore rules
├── 📄 .eslintrc.json                      # ESLint configuration
├── 📄 .prettierrc                         # Prettier configuration
│
├── 📄 next.config.ts                      # Next.js configuration
├── 📄 tailwind.config.ts                  # Tailwind CSS config
├── 📄 postcss.config.mjs                  # PostCSS config
├── 📄 tsconfig.json                       # TypeScript config
│
├── 📄 package.json                        # Dependencies & scripts
├── 📄 package-lock.json                   # Lock file
│
└── 📄 README.md                           # This file

🗃️ Database Schema
Complete Prisma Schema
prisma

// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../app/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// NEXTAUTH.JS REQUIRED MODELS
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
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
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

  @@index([email])
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
  @@index([createdAt])
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
Entity Relationship Diagram
text

┌─────────────────────┐
│        User         │
├─────────────────────┤
│ id (PK)             │◄──┐
│ name                │   │
│ email (unique)      │   │
│ emailVerified       │   │
│ image               │   │
│ createdAt           │   │
│ updatedAt           │   │
└──────┬──────────────┘   │
       │                  │
       │ 1:N              │
       │                  │
┌──────▼──────────────┐   │
│       Trip          │   │
├─────────────────────┤   │
│ id (PK)             │   │
│ name                │   │
│ description         │   │
│ startDate           │   │
│ endDate             │   │
│ imageUrl            │   │
│ userId (FK)         ├───┘
│ createdAt           │
│ updatedAt           │
└──────┬──────────────┘
       │
       │ 1:N
       │
┌──────▼──────────────┐       ┌──────────────────┐
│     Location        │       │     Account      │
├─────────────────────┤       ├──────────────────┤
│ id (PK)             │       │ id (PK)          │
│ name                │       │ userId (FK)      │
│ description         │       │ provider         │
│ address             │       │ providerAccountId│
│ latitude            │       │ access_token     │
│ longitude           │       │ refresh_token    │
│ date                │       └──────────────────┘
│ imageUrl            │
│ tripId (FK)         │       ┌──────────────────┐
│ createdAt           │       │     Session      │
│ updatedAt           │       ├──────────────────┤
└─────────────────────┘       │ id (PK)          │
                              │ sessionToken     │
                              │ userId (FK)      │
                              │ expires          │
                              └──────────────────┘
Relationships
Parent Model	Child Model	Relationship	Delete Behavior
User	Account	One-to-Many	Cascade
User	Session	One-to-Many	Cascade
User	Trip	One-to-Many	Cascade
Trip	Location	One-to-Many	Cascade
Field Types Reference
Prisma Type	PostgreSQL Type	TypeScript Type	Description
String	TEXT	string	Variable text
String?	TEXT NULL	string | null	Optional text
String @db.Text	TEXT	string	Long text
Int	INTEGER	number	32-bit integer
Float	DOUBLE PRECISION	number	Decimal number
Boolean	BOOLEAN	boolean	true/false
DateTime	TIMESTAMP(3)	Date	Date with time
@id	PRIMARY KEY	-	Primary key
@unique	UNIQUE	-	Unique constraint
@default(cuid())	-	-	Auto-generate ID
@default(now())	DEFAULT NOW()	-	Current timestamp
@updatedAt	-	-	Auto-update on change
Database Migrations
Create Migration
Bash

npx prisma migrate dev --name init
Apply Migrations (Production)
Bash

npx prisma migrate deploy
Reset Database
Bash

# WARNING: Deletes all data!
npx prisma migrate reset
📡 API Documentation
Authentication Routes
POST /api/auth/signin
Initiate GitHub OAuth sign-in flow.

Usage:

TypeScript

import { signIn } from "@/auth";

// In Server Component
<form action={async () => {
  "use server";
  await signIn("github");
}}>
  <button type="submit">Sign in</button>
</form>

// In Client Component
import { signIn } from "next-auth/react";

<button onClick={() => signIn("github")}>
  Sign in with GitHub
</button>
Flow:

User clicks sign in
Redirects to GitHub OAuth
User authorizes
Redirects to /api/auth/callback/github
Session created
Redirects to homepage









# Qitchen - Premium Sushi Restaurant

A modern, high-end restaurant website featuring a dynamic menu, slot-based reservation system, opening hours management, and a blog platform. Built with a focus on premium aesthetics and seamless user experience.

**Live Demo:** [https://woxro-restaurant-task-vercel.vercel.app/](https://woxro-restaurant-task-vercel.vercel.app/)

##  Features

- **Dynamic Menu:** Categorized menu items (Sushi, Drinks, Desserts) fetched from the backend.
- **Reservation System:** Real-time slot-based booking with automated availability checking.
- **Opening Hours:** Managed opened/closed times that dynamically reflect on the frontend.
- **Blog System:** A platform for restaurant news and culinary stories.
- **Admin Dashboard:** A protected portal for managing reservations, menu items, blog posts, and hours.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views with premium glassmorphism and animations.
- **Premium Aesthetics:** Custom "Forum" and "Cormorant Garamond" typography, dark-themed UI, and gold accents.

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks
- **Icons/UI:** Custom SVG icons and premium CSS animations

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt for password hashing
- **File Uploads:** Multer (for blog/menu images)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd woxro-restaurant-task
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
   - Seed the database (optional):
     ```bash
     node seed.js
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env.local` file in the `frontend` directory:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

## Project Structure

```text
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── uploads/        # Publicly accessible images
│   ├── server.js       # Express server entry point
│   └── seed.js         # Database seeding script
├── frontend/
│   ├── src/
│   │   ├── app/        # Next.js App Router (blog, admin pages)
│   │   ├── components/ # Reusable UI components (Hero, Menu, etc.)
│   │   └── assets/     # Static images and icons
│   └── tailwind.config.ts # Custom theme configuration
```

## Admin Access

The admin dashboard is accessible at `/admin`.
- **Username:** `admin`
- **Password:** `admin123`

---
Built with ❤️ by M Mohammad Anas

Productr CO - MERN Stack Inventory Dashboard
A secure, full-stack inventory management application that allows users to manage products with private data isolation and protected navigation.

- Tech Stack:-
Frontend: React.js, Tailwind CSS, React Router DOM, Axios.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (NoSQL).

Authentication: JSON Web Tokens (JWT) & BcryptJS.

- Challenges & Bug Fixes:-
1. Environment Variable Injection Failure
The Problem: The backend process was failing to connect to MongoDB because it couldn't read the MONGO_URI from the .env file, despite the file being present.

The Bug: Standard dotenv.config() calls were failing due to relative path issues when running the app through concurrently from the root directory.

The Resolution: Refactored server.js to use an absolute path with path.resolve(__dirname, '.env'), ensuring the environment variables were injected correctly regardless of the execution context.

2. Cross-User Data Leakage
The Problem: When a new user signed up, they could see the products created by other users.

The Bug: The database query Product.find() was fetching all documents without filtering by the owner's ID.

The Resolution: Updated the Mongoose Schema to include a user reference and modified the controller to filter results using Product.find({ user: req.user.id }).

3. Unauthorized Path Access (Route Guarding)
The Problem: Users could bypass the login screen by manually typing http://localhost:5173/products into the browser address bar.

The Bug: The frontend lacked a navigation guard to check for a valid session token before rendering protected components.

The Resolution: Built a ProtectedRoute higher-order component that checks localStorage for a JWT and redirects unauthorized guests back to the /login page.

4. API Endpoint Mismatch (404 Errors)
The Problem: The "Edit," "Unpublish," and "Delete" buttons were returning 404 Not Found errors.

The Bug: The backend router was missing the PUT method, and the frontend was calling the root path / instead of the specific /api/products sub-route.

The Resolution: Implemented router.put('/:id') and router.delete('/:id') in the backend and synchronized the frontend Axios calls to match the RESTful architecture.

- Key Learnings
Data Isolation: Learned how to implement strict user-level privacy in a NoSQL database.

Session Management: Mastered the lifecycle of a JWT, from generation during login to clearing it from localStorage during logout.

Debugging: Improved my ability to trace errors across the network tab and server logs to find the root cause of "Operation Failed" messages.
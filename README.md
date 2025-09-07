2nd Brain Frontend
Backend Repo
Link to backend API repo: [Insert your backend repo URL here]

Features & Screenshots
Landing Page
(Screenshot)

Login & Authentication (JWT)

Secure login/signup flow using JWT tokens.
(Screenshot)

Fetched Content Display

Shows paginated, tag-filtered, and semantic search results.
(Screenshot)

Add Content Modal

Add YouTube/video links with tags via modal form.
(Screenshot)

Sharing Your Brain

Toggle to share; generates shareable link.
(Screenshot)

Semantic Search Output

Query results ranked by embedding similarity.
(Screenshot)

Known Limitations
Frontend Issues

Components need optimization for performance and scalability.

UI responsiveness and accessibility can be enhanced.

Backend Issues

No rate limiting, causing possible overload risk.

JWT token stored in localStorage (vulnerable to XSS), recommend httpOnly cookie usage.

General

Limited error handling and user feedback across flows.

Share feature basic with scope for privacy improvements.

Setup Instructions
Clone the repo:
git clone <repo-url>
cd frontend

Install dependencies:
npm install or yarn install

Configure env variables (e.g., backend URL).

Run frontend:
npm run dev or yarn dev

Access at http://localhost:5173

Note: Launch backend server for API support.
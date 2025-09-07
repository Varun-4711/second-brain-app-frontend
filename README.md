```markdown
# 2nd Brain Frontend

## Backend Repo
The backend API repository can be found here:  
[https://github.com/Varun-4711/second-brain-app-advanced]

---

## Features & Screenshots

- **Landing Page**  
  ![Landing Page Screenshot](path/to/landing-page-image.png)

- **Login & Authentication (JWT)**  
  Secure login and signup flow using JWT tokens.  
  ![Login Screenshot](path/to/login-image.png)

- **Fetched Content Display**  
  Paginated, tag-filtered, and semantic search result display.  
  ![Content Display Screenshot](path/to/content-display-image.png)

- **Add Content Modal**  
  Modal form for adding YouTube or video links with tags.  
  ![Add Content Screenshot](path/to/add-content-image.png)

- **Sharing Your Brain**  
  Toggle sharing on/off with a generated sharing link.  
  ![Sharing Screenshot](path/to/sharing-image.png)

- **Semantic Search Output**  
  Query results based on vector embeddings similarity.  
  ![Semantic Search Screenshot](path/to/search-output-image.png)

---

## Known Limitations

### Frontend Issues
- Component optimizations needed for better performance and scalability.
- UI responsiveness and accessibility can be improved.

### Backend Issues
- No rate limiting implemented; potential risk of overloading APIs.
- JWT tokens stored in localStorage, which can expose to XSS attacks; using httpOnly cookies is recommended for better security.

### General
- Error handling and user feedback need enhancement across features.
- The share feature is basic and could benefit from improved privacy and control.

---

## Setup Instructions

1. Clone the frontend repository:  
   ```
   git clone <your-frontend-repo-url>
   cd frontend
   ```

2. Install dependencies:  
   ```
   npm install
   ```  
   or  
   ```
   yarn install
   ```

3. Configure environment variables as needed (e.g., backend API URL).

4. Start the development server:  
   ```
   npm run dev
   ```  
   or  
   ```
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

**Note:** Make sure the backend server is running and accessible.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request or open issues for suggestions and bugs.

---

This README provides a thorough overview of your project, visually illustrates key flows, highlights limitations, and guides users and developers on setup and contributions.

If you want help generating the actual README file with embedded screenshots or more details, feel free to ask!
```

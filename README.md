# Free Space : 2nd Brain App Frontend
Second Brain is a smart personal knowledge website that helps users save, organize, and semantically search diverse online content like YouTube videos, tweets, documents, and links. Built with a backend-first approach, this app leverages AI-powered embeddings and vector similarity search for context-aware discovery beyond simple keyword matches. Find the backend repo below 👇🏼.

<img width="1919" height="926" alt="image_2025-09-07_11-12-47" src="https://github.com/user-attachments/assets/6f18bde7-1cee-4d02-b2af-2e7aeb2cdb60" />


## Backend Repo
The backend API repository can be found here:  
[https://github.com/Varun-4711/second-brain-app-advanced]

---

## Features & Screenshots

- **Landing Page**  
  <img width="1919" height="919" alt="image_2025-09-07_11-15-05" src="https://github.com/user-attachments/assets/b1a95fd5-6f72-41f6-b654-39204f091e89" />


- **Login & Authentication (JWT)**  
  Secure login and signup flow using JWT tokens.  
  <img width="1919" height="938" alt="image_2025-09-07_11-18-16" src="https://github.com/user-attachments/assets/4e94fda0-57c2-4508-afb9-226848283ce1" />


- **Fetched Content Display**  
  Paginated, tag-filtered, and semantic search result display.\
  The title provided by the user for the added content is displayed as clickable text. This title acts as a hyperlink (anchor tag) that points to the actual YouTube video URL or content link. When users click the title, they are redirected to the original video or link in a new browser tab, allowing easy access to the source directly from the app interface.
  <img width="1919" height="926" alt="image_2025-09-07_11-12-47" src="https://github.com/user-attachments/assets/ac18379d-e4f6-4ec8-87bf-fc380d8037bf" />


- **Add Content Modal**  
  Modal form for adding YouTube or video links with tags.  
  <img width="1919" height="931" alt="image_2025-09-07_11-13-40" src="https://github.com/user-attachments/assets/bc67155b-30ef-4e89-b1a6-da4fa638f188" />


- **Sharing Your Brain**  
  Toggle sharing on/off with a generated sharing link.  
  <img width="1918" height="934" alt="image_2025-09-07_11-14-07" src="https://github.com/user-attachments/assets/c84605b8-90c1-4a3c-9259-738aa0f93a52" />

- **Accesing other's brain through shareable link**  
  Accesing (Read-Only) Other person's brain through shareable link.
  <img width="1908" height="926" alt="image_2025-09-07_11-14-38" src="https://github.com/user-attachments/assets/f10cb823-ecc2-4eeb-9c53-04276c84b6c9" />


- **Semantic Search Output**  
  Query results based on vector embeddings similarity.  
  <img width="1919" height="596" alt="image_2025-09-07_11-19-33" src="https://github.com/user-attachments/assets/c7a2dc3c-eeb3-4bf4-b907-755a9a6264d0" />

- **Tag based Filtering**  
  Filter links based on the tag given to them.
  <img width="1919" height="592" alt="image_2025-09-07_12-47-57" src="https://github.com/user-attachments/assets/d48a4912-51c6-4cf0-8aa3-ef3e09fb935a" />

---

## Known Limitations

### Frontend Issues
- Component optimizations needed for better performance and scalability.
- UI responsiveness and accessibility can be improved.

### Backend Issues
- No rate limiting implemented; potential risk of overloading APIs.
- JWT tokens stored in localStorage, which can expose to XSS attacks; using httpOnly cookies is recommended for better security.
- Query search or filter based on tag not implemented while viewing a shareable link (brain) of other person as of now.

  
### General
- Error handling and user feedback need enhancement across features.
- The share feature is basic and could benefit from improved privacy and control.
- Used 384-dimensional embeddings for performance and efficiency, though this offers less semantic detail than higher-dimensional (e.g., 1536) vectors.
- Chose a lightweight embedding model for faster responses and lower resource use, at the cost of some accuracy for complex queries.
- Only titles (youtube + tutle given by user) are embedded - adding youtube videors descriptions and adopting more robust models could further improve search quality, but were omitted for efficiency and input size concerns.

---

## Setup Instructions

1. Clone the frontend repository:  
   ```
   git clone https://github.com/Varun-4711/second-brain-app-frontend
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


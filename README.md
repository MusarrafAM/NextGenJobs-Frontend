# 🚀 NextGen Jobs – Modern Job Portal

🔗 **Deployed Site:** [nextgen-jobs.vercel.app](https://nextgen-jobs.vercel.app)  
🎥 **User Demo:** [Watch Video](https://youtu.be/1PnHwARC0wQ)  
🎥 **Admin Demo:** [Watch Admin Portal](https://youtu.be/IxuOFny5CgM)  
📦 **Backend Repo:** [NextGenJobs-Backend](https://github.com/MusarrafAM/NextGenJobs-Backend)

---

## 📌 Project Overview

**NextGen Jobs** is a full-stack web application built to improve the way job seekers connect with job posters. It focuses on **secure**, **authentic**, and **insightful** hiring experiences. Unlike typical portals, this app enforces **admin approvals**, sends **email alerts**, and offers **visual analytics**.

---

## 🧠 Why These Technologies?

| Stack Part | Tech Used | Reason |
|------------|-----------|--------|
| Frontend | React.js, Redux, Tailwind CSS, Ant Design | For fast rendering, state management, responsive UI, and clean components |
| Backend | Node.js, Express.js | Lightweight, scalable RESTful API |
| Database | MongoDB | Flexible NoSQL DB for unstructured job data |
| Auth & Email | JWT, Bcrypt, Nodemailer | Secure authentication and email notifications |
| File Upload | Multer | To allow resume uploads |
| Charts | Chart.js | Visual insights for admin and job posters |
| Deployment | Vercel (Frontend), Render (Backend) | Simplified CI/CD with automatic deployments |

---

## 💼 Key Features

### 🔹 Job Seekers
- 🔍 Search jobs with **filters**: name, experience, salary  
- 📝 Apply using **in-app resume** or **uploaded files**  
- 📩 Get **email updates** (selected/rejected)  
- 📊 See **application insights**

### 🔹 Job Posters
- 🗂️ Post, edit, disable jobs  
- 📥 View & manage applicants  
- ✅ Accept or reject applications (email triggers)  
- 📈 Track job metrics via **charts**

### 🔹 Admin
- 🛡️ Approve or reject job listings  
- 👤 Manage user accounts  
- 📊 View platform-wide **analytics**  
- 🚫 Filter out fake job posts

---

## ✅ Best Practices Followed

- 🔒 **Secure authentication** using JWT and Bcrypt  
- 🔁 **Reusable components** with Ant Design  
- 📦 **Modular backend structure**  
- 🌐 **Environment-based configuration**  
- 📄 **Multer + file validation** for secure resume uploads  
- 📧 **Email notifications** for transparency

---

## 🧩 Algorithms & Patterns Used

- **Authentication Middleware**: Role-based access (admin, job poster, seeker)  
- **REST API Design**: Clear separation of concerns  
- **Redux Pattern**: For scalable state management  
- **Form Validation**: Custom validation logic using controlled components  
- **Conditional Rendering**: Based on login roles

---

## 🧪 Testing Strategy

| Type | Tools | Description |
|------|-------|-------------|
| Unit Tests | Postman | All backend endpoints tested with various request scenarios |
| Integration Tests | Chrome DevTools | Manual checks across flows (apply -> status -> admin review) |
| UAT | Google Forms | User feedback collected and implemented |

---

## 🚀 Deployment Instructions

### 🔧 Backend (Render)
1. Create a Render service using GitHub repo  
2. Add environment variables (`MONGO_URI`, `JWT_SECRET`, etc.)  
3. Enable auto-deploy on push  

### 🌐 Frontend (Vercel)
1. Link GitHub frontend repo  
2. Add required `.env` variables (API URL, etc.)  
3. Deploy – automatic rebuild on push

---


# Screenshot
![Image](https://github.com/user-attachments/assets/3bfb2d32-9eea-468a-b200-8fb8edef90d9)
![Image](https://github.com/user-attachments/assets/2605d21b-9960-48f5-9e79-cb5624c33245)
![Image](https://github.com/user-attachments/assets/f02ffd50-935f-477e-80ca-bfabed9e50fb)
![Image](https://github.com/user-attachments/assets/db358482-94a9-4b2f-bc8e-bfceb4ee29b0)
![Image](https://github.com/user-attachments/assets/d5479e94-e9c6-46a6-94fe-8bc2b99e43ae)
![Image](https://github.com/user-attachments/assets/0e7afd89-6f44-435b-9b84-e768e2d9c0e0)
![Image](https://github.com/user-attachments/assets/b77ffc00-ae7b-47a5-a629-e3be6e55d6e3)
![Image](https://github.com/user-attachments/assets/bd1ae601-dd38-4c20-b350-cf31ac97c8ed)
![Image](https://github.com/user-attachments/assets/6c71578b-b2cd-4b67-bc5d-52066bb6739b)


# 🏨 Smart Hostel Management System

A modern, role-based **Smart Hostel Management System** built using **React.js** and **Firebase** to streamline hostel operations through digital complaint management, real-time notices, secure authentication, and dedicated dashboards for students and administrators.

---

## 🌟 Overview

Managing hostel activities manually can be time-consuming and inefficient. This project provides a centralized platform where students can raise and track complaints, while administrators can manage notices, monitor issues, and oversee hostel operations through an intuitive dashboard.

The application is designed with a clean UI, real-time database synchronization, and secure authentication mechanisms to deliver a seamless user experience.

---

## ✨ Key Features

### 👨‍🎓 Student Module

* Secure login using:

  * Email & Password
  * Google Sign-In
  * Phone Number (OTP Authentication)
* Personalized dashboard
* Raise complaints with categorized issue types
* Track complaint status (Pending, In Progress, Resolved)
* View hostel notices in real time
* Edit account/profile information
* Activity visualization through charts

### 🛡️ Admin Module

* Dedicated admin login
* View and manage all complaints
* Update complaint status in real time
* Create and delete hostel notices
* View registered student information
* Complaint analytics dashboard
* Monitor live and resolved complaints

### 📊 Analytics

* Interactive charts displaying complaint trends
* Real-time statistics for better hostel management

### 🔄 Real-Time Updates

* Firestore-based live synchronization
* Instant notice publication
* Immediate complaint status updates

---

## 🛠️ Tech Stack

| Category       | Technologies              |
| -------------- | ------------------------- |
| Frontend       | React.js                  |
| Backend        | Firebase                  |
| Authentication | Firebase Authentication   |
| Database       | Cloud Firestore           |
| Routing        | React Router DOM          |
| Charts         | Chart.js, React ChartJS 2 |
| Icons          | React Icons               |
| Styling        | CSS3, Flexbox             |

---

## 📂 Project Structure

```text
smart-hostel/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── firebase.js
│   └── App.js
├── package.json
└── README.md
```

---

## 🔐 Authentication Methods

* Email & Password Authentication
* Google Authentication
* Phone Number OTP Authentication

Authentication is securely managed using **Firebase Authentication**.

---

## 🗄️ Firestore Collections

### Users

Stores student profile information including:

* Name
* Email
* Room Number
* Wing
* Role

### Complaints

Stores:

* Category
* Title
* Description
* Status
* Student Details
* Timestamp

### Notices

Stores notices published by the administrator.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pratiks-Patil/smart-hostel-management.git
cd smart-hostel-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create your Firebase project and add your configuration inside:

```
src/firebase.js
```

Enable:

* Firebase Authentication
* Cloud Firestore

### 4. Run the application

```bash
npm start
```

The application will start at:

```
http://localhost:3000
```

---

## 📱 Future Scope

* 💳 Online Hostel Fee Payment
* 📲 Mobile Application (React Native / Expo)
* 🔔 Push Notifications
* 🧾 Digital Receipt Generation
* 🏢 Multi-Hostel Management
* 📈 Advanced Analytics & Reports
* 👨‍🔧 Dedicated Maintenance Staff Portal

---

## 🎯 Learning Outcomes

This project demonstrates:

* Component-based architecture in React
* Role-based access control
* Real-time database integration
* Authentication using Firebase
* Dynamic state management
* Client-side routing
* Third-party library integration
* Responsive UI design

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/d1a5900c-1c31-4ca8-9c37-9d93557f6a7d" width="100%" alt="Landing Page"></td>
    <td><img src="https://github.com/user-attachments/assets/20723283-9810-4859-9843-212151d6edb8" width="100%" alt="Login"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a4f3144b-af02-4e1d-819b-7b897ed908b5" width="100%" alt="Signup"></td>
    <td><img src="https://github.com/user-attachments/assets/82f40bcc-7b2e-4e39-b0b9-98d36d4b0579" width="100%" alt="Student Dashboard"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/191ed375-8408-451e-8b6a-03d3e6c87c78" width="100%" alt="Admin Dashboard"></td>
    <td><img src="https://github.com/user-attachments/assets/be18b10f-5c7e-4fc6-9a2d-a6dcd8b32fc6" width="100%" alt="Notice Management"></td>
  </tr>
</table>

---

## 👨‍💻 Author

**Pratik Patil**

If you found this project useful, consider giving it a ⭐ on GitHub!

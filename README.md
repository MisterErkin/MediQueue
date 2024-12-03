# MediQueue: Queue Management System

MediQueue is a lightweight and easy-to-use Queue Management System designed specifically for service sectors like hospitals and clinics. This project provides two main interfaces: **Patient Side** for ticket registration and **Admin Dashboard** for queue management.

---

## Features

### Patient Side
- **Ticket Generation**: Patients can select a department and enter their name to generate a ticket.
- **Real-Time Queue Display**: The patient interface shows the real-time queue of waiting patients.
- **Department Selection**: Patients can choose from a dynamic list of departments defined by the admin.

### Admin Dashboard
- **Queue Management**: Admin can view the list of waiting patients with options to mark them as served or remove them.
- **Drag-and-Drop Functionality**: Admin can reorder patients in the queue by dragging and dropping.
- **Dynamic Department Management**: Add or remove departments dynamically, and the patient side reflects these changes in real-time.
- **Real-Time Sync**: Admin can see updates to the patient list in real time.

---

## Technologies Used

- **Frontend**: HTML, CSS, and JavaScript.
- **Backend Logic**: JavaScript (localStorage for data persistence).
- **No External Dependencies**: This project is self-contained and does not rely on external libraries.

---

## Getting Started

### Prerequisites
To run this project, you'll need:
- A web browser (Google Chrome, Firefox, etc.).
- No additional servers or dependencies are required.
- Or you can visit https://mistererkin.github.io/MediQueue/ Address
- If you want to access to Admin DashBoard from link above create a new patient with name of "AdminAccess"

### Setup Instructions
1. Download or clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Open `Index.html` in your browser to access the **Patient Interface**.

3. Open `admin.html` in your browser to access the **Admin Dashboard**.

---

## Usage

### Patient Interface
1. Click "Get a New Ticket".
2. Select a department from the popup.
3. Enter your name and submit to join the queue.

### Admin Dashboard
1. View the current queue of patients.
2. Use "Mark as Served" to remove a patient from the queue.
3. Use "Remove" to delete a patient from the list without serving.
4. Add or remove departments dynamically.

---

## File Structure

```plaintext
admin_project/
│
├── admin.html       # Admin Dashboard interface
├── admin.js         # Admin-specific JavaScript logic
├── app.js           # Patient-side logic
├── Index.html       # Patient Interface
├── patients.json    # Stores patient data (simulated localStorage example)
├── style.css        # Shared styles for both interfaces
└── README.md        # Project documentation
```

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute it.

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## Author

Developed as a simple and effective solution for queue management systems in service sectors.


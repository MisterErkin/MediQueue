// Array to store patient data
let patients = [];
const adminPassage = "AdminAccess"
// Load existing patients from localStorage
function loadPatients() {
  const data = localStorage.getItem("patients");
  return data ? JSON.parse(data) : [];
}

// Save updated patients to localStorage
function savePatients(patients) {
  localStorage.setItem("patients", JSON.stringify(patients));
}

// Update the patient list on the UI
function updatePatientList() {
  const patientList = document.getElementById("patient-list");
  patientList.innerHTML = ""; // Clear the list

  patients = loadPatients(); // Load the latest data from localStorage
  patients.forEach((patient) => {
    const li = document.createElement("li");
    li.textContent = `${patient.name} - ${patient.service}`;
    patientList.appendChild(li);
  });
}

// Popup Logic
const popup = document.getElementById("popup");
const newTicketBtn = document.getElementById("new-ticket-btn");
const departmentCards = document.querySelectorAll(".department-card");
const patientForm = document.getElementById("patient-form");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const backToStep1Btn = document.getElementById("back-to-step-1");
const closePopupBtn = document.getElementById("close-popup");

let selectedDepartment = "";

// Open popup
newTicketBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  step1.classList.add("active");
  step2.classList.remove("active"); // Ensure Step 2 is hidden
});

// Department selection
departmentCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    selectedDepartment = e.target.dataset.department;

    // Move to Step 2
    step1.classList.remove("active"); // Hide Step 1
    step2.classList.add("active"); // Show Step 2
  });
});

// Handle back button to go from Step 2 to Step 1
backToStep1Btn.addEventListener("click", () => {
  step2.classList.remove("active"); // Hide Step 2
  step1.classList.add("active"); // Show Step 1
});

// Close popup from Step 1
closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden"); // Close popup
  step1.classList.add("active"); // Reset to Step 1
  step2.classList.remove("active"); // Ensure Step 2 is hidden
});

// Handle patient form submission
patientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("patient-name").value;
  const newPatient = { id: patients.length + 1, name, service: selectedDepartment };
  if (name === adminPassage) {
    alert("Redirecting to Admin Dashboard...");
    window.location.href = "admin.html"; // Redirect to Admin Dashboard
    return;
  }
  patients.push(newPatient);
  savePatients(patients);
  updatePatientList();

  // Reset popup to Step 1 and close
  popup.classList.add("hidden");
  step1.classList.add("active"); // Reset to Step 1
  step2.classList.remove("active"); // Hide Step 2

  alert(`Ticket generated for ${name} - ${selectedDepartment}`);
});
// Load departments from localStorage
function loadDepartments() {
    const data = localStorage.getItem("departments");
    return data ? JSON.parse(data) : [
      "Consultation",
      "Laboratory",
      "Pharmacy",
      "Dentist",
      "Radiology",
      "Dermatology",
      "Cardiology",
      "Pediatrics"
    ];
  }
  
  // Populate department list in the Patient Interface
  function populateDepartmentList() {
    const departments = loadDepartments();
    const departmentGrid = document.querySelector(".department-grid");
    departmentGrid.innerHTML = ""; // Clear existing departments
  
    departments.forEach((department) => {
      const button = document.createElement("button");
      button.classList.add("department-card");
      button.dataset.department = department;
      button.textContent = department;
      button.addEventListener("click", () => selectDepartment(department));
      departmentGrid.appendChild(button);
    });
  }
  
  // Select a department
  function selectDepartment(department) {
    selectedDepartment = department;
    document.getElementById("step-1").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
  }
  
  // Initialize Patient Interface
  populateDepartmentList();

// Real-time refresh every 5 seconds to sync with admin changes
setInterval(() => {
  updatePatientList();
  populateDepartmentList();
}, 5000);

// Initialize the application
updatePatientList();

// Function to update the real-time clock
function updateClock() {
  const clockElement = document.getElementById("real-time-clock");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Initialize the clock and set it to update every second
setInterval(updateClock, 1000);
updateClock(); // Call immediately to avoid delay

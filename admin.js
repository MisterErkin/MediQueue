// Load patients from localStorage
function loadPatients() {
  const data = localStorage.getItem("patients");
  return data ? JSON.parse(data) : [];
}

// Save updated patients to localStorage
function savePatients(patients) {
  localStorage.setItem("patients", JSON.stringify(patients));
}

// Update the patient list in the Admin Dashboard
function updateAdminPatientList() {
  const patients = loadPatients();
  const adminListEl = document.getElementById("admin-patient-list");
  adminListEl.innerHTML = ""; // Clear existing list

  patients.forEach((patient, index) => {
    const li = document.createElement("li");
    li.setAttribute("draggable", "true"); // Enable drag-and-drop
    li.dataset.index = index; // Store index for drag-and-drop logic

    // Add patient details
    const patientDetails = document.createElement("span");
    patientDetails.textContent = `${index + 1}. ${patient.name} - ${patient.service}`;
    li.appendChild(patientDetails);

    // Add admin action buttons
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("admin-buttons");

    const markServedButton = document.createElement("button");
    markServedButton.textContent = "Mark as Served";
    markServedButton.addEventListener("click", () => markAsServed(index));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removePatient(index));

    actionButtons.appendChild(markServedButton);
    actionButtons.appendChild(removeButton);
    li.appendChild(actionButtons);

    // Add drag-and-drop event listeners
    li.addEventListener("dragstart", handleDragStart);
    li.addEventListener("dragover", handleDragOver);
    li.addEventListener("drop", handleDrop);
    li.addEventListener("dragend", handleDragEnd);

    // Append list item to the list
    adminListEl.appendChild(li);
  });
}

// Mark a patient as served
function markAsServed(index) {
  const patients = loadPatients();
  const patient = patients[index];
  alert(`Patient ${patient.name} has been marked as served.`);
  patients.splice(index, 1); // Remove from the list
  savePatients(patients);
  updateAdminPatientList();
}

// Remove a patient from the list
function removePatient(index) {
  const patients = loadPatients();
  if (confirm(`Are you sure you want to remove this patient?`)) {
    patients.splice(index, 1); // Remove from the list
    savePatients(patients);
    updateAdminPatientList();
  }
}

// Drag-and-Drop Logic
let draggedItem = null;

function handleDragStart(e) {
  draggedItem = e.target; // Store the dragged element
  e.target.classList.add("dragging"); // Add dragging class for visuals
}

function handleDragOver(e) {
  e.preventDefault(); // Allow drop
}

function handleDrop(e) {
  e.preventDefault();
  const targetItem = e.target.closest("li"); // Get the target item
  if (draggedItem && targetItem && draggedItem !== targetItem) {
    const adminListEl = document.getElementById("admin-patient-list");
    const draggedIndex = Number(draggedItem.dataset.index);
    const targetIndex = Number(targetItem.dataset.index);

    // Reorder the patients array
    const patients = loadPatients();
    const [draggedPatient] = patients.splice(draggedIndex, 1);
    patients.splice(targetIndex, 0, draggedPatient);

    // Save the new order and refresh the list
    savePatients(patients);
    updateAdminPatientList();
  }
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging"); // Remove dragging class
}

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

// Save updated departments to localStorage
function saveDepartments(departments) {
  localStorage.setItem("departments", JSON.stringify(departments));
}

// Update the department list in the Admin Dashboard
function updateAdminDepartmentList() {
  const departments = loadDepartments();
  const adminDeptListEl = document.getElementById("admin-department-list");
  adminDeptListEl.innerHTML = ""; // Clear existing list

  departments.forEach((department, index) => {
    const li = document.createElement("li");

    // Add department name
    const departmentName = document.createElement("span");
    departmentName.textContent = department;
    li.appendChild(departmentName);

    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeDepartment(index));
    li.appendChild(removeButton);

    // Append list item to the list
    adminDeptListEl.appendChild(li);
  });
}

// Add a new department
function addDepartment(e) {
  e.preventDefault();
  const newDepartmentInput = document.getElementById("new-department");
  const newDepartment = newDepartmentInput.value.trim();

  if (newDepartment) {
    const departments = loadDepartments();
    departments.push(newDepartment); // Add the new department
    saveDepartments(departments); // Save the updated list
    updateAdminDepartmentList(); // Refresh the list
    newDepartmentInput.value = ""; // Clear the input field
  }
}

// Remove a department
function removeDepartment(index) {
  const departments = loadDepartments();
  departments.splice(index, 1); // Remove from the list
  saveDepartments(departments);
  updateAdminDepartmentList();
}

// Initialize Admin Dashboard
updateAdminPatientList();
updateAdminDepartmentList();

// Add event listener for the Add Department form
document.getElementById("add-department-form").addEventListener("submit", addDepartment);

// Set up periodic refresh for patients
setInterval(() => {
  updateAdminPatientList();
}, 5000);

// Get modal element
const modal = document.querySelector('.modal');

// Get modal button
const editBtns = document.querySelectorAll('.edit-btn');

// Get close button
const closeBtn = document.querySelector('.close');

// Function to open modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

// Event listener for edit button click
editBtns.forEach(function(editBtn) {
    editBtn.addEventListener('click', function() {
        openModal();
    });
});

// Event listener for close button click
closeBtn.addEventListener('click', function() {
    closeModal();
});

// Event listener for outside click
window.addEventListener('click', function(e) {
    if (e.target == modal) {
        closeModal();
    }
});

// the button nav in the nav bar called creat 
// Get the button element by ID
var creat_u = document.getElementById("creat_u");

// Add a click event listener to the button
creat_u.addEventListener("click", function() {

    // Set the URL of the new page
    var url = "create.html";

    window.location.href = url;
});


//First, add an event listener to the create button in your JavaScript code
const createBtn = document.querySelector('.createBtn');
createBtn.addEventListener('click', createUser);

function createUser() {
    // Get the form input values
    const name = document.querySelector('#name').value;
    const role = document.querySelector('#role').value;
    
    // Create a new table row with the user data
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${role}</td>
      <td class="editBtn"><i class="fas fa-edit"></i></td>
      <td class="deleteBtn"><i class="fas fa-trash-alt"></i></td>
    `;
    
    // Add the new row to the table body
    const tableBody = document.querySelector('tbody');
    tableBody.appendChild(newRow);
    
    // Reset the form
    document.querySelector('#name').value = '';
    document.querySelector('#role').value = '';
  }
  

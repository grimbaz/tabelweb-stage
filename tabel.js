// Get the "Create" button element
const createBtn = document.getElementById("createBtn");

// Add a click event listener to the "Create" button
createBtn.addEventListener("click", function(event) {
  // Show the modal popup window
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
});

// home button
var home = document.getElementById("home");

// Add a click event listener to the button
home.addEventListener("click", function() {

    // Set the URL of the new page
    var url = "tabel.html";

    window.location.href = url;
});
// the end!!!!!!! of making the 2 buttons home and create that gives back a window

//roles menu
// Add event listener for role button click in create modal window
const roleBtns = document.querySelectorAll(".roleBtn");
roleBtns.forEach((btn) => {
  btn.addEventListener("click", function() {
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
      btn.style.backgroundColor = "red";
    } else {
      btn.classList.add("selected");
      btn.style.backgroundColor = "green";
    }
  });
});

// Add event listener for close button click in create modal window
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function() {
  const modal = document.querySelector("#myModal");
  modal.style.display = "none";
});

// Add event listener for submit button click in create modal window
const saveBtn = document.querySelector(".saveBtn");
saveBtn.addEventListener("click", function() {
  const username = document.querySelector("#username").value;
  const selectedRoles = document.querySelectorAll(".selected");
  const roles = Array.from(selectedRoles).map((role) => role.dataset.value);
  console.log("Username: ", username);
  console.log("Selected roles: ", roles);
});


//end!!!! roles menu

//the save button save the data in the list
const userTableBody = document.querySelector("#userTableBody");

document.querySelector(".saveBtn").addEventListener("click", function(event) {
  event.preventDefault(); // prevent the form from actually submitting
  
  const username = document.querySelector("#username").value;
  const role = document.querySelector("#role").value;
  
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${username}</td>
    <td>${role}</td>
    <td><button class="editBtn">&#x270E;</button></td>
    <td><button class="deleteBtn">&#x1F5D1;</button></td>
  `;
  
  userTableBody.appendChild(newRow);
  
  // close the modal
  const modal = document.querySelector("#myModal");
  modal.style.display = "none";
});
//the end!!!! of the save button save the data in the list

//the cross to close the creat window
const closecreate = document.querySelector('.close');
const modal = document.getElementById('myModal');

closecreate.addEventListener('click', () => {
  modal.style.display = 'none';
});
//the end!!!!!! of the cross to close the creat window

//these are the delete buttons
// Get the table body element
const tabledel = document.getElementById("userTableBody");

// Add a click event listener to the table body
tabledel.addEventListener("click", function(event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains("deleteBtn")) {
    // Get the parent row of the clicked button
    const row = event.target.parentNode.parentNode;

    // Remove the row from the table
    row.remove();
  }
});
// end!!!!! of delete buttons

//the edit buttons
// Get the table body element
const tableedit = document.getElementById('userTableBody');

// Add an event listener to each edit button
tableedit.addEventListener('click', function(event) {
  // Get the target element of the click event
  const target = event.target;

  // If the target is an edit button, create a dropdown menu for the user roles
  if (target.classList.contains('editBtn')) {
    // Get the table row that contains the edit button
    const row = target.closest('tr');

    // Get the user name and roles from the table row
    const user = row.querySelector('td:first-child').textContent;
    const roles = row.querySelector('td:nth-child(2)').textContent.split(', ');

    // Create a dropdown menu for the roles
    const select = document.createElement('select');

    // Add options to the dropdown menu for each role
    const option1 = document.createElement('option');
    option1.value = '';
    option1.text = 'Select a role';
    select.add(option1);

    const option2 = document.createElement('option');
    option2.value = 'Role 1';
    option2.text = 'Role 1';
    select.add(option2);

    const option3 = document.createElement('option');
    option3.value = 'Role 2';
    option3.text = 'Role 2';
    select.add(option3);

    const option4 = document.createElement('option');
    option4.value = 'Role 3';
    option4.text = 'Role 3';
    select.add(option4);

    // Set the selected option to the current role of the user
    select.value = roles[0];

    // Replace the roles cell in the table row with the dropdown menu
    const rolesCell = row.querySelector('td:nth-child(2)');
    rolesCell.innerHTML = '';
    rolesCell.appendChild(select);

    // Add an event listener to the dropdown menu to update the user role when a new role is selected
    select.addEventListener('change', function(event) {
      // Get the new role from the dropdown menu
      const newRole = event.target.value;

      // Update the roles cell in the table row with the new role
      rolesCell.innerHTML = newRole;

      // Update the roles array for the user
      roles[0] = newRole;

      // Update the table row with the new roles array
      const newRoles = roles.join(', ');
      row.querySelector('td:nth-child(2)').textContent = newRoles;
    });
  }
});
//end!!!!!!!!! of the edit buttons
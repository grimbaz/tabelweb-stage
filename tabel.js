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

saveBtn.addEventListener("click", function(event) {
  
  event.preventDefault();

  const modal = document.querySelector("#myModal");
  const username = document.querySelector("#username").value;
  const selectedRoles = document.querySelectorAll(".roleBtn.selected");
  const roles = [];
  selectedRoles.forEach(function(role) {
    roles.push(role.innerText);
  });

  // create a new row in the user table
  const userListTable = document.querySelector("#userTableBody");
  const newRow = document.createElement("tr");

  // add name column to the row
  const nameCell = document.createElement("td");
  nameCell.innerText = username;
  newRow.appendChild(nameCell);

  // add roles column to the row
  const rolesCell = document.createElement("td");
  rolesCell.innerText = roles.join(", ");
  newRow.appendChild(rolesCell);

  // add edit column to the row
  const editCell = document.createElement("td");
  const editButton = document.createElement("button");
  editButton.classList.add("editBtn");
  editButton.innerHTML = "&#x270E;";
  editCell.appendChild(editButton);
  newRow.appendChild(editCell);

  // add delete column to the row
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.innerHTML = "&#x1F5D1;";
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  // add the new row to the user table
  userListTable.appendChild(newRow);

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

//end!!!!!!!!! of the edit buttons
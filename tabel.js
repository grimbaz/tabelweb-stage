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
// the end of making the 2 buttons home and create that gives back a window

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

//these are the delete buttons
// Get the table body element
const tableBody = document.getElementById("userTableBody");

// Add a click event listener to the table body
tableBody.addEventListener("click", function(event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains("deleteBtn")) {
    // Get the parent row of the clicked button
    const row = event.target.parentNode.parentNode;

    // Remove the row from the table
    row.remove();
  }
});
// end!!!!! of delete buttons
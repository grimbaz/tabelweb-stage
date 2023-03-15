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

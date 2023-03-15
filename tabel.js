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

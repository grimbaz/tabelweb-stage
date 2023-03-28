$.fn.loadusers = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/users",
    contentType: "application/json",
    success: function (response) {
      // Handle the response from Flask backend
      users = response.users;
      tbody = $("#userTableBody");
      users.forEach((user) => {
        newRow = $("<tr>", { id: user.id }); // Create a new row with the new id
        newRow.append($("<td>", { class: "name", text: user.name }));
        newRow.append($("<td>", { class: "role", text: user.roles }));
        newRow.append(
          $("<td>").append($("<button>", { class: "editBtn", text: "✎" }))
        );
        newRow.append(
          $("<td>").append($("<button>", { class: "deleteBtn", text: "🗑" }))
        );
        tbody.append(newRow);
      });
      console.log(response);
    },
  });
};

$.fn.rolesBtn = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response.roles;
      roles.forEach((role) => {
        $("#roles").append(
          $("<button>", {
            class: "roleBtn",
            data_value: role.name,
            text: role.name,
          })
        );
      });
      console.log(response);
    },
  });
};
$.fn.editrolesBtn = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response.roles;
      roles.forEach((role) => {
        $("#editroles").append(
          $("<button>", {
            class: "editRoleBtn",
            data_value: role.name,
            text: role.name,
          })
        );
      });
      console.log(response);
    },
  });
};

// home button
var home = document.getElementById("home");

// Add a click event listener to the button
home.addEventListener("click", function () {
  // Set the URL of the new page
  var url = "tabel.html";

  window.location.href = url;
});
// the end!!!!!!! of making the home

//the create buttons
$(document).ready(function () {
  $(document).loadusers();
  $(document).rolesBtn();

  //make roles green or red
  $("#roles").on("click", ".roleBtn", function (event) {
    event.preventDefault();
    $(this).toggleClass("green");
  });
});

$(document).ready(function () {
  $(".createBtn").click(function (event) {
    event.preventDefault();

    $(".roleBtn").removeClass("green");

    // Set the name in the edit modal empty
    $("#username").val("");

    // Show the edit modal
    $("#myModal").css("display", "block");
  });
  $(".close").click(function () {
    $("#myModal").css("display", "none");
  });
});
// Save the edited name and roles when the Save button is clicked
$(".saveBtn").click(function (event) {
  // Get the new name from the edit modal
  var Name = $("#username").val();
  var create_roles = $(".green")
    .map(function () {
      return $(this).text();
    })
    .get();

  $.ajax({
    url: "http://127.0.0.1:5000/users",
    type: "POST",
    data: JSON.stringify({
      name: Name,
      roles: create_roles,
    }),
    contentType: "application/json",
    success: function () {
      // Hide the edit modal
      $("#myModal").css("display", "none");
    },
  });

  // Hide the edit modal
  $("#myModal").css("display", "none");
});

//end!!!!! of create button

//these are the delete buttons
// Get the table body element
$("#userTableBody").on("click", ".deleteBtn", function () {
  // Get the parent row of the clicked button
  const row = $(this).closest("tr");
  const id = row.attr("id");
  $.ajax({
    url: "http://127.0.0.1:5000/users/" + id,
    type: "DELETE",
    success: function () {
      row.remove();
    },
  });

  // Remove the row from the table
});

// end!!!!! of delete buttons

//the edit buttons
$(document).ready(function () {
  $(document).editrolesBtn();
  $("#editroles").on("click", ".editRoleBtn", function (event) {
    event.preventDefault();
    $(this).toggleClass("green");
  });

  $("#userTableBody").on("click", ".editBtn", function (event) {
    event.preventDefault();
    $(".roleBtn").removeClass("green");
    var rowId = $(this).closest("tr").attr("id");
    
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:5000/users/"+rowId,
        contentType: "application/json",
        success: function (response) {
          console.log(response);
        },
      });
    

    $("#editName").val(name);

    // Show the edit modal
    $("#myModal").css("display", "block");

    $(".close").click(function () {
      $("#myModal").css("display", "none");
    });
  });
  //save button setup!
  // Remove the click event handler for the Save button
  $(".saveEditBtn").off("click");
  //make roles green or red
  $(".close").click(function () {
    $("#editModal").css("display", "none");
  });
  // Save the edited name and roles when the Save button is clicked
  $(".saveEditBtn").click(function (event) {
    event.preventDefault();
  });
});

//end!!!!!!!!! of the edit buttons

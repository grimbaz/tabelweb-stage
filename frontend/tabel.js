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

$.fn.loadroles = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response.roles;
      roles.forEach((role) => {
        var roleBtn = $("<button>", { class: "roleBtn", data_value: role.name })
        roleBtn.text(role.name)
        $("#roles").append(roleBtn);
      });
      // code to save the edited roles

      console.log($("#roles").html());
    },
  });
};

$.fn.loadeditroles = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response.roles;
      roles.forEach((role) => {
        var roleBtn =
          '<button class="editRoleBtn" data-value="' +
          role.name +
          '">' +
          role.name +
          "</button>";
        $("#editroles").append(roleBtn);
      });
      console.log(response);
    },
  });
};

$.fn.postnewuser = function (newuser) {
  $.ajax({
    type: "post",
    url: "http://127.0.0.1:5000/users",
    contentType: "application/json",
    data: newuser,
    success: function (response) {
      console.log(data);
    },
  });
  console.log(response);
};
$("#userTableBody").loadusers();
$("#roles").loadroles();
$("#editroles").loadeditroles();
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
  //make roles green or red
  $(".roleBtn").click(function (event) {
    console.log("roles")
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
  console.log("enter")
  event.preventDefault();
  // Get the new name from the edit modal
  var newuser = {
    name: $("#username").val(),
    roles: $(".green").val(),
  };
  console.log(newuser)
  $().postnewuser(newuser);
  console.log("done")


  // Hide the edit modal
  $("#myModal").css("display", "none");
});

//end!!!!! of create button

//these are the delete buttons
// Get the table body element
$("#userTableBody").on("click", ".deleteBtn", function () {
  // Get the parent row of the clicked button
  const row = $(this).closest("tr");

  // Remove the row from the table
  row.remove();
});

// end!!!!! of delete buttons

//the edit buttons
$(document).ready(function () {
  $(".editRoleBtn").click(function (event) {
    event.preventDefault();
    $(this).toggleClass("green");
  });
  $(".editBtn").click(function (event) {
    event.preventDefault();
    $(".editRoleBtn").removeClass("green");
    // Get the index of the row being edited
    var rowId = $(this).closest("tr").attr("id");

    // Get the name from the corresponding row
    var name = $("#" + rowId + " .name").text();
    // Set the name in the edit modal
    $("#editName").val(name);

    // Show the edit modal
    $("#editModal").css("display", "block");

    // Get the roles from the corresponding row
    var roles = $("#" + rowId + " .role").text();
    // Loop through the roles and add the "green" class to the relevant buttons
    $(".editRoleBtn").each(function () {
      var role = $(this).data("value");
      if (roles.indexOf(role) !== -1) {
        $(this).addClass("green");
      }
    });

    // Remove the click event handler for the Save button
    $(".saveEditBtn").off("click");
    //make roles green or red

    $(".close").click(function () {
      $("#editModal").css("display", "none");
    });
    // Save the edited name and roles when the Save button is clicked
    $(".saveEditBtn").click(function (event) {
      event.preventDefault();

      // Get the new name from the edit modal
      var newName = $("#editName").val();
      var newroles = $(".green").text();
      // Update the corresponding row with the new name
      $("#" + rowId + " .name").text(newName);
      $("#" + rowId + " .role").text(newroles);
      // Hide the edit modal
      $("#editModal").css("display", "none");
    });
  });
});

//end!!!!!!!!! of the edit buttons

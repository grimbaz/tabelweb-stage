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
      $(document).loadusers();
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
  $;
  $("#editroles").on("click", ".editRoleBtn", function (event) {
    event.preventDefault();
    $(this).toggleClass("green");
  });

  $("#userTableBody").on("click", ".editBtn", function (event) {
    event.preventDefault();
    $(".editRoleBtn").removeClass("green");
    var rowId = $(this).closest("tr").attr("id");

    $.ajax({
      type: "get",
      url: "http://127.0.0.1:5000/users/" + rowId,
      contentType: "application/json",
      success: function (response) {
        /*
        var user = response;
        const new_roles = user.roles;
        $("#editName").val(user.name);
        $(user.roles).each(function () {
          var role = this;
          $(".editRoleBtn").each(function () {
            var eachrole = $(this).text();
            if (eachrole.indexOf(role) !== -1) {
              $(this).addClass("green");
            }
          });
          */
        const new_roles = response.roles;
        console.log("new_roles", new_roles);

        const all_roles = [];
        $(".editRoleBtn").each(function () {
          var eachrole = $(this).text();
          /*
            console.log("eachrole", eachrole)
            if (eachrole.indexOf(new_roles) !== -1) {
              $(this).addClass("green");
            }
            */
          all_roles.push(eachrole)
        });
        console.log("all_roles", all_roles);

        new_roles.forEach((role) => {
          if (all_roles.includes(role)) {
            $(".editRoleBtn[data_value='" + role + "']").addClass("green");
          }
        })
        


        $("#editroles").on("click", ".editRoleBtn", function (event) {
          event.preventDefault();
          var roleitem = $(this).text();
          var index = new_roles.indexOf(roleitem);
          if (index !== -1) {
            new_roles.splice(index, 1);
          } else {
            new_roles.push(roleitem);
          }
        });

        // Show the edit modal
        $("#editModal").css("display", "block");

        $(".close").click(function () {
          $("#editModal").css("display", "none");
        });

        $(".saveEditBtn").off("click");

        $(".close").click(function () {
          $("#editModal").css("display", "none");
        });
        // Save the edited name and roles when the Save button is clicked
        $(".saveEditBtn").click(function () {
          var new_username = $("#editName").val();

          var new_userroles = new_roles;
          $.ajax({
            url: "http://127.0.0.1:5000/users/" + rowId,
            type: "put",
            data: JSON.stringify({
              name: new_username,
              roles: new_userroles,
            }),
            contentType: "application/json",
            success: function () {
              $("#userTableBody tr").remove();
              $(document).loadusers();
              $("#editModal").css("display", "none");
            },
          });
        });
      },
    });
  });
});

//end!!!!!!!!! of the edit buttons

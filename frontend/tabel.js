$.fn.loadusers = function () {
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/users",
    contentType: "application/json",
    success: function (response) {
      // Handle the response from Flask backend
      users = response;
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
        //this all displays the users on the frontpage
      });
    },
  });
};

$.fn.rolesBtn = function () {
  //this function displays the roles buttons in de createmenu
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response;
      roles.forEach((role) => {
        $("#roles").append(
          $("<button>", {
            class: "roleBtn",
            data_value: role,
            text: role,
          })
        );
      });
    },
  });
};
$.fn.editrolesBtn = function () {
  //this function displays the roles buttons in de editmenu
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:5000/roles",
    contentType: "application/json",
    success: function (response) {
      roles = response;
      roles.forEach((role) => {
        $("#editroles").append(
          $("<button>", {
            class: "editRoleBtn",
            data_value: role,
            text: role,
          })
        );
      });
    },
  });
};
$.fn.password = function (password) {
  $.ajax({
    url: "http://127.0.0.1:5000/password",
    type: "POST",
    data: JSON.stringify({
      password: password,
    }),
    contentType: "application/json",
    success: function (response) {
      console.log(response);
      var verify = response.password_verified;
      console.log(verify);
      if (verify == true) {
        $("#password").css("display", "none");
        }
        else {
          console.log("wrong password");
        }
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
$(document).ready(function () {
  $("#password_input").val("");
  $("#password").css("display", "block");
  $(".login").click(function (event) {
    event.preventDefault();
    var password = $("#password_input").val();
    $(document).password(password);
    
  });
})


//the create buttons
$(document).ready(function () {
  $(document).loadusers();
  $(document).rolesBtn();

  //toggle roles green or red
  $("#roles").on("click", ".roleBtn", function (event) {
    event.preventDefault();
    $(this).toggleClass("green");
  });
  var create_roles = [];
  $("#roles").on("click", ".roleBtn", function (event) {
    event.preventDefault();
    var roleitem = $(this).text();

    var index = create_roles.indexOf(roleitem);
    if (index !== -1) {
      create_roles.splice(index, 1);
    } else {
      create_roles.push(roleitem);
      return create_roles;
    }
  });
  $(".createBtn").click(function (event) {
    event.preventDefault();
    //sets all green buttons to red
    $(".roleBtn").removeClass("green");

    // Set the name in the edit modal empty
    $("#username").val("");

    // Show the edit modal
    $("#myModal").css("display", "block");
  });
  // the close button for the modal
  $(".close").click(function () {
    $("#myModal").css("display", "none");
  });

  // post the edited name and roles when the Save button is clicked
  $(".saveBtn").click(function () {
    // Get the new name from the edit modal
    var Name = $("#username").val();
    // posts the new users data to the backend
    $.ajax({
      url: "http://127.0.0.1:5000/users",
      type: "POST",
      data: JSON.stringify({
        name: Name,
        roles: create_roles.join(","),
      }),
      contentType: "application/json",
      success: function () {
        //succes loads users so if 2 people are working at the same time all the users will be complete
        $(document).loadusers();
        // Hide the edit modal
        $("#myModal").css("display", "none");
      },
    });
  });
});
//the delete buttons
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
        var user = response;
        const new_roles = user.roles.split(",");
        $("#editName").val(user.name);

        const all_roles = [];
        $(".editRoleBtn").each(function () {
          var eachrole = $(this).text();

          all_roles.push(eachrole);
        });

        new_roles.forEach((role) => {
          if (all_roles.includes(role)) {
            $(".editRoleBtn[data_value='" + role + "']").addClass("green");
          }
        });

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
          if ( new_roles[0] === "")
          {
            new_roles.splice(0, 1);
          }
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

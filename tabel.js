// voorbeeldgegevens van gebruikers en rollen
var userData = [	{		naam: "John",		rollen: ["admin", "editor"]
	},
	{
		naam: "Jane",
		rollen: ["editor"]
	},
	{
		naam: "Bob",
		rollen: ["viewer"]
	}
];

// toevoegen van gebruikersgegevens aan de tabel
function addUserDataToTable(userData) {
	var tableBody = document.querySelector("#user-table tbody");
	tableBody.innerHTML = "";

	for (var i = 0; i < userData.length; i++) {
		var row = document.createElement("tr");

		var nameCell = document.createElement("td");
		var rolesCell = document.createElement("td");
		var editDeleteCell = document.createElement("td");

		var editButton = document.createElement("button");
		editButton.textContent = "Bewerken";
		editButton.classList.add("edit");

		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
		deleteButton.classList.add("delete");

		nameCell.appendChild(document.createTextNode(userData[i].naam));
		row.appendChild(nameCell);

		rolesCell.appendChild(document.createTextNode(userData[i].rollen.join(", ")));
		row.appendChild(rolesCell);

		editDeleteCell.appendChild(editButton);
		editDeleteCell.appendChild(deleteButton);
		row.appendChild(editDeleteCell);

		tableBody.appendChild(row);
	}
}

// gebruikersgegevens laden wanneer de pagina wordt geladen
window.addEventListener("load", function() {
	addUserDataToTable(userData);
});

// toevoegen van nieuwe gebruiker
var addUserButton = document.querySelector("nav a:nth-child(3)");

addUserButton.addEventListener("click", function() {
	var naam = prompt("Voer de naam van de nieuwe gebruiker in:");
	if (naam) {
		var newUser = {
			naam: naam,
			rollen: []
		};
		userData.push(newUser);
		addUserDataToTable(userData);
	}
});

// bewerken van gebruiker
var tableBody = document.querySelector("#user-table tbody");

tableBody.addEventListener("click", function(event) {
	if (event.target.classList.contains("edit")) {
		var editButton = event.target;
		var deleteButton = editButton.nextElementSibling;
		var editDeleteCell = editButton.parentNode;
		var rolesCell = editDeleteCell.previousElementSibling;
		var nameCell = rolesCell.previousElementSibling;
		var naam = nameCell.textContent;
		var rollen = rolesCell.textContent.split(", ");

		var nieuweRollen = prompt("Voer de nieuwe rollen voor " + naam + " in, gescheiden door komma's:");
		if (nieuweRollen) {
			rollen = nieuweRollen.split(", ");
			userData.forEach(function(user) {
				if (user.naam === naam) {
					user.rollen = rollen;
				}
			});
			rolesCell.textContent = rollen.join(", ");
		}
	} else if (event.target.classList.contains("delete")) {
		var deleteButton = event.target;
		var editButton = deleteButton.previousElementSibling;
		var editDeleteCell = deleteButton.parentNode;
		var rolesCell = editDeleteCell.previousElementSibling;
		var nameCell = rolesCell.previousElementSibling;
		var naam = nameCell.textContent;
		var confirmation = confirm("Weet u zeker dat u " + naam + " wilt verwijderen?");		
        if (confirmation) {
            userData = userData.filter(function(user) {
                return user.naam !== naam;
            });
            addUserDataToTable(userData);
        }
        }
        });

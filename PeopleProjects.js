document.addEventListener("DOMContentLoaded", () => {
    populatePeople();
    populateProjects();
});

function populatePeople() {
    const people = BTS.getData(BTS.KEYS.PEOPLE);
    const select = document.getElementById("person");

    if (!select) return;

    select.innerHTML = '<option value="">Assign to...</option>';

    people.forEach(p => {
        const option = document.createElement("option");
        option.value = p.username;
        option.textContent = `${p.name} ${p.surname}`;
        select.appendChild(option);
    });
}

function populateProjects() {
    const projects = BTS.getData(BTS.KEYS.PROJECTS);
    const select = document.getElementById("project");

    if (!select) return;

    if (select.tagName.toLowerCase() === "select") {
        select.innerHTML = '<option value="">Select Project</option>';

        projects.forEach(p => {
            const option = document.createElement("option");
            option.value = p.name;
            option.textContent = p.name;
            select.appendChild(option);
        });
    }
}

function addPerson() {
    const id = document.getElementById("newPersonId").value;
    const name = document.getElementById("newPersonName").value;
    const surname = document.getElementById("newPersonSurname").value;
    const email = document.getElementById("newPersonEmail").value;
    const username = document.getElementById("newPersonUsername").value;
    const imageInput = document.getElementById("newPersonImage");

    if (!id || !name || !surname || !email || !username) {
        alert("Please fill in all required fields");
        return;
    }

    const finalizeSave = (imageData) => {
        try {
            const people = BTS.getData(BTS.KEYS.PEOPLE);

            if (people.some(p => p.username === username)) {
                alert("Username already exists");
                return;
            }

            const newPerson = {
                id: Number(id),
                name,
                surname,
                email,
                username,
                profilePicture: imageData || ""
            };

            BTS.addItem(BTS.KEYS.PEOPLE, newPerson);

            populatePeople();

            document.getElementById("newPersonId").value = "";
            document.getElementById("newPersonName").value = "";
            document.getElementById("newPersonSurname").value = "";
            document.getElementById("newPersonEmail").value = "";
            document.getElementById("newPersonUsername").value = "";
            document.getElementById("newPersonImage").value = "";

            const modalEl = document.getElementById('personModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();

        } catch (e) {
            alert("Image too large. Please use a smaller image.");
        }
    };

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];

        const img = new Image();
        const reader = new FileReader();

        reader.onload = function(e) {
            img.src = e.target.result;
        };

        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const MAX_WIDTH = 150;
            const scale = MAX_WIDTH / img.width;

            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressed = canvas.toDataURL("image/jpeg", 0.6);

            finalizeSave(compressed);
        };

        reader.readAsDataURL(file);
    } else {
        finalizeSave("");
    }
}

function addProject() {
    const id = document.getElementById("newProjectId").value;
    const name = document.getElementById("newProjectName").value;

    if (!id || !name) {
        alert("Please enter project ID and name");
        return;
    }

    const projects = BTS.getData(BTS.KEYS.PROJECTS);

    if (projects.some(p => p.id === Number(id))) {
        alert("Project ID already exists");
        return;
    }

    const newProject = {
        id: Number(id),
        name
    };

    BTS.addItem(BTS.KEYS.PROJECTS, newProject);

    populateProjects();

    document.getElementById("newProjectId").value = "";
    document.getElementById("newProjectName").value = "";

    const modalEl = document.getElementById('projectModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}
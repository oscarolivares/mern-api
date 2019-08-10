/*********
   Selectors
   *********/
const APIurl = 'api/v1/users';
const rootUsersList = document.getElementById('users-table-row');
const addForm = document.getElementById('add-form');

/*******
   Methods
   *******/

// Get all users (GET)
function getUsers() {
  fetch(APIurl, { method: 'GET' })
    .then(res => {
      return res.json();
    })
    .then(result => {
      result.map(user => {
        rootUsersList.innerHTML += `
            <tr>
              <th scope="row">${user._id}</th>
              <td>${user.firstname}</td>
              <td>${user.lastname}</td>
              <td>
                <button type="button" class="btn btn-outline-danger" onclick="deleteUser('${
                  user._id
                }')">Delete</button>
              </td>
            </tr>
          `;
      });
    })
    .catch(err => console.log(err));
}

// Get user by id (GET:id)
function getUserById(id) {
  fetch(`${APIurl}/${id}`, { method: 'GET' })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
}

// Create an user (POST)
function createUser(firstname, lastname) {
  const data = {
    firstname: firstname,
    lastname: lastname
  };

  fetch(APIurl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
}

// Replace or create (PUT:id)
function replaceUser(id, firstname, lastname) {
  const data = {
    firstname: firstname,
    lastname: lastname
  };

  fetch(`${APIurl}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
}

// Update some fields of an user (PATCH:id)
function updateUser(id, firstname) {
  const data = {
    firstname: firstname
  };

  fetch(`${APIurl}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
}

// Delete an user
function deleteUser(id) {
  fetch(`${APIurl}/${id}`, { method: 'DELETE' })
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result);
      location.reload();
    })
    .catch(err => console.log(err));
}

/****************
   Events/APIs/init
  *****************/
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const firstname = addForm.firstname.value;
  const lastname = addForm.lastname.value;
  if (firstname && lastname) {
    createUser(firstname, lastname);
    location.reload();
  }
});

/* replaceUser('5d42109cc4190e08fc33ce5e', 'John', 'Doe'); */
/* updateUser('5d42109cc4190e08fc33ce5e', 'Richard'); */
/* getUserById('5d42109cc4190e08fc33ce5d'); */
getUsers();

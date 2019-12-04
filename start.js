// AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
async function getTodos() {
  console.log("GET Request");
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      { params: { _limit: 4 } }
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// POST REQUEST
async function addTodo() {
  console.log("POST Request");
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title: "New Todo", completed: false }
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  console.log("PUT/PATCH Request");
  try {
    const response = await axios.patch(
      "https://jsonplaceholder.typicode.com/todos/1",
      { title: "New Todo", completed: false }
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// DELETE REQUEST
async function removeTodo() {
  console.log("DELETE Request");
  try {
    const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// // SIMULTANEOUS DATA
// function getData() {
//   console.log("Simultaneous Request");
//   axios
//     .all([
//       axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
//       axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
//     ])
//     .then(axios.spread((todos, posts) => showOutput(posts)))
//     .catch(err => console.error(err));
// }

// SIMULTANEOUS DATA
async function getData() {
  console.log("Simultaneous Request");
  try {
    const response = await axios.all([
      await axios.get("https://jsonplaceholder.typicode.com/todos"),
      await axios.get("https://jsonplaceholder.typicode.com/posts")
    ]);

    // axios
    //   .all([
    //     axios.get("https://jsonplaceholeder.typicode.com/todos"),
    //     axios.get("https://jsonplaceholeder.typicode.com/posts"),
    //   ])
    //   .then(
    //     axios.spread((...response) => {
    //       console.log(response[0]);
    //       showOutput(response[1]);
    //     })
    //   )
    //   .catch(error => {
    //     console.error(error);
    //   });

    const [todos, posts] = response;

    console.log(todos);

    showOutput(posts);
  } catch (error) {
    console.error(error);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  console.log("Custom Headers");

  const config = {
    headers: {
      "Contetnt-Type": "application/json",
      Authorization: "sometoken"
    }
  };

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title: "New Todo", completed: false },
      config
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");

  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data = "patka";
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
async function errorHandling() {
  console.log("Error Handling");

  console.log("GET Request");
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos7",
      { params: { _limit: 4 } }
    );
    console.log(response);

    showOutput(response);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if (error.response.status === 404) {
        alert("Error: Page Not Found");
      }
    }
  }
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);

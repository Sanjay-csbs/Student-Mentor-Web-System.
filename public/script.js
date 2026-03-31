function login() {
  fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      role: role.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.name) {
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect based on role
      if (data.role === "admin") {
        window.location = "admin.html";
      } else if (data.role === "mentor") {
        window.location = "mentor.html";
      } else {
        window.location = "dashboard.html";
      }
    } else {
      alert("Login Failed");
    }
  });
}
function allocate() {
  fetch("http://localhost:8000/allocate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      student: student.value,
      mentor: mentor.value
    })
  })
  .then(res => res.text())
  .then(data => alert(data));
}

function viewAttendance() {
  fetch("http://localhost:8000/attendance")
    .then(res => res.json())
    .then(data => console.log(data));
}
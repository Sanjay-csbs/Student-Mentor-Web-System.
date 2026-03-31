const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Data storage
let users = [];
let attendance = [];
let documents = [];

// REGISTER
app.post("/register", (req, res) => {
  users.push(req.body);
  res.send("Registered");
});

// LOGIN (Role-based)
app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email &&
         u.password === req.body.password &&
         u.role === req.body.role
  );

  if (user) res.json(user);
  else res.send("Invalid");
});

// ROLE-BASED DASHBOARD
app.get("/dashboard/:role", (req, res) => {
  res.send(`${req.params.role} dashboard`);
});

// ATTENDANCE
app.post("/attendance", (req, res) => {
  attendance.push(req.body);
  res.send("Attendance marked");
});

app.get("/attendance", (req, res) => {
  res.json(attendance);
});

// DOCUMENTS
app.post("/document", (req, res) => {
  documents.push(req.body);
  res.send("Document uploaded");
});

app.get("/document", (req, res) => {
  res.json(documents);
});

// ADMIN - allocate mentor
app.post("/allocate", (req, res) => {
  const { student, mentor } = req.body;
  res.send(`Allocated ${mentor} to ${student}`);
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
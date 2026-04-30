# Exercise — Express REST API with MongoDB

## Goal

Build a REST API using Express.js that exposes student data through a clean 3-layer architecture: **routes → controllers → services**, backed by a **MongoDB** database via Mongoose.

## What you will build

An HTTP server that responds to requests on `/api/students`, performing full CRUD operations against a MongoDB collection through three separated layers.

## Run it

```bash
cd BACK
npm install
npm run dev
```

Create a `.env` file inside `BACK/` with your MongoDB connection string:

```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
```

The server starts on `http://localhost:3000`. Use Postman or the provided frontend to test your endpoints.

> `npm run dev` uses **nodemon** — it restarts the server automatically whenever you save a file.

## Project structure

```
BACK/
├── index.js                          ← entry point: Express setup, DB connection, router mount
├── config/
│   └── db.js                         ← connects to MongoDB using Mongoose
├── models/
│   └── userModel.js                  ← Mongoose schema and model (already provided)
├── services/
│   └── studentServiceMongoDB.js      ← database logic using the User model
├── controllers/
│   └── studentsController.js         ← handles req/res, delegates to services
├── routes/
│   └── studentsRoute.js              ← maps URL paths to controller functions
```

## The 3 layers

| Layer | File | Responsibility |
|---|---|---|
| **Route** | `routes/studentsRoute.js` | Declares endpoints and points each to a controller function |
| **Controller** | `controllers/studentsController.js` | Receives `req`/`res`, awaits the service, returns JSON with the right status code |
| **Service** | `services/studentServiceMongoDB.js` | Talks to MongoDB through the Mongoose model |

## The User model

`models/userModel.js` is already written for you. It defines this schema:

```js
{
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  gpa:      { type: Number, required: true },
  password: { type: String, required: true },
}
```

Mongoose adds `_id`, `createdAt`, and `updatedAt` automatically.

## Endpoints to implement

| Method | Path | Description | Success status |
|---|---|---|---|
| `GET` | `/api/students` | Return all students | `200` |
| `GET` | `/api/students/:id` | Return one student by id | `200` |
| `POST` | `/api/students` | Create a new student | `201` |
| `PUT` | `/api/students/:id` | Update a student | `200` |
| `DELETE` | `/api/students/:id` | Delete a student | `200` |

## Steps

Work through the files in this order — each one depends on the previous:

### Step 1 — `config/db.js`
- Read `MONGO_URI` from `process.env`
- Write an `async` function `connectToMongoDB` that calls `mongoose.connect()`, logs success, and calls `process.exit(1)` on failure
- Export it

### Step 2 — `services/studentServiceMongoDB.js`
- Import the `User` model and `bcrypt`
- Export these five functions:

| Function | Mongoose method | async? |
|---|---|---|
| `findAllStudents()` | `User.find({})` | no |
| `findStudentById(id)` | `User.findById(id)` | no |
| `createStudentService(data)` | `User.create(data)` | **yes** |
| `updateStudentService(id, data)` | `User.findByIdAndUpdate(id, data)` | **yes** |
| `deleteStudentService(id)` | `User.findByIdAndDelete(id)` | no |

#### Password hashing

Passwords must **never** be stored as plain text. Use `bcrypt` to hash before persisting:

```js
const SALT_ROUNDS = 10; // controls how expensive the hash computation is

// in createStudentService:
const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
return User.create({ ...data, password: hashedPassword });
```

For updates, only hash if the payload actually contains a new password — the user might be updating their name or email without changing their password:

```js
// in updateStudentService:
if (data.password) {
  data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
}
return User.findByIdAndUpdate(id, data);
```

Both functions must be `async` because `bcrypt.hash()` returns a Promise.

### Step 3 — `controllers/studentsController.js`
- Import the service functions
- Write five `async` controllers: `getAllStudents`, `getStudentById`, `createStudent`, `updateStudent`, `deleteStudent`
- Each one must:
  - `await` the service call
  - respond with the correct status code and JSON
  - catch errors and respond with an error status + message

### Step 4 — `routes/studentsRoute.js`
- Import all five controllers
- Create an Express `Router` and wire up the five routes
- Export the router

### Step 5 — `index.js`
- Import `connectToMongoDB` and call it before starting the server
- Mount the student router at `/api/students`

## Key concepts

### async/await and Mongoose

Mongoose methods (`.find()`, `.findById()`, etc.) return **Promises**. Always `await` them in your controllers, and wrap in `try/catch`:

```js
export const getAllStudents = async (req, res) => {
  try {
    const students = await findAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### HTTP methods and CRUD

| HTTP method | CRUD operation | Typical use |
|---|---|---|
| `GET` | Read | Retrieve data |
| `POST` | Create | Send new data |
| `PUT` | Update | Replace existing data |
| `DELETE` | Delete | Remove data |

### Status codes

| Code | Meaning |
|---|---|
| `200` | OK — request succeeded |
| `201` | Created — new resource was created |
| `404` | Not Found — resource does not exist |
| `500` | Internal Server Error — something broke on the server |

## ES6 modules

`package.json` has `"type": "module"` — use `import`/`export` syntax throughout:

```js
import express from "express";
import { findAllStudents } from "../services/studentServiceMongoDB.js";

export const getAllStudents = async (req, res) => { ... };
export default studentRouter;
```

## Hints

- `req.params.id` gives you the `:id` from the URL — pass it directly to Mongoose, **no `parseInt()`** (MongoDB uses string `_id`s)
- `req.body` contains the JSON payload — make sure `express.json()` middleware is active in `index.js`
- Controllers should never contain database logic — keep that in the service layer
- Use `res.status(code).json(data)` to set the status code and send JSON in one call
- Don't forget to add your `.env` file — without `MONGO_URI` the server will exit immediately



---

## Final Assessment Submission — Mentor Circle Resource

**Author:** Makuochukwu Okoene
**Branch:** `05`
**Resource added:** Mentor Circle (school mentorship groups led by senior students)

### Schema

| Field | Type | Required |
|---|---|---|
| `name` | String | yes (unique) |
| `focus` | String | yes |
| `chief` | String | yes |
| `language` | String | yes |
| `codenames` | Array of String | no |
| `foundedYear` | Number | yes |

### Endpoints (all protected by `authCheck`)

| Method | Route | Description |
|---|---|---|
| GET | `/api/mentor-circles` | List all circles |
| GET | `/api/mentor-circles/:id` | Get one circle by ID |
| POST | `/api/mentor-circles` | Create a circle |
| PUT | `/api/mentor-circles/:id` | Update a circle |
| DELETE | `/api/mentor-circles/:id` | Delete a circle |

Authentication uses JWT via `POST /api/auth/login`. The token must be passed as `Authorization: Bearer <token>` on all `/api/mentor-circles` requests.

### How to run locally

1. `cd BACK && npm install`
2. Create `BACK/.env` with `MONGO_URI`, `JWT_SECRET`, and `PORT=3000`
3. `npm run dev`
4. Register a user: `POST /api/students` with `{ name, email, password, gpa, major }`
5. Login: `POST /api/auth/login` with `{ email, password }` to receive a token
6. Use the token to test Mentor Circle endpoints

### Testing evidence

A complete Postman collection is included in `BACK/postman/MentorCircle.postman_collection.json` covering all 6 rubric checks, including the unauthenticated `401` test.

### Architecture

Standard 3-layer pattern mirroring the student resource:

- `models/mentorCircleModel.js` — Mongoose schema
- `services/mentorCircleService.js` — Database operations
- `controllers/mentorCircleController.js` — Request handlers with try/catch and proper status codes
- `routes/mentorCircleRoute.js` — Express router protected by `authCheck` middleware

import Express from "express"
import {createConnection, QueryError, RowDataPacket} from "mysql2"
import Cors from "cors"
import bodyParser from "body-parser";
import {StudentJson} from "./Json";

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const app = Express()
app.use(Cors())
app.use(jsonParser)

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_database",
})

app.get("/", (_, response) => {
    response.send("Hello World!")
})

app.get("/students", (_, response) => {
    connection.query(
        `SELECT * FROM students ORDER BY first_name, last_name`,
        (error: QueryError, results: RowDataPacket[]) => {
            if (error) return response.json(error)
            return response.json(results)
        }
    );
})

app.post("/students/add", jsonParser, (request, response) => {
    const query = `INSERT INTO students (last_name, first_name, prelim, midterm, final) VALUES(?, ?, ?, ?, ?)`
    const body: StudentJson = request.body
    const values = [
        body.last_name,
        body.first_name,
        body.prelim ? body.prelim : null,
        body.midterm ? body.midterm : null,
        body.final ? body.final : null,
    ]
    connection.execute(query, values, (error, _) => {
        if (error) return response.json(error)
        return response.send("Student added successfully!")
    })
})

app.post("/students/update", jsonParser, (request, response) => {
    const query = `UPDATE students SET last_name = ?, first_name = ?, prelim = ?, midterm = ?, final = ? WHERE id = ?`
    const body = request.body
    const values = [
        body.last_name,
        body.first_name,
        body.prelim ? body.prelim : null,
        body.midterm ? body.midterm : null,
        body.final ? body.final : null,
        body.id,
    ]
    connection.execute(query, values, (error, _) => {
        if (error) return response.json(error)
        return response.send("Student updated successfully!")
    })
})

app.post("/students/delete/:id", urlencodedParser, (request, response) => {
    const id = request.params.id
    const query = `DELETE FROM students WHERE id = ?`
    connection.execute(query, [id], (error, _) => {
        if (error) return response.json(error)
        return response.send("Student deleted successfully!")
    })
})

app.listen(8081, () => {
    console.log("Server running on port 8081")
})
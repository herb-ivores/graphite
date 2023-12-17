import Express from "express"
import {createConnection, QueryError, ResultSetHeader, RowDataPacket} from "mysql2"
import Cors from "cors"
import bodyParser from "body-parser";

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
        `SELECT * FROM students`,
        (error: QueryError, results: RowDataPacket[]) => {
            if (error) return response.json(error)
            return response.json(results)
        }
    );
})

app.post("/students", jsonParser, (request, response) => {
    const query = `INSERT INTO students (last_name, first_name, prelim, midterm, final) VALUES(?, ?, ?, ?, ?)`
    console.log(request.body)
    const values = [
        request.body.last_name,
        request.body.first_name,
        request.body.prelim,
        request.body.midterm,
        request.body.final,
    ]
    connection.execute(query, values, (error: QueryError | null, _: ResultSetHeader) => {
        if (error) return response.json(error)
        return response.send("Student added successfully!", )
    })
})

app.listen(8081, () => {
    console.log("Server running on port 8081")
})
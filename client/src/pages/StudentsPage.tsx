import {useEffect, useState} from "react";
import {parse, StudentJson} from "../models/Json.ts";
import StudentTable from "../components/StudentTable.tsx";
import {Student} from "../models/Student.ts";
import {Link} from "react-router-dom";
import axios from "axios";

export default function StudentsPage() {
    const [students, setStudents] =
        useState<Student[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8081/students")
            .then((response) => {
                const students = response.data.map((studentJson: StudentJson) => parse(studentJson))
                setStudents(students)
            })
    });

    return (
        <div>
            <h1>Students</h1>
            <StudentTable students={students}/>
            <Link to="/add" className="btn btn-primary">Add Student</Link>
        </div>
    )
}
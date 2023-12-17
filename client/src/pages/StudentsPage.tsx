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
            <div className="card rounded-5" style={{margin: '0 14px'}}>
                <div className="card-body">
                    <StudentTable students={students}/>
                    <Link to="/add" className="btn btn-out-dashed btn-primary btn-square w-100">Add Student</Link>

                </div>
            </div>

        </div>
    )
}
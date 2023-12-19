import Axios from "axios";
import {Student} from "../models/Student.ts";
import {parse, StudentJson, toJson} from "../models/Json.ts";

const baseUrl = "http://localhost:8081"

export function getStudents(): Promise<Student[]> {
    return Axios.get(`${baseUrl}/students`)
        .then((response) => {
            const students: Student[] = response.data.map((studentJson: StudentJson) => parse(studentJson))
            return students
        })
}

export function addStudent(student: Student) {
    return Axios.post(`${baseUrl}/students/add`, toJson(student))
        .then((response) => response.data)
}

export function updateStudent(student: Student) {
    return Axios.post(`${baseUrl}/students/update`, toJson(student))
        .then((response) => response.data)
}

export function deleteStudent(student: Student) {
    return Axios.post(`${baseUrl}/students/delete/${student.id}`)
        .then((response) => response.data)
}
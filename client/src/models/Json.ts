import {Student} from "./Student.ts";

export type StudentJson = {
    id: number;
    last_name: string;
    first_name: string;
    prelim?: string;
    midterm?: string;
    final?: string;
}

export function parse(studentJson: StudentJson){
    return new Student(
        studentJson.last_name,
        studentJson.first_name,
        studentJson.prelim ? parseFloat(studentJson.prelim) : undefined,
        studentJson.midterm ? parseFloat(studentJson.midterm) : undefined,
        studentJson.final ? parseFloat(studentJson.final) : undefined,
        studentJson.id,
    )
}

export function toJson(student: Student) {
    return {
        id: student.id,
        last_name: student.lastName,
        first_name: student.firstName,
        prelim: student._prelim,
        midterm: student._midterm,
        final: student._final,
    } as StudentJson
}
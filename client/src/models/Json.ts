import {Student} from "./Student.ts";

export type StudentJson = {
    id: number;
    last_name: string;
    first_name: string;
    prelim?: string | null;
    midterm?: string | null;
    final?: string | null;
}

export function parse(studentJson: StudentJson){
    return new Student(
        studentJson.last_name,
        studentJson.first_name,
        studentJson.prelim != null ? parseFloat(studentJson.prelim) : undefined,
        studentJson.midterm != null ? parseFloat(studentJson.midterm) : undefined,
        studentJson.final != null ? parseFloat(studentJson.final) : undefined,
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
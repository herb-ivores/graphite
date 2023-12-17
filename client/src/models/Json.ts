import {Student} from "./Student.ts";

export type StudentJson = {
    id: number;
    last_name: string;
    first_name: string;
    prelim: string;
    midterm: string;
    final: string;
}

export function parse(studentJson: StudentJson){
    return new Student(
        studentJson.last_name,
        studentJson.first_name,
        parseFloat(studentJson.prelim),
        parseFloat(studentJson.midterm),
        parseFloat(studentJson.final),
        studentJson.id,
    )
}
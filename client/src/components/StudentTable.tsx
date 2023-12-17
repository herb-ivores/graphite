import '../css/BettrTabl.css'
import {Student, Status} from "../models/Student.ts";

interface Props {
    readonly students: Student[]
}

function StudentTable({students}: Props) {
    return (
        <table className="table table-striped bettr-tabl">
            <thead>
            <tr>
                <th scope="col">Student</th>
                <th scope="col" style={{textAlign: "center"}}>Prelim</th>
                <th scope="col" style={{textAlign: "center"}}>Midterm</th>
                <th scope="col" style={{textAlign: "center"}}>Final</th>
                <th scope="col" style={{textAlign: "center"}}>Average</th>
                <th scope="col" style={{textAlign: "center"}}>Status</th>
            </tr>
            </thead>
            <tbody>
            {students.map(student => (
                <tr key={student.id}>
                    <td width="40%">{student.lastName}, {student.firstName}</td>
                    <td width="12%" style={{textAlign: "center"}}>{student.prelim}</td>
                    <td width="12%" style={{textAlign: "center"}}>{student.midterm}</td>
                    <td width="12%" style={{textAlign: "center"}}>{student.final}</td>
                    <td width="12%" style={{textAlign: "center"}}>{student.average}</td>
                    <td width="12%" style={{textAlign: "center"}}>
                        <span
                            className={"badge rounded-pill"}
                            style={{
                                backgroundColor: student.status == Status.Passed ? `#e8fee9` : `#ffe9ed`,
                                color: student.status == Status.Passed ? `#008700` : `#c20007`
                            }}>
                            {student.status}
                        </span>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default StudentTable;
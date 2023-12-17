import {useState} from "react";
import axios from "axios";

export default function AddStudentPage() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [prelim, setPrelim] = useState(0);
    const [midterm, setMidterm] = useState(0);
    const [final, setFinal] = useState(0);

    return (
        <div>
            <h1>Add Student</h1>
            <div className="mb-2">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName"
                       onChange={(newLastName) =>
                           setLastName(newLastName.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName"
                       onChange={(newFirstName) =>
                           setFirstName(newFirstName.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="prelim" className="form-label">Prelim</label>
                <input type="number" className="form-control" id="prelim"
                       onChange={(newPrelim) =>
                           setPrelim(parseInt(newPrelim.target.value))}/>
            </div>
            <div className="mb-2">
                <label htmlFor="midterm" className="form-label">Midterm</label>
                <input type="number" className="form-control" id="midterm"
                       onChange={(newMidterm) =>
                           setMidterm(parseInt(newMidterm.target.value))}/>
            </div>
            <div className="mb-2">
                <label htmlFor="final" className="form-label">Final</label>
                <input type="number" className="form-control" id="final"
                       onChange={(newFinal) =>
                           setFinal(parseInt(newFinal.target.value))}/>
            </div>
            <button className="btn btn-primary"
                    onClick={() => {
                        const student = {
                            last_name: lastName,
                            first_name: firstName,
                            prelim: prelim,
                            midterm: midterm,
                            final: final,
                        }
                        console.table(student);
                        axios.post("http://localhost:8081/students", student)
                            .then((response) => {
                                console.log(response);
                            })
                    }}>Add Student
            </button>
        </div>
    );
}
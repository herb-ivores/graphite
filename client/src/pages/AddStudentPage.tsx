import {useState} from "react";
import axios from "axios";
import parseString from "../extensions/ParseString.ts";
import {useNavigate} from "react-router-dom";

export default function AddStudentPage() {
    const navigate = useNavigate();

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
                <input type="text"
                       className="form-control"
                       id="lastName"
                       value={lastName}
                       onChange={(newLastName) =>
                           setLastName(newLastName.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text"
                       className="form-control"
                       id="firstName"
                       value={firstName}
                       onChange={(newFirstName) =>
                           setFirstName(newFirstName.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="prelim" className="form-label">Prelim</label>
                <input type="number"
                       className="form-control"
                       id="prelim"
                       value={parseString(prelim)}
                       onChange={(newPrelim) =>
                           setPrelim(parseInt(newPrelim.target.value))}/>
            </div>
            <div className="mb-2">
                <label htmlFor="midterm" className="form-label">Midterm</label>
                <input type="number"
                       className="form-control" id="midterm"
                       value={parseString(midterm)}
                       onChange={(newMidterm) =>
                           setMidterm(parseInt(newMidterm.target.value))}/>
            </div>
            <div className="mb-2">
                <label htmlFor="final" className="form-label">Final</label>
                <input type="number"
                       className="form-control"
                       id="final"
                       value={parseString(final)}
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
                        axios.post("http://localhost:8081/students", student)
                            .then((response) => {
                                console.log(response);
                            })
                        navigate("..")
                    }}>
                Add Student
            </button>
        </div>
    );
}
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddStudentPage from "./pages/AddStudentPage.tsx";
import StudentsPage from "./pages/StudentsPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<StudentsPage/>}/>
                <Route path="add" element={<AddStudentPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
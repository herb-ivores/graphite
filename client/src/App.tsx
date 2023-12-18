import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddStudentPage from "./pages/AddStudentPage.tsx";
import NewStudentsPage from "./pages/NewStudentsPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<NewStudentsPage/>}/>
                <Route path="add" element={<AddStudentPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import StudentsPage from "./pages/StudentsPage.tsx";
// import AddStudentPage from "./pages/AddStudentPage.tsx";

import TopBar from "./components/topbar/TopBar.tsx";

export default function App() {
    return (
        // <BrowserRouter>
        //     <Routes>
        //         <Route index element={<StudentsPage/>}/>
        //         <Route path="add" element={<AddStudentPage/>}/>
        //     </Routes>
        // </BrowserRouter>
        <TopBar/>
    )
}
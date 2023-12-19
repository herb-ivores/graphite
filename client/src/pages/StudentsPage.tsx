import TopBar from "../components/topbar/TopBar.tsx";
import {Flex} from "@chakra-ui/react";
import colors from "../styles/Colors.ts";
import StudentTable from "../components/table/StudentTable.tsx";
import {Student} from "../models/Student.ts";
import {useEffect, useState} from "react";
import {getStudents, updateStudent} from "../data/Database.ts";

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const [students, setStudents] =
        useState<Student[]>([]);

    const studentsToShow = students.filter(student =>
        `${student.lastName}, ${student.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()))

    const [selectedStudent, setSelectedStudent] =
        useState<Student | undefined>(undefined)

    useEffect(() => {
        getStudents().then(students => setStudents(students))
    });

    return (
        <Flex
            direction="column"
            paddingStart={4}
            paddingTop={4}
            paddingEnd={4}
            paddingBottom={0}
            width="100%"
            height="calc(100vh)"
            gap={4}
            background={colors.light.surfaceVariant}
        >
            <TopBar
                query={selectedStudent?.lastName ?? ""}
                onQueryChange={setSearchQuery}
            />
            <StudentTable
                flexGrow={1}
                students={studentsToShow}
                selectedStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                onUpdateStudent={student => {
                    updateStudent(student).then(response => console.log(response))
                    setSelectedStudent(undefined)
                }}
            />
        </Flex>
    )
}
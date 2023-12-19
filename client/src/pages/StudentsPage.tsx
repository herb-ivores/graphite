import TopBar from "../components/topbar/TopBar.tsx";
import {Flex} from "@chakra-ui/react";
import colors from "../styles/Colors.ts";
import StudentTable from "../components/table/StudentTable.tsx";
import {Student} from "../models/Student.ts";
import {getStudents, updateStudent} from "../data/Database.ts";
import {useEffect, useMemo, useState} from "react";
import SortingType from "../components/enum/SortingType.ts";


export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState<SortingType>(SortingType.Prelim)
    const [sortAscending, setSortAscending] = useState(true)
    const [sortingName, setSortingName] = useState(false)
    const [students, setStudents] =
        useState<Student[]>([]);

    const studentsToShow = students.filter(student =>
        `${student.lastName}, ${student.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()))

    const studentsToShow = useMemo(() => {
        return students.filter(student =>
            `${student.lastName}, ${student.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                if (sortingName) {
                    return a.firstName.localeCompare(b.firstName);
                } else {
                    const aValue = a[sortType] ?? 0;
                    const bValue = b[sortType] ?? 0;

                    return sortAscending ? aValue - bValue : bValue - aValue;
                }
            });
    }, [searchQuery, students, sortType,sortAscending, sortingName])

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
                query={searchQuery}
                onQueryChange={setSearchQuery}
            />
            <StudentTable
                onPrelimSort={()=> {
                    setSortingName(false)
                    setSortAscending(!sortAscending)
                    setSortType(SortingType.Prelim)
                }}
                onMidtermSort={()=> {
                    setSortAscending(!sortAscending)
                    setSortType(SortingType.Midterm)
                }}
                onFinalSort={()=>{
                    setSortingName(false)
                    setSortAscending(!sortAscending)
                    setSortType(SortingType.Final)
                }}
                onAverageSort={()=>{
                    setSortingName(false)
                    setSortAscending(!sortAscending)
                    setSortType(SortingType.Average)
                }}
                onNameSort={()=>{
                    setSortingName(!sortingName)
                }}
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
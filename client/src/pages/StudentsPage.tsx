import TopBar from "../components/topbar/TopBar.tsx";
import {Flex} from "@chakra-ui/react";
import colors from "../styles/Colors.ts";
import StudentTable from "../components/table/StudentTable.tsx";
import {Student} from "../models/Student.ts";
import {addStudent, deleteStudent, getStudents, updateStudent} from "../data/Database.ts";
import {useEffect, useMemo, useState} from "react";
import SortingType from "../components/enum/SortingType.ts";
import QuerySymbol from "../components/enum/QuerySymbol.ts";


export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState<SortingType | undefined>(undefined)
    const [grade, setGrade] = useState<number | undefined>(undefined)
    const [findingType, setFindingType] = useState<SortingType | undefined>(undefined)
    const [querySymbol, setQuerySymbol] = useState<QuerySymbol>(QuerySymbol.Equal)
    const [sortAscending, setSortAscending] = useState(true)
    const [sortingName, setSortingName] = useState(true)
    const [students, setStudents] =
        useState<Student[]>([]);

    function openFilterModal(filterType: SortingType) {
        setFindingType(filterType === findingType ? undefined : filterType)
    }

    const studentsToShow = useMemo(() => {
        return students.filter(student =>
            `${student.lastName}, ${student.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter(student => {
                if (findingType !== undefined && grade !== undefined) {
                    if (querySymbol === QuerySymbol.Equal) {
                        return (student[findingType] ?? 0) === grade;
                    } else if (querySymbol === QuerySymbol.GreaterThan) {
                        return (student[findingType] ?? 0) > (grade);
                    } else if (querySymbol === QuerySymbol.LessThan) {
                        return (student[findingType] ?? 0) < grade;
                    } else if (querySymbol == QuerySymbol.GreaterOrEqualTo) {
                        return (student[findingType] ?? 0) >= grade;
                    } else if (querySymbol == QuerySymbol.LessOrEqualTo) {
                        return (student[findingType] ?? 0) <= grade;
                    } else {
                        return true;
                    }
                } else {
                    return true
                }
            })
            .sort((a, b) => {
                if (sortingName) {
                    return sortAscending ? a.firstName.localeCompare(b.firstName) :
                        b.firstName.localeCompare(a.firstName);
                } else {
                    const aValue = a[sortType ?? SortingType.Prelim] ?? 0;
                    const bValue = b[sortType ?? SortingType.Prelim] ?? 0;

                    return sortAscending ? aValue - bValue : bValue - aValue;
                }
            });
    }, [searchQuery, students, sortType, sortAscending, sortingName, grade, findingType, querySymbol])

    const [addingStudent, setAddingStudent] = useState(false)

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
                grade={grade}
                onChangeGrade={(newGrade) => setGrade(newGrade)}
                querySymbol={querySymbol}
                onChangeQuerySymbol={(newQuery) => setQuerySymbol(newQuery)}
                filterVisibility={findingType !== undefined}
                onCloseFilter={() => {
                    setFindingType(undefined)
                    setGrade(undefined)
                }}
            />

            <StudentTable
                onFindByPrelim={() => {
                    openFilterModal(SortingType.Prelim)
                }}
                onFindByMidterm={() => {
                    openFilterModal(SortingType.Midterm)
                }}
                onFindByFinal={() => {
                    openFilterModal(SortingType.Final)
                }}
                onFindByAverage={() => {
                    openFilterModal(SortingType.Average)
                }}
                onPrelimSort={() => {
                    setSortingName(false)
                    setSortAscending(sortType === SortingType.Prelim ? !sortAscending : true)
                    setSortType(SortingType.Prelim)
                }}
                onMidtermSort={() => {
                    setSortingName(false)
                    setSortAscending(sortType === SortingType.Midterm ? !sortAscending : true)
                    setSortType(SortingType.Midterm)
                }}
                onFinalSort={() => {
                    setSortingName(false)
                    setSortAscending(sortType === SortingType.Final ? !sortAscending : true)
                    setSortType(SortingType.Final)
                }}
                onAverageSort={() => {
                    setSortingName(false)
                    setSortAscending(sortType === SortingType.Average ? !sortAscending : true)
                    setSortType(SortingType.Average)
                }}
                onNameSort={() => {
                    setSortingName(true)
                    setSortAscending(sortingName ? !sortAscending : true)
                    setSortType(undefined)
                }}
                flexGrow={1}
                students={studentsToShow}
                addingStudent={addingStudent}
                onAddingStudent={() => setAddingStudent(true)}
                onAddStudent={student => {
                    addStudent(student).then(response => console.log(response))
                    setAddingStudent(false)
                }}
                selectedStudent={selectedStudent}
                onSelectStudent={setSelectedStudent}
                onUpdateStudent={student => {
                    updateStudent(student).then(response => console.log(response))
                    setSelectedStudent(undefined)
                }}
                onDeleteStudent={student => {
                    deleteStudent(student).then(response => console.log(response))
                }}
                sortingName={sortingName}
                sortingType={sortType}
                sortAscending={sortAscending}
                findingType={findingType}
            />
        </Flex>
    )
}
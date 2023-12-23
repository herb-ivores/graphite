import {Student} from "../../models/Student.ts";
import {Box, Button, Flex, FlexProps, IconButton, ResponsiveValue, Text} from "@chakra-ui/react";
import StudentRow, {EditableStudentRowContent} from "./StudentRow.tsx";
import {ChevronDownIcon, ChevronUpIcon, SearchIcon, UpDownIcon} from '@chakra-ui/icons'
import {useState} from "react";
import SortingType from "../enum/SortingType.ts";

interface TextWithSortButtonProps {
    text: string
    width: ResponsiveValue<string>
    onSort?: () => void
    onFind?: () => void
    sortActive?: boolean
    sortAscending?: boolean
    showFindButton?: boolean
    findActive?: boolean
}

function TextWithSortButton(
    {
        text,
        width,
        onSort,
        onFind,
        showFindButton,
        sortActive,
        sortAscending,
        findActive,
    }: TextWithSortButtonProps) {
    const [isHoveringSort, setIsHoveringSort] = useState(false)
    const [isHoveringFind, setIsHoveringFind] = useState(false)

    return (
        <Box
            width={width}
            margin={2}
            fontWeight="semibold"
            alignItems="center"
        >
            <Flex alignItems="center">
                <Text>{text}</Text>
                <IconButton
                    aria-label="Sort"
                    size="sm"
                    variant="ghost"
                    onClick={onSort}
                    colorScheme="none"
                    icon={!sortActive ? <UpDownIcon/> : sortAscending ? <ChevronDownIcon/> : <ChevronUpIcon/>}
                    onMouseEnter={() => setIsHoveringSort(true)}
                    onMouseLeave={() => setIsHoveringSort(false)}
                    style={{opacity: (isHoveringSort || sortActive) ? 1 : 0.2}}
                />
                {showFindButton && <IconButton
                    aria-label="Find"
                    size="sm"
                    variant="ghost"
                    onClick={onFind}
                    colorScheme="none"
                    icon={<SearchIcon/>}
                    onMouseEnter={() => setIsHoveringFind(true)}
                    onMouseLeave={() => setIsHoveringFind(false)}
                    style={{opacity: (isHoveringFind || findActive) ? 1 : 0.2}}
                />}
            </Flex>
        </Box>
    );
}

interface StudentTableProps extends FlexProps {
    students: Student[]
    addingStudent: boolean
    onAddingStudent: () => void
    onAddStudent: (student: Student) => void
    selectedStudent?: Student
    onSelectStudent: (student?: Student) => void
    onUpdateStudent: (student: Student) => void
    onDeleteStudent: (student: Student) => void
    sortingName: boolean
    sortingType?: SortingType
    sortAscending: boolean
    onPrelimSort: () => void
    onMidtermSort: () => void
    onFinalSort: () => void
    onAverageSort: () => void
    onNameSort: () => void
    findingType?: SortingType
    onFindByPrelim: () => void
    onFindByMidterm: () => void
    onFindByFinal: () => void
    onFindByAverage: () => void
}

export default function StudentTable(props: StudentTableProps) {
    const {
        students,
        addingStudent,
        onAddingStudent,
        onAddStudent,
        selectedStudent,
        onSelectStudent,
        onUpdateStudent,
        onDeleteStudent,
        sortingName,
        sortingType,
        sortAscending,
        onPrelimSort,
        onMidtermSort,
        onFinalSort,
        onAverageSort,
        onNameSort,
        findingType,
        onFindByPrelim,
        onFindByMidterm,
        onFindByFinal,
        onFindByAverage,
    } = props
    return (
        <Flex
            direction="column"
            backgroundColor="#FFFBFE"
            borderTopStartRadius={24}
            borderTopEndRadius={24}
            borderBottomEndRadius={0}
            borderBottomStartRadius={0}
            {...props}
        >
            <Flex>
                <Box width={6}/>
                <TextWithSortButton
                    text="Student"
                    width="40%"
                    onSort={onNameSort}
                    sortActive={sortingName}
                    sortAscending={sortAscending}
                />
                <TextWithSortButton
                    text="Prelim"
                    width="12%"
                    onSort={onPrelimSort}
                    onFind={onFindByPrelim}
                    showFindButton
                    sortActive={sortingType == SortingType.Prelim}
                    sortAscending={sortAscending}
                    findActive={findingType == SortingType.Prelim}
                />
                <TextWithSortButton
                    text="Midterm"
                    width="12%"
                    onSort={onMidtermSort}
                    onFind={onFindByMidterm}
                    showFindButton
                    sortActive={sortingType == SortingType.Midterm}
                    sortAscending={sortAscending}
                    findActive={findingType == SortingType.Midterm}
                />
                <TextWithSortButton
                    text="Final"
                    width="12%"
                    onSort={onFinalSort}
                    onFind={onFindByFinal}
                    showFindButton
                    sortActive={sortingType == SortingType.Final}
                    sortAscending={sortAscending}
                    findActive={findingType == SortingType.Final}
                />
                <TextWithSortButton
                    text="Average"
                    width="12%"
                    onSort={onAverageSort}
                    onFind={onFindByAverage}
                    showFindButton
                    sortActive={sortingType == SortingType.Average}
                    sortAscending={sortAscending}
                    findActive={findingType == SortingType.Average}
                />
                <Flex width="11%" margin={2} fontWeight="semibold" alignItems="center">Status</Flex>
            </Flex>
            {!addingStudent ? (
                <Button colorScheme='purple'
                        variant='ghost'
                        width='auto'
                        _hover={{border: "Color"}}
                        _focus={{border: "3px dotted"}}
                        margin={'10px'}
                        border={"3px dotted"}
                        onClick={onAddingStudent}
                >Add Student</Button>
            ) : <Flex alignItems="center" justifyContent="center">
                <Box width={6}/>
                <EditableStudentRowContent onSave={student => onAddStudent(student)} adding/>
                <Box width={6}/>
            </Flex>}
            {students.map((student, index) => {
                return (
                    <StudentRow
                        key={student.id}
                        student={student}
                        selected={student.id == selectedStudent?.id}
                        onSelect={() => onSelectStudent(student)}
                        onUpdate={student => onUpdateStudent(student)}
                        onDelete={() => onDeleteStudent(student)}
                        backgroundColor={index % 2 ? `#FFFFFF00` : `#EADDFF33`}
                    />)
            })}
        </Flex>
    )
}
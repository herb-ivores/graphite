import {Student} from "../../models/Student.ts";
import {Box, Flex, FlexProps, ResponsiveValue, Text} from "@chakra-ui/react";
import StudentRow, {EditableStudentRowContent} from "./StudentRow.tsx";
import {Button} from '@chakra-ui/react'
import {UpDownIcon} from '@chakra-ui/icons'
import colors from "../../styles/Colors.ts";
import {useState} from "react";

interface StudentTableProps extends FlexProps {
    students: Student[]
    addingStudent: boolean
    onAddingStudent: () => void
    onAddStudent: (student: Student) => void
    selectedStudent?: Student
    onSelectStudent: (student?: Student) => void
    onUpdateStudent: (student: Student) => void
    onPrelimSort: () => void
    onMidtermSort: () => void
    onFinalSort: () => void
    onAverageSort: () => void
    onNameSort: () => void
}

interface TextWithSortButtonProps {
    text: string
    width: ResponsiveValue<string>
    onClick?: () => void
}

const TextWithSortButton = ({text, width, onClick}: TextWithSortButtonProps) => {

    const [isHovered, setIsHovered] = useState(false);
    return (
        <Box
            width={width}
            margin={2}
            fontWeight="semibold"
            alignItems="center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Flex>
                <Text>{text}</Text>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClick}
                    colorScheme="none"
                >
                    <UpDownIcon
                        visibility={isHovered ? "visible" : "hidden"}
                        as="button"
                        color={colors.light.onSurface}
                    />
                </Button>
            </Flex>
        </Box>
    );
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
        onPrelimSort,
        onMidtermSort,
        onFinalSort,
        onAverageSort,
        onNameSort,
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
                <Box width={5}/>
                <TextWithSortButton text="Student" width="40%" onClick={onNameSort}/>
                <TextWithSortButton text="Prelim" width="12%" onClick={onPrelimSort}/>
                <TextWithSortButton text="Midterm" width="12%" onClick={onMidtermSort}/>
                <TextWithSortButton text="Final" width="12%" onClick={onFinalSort}/>
                <TextWithSortButton text="Average" width="12%" onClick={onAverageSort}/>
                <Text width="11%" margin={2} fontWeight="semibold" alignItems="center">Status</Text>
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
                        onUpdateStudent={student => onUpdateStudent(student)}
                        backgroundColor={index % 2 ? `#FFFFFF00` : `#EADDFF33`}
                    />)
            })}
        </Flex>
    )
}
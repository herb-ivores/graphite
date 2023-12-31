import {Status, Student} from "../../models/Student.ts";
import {Badge, Box, Button, Flex, FlexProps, Input, NumberInput, NumberInputField, Text} from "@chakra-ui/react";
import colors from "../../styles/Colors.ts";
import {useMemo, useState} from "react";
import {AddIcon, CheckIcon} from "@chakra-ui/icons";
import AlertDialog from "./AlertDialog.tsx";

interface StudentRowContentProps {
    student: Student
    isHovered: boolean
    onDelete: () => void
}

function StudentRowContent({student, isHovered, onDelete}: StudentRowContentProps) {
    return <>
        <Text width="40%" margin={4} align="start">{`${student.firstName} ${student.lastName}`}</Text>
        <Text width="12%" margin={4} align="center">{student.prelim}</Text>
        <Text width="12%" margin={4} align="center">{student.midterm}</Text>
        <Text width="12%" margin={4} align="center">{student.final}</Text>
        <Text width="12%" margin={4} align="center">{student.average}</Text>
        <Flex width="12%" margin={4} fontWeight="semibold" alignItems="center" justifyContent="center">
            <Badge
                backgroundColor={student.status == Status.Passed ? `#e8fee9` : `#ffe9ed`}
                color={student.status == Status.Passed ? `#008700` : `#c20007`}
                alignSelf="center"
            >
                {student.status}
            </Badge>

        </Flex>
        <Box width={16}>
            {isHovered && (
                <AlertDialog studentName={student.firstName} onDelete={onDelete}/>
            )}
        </Box>
    </>;
}

interface EditableStudentRowContentProps {
    student?: Student
    onSave: (student: Student) => void
    adding?: boolean
}

export function EditableStudentRowContent({student, onSave, adding}: EditableStudentRowContentProps) {
    const [lastName, setLastName] = useState(student?.lastName ?? "")
    const [firstName, setFirstName] = useState(student?.firstName ?? "")
    const [prelim, setPrelim] = useState<number | undefined>(student?._prelim)
    const [midterm, setMidterm] = useState<number | undefined>(student?._midterm)
    const [final, setFinal] = useState<number | undefined>(student?._final)

    const newStudent = useMemo(
        () => new Student(lastName, firstName, prelim, midterm, final, student?.id),
        [lastName, firstName, prelim, midterm, final, student?.id])

    const [lastNameEmpty, setLastNameEmpty] = useState(false)
    const [firstNameEmpty, setFirstNameEmpty] = useState(false)

    return <>
        <Flex width="40%" margin={4} alignItems="center" justifyContent="center">
            <Input
                isInvalid={firstNameEmpty}
                placeholder={!firstNameEmpty ? "First name" : "First name required"}
                width="50%"
                marginEnd={2}
                value={firstName}
                onChange={newFirstName => {
                    setFirstName(newFirstName.target.value)
                    setFirstNameEmpty(false)
                }}
            />
            <Input
                isInvalid={lastNameEmpty}
                placeholder={!lastNameEmpty ? "Last name" : "Last name required"}
                width="50%"
                marginStart={2}
                value={lastName}
                onChange={newLastName => {
                    setLastName(newLastName.target.value)
                    setLastNameEmpty(false)
                }}
            />
        </Flex>
        <NumberInput
            width="12%"
            defaultValue={prelim ?? ""}
            margin={4}
            step={0.01}
        >
            <NumberInputField
                placeholder="Prelim"
                textAlign="center"
                value={prelim ?? ""}
                onChange={newPrelim => {
                    const parsedPrelim = parseFloat(newPrelim.target.value)
                    setPrelim(isNaN(parsedPrelim) ? undefined : parsedPrelim)
                }}
            />
        </NumberInput>
        <NumberInput
            width="12%"
            defaultValue={midterm ?? ""}
            margin={4}
            step={0.01}
        >
            <NumberInputField
                placeholder="Midterm"
                textAlign="center"
                value={midterm ?? ""}
                onChange={newMidterm => {
                    const parsedMidterm = parseFloat(newMidterm.target.value)
                    setMidterm(isNaN(parsedMidterm) ? undefined : parsedMidterm)
                }}
            />
        </NumberInput>
        <NumberInput
            width="12%"
            defaultValue={final ?? ""}
            margin={4}
            step={0.01}
        >
            <NumberInputField
                placeholder="Final"
                textAlign="center"
                value={final ?? ""}
                onChange={newFinal => {
                    const parsedFinal = parseFloat(newFinal.target.value)
                    setFinal(isNaN(parsedFinal) ? undefined : parsedFinal)
                }}
            />
        </NumberInput>
        <Text width="12%" margin={4} align="center">
            {(prelim !== undefined && midterm !== undefined && final !== undefined) ?
                ((prelim + midterm + final) / 3).toFixed(2) : undefined}
        </Text>
        <Flex width="12%" margin={4} fontWeight="semibold" alignItems="center" justifyContent="center">
            {student !== undefined ? (
                <Badge
                    backgroundColor={newStudent.status == Status.Passed ? `#e8fee9` : `#ffe9ed`}
                    color={newStudent.status == Status.Passed ? `#008700` : `#c20007`}
                    alignSelf="center"
                >
                    {newStudent.status}
                </Badge>
            ) : <></>}
        </Flex>
        <Box width={12}>
            <Button variant="ghost" size="sm" onClick={() => {
                let hasError = false;
                if (lastName.trim().length === 0) {
                    setLastNameEmpty(true)
                    hasError = true
                }
                if (firstName.trim().length === 0) {
                    setFirstNameEmpty(true)
                    hasError = true
                }
                if (!hasError) {onSave(newStudent)}
            }}>
                {adding ? <AddIcon color={colors.light.onPrimaryContainer}/> :
                    <CheckIcon color={colors.light.onPrimaryContainer}/>}
            </Button>
        </Box>
    </>
}

interface StudentRowProps extends FlexProps {
    student: Student,
    selected?: boolean,
    onSelect: () => void,
    onUpdate: (newStudent: Student) => void,
    onDelete: () => void
}

export default function StudentRow(props: StudentRowProps) {
    const {student, selected, onSelect, onUpdate, onDelete} = props
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Flex
            {...props} alignItems="center"
            _hover={{backgroundColor: colors.light.primaryContainer}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if (!selected) {
                    onSelect()
                }
            }}
            as="button"
        >
            <Box width={6}/>
            {!selected ?
                <StudentRowContent student={student} isHovered={isHovered} onDelete={onDelete}/> :
                <EditableStudentRowContent student={student} onSave={onUpdate}/>}
            <Box width={6}/>
        </Flex>
    )
}
import {Student} from "../../models/Student.ts";
import {Box, Flex, FlexProps, Text} from "@chakra-ui/react";
import StudentRow from "./StudentRow.tsx";

interface StudentTableProps extends FlexProps {
    students: Student[]
}

export default function StudentTable(props: StudentTableProps) {
    const {students} = props
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
                <Text width="40%" margin={4} fontWeight="semibold">Student</Text>
                <Text width="12%" margin={4} align="center" fontWeight="semibold">Prelim</Text>
                <Text width="12%" margin={4} align="center" fontWeight="semibold">Midterm</Text>
                <Text width="12%" margin={4} align="center" fontWeight="semibold">Final</Text>
                <Text width="12%" margin={4} align="center" fontWeight="semibold">Average</Text>
                <Text width="12%" margin={4} align="center" fontWeight="semibold">Status</Text>
                <Box width={12}/>
                <Box width={6}/>
            </Flex>
            {students.map((student, index) => (
                <StudentRow key={student.id} student={student} backgroundColor={index % 2 ? `#FFFFFF00` : `#EADDFF33`}/>
            ))}
        </Flex>
    )
}
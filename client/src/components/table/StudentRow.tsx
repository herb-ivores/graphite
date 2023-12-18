import {Status, Student} from "../../models/Student.ts";
import {Badge, Box, Flex, FlexProps, Text} from "@chakra-ui/react";

interface StudentRowProps extends FlexProps {
    student: Student
}

export default function StudentRow(props: StudentRowProps) {
    const {student} = props
    return (
        <Flex {...props}>
            <Box width={6}/>
            <Text width="40%" margin={4}>{`${student.lastName}, ${student.firstName}`}</Text>
            <Text width="12%" margin={4} align="center">{student.prelim}</Text>
            <Text width="12%" margin={4} align="center">{student.midterm}</Text>
            <Text width="12%" margin={4} align="center">{student.final}</Text>
            <Text width="12%" margin={4} align="center">{student.average}</Text>
            <Box width="12%" margin={4} fontWeight="semibold" alignItems="center">
                <Badge
                    backgroundColor={student.status == Status.Passed ? `#e8fee9` : `#ffe9ed`}
                    color={student.status == Status.Passed ? `#008700` : `#c20007`}
                    alignSelf="center"
                >
                    Passed
                </Badge>
            </Box>
            <Box width={12}/>
            <Box width={6}/>
        </Flex>
    )

}
import {Status, Student} from "../../models/Student.ts";
import {Badge, Box, Flex, FlexProps, Text} from "@chakra-ui/react";
import colors from "../../styles/Colors.ts";
import  {useState} from "react";
import AlertDialog from "./AlertDialog.tsx";


interface StudentRowProps extends FlexProps {
    student: Student
}

export default function StudentRow(props: StudentRowProps) {
    const {student} = props
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Flex {...props} alignItems="center"
              _hover={{backgroundColor: colors.light.primaryContainer}}
              _active={{backgroundColor: colors.light.primary}}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
        >
            <Box width={6}/>
            <Text width="40%" margin={4}>{`${student.lastName}, ${student.firstName}`}</Text>
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
            <Box width={12}>
                {isHovered && (
                   <AlertDialog studentName={student.firstName}/>
                )}

            </Box>
            <Box width={6}/>
        </Flex>
    )

}
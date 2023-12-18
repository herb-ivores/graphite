import {Student} from "../../models/Student.ts";
import {Box, Flex, FlexProps, ResponsiveValue, Text} from "@chakra-ui/react";
import StudentRow from "./StudentRow.tsx";
import { Button } from '@chakra-ui/react'
import{UpDownIcon} from '@chakra-ui/icons'
import colors from "../../styles/Colors.ts";

interface StudentTableProps extends FlexProps {
    students: Student[]
}

interface TextWithSortButtonProps{
    text: string
    width: ResponsiveValue<string>
    onClick?: () => void
}

const TextWithSortButton = ({text, width, onClick}: TextWithSortButtonProps) => {
    return(
        <Box width={width} margin={2} fontWeight="semibold" alignItems="center">
            <Flex>
                <Text>{text}</Text>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClick}
                    colorScheme="none"
                >
                    <UpDownIcon as="button" color={colors.light.surfaceVariant}/>
                </Button>
            </Flex>
        </Box>
    );
}

export default function StudentTable(props: StudentTableProps) {
    const {students} = props
    return (
        <Flex
            direction="column"
            backgroundColor="#FFFBFE"
            borderTopStartRadius={20}
            borderTopEndRadius={24}
            borderBottomEndRadius={0}
            borderBottomStartRadius={0}
            {...props}
        >
            <Flex>
                <Box width={5}/>
                <TextWithSortButton text="Student" width="40%"/>
                <TextWithSortButton text="Prelim" width="12%"/>
                <TextWithSortButton text="Midterm" width="12%"/>
                <TextWithSortButton text="Final" width="12%"/>
                <TextWithSortButton text="Average" width="12%"/>
                <TextWithSortButton text="Status" width="12%"/>
            </Flex>
            <Button colorScheme='purple'
                    variant='ghost'
                    width='auto'
                    _hover={{ border: "Color" }}
                    _focus={{ border: "3px dotted" }}
                    margin={'10px'}
                    border={"3px dotted"}
            >
                Add Student
            </Button>
            {students.map((student, index) => (
                <StudentRow key={student.id} student={student} backgroundColor={index % 2 ? `#FFFFFF00` : `#EADDFF33`}/>
            ))}
        </Flex>
    )
}
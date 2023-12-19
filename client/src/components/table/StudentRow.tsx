import {Status, Student} from "../../models/Student.ts";
import {Badge, Box, Button, Flex, FlexProps, Input, Text} from "@chakra-ui/react";
import colors from "../../styles/Colors.ts";
import AlertDialog from "./AlertDialog.tsx";
import {useState} from "react";
import {CheckIcon, DeleteIcon} from "@chakra-ui/icons";

// TODO: Fix all grade ? grade : undefined

interface StudentRowProps extends FlexProps {
    student: Student,
    selected?: boolean,
    onSelect: () => void,
}

export default function StudentRow(props: StudentRowProps) {
    const {student, selected, onSelect} = props
    const [isHovered, setIsHovered] = useState(false);


    const [lastName, setLastName] = useState(student.lastName)
    // const [firstName, setFirstName] = useState(student.firstName)
    const [prelim, setPrelim] = useState<number | undefined>(student?._prelim)
    const [midterm, setMidterm] = useState<number | undefined>(student?._midterm)
    const [final, setFinal] = useState<number | undefined>(student?._final)

    return (
        <Flex
            {...props} alignItems="center"
            _hover={{backgroundColor: colors.light.primaryContainer}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}
            as="button"
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
            {!selected ? <>
                <Text width="40%" margin={4} align="start">{`${student.lastName}, ${student.firstName}`}</Text>
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
                        <Button variant="ghost" size="sm">
                            <DeleteIcon color={colors.light.onPrimaryContainer}/>
                        </Button>
                    )}
                </Box>
            </> : <>
                {/*TODO: Add first name*/}
                <Input
                    width="40%"
                    margin={4}
                    value={lastName}
                    onChange={newLastName => setLastName(newLastName.target.value)}
                />
                {/*TODO: Allow decimal inputs*/}
                <Input
                    width="12%"
                    margin={4}
                    textAlign="center"
                    value={prelim ?? ""}
                    onChange={newPrelim => setPrelim(parseInt(newPrelim.target.value))}
                />
                <Input
                    width="12%"
                    margin={4}
                    textAlign="center"
                    value={midterm ?? ""}
                    onChange={newMidterm => setMidterm(parseInt(newMidterm.target.value))}
                />
                <Input
                    width="12%"
                    margin={4}
                    textAlign="center"
                    value={final ?? ""}
                    onChange={newFinal => setFinal(parseInt(newFinal.target.value))}
                />
                <Text width="12%" margin={4} align="center">
                    {(prelim !== undefined && midterm !== undefined && final !== undefined) ?
                        (prelim + midterm + final) / 3 : undefined}
                </Text>
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
                    <Button variant="ghost" size="sm">
                        <CheckIcon color={colors.light.onPrimaryContainer}/>
                    </Button>
                </Box>
            </>}
            <Box width={6}/>
        </Flex>
    )

}
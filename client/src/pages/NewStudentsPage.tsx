import TopBar from "../components/topbar/TopBar.tsx";
import {Flex} from "@chakra-ui/react";
import colors from "../styles/Colors.ts";
import StudentTable from "../components/table/StudentTable.tsx";
import {Student} from "../models/Student.ts";

export default function NewStudentsPage() {
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
            <TopBar query="" onQueryChange={() => {
            }}/>
            <StudentTable
                flexGrow={1}
                students={[
                    new Student("Diaz", "Jericho", 78, 78, 78, 1),
                    new Student("Diaz", "Jericho", 78, 78, 78, 2),
                ]}
            />
        </Flex>
    )
}
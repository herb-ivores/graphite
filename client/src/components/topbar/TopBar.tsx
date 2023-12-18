import {Flex, Image, Text} from "@chakra-ui/react";
import SearchBar from "./SearchBar.tsx";

export default function TopBar() {
    return (
        <Flex width="auto" align="center" margin={4} gap={4}>
            <Image width={12} height={12} src="graphite_logo.svg" alt="Graphite logo"/>
            <Text fontSize="xl" fontWeight="extrabold">Graphite</Text>
            <SearchBar query="" onQueryChange={() => {}} flexGrow={1} marginStart={2}/>
        </Flex>
    )
}
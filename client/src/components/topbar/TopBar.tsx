import {Flex, FlexProps, Image, Text} from "@chakra-ui/react";
import SearchBar from "./SearchBar.tsx";

interface TopBarProps extends FlexProps {
    query: string
    onQueryChange: (newQuery: string) => void
}

export default function TopBar(props: TopBarProps) {
    const {query, onQueryChange} = props
    return (
        <Flex width="auto" align="center" gap={4} {...props}>
            <Image width={12} height={12} src="graphite_logo.svg" alt="Graphite logo"/>
            <Text fontSize="xl" fontWeight="extrabold">Graphite</Text>
            <SearchBar query={query} onQueryChange={onQueryChange} flexGrow={1} marginStart={2}/>
        </Flex>
    )
}
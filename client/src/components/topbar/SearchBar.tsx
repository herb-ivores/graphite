import {Input, InputGroup, InputGroupProps, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export interface SearchBarProps extends InputGroupProps {
    query: string
    onQueryChange: (newQuery: string) => void
}

export default function SearchBar(props: SearchBarProps) {
    const {query, onQueryChange} = props
    return (
        <InputGroup size="lg" width="auto" {...props}>
            <InputLeftElement>
                <SearchIcon/>
            </InputLeftElement>
            <Input
                variant="filled"
                placeholder="Search"
                borderRadius="full"
                value={query}
                onChange={(newQuery) => onQueryChange(newQuery.target.value)}
                backgroundColor="#FFFFFF"
                _hover={{
                    backgroundColor: "#FFFFFF"
                }}
                _focus={{
                    backgroundColor: "#FFFFFF"
                }}
            />
        </InputGroup>
    )
}
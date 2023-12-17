import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

// TODO: Make this accept "Modifier" props :(
export default function SearchBar() {
    return (
        <InputGroup size="lg" width="auto">
            <InputLeftElement>
                <SearchIcon/>
            </InputLeftElement>
            <Input variant="filled" placeholder="Search" borderRadius="full"/>
        </InputGroup>
    )
}
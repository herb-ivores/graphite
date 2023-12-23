import {Button, Flex, FlexProps, Image, Input, InputGroup, Select, Text} from "@chakra-ui/react";
import SearchBar from "./SearchBar.tsx";
import {SmallCloseIcon} from '@chakra-ui/icons'

import QuerySymbol from "../enum/QuerySymbol.ts";

interface TopBarProps extends FlexProps {
    query: string
    onQueryChange: (newQuery: string) => void
    querySymbol: QuerySymbol
    onChangeQuerySymbol: (newQuerySymbol: QuerySymbol) => void
    grade?: number
    onChangeGrade: (grade?: number) => void
    filterVisibility: boolean
    onCloseFilter: () => void

}

export default function TopBar(props: TopBarProps) {
    const {
        query,
        onQueryChange,
        querySymbol,
        onChangeQuerySymbol,
        grade,
        onChangeGrade,
        filterVisibility,
        onCloseFilter
    } = props
    return (
        <Flex width="auto" align="center" alignItems="center" gap={4} {...props}>
            <Image width={12} height={12} src="graphite_logo.svg" alt="Graphite logo"/>
            <Text fontSize="xl" fontWeight="extrabold">Graphite</Text>
            <SearchBar query={query} onQueryChange={onQueryChange} flexGrow={1} marginStart={2}/>
            {filterVisibility
                && <Flex width="20%" align="center" alignItems="center">
                    <InputGroup size="lg" width="30">
                        <Select
                            value={querySymbol as QuerySymbol}
                            onChange={(e) => onChangeQuerySymbol(e.target.value as QuerySymbol)}
                            backgroundColor="#FFFFFF"
                            _hover={{
                                backgroundColor: "#FFFFFF"
                            }}
                            _focus={{
                                backgroundColor: "#FFFFFF"
                            }}
                            borderRadius="full"
                        >
                            {Object.values(QuerySymbol).map((symbol) => (
                                <option key={symbol} value={symbol}>
                                    {symbol}
                                </option>
                            ))}
                        </Select>
                    </InputGroup>
                    <InputGroup size="lg" width="70%">
                        <Input
                            placeholder="Enter value"
                            value={grade}
                            onChange={(e) => {
                                const parsedGrade = parseFloat(e.target.value)
                                onChangeGrade(isNaN(parsedGrade) ? undefined : parsedGrade)
                            }}
                            marginStart={2}
                            backgroundColor="#FFFFFF"
                            _hover={{
                                backgroundColor: "#FFFFFF"
                            }}
                            _focus={{
                                backgroundColor: "#FFFFFF"
                            }}
                            borderRadius="full"
                        />
                    </InputGroup>

                    <Button variant="ghost" onClick={onCloseFilter}>
                        <SmallCloseIcon as="button"/>
                    </Button>
                </Flex>
            }

        </Flex>
    )
}
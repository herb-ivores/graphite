import {Button, Flex, FlexProps, Image, Input, Select, Text} from "@chakra-ui/react";
import SearchBar from "./SearchBar.tsx";
import { SmallCloseIcon } from '@chakra-ui/icons'

import QuerySymbol from "../enum/QuerySymbol.ts";

interface TopBarProps extends FlexProps {
    query: string
    onQueryChange: (newQuery: string) => void
    querySymbol: QuerySymbol
    onChangeQuerySymbol: (newQuerySymbol: QuerySymbol) => void
    grade: number
    onChangeGrade: (grade:number) => void
    filterVisibility: boolean
    onFilter: () => void

}

export default function TopBar(props: TopBarProps) {
    const {query, onQueryChange, querySymbol,onChangeQuerySymbol,grade,onChangeGrade, filterVisibility,onFilter} = props
    return (
        <Flex width="auto" align="center" gap={4} {...props}>
            <Image width={12} height={12} src="graphite_logo.svg" alt="Graphite logo"/>
            <Text fontSize="xl" fontWeight="extrabold">Graphite</Text>
            <SearchBar query={query} onQueryChange={onQueryChange} flexGrow={1} marginStart={2}/>
            {filterVisibility
                && <Flex width="20%">
                <Input
                    width="auto"
                    placeholder="Enter value"
                    value={grade}
                    onChange={(e) => onChangeGrade(Number(e.target.value))}
                    mb={2}
                />
                <Select value={querySymbol as QuerySymbol} onChange= {(e) => onChangeQuerySymbol(e.target.value as QuerySymbol)}>
                    {Object.values(QuerySymbol).map((symbol) => (
                        <option key={symbol} value={symbol}>
                            {symbol}
                        </option>
                    ))}
                </Select>
                    <Button variant="ghost" onClick={onFilter}>
                        <SmallCloseIcon as="button" />
                    </Button>

            </Flex>
            }

        </Flex>
    )
}
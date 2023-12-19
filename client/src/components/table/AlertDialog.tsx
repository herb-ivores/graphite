import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure, Button,
} from '@chakra-ui/react'
import React from "react";
import {DeleteIcon} from "@chakra-ui/icons";
import colors from "../../styles/Colors.ts";

interface DeleteDialogProps{
   studentName: string
//    onDelete: ()=>void
}


function DeleteAlertDialog({studentName}: DeleteDialogProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLInputElement>(null)
    // const handleDelete = () =>{
    //
    // }
    return (
        <>
            <Button variant="ghost" size="sm" onClick={onOpen}>
                <DeleteIcon color={colors.light.onPrimaryContainer}/>
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Student
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to remove {studentName}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button variant="ghost " onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='purple' onClick={onClose} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteAlertDialog
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

type ConfirmModalProps = {
  heading: string;
  message: string;
  confirmButtonTitle?: string;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onClose: () => void;
};

const ConfirmModal = ({ heading, message, confirmButtonTitle, onConfirm, onClose }: ConfirmModalProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={!!heading && !!message} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="secondary" ref={cancelRef} onClick={onClose}>
              {confirmButtonTitle ? "Cancel" : "Ok"}
            </Button>
            {confirmButtonTitle && (
              <Button onClick={onConfirm} ml="4">
                {confirmButtonTitle}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmModal;

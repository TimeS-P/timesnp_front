import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import ModalRegistroContent from "./ModalRegistroContent";

// Definir la interfaz que expone el modal
export interface ModalHandle {
  openModal: () => void;
}

interface ModalRegistroProps {}

const ModalRegistro = forwardRef<ModalHandle>((_, ref) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    


  // Expone la función `openModal` para abrir el modal
    useImperativeHandle(ref, () => ({
        openModal: () => {
            onOpen();
        },
    }));
  return (
    <>
      <Button onPress={onOpen}>Registrarse</Button>
      <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange} className="mx-auto my-auto shadow-xl border border-gray-300 rounded-xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalRegistroContent onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalRegistro
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
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  // Expone la función `openModal` para abrir el modal
  useImperativeHandle(ref, () => ({
    openModal: onOpenChange(),
  }));

  return (
    <>
      <Button onPress={onOpen}>Open Modal From modal</Button>
      <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalRegistroContent />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalRegistro

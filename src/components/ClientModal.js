import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

const ClientModal = ({ isOpen, onClose, modalHeader, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent borderRadius='6px'>
        <ModalHeader fontSize='2xl' bg='coolBlue' color='white'>
          {modalHeader}
        </ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClientModal;

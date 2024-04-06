"use client"
import React from 'react'
import IconCloseSVG from '@/assets/icons/IconClose';
import Modal from 'react-modal'
//Modal.setAppElement("#root")

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  classBody: string
}

const ModalComponent = ({ children, isOpen, setIsOpen, classBody }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={"fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm"}
      className={`w-auto h-auto textThemeOne backgroundThemeOne borderThemeOne absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-md`}>
      <div className={`relative ${classBody}`}>
        <div className="flex justify-end">
          <IconCloseSVG setIsOpen={setIsOpen} className='absolute top-4 right-4'/>
        </div>
        {children}
      </div>
    </Modal>
  );
}

export default ModalComponent
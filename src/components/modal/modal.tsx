import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { ReactNode } from "react";
  import { Button } from "../ui/button";
  import { IoMdClose } from "react-icons/io";
  
  interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    handleClose: () => void;
  }
  
  export function Modal({ isOpen, children, handleClose }: ModalProps) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-full max-w-full z-100 h-full lg:max-w-[800px] lg:max-h-[500px] lg:overflow-auto">
          <Button
            className="absolute bg-black z-10 right-4 top-4"
            onClick={handleClose}
          >
            <IoMdClose className="h-6 w-6 fill-white" />
          </Button>
          <DialogHeader>
            <DialogTitle>Product Info</DialogTitle>
            <DialogDescription>Learn latest info and specs here.</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

type ConfirmModalProps = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  setOpen: (open: boolean) => void
  open: boolean
}

export default function ConfirmModal({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  setOpen,
  open,
}: ConfirmModalProps) {

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

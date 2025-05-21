import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

type ConfirmModalProps = {
  title?: string
  description?: string
  onConfirm: () => void
  setOpen: (open: boolean) => void
  open: boolean
}

export default function ConfirmModal({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  setOpen,
  open,
}: ConfirmModalProps) {

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

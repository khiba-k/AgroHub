"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BlockSwitchDialogProps {
  open: boolean
  onAddToCart: () => void
  onDiscard: () => void
  onCancel: () => void
}

export function AgroHubBlockSwitchDialog({
  open,
  onAddToCart,
  onDiscard,
  onCancel,
}: BlockSwitchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="bg-white border-gray-200 text-black max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Unsaved Order
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            You have an active order that isn’t added to your cart yet.
            Please choose what to do before switching.
          </p>
        </div>
        <DialogFooter className="flex flex-col gap-2">
          <Button onClick={onAddToCart} className="w-full bg-black hover:bg-gray-800 text-white">
            Add to Cart
          </Button>
          <Button onClick={onDiscard} variant="destructive" className="w-full">
            Discard Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

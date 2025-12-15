import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="glass-popup border-none text-foreground">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-sm font-bold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-xs opacity-90">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-foreground/50 hover:text-foreground" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

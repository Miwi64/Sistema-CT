import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "sonner"

export const notification = (message: string,
  type: "normal" | "info" | "description" | "warning" | "error" | "success" = "normal",
  description: string | undefined = undefined, isDesktop: boolean = true) => {
  switch (type) {
    case "info":
      return toast.info(message, {
        description: description,
        position: isDesktop ? "bottom-right" : "top-center"
      })
    case "warning":
      return toast.warning(message, {
        description: description,
        position: isDesktop ? "bottom-right" : "top-center"
      })
    case "error":
      return toast.error(message, {
        description: description,
        position: isDesktop ? "bottom-right" : "top-center"
      })
    case "success":
      return toast.success(message, {
        description: description,
        position: isDesktop ? "bottom-right" : "top-center"
      })
    default:
      return toast(message, {
        description: description,
        position: isDesktop ? "bottom-right" : "top-center"
      })
  }
}
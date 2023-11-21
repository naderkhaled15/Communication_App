type State="success"|"warning"|"error"
import { toast } from "vue3-toastify";


export function showToast(state: State, message: string) {
  switch (state) {
    case "success":
      (function () {
        toast.success(message, {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
      break;
    case "warning":
      (function () {
        toast.warning(message, {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
      break;
    case "error":
      (function () {
        toast.error(message, {
          position: "bottom-right",
          autoClose: 1000,
          closeButton: false,
          pauseOnHover: false,
        });
      })();
      break;
  }
  
}
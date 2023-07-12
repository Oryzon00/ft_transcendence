import { toast } from "react-toastify";

export function notifyError(message: string) {
	toast.error(message, {
		theme: "dark",
		autoClose: 3000
	});
}

export function notifyInfo(message: string) {
	toast.info(message, {
		theme: "dark",
		autoClose: 3000
	});
}

export function notifySuccess(message: string) {
	toast.success(message, {
		theme: "dark",
		autoClose: 3000
	});
}

export function notifyWarning(message: string) {
	toast.warning(message, {
		theme: "dark",
		autoClose: 3000
	});
}

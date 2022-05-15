import {CheckCircle, Info, ShieldWarning, Warning, XCircle} from 'phosphor-react';
import {toast} from 'react-toastify';

type ToastVariants = 'info' | 'warning' | 'error' | 'success' | 'unauthorized';
type ToastFunction = (type: ToastVariants, message: string | JSX.Element) => void;
type ToastHook = () => Toast;

const IconsEnum: Record<ToastVariants, JSX.Element> = {
	info: <Info weight='bold' />,
	warning: <Warning weight='bold' />,
	error: <XCircle weight='bold' />,
	success: <CheckCircle weight='bold' />,
	unauthorized: <ShieldWarning weight='bold' />,
};

export type Toast = ToastFunction;

export const useToast: ToastHook = () => (type, message) =>
	toast(message, {
		className: `toast ${type}`,
		icon: IconsEnum[type],
		progressClassName: 'progress',
		toastId: type + message.toString().replace(/\s/g, '_'),
	});

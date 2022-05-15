import {CheckCircle, Info, ShieldWarning, Warning, XCircle} from 'phosphor-react';
import {toast, ToastOptions} from 'react-toastify';

type Seconds = number;

type ToastVariants = 'info' | 'warning' | 'error' | 'success' | 'unauthorized';
type ToastFunction = (
	type: ToastVariants,
	message: string | JSX.Element,
	overrideCloseTime?: Seconds,
) => void;
type ToastHook = () => Toast;

const IconsEnum: Record<ToastVariants, JSX.Element> = {
	info: <Info weight='bold' />,
	warning: <Warning weight='bold' />,
	error: <XCircle weight='bold' />,
	success: <CheckCircle weight='bold' />,
	unauthorized: <ShieldWarning weight='bold' />,
};

export type Toast = ToastFunction;

export const useToast: ToastHook = () => (type, message, overrideCloseTime) => {
	const options: ToastOptions = {
		className: `toast ${type}`,
		icon: IconsEnum[type],
		progressClassName: 'progress',
		toastId: type + message.toString().replace(/\s/g, '_'),
	};

	if (overrideCloseTime) options.autoClose = overrideCloseTime * 1000;
	toast(message, options);
};

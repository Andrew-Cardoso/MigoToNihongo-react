import {Temporal} from '@js-temporal/polyfill';

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const temporalSort = (a: string, b: string): number => {
	const aDate = Temporal.PlainDateTime.from(a);
	const bDate = Temporal.PlainDateTime.from(b);
	return Temporal.PlainDateTime.compare(aDate, bDate);
};

export const timeAgo = (dateString: string): string => {
	const date = Temporal.PlainDateTime.from(dateString);
	const dateNow = Temporal.Now.plainDateTimeISO(TIME_ZONE);
	const {years, months, weeks, days, hours, minutes} = dateNow.since(date);

	if (years) return years === 1 ? 'Há 1 ano' : `Há ${years} anos`;

	if (months) return months === 1 ? 'Há 1 mês' : `Há ${months} meses`;

	if (weeks) return weeks === 1 ? 'Há 1 semana' : `Há ${weeks} semanas`;

	if (days) return days === 1 ? 'Ontem' : `Há ${days} dias`;

	if (hours) return hours === 1 ? 'Há 1 hora' : `Há ${hours} horas`;

	if (minutes) return 'Há alguns minutos';

	return 'Agora';
};

export const toLocaleString = (date: string) =>
	Temporal.PlainDateTime.from(date).toLocaleString(TIME_ZONE);

export const isExpired = (date: string) => {
	const temporalDateTime = Temporal.PlainDateTime.from(date);
	const temporalDateTimeNow = Temporal.Now.plainDateTimeISO(TIME_ZONE);

	return Temporal.PlainDateTime.compare(temporalDateTimeNow, temporalDateTime) !== -1;
};

import { CurrentUser, RolesEnum } from "../_api/models/admin";

export const hasRole = (user?: CurrentUser, roles?: RolesEnum[]) =>
	!roles || user?.roles?.some((role) => roles.includes(role));
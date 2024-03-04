import { CommonSettingsConfigType } from '@common/core/CommonSettings/CommonSettings';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	role: string[] | string | null;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<CommonSettingsConfigType>;
		loginRedirectUrl?: string; // The URL to redirect to after login.
	};
};

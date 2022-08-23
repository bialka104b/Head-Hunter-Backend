export interface HrProfileEntity {
	id?: string;
	email?: string;
	fullName: string;
	company: string;
	maxReservedStudents?: number;
	userId: string;
	createdAt?: Date;
}

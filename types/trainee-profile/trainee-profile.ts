export enum TraineeStatus {
	available = 'available',
	interviewed = 'interviewed',
	hired = 'hired'
}

export enum TraineeExpectedTypeWork {
	onsite = 'onsite',
	remote = 'remote',
	readyToMove = 'readyToMove',
	hybrid = 'hybrid'
}

export enum TraineeExpectedContractType {
	uop = 'uop',
	b2b = 'b2b',
	uzuod = 'uz/uod',
}

export interface FilteredInfo {
	courseCompletion: number,
	courseEngagment: number,
	projectDegree: number,
	teamProjectDegree: number,
	canTakeApprenticeship: boolean,
	monthsOfCommercialExp: number,
	expectedSalaryFrom: number,
	expectedSalaryTo: number,
}

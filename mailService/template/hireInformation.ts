export const hireInformation = {
	from: 'admin_megak_head_hunter@gmail.com',
	subject: 'Potwierdzenie zatrudnienia',
	html: (firstname: string, lastname: string, hrFullName: string) => `<p>Dzień dobry</p>` +
		`<p>Informujey że ${firstname} ${lastname} potwierdził że został zatrudniony przez firmę ${hrFullName}.</p>` +
		`<p>Pozdrawiamy i życzymy owocnej współpracy</p>` +
		`<p>Zespół MegaK Head Hunter</p>`,
}

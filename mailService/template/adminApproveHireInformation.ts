export const adminApproveHireInformation = {
	from: 'admin_megak_head_hunter@gmail.com',
	subject: 'Prośba o potwierdzenie zatrudnienia przez kursanta',
	html: (traineeFirstname: string, traineeLastname: string) => `<p><strong>Gratulujemy!</strong></p>` +
		`<p>${traineeFirstname} ${traineeLastname} został zatrudniony.</p>`
}

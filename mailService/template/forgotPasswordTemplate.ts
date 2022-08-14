export const forgotPasswordMail = {
	from: 'admin_megak_head_hunter@gmail.com',
	subject: 'Twoje hasło zostało zresetowane',
	html: (randomPassword: string) => `<p><strong>Witaj</strong></p>` +
		`<p>Twoje hasło zostało zresetowane</p>` +
		`<p>Nowe hasło: <strong>${randomPassword}</strong></p>` +
		`<p>Po zalogowaniu się na stronę zalecamy zmienić hasło na własne.</p>` +
		`<p>Pozdrawiamy</p>` +
		`<p>Zespół MegaK Head Hunter</p>`,
}

export const registerEmail = {
	from: 'admin_megak_head_hunter@gmail.com',
	subject: 'Zarejestruj się na platformie MegaK Head Hunter',
	html: (userId: string, registerToken: string) => `<p><strong>Witam cię na platformie MegaK Head Hunter</strong></p>` +
		`<p>Aby móc swobodnie korzystać z naszej aplikacji skorzystaj z linku poniżej i dokończ proces rejestracji</p>` +
		`<p><strong>http://localhost:3000/register/${userId}/${registerToken}</strong></p>` +
		`<p>Pozdrawiamy</p>` +
		`<p>Zespół MegaK Head Hunter</p>`,
};

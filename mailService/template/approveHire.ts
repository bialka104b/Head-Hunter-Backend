export const approveHire = {
	from: 'admin_megak_head_hunter@gmail.com',
	subject: 'Prośba o potwierdzenie zatrudnienia',
	html: (hrName: string) => `<p><strong>Gratulujemy!</strong></p>` +
		`<p>Zostaliśmy poinformowani że firma ${hrName} nawiązała z tobą współpracę.</p>` +
		`<p>Prosimy o potwierdzenie tej informacji w swoim profilu na naszej platformie </p>` +
		`<p>Pozdrawiamy i życzymy owocnej współpracy</p>` +
		`<p>Zespół MegaK Head Hunter</p>`,
}

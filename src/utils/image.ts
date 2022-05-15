export const toBase64 = (file: File): Promise<string | undefined> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString());
		reader.onerror = (error) => reject(error);
	});

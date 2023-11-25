/**
 * Gets form values as provided type
 * @returns Form values as T
 */
export function getFormValue<T>(formId: string): T {
	const form = document.getElementById(formId) as HTMLFormElement
	const formData = new FormData(form)

	const data: { [key: string]: any } = {}

	formData.forEach((value, key) => (data[key] = value))
	return data as T
}

/**
 * Transforms the values in a given object to a space-delimeted string
 * @param obj Object containing style css classes as values
 * @returns A space-delimeted string with all of the values provided in the object
 */
export function getClassNames(obj: { [key: string]: string }): string {
	return Object.values(obj).join(' ')
}

export interface ImgBBData {
	data: {
		id: string
		url: string
		delete_url: string
		success: boolean
		status: number
		filename: string
		image: {
			filename: string
			name: string
			url: string
		}
	}
}

export async function uploadImage(imgFile: File): Promise<ImgBBData> {
	const form = new FormData()
	form.set('key', '3158b816ed6c7857cb75f959e9a19267')
	form.append('image', imgFile!)

	const res = await fetch('https://api.imgbb.com/1/upload', {
		method: 'POST',
		body: form,
	})

	return await res.json()
}

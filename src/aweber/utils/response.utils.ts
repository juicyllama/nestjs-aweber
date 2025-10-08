/**
 * Safely parse JSON response from fetch API
 * Handles HTTP errors, empty responses and invalid JSON gracefully
 */
export async function safeJsonParse<T>(response: Response, operationName: string): Promise<T> {
	// First check if the response was successful
	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(`${operationName} failed: ${response.status} - ${errorText}`)
	}

	// Check if response has content before trying to parse JSON
	const responseText = await response.text()
	if (!responseText.trim()) {
		throw new Error(`${operationName} returned empty response`)
	}

	try {
		return JSON.parse(responseText) as T
	} catch {
		throw new Error(`${operationName} returned invalid JSON: ${responseText}`)
	}
}

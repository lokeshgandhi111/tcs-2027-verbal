export function countWords(text) {
	if (!text) return 0;
	return text.trim().split(/\s+/).filter(Boolean).length;
}

export function uniqueWords(text) {
	if (!text) return [];
	return Array.from(
		new Set(
			text
				.toLowerCase()
				.replace(/["',.()\[\]!?;:\-]/g, "")
				.split(/\s+/)
				.filter(Boolean),
		),
	);
}

export function recallCoverage(originalWords, responseWords) {
	if (!originalWords || originalWords.length === 0) return 0;
	const origSet = new Set(originalWords);
	const respSet = new Set(responseWords);
	let common = 0;
	origSet.forEach((w) => {
		if (respSet.has(w)) common++;
	});
	return Math.round((common / origSet.size) * 100);
}

export function secondsToMMSS(s) {
	const m = String(Math.floor(s / 60)).padStart(2, "0");
	const sec = String(s % 60).padStart(2, "0");
	return `${m}:${sec}`;
}

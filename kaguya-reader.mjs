import fetch from "node-fetch";

/*
/media/manga/<slug>/chapters/<folder>/<group_id>/<filename>
*/

let data = getInfo();

export function getPage(folder, group_id, filename) {

	return new Promise((resolve, reject) => {

		try  {

			fetch(
				"https://guya.moe/media/manga/Kaguya-Wants-To-Be-Confessed-To/chapters/" +
				folder + "/" + 
				group_id + "/" + 
				filename
			).then(
				response => response.buffer()
			).then(buffer => 
				resolve(buffer.toString("base64"))
			);
		
		} catch (err) {

			reject(err);
		
		}

	});


	// To display image, do <img src="data:image/png;base64,<%=image%>"/>

}

// info = { chapter information }; Look at lines 25 - 67 in kaguya-data-3-11-21.json for example.

export async function getChapter(chapterInfo) {

	const id = Object.keys(chapterInfo.groups)[0];

	const images = [];

	for(const imageUrl of chapterInfo.groups[id]) {
		const image = await getPage(
			chapterInfo.folder, 
			Object.keys(chapterInfo.groups)[0], 
			imageUrl
		);

		images.push(image);
	}
	
	return images;
}

// link = getInfo().cover

export function getCover(link) {
	return new Promise((resolve, reject) => {

		try {

			fetch(
				`https://guya.moe${link}`
			).then(
				response => response.buffer()
			).then(buffer => 
				resolve(buffer.toString("base64"))
			);
		
		} catch (err) {

			reject(err);
		
		}

	});
}

export async function getInfo() {
	const response = await fetch(`https://guya.moe/api/series/Kaguya-Wants-To-Be-Confessed-To`);
	return response.json(); // returns object
}

const SUPERHERO_TOKEN = "1146245292901516";

const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const newHeroButton = document.getElementById("newHeroButton");
const heroImageDiv = document.getElementById("heroImage");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const statToEmoji = {
	intelligence: "🧠",
	strength: "💪",
	speed: "⚡",
	durability: "🏋️‍♂️",
	power: "📊",
	combat: "⚔️",
};

const getSuperHero = (id) => {
	fetch(`${BASE_URL}/${id}`)
		.then((response) => response.json())
		.then((json) => {
			showHeroInfo(json);
		});
};

const showHeroInfo = (character) => {
	const name = `<h2>${character.name}</h2>`;
	const img = `<img src='${character.image.url}' height=200 width=200'/>`;
	const stats = Object.keys(character.powerstats)
		.map((stat) => {
			return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
				character.powerstats[stat]
			}</p>`;
		})
		.join("");
	heroImageDiv.innerHTML = `${name}${img}${stats}`;
	return stats;
};

const getSearchedSuperHero = (name) => {
	fetch(`${BASE_URL}/search/${name}`)
		.then((response) => response.json())
		.then((json) => {
			const hero = json.results[0];
			showHeroInfo(hero);
		});
};

const randomHero = () => {
	const numberOfHeroes = 731;
	return Math.ceil(Math.random() * numberOfHeroes);
};

newHeroButton.onclick = () => getSuperHero(randomHero());
searchButton.onclick = () => getSearchedSuperHero(searchInput.value);

searchInput.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		searchButton.click();
	}
});

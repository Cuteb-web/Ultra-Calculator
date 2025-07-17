const ultraSelect = document.getElementById("ultra");
const luckInput = document.getElementById("luck");
const cloverInput = document.getElementById("clover");
const dragonsInput = document.getElementById("dragons");
const lemonadeInput = document.getElementById("lemonade");
const calculateButton = document.getElementById("calculate");
const resultsDiv = document.getElementById("results");

resultsDiv.textContent =
	"Raw chance: 0.000%\n\n Chance from chest: 0.000%\n\n OR a 1 in 0 chance.";

calculateButton.addEventListener("click", () => {
	runCalculations();
});

document.addEventListener("keydown", function (e) {
	if (e.key === "Enter") runCalculations();
});

const items = {
	"Generic Ultra": { tickets: 1, dungeon: -4, id: -1 },
	"Blue Ring": { tickets: 500, dungeon: -1, id: 2 },
	"Red Ring": { tickets: 500, dungeon: -1, id: 3 },
	"Normal Invisibility Cloak": { tickets: 3000, dungeon: -1, id: 4 },
	"Extreme Invisibility Cloak": { tickets: 3000, dungeon: -1, id: 5 },
	"Hermes Boots": { tickets: 4000, dungeon: -1, id: 6 },
	"Instant Strength Glove": { tickets: 3000, dungeon: 27, id: 14 },
	"Epic Strength Glove": { tickets: 2000, dungeon: 16, id: 15 },
	"Instant Defense Cloak": { tickets: 3000, dungeon: 18, id: 20 },
	"Epic Instant Defense Cloak": { tickets: 3000, dungeon: 10, id: 21 },
	"Speed Boots": { tickets: 3000, dungeon: 20, id: 25 },
	"Maximum Speed Boots": { tickets: 3000, dungeon: 17, id: 26 },
	"Health Regeneration Cloak": { tickets: 3000, dungeon: 13, id: 30 },
	"Maximum Health Regeneration Cloak": { tickets: 3000, dungeon: 16, id: 31 },
	"Fire Protection Cloak": { tickets: 3000, dungeon: 17, id: 32 },
	"Maximum Fire Protection Cloak": { tickets: 2000, dungeon: 14, id: 33 },
	"Normal Venom Protection Cloak": { tickets: 3000, dungeon: 10, id: 35 },
	"Extraordinary Venom Protection Cloak": { tickets: 3000, dungeon: 12, id: 36 },
	"Epic Invincibility Potion": { tickets: 5000, dungeon: -1, id: 39 },
	"Anti Freezing Glove": { tickets: 3000, dungeon: 14, id: 45 },
	"Lava Armor Protector": { tickets: 2000, dungeon: 18, id: 48 },
	"Gravity Feather": { tickets: 1000, dungeon: 12, id: 51 },
	"Gobattle Ring": { tickets: 250, dungeon: 31, id: 68 },
	"Breath Helmet": { tickets: 3000, dungeon: 28, id: 74 },
	"Fire Enchantment": { tickets: 100, dungeon: -1, id: 116 },
	"Firebreath Ring": { tickets: 250, dungeon: 15, id: 114 },
	"Firebreath's Blood": { tickets: 2000, dungeon: 15, id: 115 },
	"Team Gravity Feather": { tickets: 500, dungeon: 52, id: 154 },
	"Restoration Ring": { tickets: 500, dungeon: 41, id: 155 },
	"Talisman of the Phoenix Lv. 1": { tickets: 200, dungeon: 15, id: 161 },
	"Bloodmoon Ring": { tickets: 1000, dungeon: 46, id: 166 },
	"Peppermint Strike": { tickets: 1000, dungeon: 57, id: 168 },
	"Dice of Destiny Lv. 1": { tickets: 500, dungeon: -1, id: 182 },
	"Iron Heart Lv. 1": { tickets: 500, dungeon: -1, id: 183 },
	"Rejuvenation Gem Lv. 1": { tickets: 500, dungeon: -1, id: 184 },
	"Inferno Touch": { tickets: 300, dungeon: -1, id: 185 },
	"Greed's Grip Lv. 1": { tickets: 100, dungeon: -1, id: 186 },
	"Dwarf's Strength Lv. 1": { tickets: 100, dungeon: 13, id: 187 },
	"Shinobi's Fury Lv. 1": { tickets: 100, dungeon: 35, id: 188 },
	"Dodge Charm Lv. 1": { tickets: 100, dungeon: 16, id: 189 },
	"Wizard's Focus Lv. 1": { tickets: 100, dungeon: 27, id: 190 },
	"Gem Dust Lv. 1": { tickets: 50, dungeon: 31, id: 191 },
	"Flying Skill Lv. 1": { tickets: 10, dungeon: -1, id: 198 },
	"Rose Ring": { tickets: 250, dungeon: -2, id: 262 }, // DUNGEON ID TBD
	BlazeTorch: { tickets: 500, dungeon: -3, id: 263 }, // DUNGEON ID TBD
};

function calculateUltraProbability(id, luck, clovers, dragons, lemonade) {
	if (id === 0) return 0;

	// Apply multipliers
	luck *= 1.5 ** clovers * 1.4 ** dragons * 1.5 ** lemonade;
	luck = Math.min(luck, 25);

	const luckcalc = 0.0005 * luck + 0.006;

	let item = null;
	for (var name in items) {
		if (items[name].id == id) {
			item = items[name];
			break;
		}
	}

	// Calculate total tickets in the same dungeon or universal
	let totalTickets = item.id == -1 ? 1 : 0;
	if (item.id != -1)
		for (var name in items) {
			const candidate = items[name];
			if (candidate.dungeon === item.dungeon || candidate.dungeon === -1) {
				totalTickets += candidate.tickets;
			}
		}

	const probability = luckcalc * ((100 * item.tickets) / totalTickets);
	console.log("item: " + (100 * item.tickets) / totalTickets + " ");
	console.log("luckcalc: " + luckcalc + " ");
	return [probability, luckcalc];
}

function runCalculations() {
	const ultraId = ultraSelect.value;
	const luck = parseInt(luckInput.value) || 0;
	const clover = parseInt(cloverInput.value) || 0;
	const dragons = parseInt(dragonsInput.value) || 0;
	const lemonade = parseInt(lemonadeInput.value) || 0;

	const probability = calculateUltraProbability(
		ultraId,
		luck,
		clover,
		dragons,
		lemonade
	);
	const fraction = (percentage) => (1 / (percentage / 100)).toFixed(0);

	resultsDiv.textContent = `Raw chance: ${(100 * probability[0]/probability[1]).toPrecision(
		3
	)}%\n\n Chance from chest: ${probability[0].toPrecision(3)}%\n or a 1 in ${fraction(
		probability[0]
	)} chance.`;
}

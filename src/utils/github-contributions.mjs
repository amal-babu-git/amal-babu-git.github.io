// The contribution calendar from GitHub's GraphQL API: the same numbers as the
// heat map on the GitHub profile, private contributions included when the
// profile shows them. Used at build time by GitHubActivity.astro and by
// scripts/update-github-contributions.mjs, which refreshes the saved copy.

export const GITHUB_LOGIN = "amal-babu-git";

const QUERY = `query ($login: String!) {
  user(login: $login) {
    contributionsCollection {
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date weekday contributionCount contributionLevel }
        }
      }
    }
  }
}`;

// GitHub's own quartiles, so the shades match the profile's heat map.
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

/**
 * @typedef {{ date: string, weekday: number, count: number, level: number }} Day
 * @typedef {{ login: string, total: number, private: number, weeks: Day[][] }} Contributions
 */

/** @returns {Promise<Contributions>} */
export async function fetchContributions(token, login = GITHUB_LOGIN) {
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
		body: JSON.stringify({ query: QUERY, variables: { login } }),
		signal: AbortSignal.timeout(15_000),
	});
	if (!response.ok) throw new Error(`GitHub API answered ${response.status}`);
	const { data, errors } = await response.json();
	if (errors?.length) throw new Error(errors[0].message);
	const collection = data.user.contributionsCollection;
	const calendar = collection.contributionCalendar;
	return {
		login,
		total: calendar.totalContributions,
		// Contributions to private repositories, counted but not shown.
		private: collection.restrictedContributionsCount,
		weeks: calendar.weeks.map((week) =>
			week.contributionDays.map((day) => ({
				date: day.date,
				weekday: day.weekday,
				count: day.contributionCount,
				level: LEVELS[day.contributionLevel] ?? 0,
			})),
		),
	};
}

/** One week per line, so a refreshed copy reads as a short diff. */
export function serializeContributions(contributions) {
	const weeks = contributions.weeks.map((week) => `\t\t${JSON.stringify(week)}`).join(",\n");
	return `{\n\t"login": ${JSON.stringify(contributions.login)},\n\t"total": ${contributions.total},\n\t"private": ${contributions.private},\n\t"weeks": [\n${weeks}\n\t]\n}\n`;
}

const cache = new Map();

/**
 * The calendar for this build: fetched once, however many pages show it, and
 * the saved copy when there's no token or the API fails.
 * @param {Contributions} fallback
 * @returns {Promise<Contributions>}
 */
export function getContributions(token, fallback, login = GITHUB_LOGIN) {
	if (!token) return Promise.resolve(fallback);
	if (!cache.has(login)) {
		cache.set(
			login,
			fetchContributions(token, login).catch((error) => {
				console.warn(`GitHub contributions: using the saved copy (${error.message})`);
				return fallback;
			}),
		);
	}
	return cache.get(login);
}

import { Octokit } from "octokit";
import { request } from 'graphql-request';

const octokit = new Octokit({ 
    auth: process.env.USER_TOKEN,
});

async function getUserInfo(accountId) {
    return await octokit.request("GET /user/{account_id}", {
            account_id: accountId
        });
};

async function getCurrentUser() {
    return await octokit.request('GET /user', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
};


async function getUserContributions(username, startDate = new Date('2001-01-01T00:00:00Z').toISOString(), endDate) {
    console.debug(`Fetching user contributions for ${username} from ${startDate} (${typeof startDate}) to ${endDate} (${typeof endDate})`);
    if (!username || !startDate || !endDate) {
        console.debug(`Username: ${username}, Start date: ${startDate}, End date: ${endDate}`);
        return {
            error: 'A username, start date, and end date are required to fetch user contributions',
            username,
            startDate,
            endDate,
            status: 400
        };
    } else if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        console.debug(`Start date: ${startDate} (${typeof startDate}), End date: ${endDate} (${typeof endDate})`);
        return {
            error: 'A valid start date and end date are required to fetch user contributions',
            startDate,
            endDate,
            status: 400
        };
    };
    const document = `
        query($userName: String!, $startDate: DateTime!, $endDate: DateTime!) { 
            user(login: $userName) {
                id
                databaseId
                login
                email
                name
                avatarUrl
                location
                pronouns
                bio
                bioHTML
                company
                socialAccounts(first: 10) {
                    totalCount
                    nodes {
                        displayName
                        provider
                        url
                    }
                }
                twitterUsername
                websiteUrl
                url
                createdAt
                contributionsCollection(from: $startDate to: $endDate) {
                    startedAt
                    endedAt
                    contributionYears
                    endedAt 
                    contributionCalendar {
                        totalContributions
                        months {
                            name
                            totalWeeks
                            year
                            firstDay
                        }
                        weeks {
                            contributionDays {
                                contributionCount
                                contributionLevel
                                date
                                color
                                weekday
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = { 
        "userName": username,
        "startDate": startDate,
        "endDate": endDate 
    };
    console.log(JSON.stringify(variables));
    const headers = {
        Authorization: `Bearer ${process.env.GH_TOKEN}`
    };

    try {
        // make a request to the GitHub API to check the user's createdAt date
        const userResponse = await octokit.request("GET /users/{username}", {
            username: username
        });

        // if the user's createdAt date is after the startDate, then set the startDate to the user's createdAt date
        if (userResponse.data.created_at > startDate) {
            startDate = userResponse.data.created_at;
        }

        console.debug(`Start date: ${startDate}`);

        // make an array of the startDate and endDates by year between the startDate and endDate function parameters
        const timeframes = [];
        let currentStartDate = startDate.toISOString();
        console.debug(`Current start date: ${currentStartDate}`);
        console.debug(`End date: ${endDate}`);
        while (currentStartDate <= endDate) {
            const currentEndDate = new Date(currentStartDate.getUTCFullYear(), 11, 31, 23, 59, 59, 999).toISOString();
            console.debug(`Current end date: ${currentEndDate}`);
            timeframes.push({
                startDate: currentStartDate,
                endDate: currentEndDate
            });
            console.debug(`Timeframes: ${JSON.stringify(timeframes)}`);
            currentStartDate = new Date(currentStartDateObj.getUTCFullYear() + 1, 0, 1, 0, 0, 0, 0).toISOString();
            console.debug(`end of for loop current start date: ${currentStartDate}`);
        }

        console.debug(`Timeframes: ${JSON.stringify(timeframes)}`);
        console.debug(`current start date: ${currentStartDate.toISOString()}`);


        const contributions = [];

        // for each timeframe item in the array, make a request to the GitHub API to get the user's contributions for that timeframe
        for (const timeframe of timeframes) {
            const response = await request('https://api.github.com/graphql', document, {
                ...variables,
                startDate: timeframe.startDate,
                endDate: timeframe.endDate
            }, headers);
            console.debug(response);
            contributions.push({
                timeframe: {
                    startDate: timeframe.startDate,
                    endDate: timeframe.endDate,
                    contributions: response.data.user.contributionsCollection
                }
            });
            console.debug(`Contributions ${JSON.stringify(contributions)}`);
        }

        // return the result set in the form of an object
        return {
            user: userResponse.data,
            meta: {
                startDate: startDate,
                endDate: endDate
            },
            contributions: contributions,
            status: 200,
            request: {
                url: 'https://api.github.com/graphql',
                body: document
            }
        };
    } catch (error) {
        return {
            message: `An error occurred while fetching user contributions for ${username}`,
            user: username,
            errors: error || err || error.message,
            status: 500,
            request: {
                url: 'https://api.github.com/graphql',
                body: document
            }
        };
    }
};

export { getUserInfo, getCurrentUser, getUserContributions };

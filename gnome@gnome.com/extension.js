import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as Me from 'resource:///org/gnome/shell/extensions/extension.js';

let panelButton, statsContainer, timeoutId;

function getLeetCodeStats() {
    try {
        const query = JSON.stringify({
            query: `
                query getUserProfile($username: String!) {
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                            }
                        }
                        submissionCalendar
                    }
                }
            `,
            variables: {
                username: "Vishwanth_V"
            }
        });

        const [success, stdout] = GLib.spawn_command_line_sync(
            `curl -s -m 5 "https://leetcode.com/graphql" ` +
            `-H "Content-Type: application/json" ` +
            `--data-raw '${query}'`
        );

        const result = JSON.parse(stdout.toString());

        const allTime = result.data?.matchedUser?.submitStats?.acSubmissionNum?.find(
            x => x.difficulty === "All"
        )?.count || 0;

        const calendar = JSON.parse(result.data?.matchedUser?.submissionCalendar || "{}");
        const oneWeekAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
        const lastWeek = Object.entries(calendar)
            .filter(([timestamp]) => parseInt(timestamp) > oneWeekAgo)
            .reduce((sum, [, count]) => sum + count, 0);

        return { allTime, lastWeek };
    } catch (e) {
        console.error(e);
        return { allTime: null, lastWeek: null };
    }
}

function updatePanel() {
    const stats = getLeetCodeStats();

    statsContainer.destroy_all_children();

    if (stats.allTime !== null) {
        statsContainer.add_child(new St.Label({
            text: "All:",
            style_class: 'leetcode-label leetcode-heading'
        }));
        statsContainer.add_child(new St.Label({
            text: `${stats.allTime}`,
            style_class: 'leetcode-label leetcode-value'
        }));
        statsContainer.add_child(new St.Label({
            text: "|",
            style_class: 'leetcode-divider'
        }));
        statsContainer.add_child(new St.Label({
            text: "Week:",
            style_class: 'leetcode-label leetcode-heading'
        }));
        statsContainer.add_child(new St.Label({
            text: `${stats.lastWeek}`,
            style_class: 'leetcode-label leetcode-value'
        }));
    } else {
        statsContainer.add_child(new St.Label({
            text: "LeetCode: Offline",
            style_class: 'leetcode-error'
        }));
    }

    timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1800, () => {
        updatePanel();
        return GLib.SOURCE_CONTINUE;
    });
}

function init() {
    panelButton = new St.Bin({
        style_class: 'panel-button',
        reactive: false
    });

    statsContainer = new St.BoxLayout({
        style_class: 'stats-container',
        vertical: false
    });

    panelButton.set_child(statsContainer);
}

export default class LeetCodeExtension {
    constructor() {
        init();
    }

    enable() {
        Main.panel._rightBox?.insert_child_at_index(panelButton, 0);
        updatePanel();
    }

    disable() {
        if (timeoutId) GLib.Source.remove(timeoutId);
        Main.panel._rightBox?.remove_child(panelButton);
    }
}


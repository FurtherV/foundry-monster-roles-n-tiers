/**
 * The same module id found in module.json
 */
export const MODULE_ID = "monster-roles-n-tiers";

/**
 * Human readable module name
 */
export const MODULE_NAME = "Monster Roles'n Tiers";

/**
 * Module id used for localization files.
 * When modified, modify all handlebars templates accordingly!
 */
export const MODULE_LANG_ID = MODULE_ID.toUpperCase();
export const MODULE_SETTINGS = {
    "monster-roles": {
        scope: "world",
        config: true,
        requiresReload: false,
        type: String,
        default: "Brute;Controller;Leader;Skirmisher;Sniper;Soldier;Striker",
    },
    "monster-tiers": {
        scope: "world",
        config: true,
        requiresReload: false,
        type: String,
        default: "Minion;Standard;Elite;Champion",
    },
};

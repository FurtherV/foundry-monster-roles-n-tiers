import { MODULE_ID, MODULE_LANG_ID, MODULE_SETTINGS } from "./constants.mjs";

export function _createSettings() {
    for (const settingKey of Object.keys(MODULE_SETTINGS)) {
        const settingData = MODULE_SETTINGS[settingKey];
        game.settings.register(
            MODULE_ID,
            settingKey,
            foundry.utils.mergeObject(settingData, {
                name: `${MODULE_LANG_ID}.settings.${settingKey}.Name`,
                hint: `${MODULE_LANG_ID}.settings.${settingKey}.Hint`,
            })
        );
    }
}

/**
 * Returns the monster tiers.
 * @returns {string[]}
 */
export function _getTiers() {
    return [
        "None",
        ...game.settings
            .get(MODULE_ID, "monster-tiers")
            .split(";")
            .map((x) => x.trim())
            .filter((x) => !!x.length),
    ];
}

/**
 * Returns the monster roles.
 * @returns {string[]}
 */
export function _getRoles() {
    return [
        "None",
        ...game.settings
            .get(MODULE_ID, "monster-roles")
            .split(";")
            .map((x) => x.trim())
            .filter((x) => !!x.length),
    ];
}

/**
 * Retrieves the current role and tier of an actor.
 * @param {Actor} actor
 * @returns {{ currentRole: string, currentTier: string }}
 */
export function _getCurrentRoleAndTier(actor) {
    const tiers = _getTiers();
    const roles = _getRoles();
    const currentRole =
        foundry.utils.getProperty(actor, `flags.${MODULE_ID}.role`) || roles[0];
    const currentTier =
        foundry.utils.getProperty(actor, `flags.${MODULE_ID}.tier`) || tiers[0];

    return { role: currentRole, tier: currentTier };
}

/**
 *
 * @param {object} actorSheet
 * @param {JQuery} html
 * @param {object} data
 */
export async function _renderMonsterSheet(actorSheet, html, data) {
    const actor = actorSheet.actor;

    const tiers = _getTiers();
    const roles = _getRoles();

    const { role: currentRole, tier: currentTier } =
        _getCurrentRoleAndTier(actor);

    // Prepare Handlebars template data
    const handlebarsData = {
        moduleId: MODULE_ID,
        roles: roles,
        tiers: tiers,
    };

    // Render the template
    const newSectionHtml = await renderTemplate(
        `modules/${MODULE_ID}/templates/rolesAndTiers.hbs`,
        handlebarsData
    );

    // Create a jQuery object from the HTML string
    const newSection = $(newSectionHtml);

    // Set the selected values for the select elements
    newSection.find("#tiers-select").val(currentTier);
    newSection.find("#roles-select").val(currentRole);

    // Find the traits section and prepend the new section
    const traitsSection = html.find(".traits");
    traitsSection.prepend(newSection);
}

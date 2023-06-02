// This file is automatically executed by FoundryVTT

import { MODULE_NAME } from "./scripts/constants.mjs";
import { _createSettings, _renderMonsterSheet } from "./scripts/hooks.mjs";

Hooks.once("init", () => {
    console.log(`FurtherV | Initializing ${MODULE_NAME}`);
});

Hooks.once("init", _createSettings);

Hooks.on("renderActorSheet5eNPC", _renderMonsterSheet);

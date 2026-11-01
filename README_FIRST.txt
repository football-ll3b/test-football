JARAS | NEON STAGE 07
VISUAL RELEASE BASED ON THE ORIGINAL V5.8 GAME ENGINE

OPEN / PUBLISH
1. Extract this ZIP first. Upload the CONTENTS, not the ZIP.
2. Put index.html, trivia.html, feud.html, vault.html and mystery.html
   in the same existing GitHub Pages folder as the previous game.
3. Upload neon-stage.css, neon-view.js, service-worker.js, version.json,
   both jaras-*.js files, icons and manifest, AND the complete neon-assets
   folder. Keep the folder name and its contents unchanged.
4. Keep the existing Firebase settings and browser data. Do NOT clear site
   data/localStorage or uninstall the site to refresh this visual update.
5. After publishing the complete package, open your normal game address.
   A first visual refresh can be requested with: index.html?design=stage7
   Open a new tab or reopen the site if a page already open still shows old art.

This is a full replacement package; no previous neon CSS is required.
Do not mix HTML from older releases with this package's CSS/assets.
The same filenames, storage keys, saved-match formats and game rules remain.

WHAT CHANGED
- Rebuilt hub: one centered logo, four illustrated neon game cards,
  stage floor, lighting and functional original play buttons.
- Rebuilt all four game lobbies with their actual original actions.
- Restyled teams, settings, categories, boards, questions, help cards,
  vaults, mystery boxes, challenge screens, review and results.
- Kept the hub's audio control in the toolbar, away from play buttons.
- Phone layouts wrap deliberately; long settings/presenter lists scroll.
  The four hub cards fit together on the tested iPad landscape sizes.
- Replaced obsolete conflicting visual overrides and asset cache.

ONE DOCUMENTED NON-VISUAL BUG FIX
The original Feud local presenter did not persist progress after actions.
Only the persist() role/connection gate was corrected. The storage key and
schema, points, questions, turns and live Firebase behavior were not changed.
All other original gameplay and bank scripts remain byte-for-byte unchanged.

QUALITY / LIMITS
See QA_REPORT.md and QA_RESULTS.json. Tests used a real Chromium renderer
with touch-style viewports. They do not substitute for physical iPad Safari
or real-device sound/fullscreen verification. Firebase remote pairing was
not connected/tested. No software is guaranteed free of every possible bug.

No test storage shim, browser policy modification, tracking, font files or
remote new artwork downloads are included in the game package.

# Jaras Neon Stage 07 - verification report

## Implementation
This release was built from `jaras_v58_iphone_navigation_backup_fix(1).zip`,
not from the layered V1-V6 themes. Main hub and game-lobby HTML were rebuilt.
Original action callbacks, element IDs, bank data, score logic, timers,
help-card logic and storage formats were preserved. `neon-view.js` is a
presentation-only adapter; it does not write game state or preferences.

## One minimal original bug fix
In `feud.html`:
```js
// Before: local fallback switches role to presenter, so this gate never saves it.
if(role==='display'&&!live&&s) ...
// After: save only standalone local mode, not a paired presenter or cloud session.
if(!live&&!pairCode&&s) ...
```
The correction was tested by face-off/reveal/wrong/undo and reload/resume.
No game rule, question, point, time setting, cloud configuration or storage
schema was changed. All other original script bodies are unchanged.

## Completed tests
- Hub at 1180x720, 1024x600, 1366x900, 820x1030, 390x740,
  844x390, 1194x667 and 1024x564 CSS pixels. No horizontal overflow.
  All four play buttons fit in the tested landscape viewports.
- Four game lobbies at tablet, phone portrait and phone landscape sizes.
- Original hub launch targets, embedded games, return-home handlers,
  general settings, audio panel and volume preference.
- Trivia: choose six categories; 36 question controls; pre-question aids;
  question/timer; answer reveal; award 200; one used tile; saved score/used
  tile restoration; original two- and three-column layout controls.
- Feud local mode: setup, requested five rounds, face-off, reveal, play,
  wrong-answer strike, undo, saved match restoration and mobile layout.
- Vault: team setup, three levels/team, only current team enabled;
  original timer; reveal and confirm all four questions; earned digits;
  fifth puzzle; original keypad; correct code awards exactly 300;
  used-vault marking, next team and persisted score restoration.
- Mystery: 12 boxes for two teams and original seven challenge types.
  Acting, Taboo, Rapid, Memory, Ordering, Matching and Hawk Eye entered
  through the original box/begin controls using QA-seeded existing bank
  entries. No seeded state is shipped. Points remain unchanged until
  review confirmation, then one box is completed and the exact award is
  applied. Matching: 16 tiles / 8 matching attempts / 200 points. Hawk Eye:
  original 60-second timer and actual canvas clicks at all five targets
  of one existing scene. No claim that all 90 scenes were semantically
  re-audited; the entire embedded scene bank was preserved unchanged.
- Local resources exist, original JSON banks parse and hashes are recorded,
  no duplicate static element IDs, no QA harness inside shipping HTML.
- Updated service worker tested with a mocked cache/fetch environment for
  complete installation, offline HTML/artwork, version-query normalization,
  server failure fallback, and ignoring unrelated URLs/data endpoints.

## Test environment and explicit limits
Real installed Chromium + Playwright, touch-enabled fixed viewports.
The container blocks top-level browser navigation. HTML was loaded using
Playwright `set_content` with a local asset server and a QA-only storage
shim; embedded flows used `srcdoc`. This validates rendering, actual DOM
callbacks and storage serialization/restoration, not an end-to-end deployed
GitHub Pages navigation or native Safari implementation. The shipped HTML
has neither the shim nor srcdoc injection. No browser policy was changed.
No physical iPad/iPhone or Safari/WebKit was available. Browser-based native
audio output, fullscreen gestures and Firebase remote/QR pairing were not
verified on devices. Existing remote libraries/configuration were retained.
Service worker tests are unit tests, not a claim of full offline deployment.

## Evidence
`QA_RESULTS.json` contains the completed checks, with all release checks
passing. Real browser screenshots are available separately with this release.
`DATA_HASHES.json` records preserved bank hashes. `SHA256SUMS.txt` records
shipping file hashes, excluding itself. These checks do not guarantee the
absence of every possible environment-dependent issue.

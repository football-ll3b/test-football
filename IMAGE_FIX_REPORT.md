# Jaras Neon Stage 07B - Image delivery correction

## Reason for this patch
The supplied screenshot shows failed logo/game image loads while the CSS UI is visible.
The original Stage07 ZIP contains valid artwork under `neon-assets/`. The exact cause
on the published site (missing folder, moved path, response/decode failure) was NOT
verified because the full deployed page was not accessible in this environment.
Missing/unavailable image references reproduced the same five broken image positions.

## Changes
- Embedded the existing artwork as lossless PNG data URLs in HTML, CSS and the
  view-only category-picture adapter. No separate neon-assets folder is required.
- Updated visual resource query versions and the service-worker cache/package list.
- Kept original element structure, layout rules, labels and game actions unchanged,
  except for the build badge changing from 07 to 07B.
- Did not change scores, questions, timers, assists, game settings or storage schemas.
  Inline game scripts in all five HTML pages are byte-for-byte identical to Stage07.
  Both jaras audio/support scripts and the manifest are byte-for-byte identical.

## Checks in this patch
- All embedded PNGs decode and retain the pixels of their original WebP artwork.
- No runtime neon-assets/ references remain.
- All files named in the service-worker package list exist at ZIP root.
- External JavaScript files pass node --check.
- 39 focused render checks passed, with 0 failures: five home images, four game
  menu pictures, six dynamic trivia category pictures, geometry, horizontal bounds,
  landscape play-button bounds, settings dialogs and absence of page script errors.
- Six viewports: 1180x680, 1180x820, 1024x650, 1366x1024, 844x390, 390x844.

## Important test limits
The installed Chromium has an administrator policy blocking all URL navigation.
The actual package HTML/CSS/view scripts were therefore rendered using Playwright
set_content with test-only dependency inlining and an in-memory storage fixture.
These test fixtures are NOT part of this release. The patch does not alter browser
policies or include test stubs. Hosted navigation, real service-worker installation,
physical iPad/Safari rendering, sound/fullscreen behavior and Firebase pairing were
NOT verified. The earlier Stage07 gameplay test report is not presented as a new
retest. These are focused image/render tests, not a guarantee of zero possible bugs.

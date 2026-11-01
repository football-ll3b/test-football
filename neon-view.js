/* NEON STAGE 07 - view-only adapter.
 * Never writes scores, settings, timers, answers, random pools or saved games.
 * Original callbacks stay attached to their original controls.
 */
(() => {
  'use strict';
  const assets = 'neon-assets/';
  const categoryArt = new Map([
    ['\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a', 'uae'],
    ['\u0627\u0644\u0627\u0645\u0627\u0631\u0627\u062a', 'uae'],
    ['\u0639\u0648\u0627\u0635\u0645', 'capitals'],
    ['\u0627\u0644\u0646\u0628\u0627\u062a\u0627\u062a', 'plants'],
    ['\u0630\u0627\u0643\u0631\u0629 \u0648\u062a\u0631\u0643\u064a\u0632', 'memory'],
    ['\u0641\u0648\u0631\u0645\u0648\u0644\u0627 1', 'formula'],
    ['\u0645\u0646 \u0623\u0646\u0627\u061f', 'identity'],
    ['\u0645\u0646 \u0623\u0646\u0627\u061f!', 'identity'],
    ['\u0645\u0646 \u0623\u0646\u0627\u061f', 'identity']
  ]);
  function isVisible(el) {
    return !!el && !el.hidden && !el.classList.contains('hide') && !el.classList.contains('hidden');
  }
  function assetForCategory(text) {
    const title = text.trim();
    for (const [label, art] of categoryArt) { if (title.includes(label)) return art; }
    return categoryArt.get(title) || (title.includes('\u0645\u0646 \u0623\u0646\u0627') ? 'identity' : null);
  }
  function decorateTrivia() {
    document.querySelectorAll('#board .cat').forEach(cat => {
      const title = cat.querySelector('h3');
      const icon = cat.querySelector('.cat-icon');
      if (title && icon && !icon.dataset.neonArt) {
        const art = assetForCategory(title.textContent);
        if (art) {
          const image = document.createElement('img');
          image.src = assets + 'category-' + art + '.webp';
          image.alt = ''; image.width = 200; image.height = 102;
          image.decoding = 'async';
          icon.replaceChildren(image);
        }
        icon.dataset.neonArt = art || 'original-icon';
      }
      cat.querySelectorAll('button').forEach(button => {
        const value = button.textContent.match(/200|400|600/);
        if (value) button.dataset.value = value[0];
        if (button.classList.contains('claimed')) {
          button.style.setProperty('--claimed-bg', button.style.background || '#233456');
        }
      });
    });
    document.querySelectorAll('#scoreboard .score, #teamInputs .teamcard, #aidChoices .teamcard').forEach(el => {
      if (el.style.borderColor) el.style.setProperty('--team-color', el.style.borderColor);
      if (el.classList.contains('score')) {
        el.dataset.active = String(!!el.style.boxShadow);
        if (!el.querySelector('.neon-score-line')) {
          const nodes = [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
          const strong = el.querySelector('strong');
          if (strong && nodes.length) {
            const line = document.createElement('div'); line.className = 'neon-score-line';
            const name = document.createElement('span'); name.className = 'neon-team-name';
            name.textContent = nodes[0].textContent.trim();
            const total = document.createElement('div'); total.className = 'neon-score-total';
            total.appendChild(strong);
            if (nodes.length > 1) {
              const unit = document.createElement('small'); unit.textContent = nodes[nodes.length - 1].textContent.trim(); total.appendChild(unit);
            }
            line.append(name, total); nodes.forEach(n=>n.remove()); el.appendChild(line);
          }
        }
      }
    });
    // The layout toggle writes an inline grid; CSS deliberately respects it.
    const board = document.querySelector('#board');
    if (board) document.body.classList.toggle('neon-question-open', isVisible(document.querySelector('#questionPanel')));
  }
  function decorateMystery() {
    const score = document.getElementById('scoreboard');
    if (score && score.children.length) score.style.setProperty('--team-count', String(score.children.length));
    document.querySelectorAll('.match-tile').forEach(tile => {
      tile.dataset.face = String(tile.textContent.trim() !== '\u2754');
    });
  }
  let observer, scheduled = false;
  function refresh() {
    scheduled = false;
    if (observer) observer.disconnect();
    const body = document.body;
    const hub = body.classList.contains('neon-hub');
    const home = document.getElementById('home');
    body.classList.toggle('neon-on-home', isVisible(home) && !body.classList.contains('playing'));
    if (hub) {
      const audio = document.getElementById('jarasAudioControls');
      const parent = body.classList.contains('playing') ? document.getElementById('playerbar') : document.querySelector('.hub-tools');
      if (audio && parent && audio.parentElement !== parent) parent.appendChild(audio);
      const panel = document.getElementById('settings');
      body.classList.toggle('neon-settings-open', !!panel && !panel.hidden);
    } else if (body.classList.contains('neon-feud')) {
      const mute = document.querySelector('[data-jaras-mute]');
      const toolbar = document.querySelector('.top > .row');
      if (mute && toolbar && mute.parentElement !== toolbar) toolbar.appendChild(mute);
    } else if (body.classList.contains('neon-vault')) {
      body.classList.toggle('neon-vault-code', isVisible(document.getElementById('finalArea')));
      const mute = document.getElementById('khaznaSoundBtn');
      const main = document.querySelector('main');
      if (mute && main) {
        let toolbar = main.querySelector('.neon-local-tools');
        if (!toolbar) { toolbar = document.createElement('div'); toolbar.className = 'neon-local-tools'; main.prepend(toolbar); }
        const play = document.getElementById('play');
        const destination = isVisible(play) ? play.querySelector('.top') : toolbar;
        if (destination && mute.parentElement !== destination) destination.appendChild(mute);
        toolbar.hidden = destination !== toolbar;
      }
    } else if (body.classList.contains('neon-trivia')) {
      decorateTrivia();
    } else if (body.classList.contains('neon-mystery')) {
      decorateMystery();
    }
    if (observer) observer.observe(body, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style','hidden']});
  }
  function enqueue() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(refresh); }
  }
  function start() {
    try { if (window.top !== window.self) document.body.classList.add('neon-embedded'); } catch (_) {}
    try {
      const prefs = JSON.parse(localStorage.getItem('jaras_global_settings') || '{}');
      document.body.classList.toggle('neon-reduced-motion', prefs.motion === false);
    } catch (_) {}
    refresh();
    observer = new MutationObserver(enqueue);
    observer.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['class','style','hidden']});
    addEventListener('resize', enqueue, {passive:true});
    document.addEventListener('change', enqueue, {passive:true});
    document.addEventListener('click', enqueue, {passive:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();

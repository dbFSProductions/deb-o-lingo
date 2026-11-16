# El pasado: the dot-or-line gate

Moved word for word out of `CLAUDE.md` at v62, when `app.js` was split into
modules. It is the history and the reasoning as written at the time: where it
says "in app.js" it now means one of the modules listed in `CLAUDE.md`. Add
new reasoning at the end.

---

### The shapes are coloured; the choices still are not

The gate was black and white until you answered — reported as looking broken
or unfinished. **The reason it had no colour is still good**: a coloured
*choice* reads as the recommended one, and the only colour on that screen was
meant to arrive with the verdict.

So the colour is on **the mark**, not on the button — one hue per shape, given
to every choice at once. That is a legend rather than a recommendation, and it
is the reason this doesn't undo the earlier decision.

- **Dot is orange, line is blue, a line reaching now is purple**, and the same
  colour follows the shape into the verdict and onto the phrase sheet, so the
  picture and the colour get learned together.
- **The tint behind the mark is mixed from `currentColor`**, so a new shape is
  one `.shape-*` line and nothing else.
- The phrase sheet's block already sits on a tint, so the mark keeps its colour
  and drops the second background there.

## Dot in a box, or line: El pasado

Xerra's past-tense gate, ported in a deliberately reduced form: the **El
pasado** unit (four lessons, five cards each, all from Deb's actual life —
Pilates, Atlanta, Chicago, plants; `pasado-4` is tiny derivatives of the other
fifteen, deliberately very basic) drills the *shape* of a past sentence
before it will show the Spanish. Three shapes only — a dot in a box
(preterite, `[●]`), a line (imperfect, `▬▬`), and a line reaching now (present
perfect, `(▬···●)`). Xerra's `both` and pluperfect stay over there until Deb
needs them; adding one is an entry in `ASPECTS` and cards that name it.

The point of the drill is **tense recognition and what it does to the ending**,
not learning the phrases — so, unlike Xerra, the endings line is the loud part:
`.aspect-endings` rides every choice button in bold and the verdict prints it
bigger on a gold highlighter tint, while the grammar-book term stays small and
italic. That emphasis is this app's own divergence, not drift; Xerra keeps term
and endings on one quiet line.

What came over in Xerra's shape, and should stay in step with it:

- **`ASPECTS` / `aspectOf` / `aspectChoices` in store.js.** One language here,
  so `endings` are plain strings where Xerra keys them by locale. The gate
  offers the two `base` shapes always, plus the present perfect only in a
  lesson that actually contains one — so the question is "Dot in a box, or
  line?" over two choices and "Which shape?" over three, and a lesson's
  contents are load-bearing.
- **The gate is a whole screen** — English sentence, choice buttons, quit and
  the bar; no Listen, no record, no EDIT (the editor prints the sentence being
  asked about). No way past the question except answering it.
- **It stacks above level two.** The gate never shows Spanish, so a level-two
  card asks its shape first and becomes a memory question after. The verdict's
  term and endings stay through that; the card's `aspectNote` (`.aspect-why`)
  waits until the card is revealed, because it quotes Spanish.
- **A wrong answer costs nothing and nothing is persisted** — no per-shape
  tally, no demotion. `state.aspectChoice` is per card, reset by `loadPhrase`;
  answering re-renders the whole drill, which is safe because the gate stands
  before any attempt exists.
- **The phrase sheet states the shape flat** (`.phrase-aspect`), gate on or
  off; **`settings.aspectGate`** is the switch, and cards outside El pasado
  carry no `aspect`, so it does nothing to the rest of the course.
- **Each single-shape lesson carries one card of the other shape** on purpose —
  a lesson whose name answers its own question trains the lesson, not the
  grammar. The traps are load-bearing too: *fue dura* against *estaba cansada*
  (both "was", different shapes), and *he ido todos los días esta semana*
  ("every day" reads habit, but the bracket still has now inside it).
- **Repaso gates too**: the pool can pick up El pasado cards, and
  `aspectChoices` reads the queue in front of her either way.
- **The ending is lit up in the sentence itself.** Once the Spanish is on
  screen, the verb's tense machinery is lettered in the score-amber shade —
  `marked` in content.js, `drillSpanish` in app.js. A letter shade and not a
  background on purpose: a highlighter block behind "aba" made trabaj-aba read
  as two words. See *Content model* for the reduce-to-text rule that keeps it
  safe against edits.
- **The sentences are pruned to the decision.** No word survives that isn't
  needed to pick the shape from the English: *Antes trabajaba* became plain
  *Trabajaba* because the -aba alone says "used to", Tampa and the friend
  clause went, *ayer* replaced *la semana pasada* where either would do. What
  must stay is any word the *English* needs to be decidable — "every week" on
  the flying card, "this week" on the trap — because the gate asks from the
  English alone. Don't fatten them back up for naturalness.

One thing in the drill came with this unit but is not part of it:

- **Next is a real button on every card**, not just gated ones — the old muted
  SKIP link promoted to a full-width `#next` button so a listen-only pass
  through a lesson doesn't need hunting for the way past a card. It sits
  **last on the page**, below the comparison and the notes: under the record
  circle it was the easy way out of every card, and reachable-but-not-tempting
  was the ask. Same behaviour: filed as skipped, never counts as a good go,
  hidden while a banner is up (the banner's Continue is the next button then).

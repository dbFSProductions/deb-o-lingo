// Deb-o-lingo course content. Hand-written — this file IS the source of truth
// (unlike Xerra, there is no Swift twin and no generator).
//
// The course is Castilian Spanish (es-ES): Deb's world is tapas, cava and
// market counters, so the focusNotes teach the Spain accent — including the
// 'th' sound for c/z that Latin America doesn't use. If she ever needs to
// switch to a Latin American target, the notes need rewriting, not just the
// voice.
//
// Shape: units → lessons → phrases. A lesson is five phrases — one 6:30am
// coffee's worth. Phrase ids are stable and referenced by saved attempts, so
// never renumber existing ones; append instead.

export const COURSE_LANGUAGE = "es-ES";

export const COURSE = [
  {
    id: "saludos",
    title: "Saludos",
    subtitle: "Every day, with the doorman",
    color: "#58cc02",
    colorDark: "#46a302",
    lessons: [
      {
        id: "saludos-1",
        title: "Good morning",
        phrases: [
          {
            id: "saludos-1-1",
            text: "Buenos días.",
            translation: "Good morning.",
            focusNote:
              "Pure vowels: BWE-nos DEE-as. 'Días' is two crisp syllables — don't let it slide into 'dee-uhs'.",
          },
          {
            id: "saludos-1-2",
            text: "Buenas tardes.",
            translation: "Good afternoon / evening.",
            focusNote:
              "The 'd' in 'tardes' is soft, tongue against the teeth — closer to the 'th' in 'father' than an English 'd'.",
          },
          {
            id: "saludos-1-3",
            text: "¿Cómo está?",
            translation: "How are you? (formal)",
            focusNote:
              "Stress lands on -TÁ. This is the formal 'usted' form — right for the doorman until he switches first.",
          },
          {
            id: "saludos-1-4",
            text: "Muy bien, gracias. ¿Y usted?",
            translation: "Very well, thanks. And you?",
            focusNote:
              "'Muy' is one syllable: mwee. In Spain 'gracias' has the famous soft c: GRA-thyas.",
          },
          {
            id: "saludos-1-5",
            text: "¡Hasta luego!",
            translation: "See you later!",
            focusNote:
              "The 'h' is silent: AS-ta LWE-go. This is what everyone says leaving anywhere, always.",
          },
        ],
      },
      {
        id: "saludos-2",
        title: "Small talk",
        phrases: [
          {
            id: "saludos-2-1",
            text: "¡Qué calor hace hoy!",
            translation: "It's so hot today!",
            focusNote:
              "Both h's are silent: AH-the OY (that's the Spain 'c' in 'hace'). Weather comments are 90% of doorman conversation.",
          },
          {
            id: "saludos-2-2",
            text: "¡Qué frío!",
            translation: "So cold!",
            focusNote:
              "'Frío' is FREE-o, two syllables with a pure EE. Tap the r lightly — no English growl.",
          },
          {
            id: "saludos-2-3",
            text: "¿Qué tal el fin de semana?",
            translation: "How was the weekend?",
            focusNote:
              "'¿Qué tal...?' is the all-purpose 'how's...?'. Run 'fin-de-semana' together as one smooth ribbon.",
          },
          {
            id: "saludos-2-4",
            text: "Que tenga un buen día.",
            translation: "Have a good day.",
            focusNote:
              "'Buen' is one syllable: bwen. The polite send-off — say it as you walk away and mean it.",
          },
          {
            id: "saludos-2-5",
            text: "Igualmente.",
            translation: "Likewise — you too.",
            focusNote:
              "ee-gwal-MEN-te, stress on MEN. The perfect reply when he wishes you a good day first.",
          },
        ],
      },
      {
        id: "saludos-3",
        title: "Being polite",
        phrases: [
          {
            id: "saludos-3-1",
            text: "Muchas gracias.",
            translation: "Thank you very much.",
            focusNote:
              "'ch' as in English 'church': MU-chas. And that Spain c again: GRA-thyas.",
          },
          {
            id: "saludos-3-2",
            text: "De nada.",
            translation: "You're welcome.",
            focusNote:
              "Both d's are soft — the second one nearly melts away: de NA-tha.",
          },
          {
            id: "saludos-3-3",
            text: "Perdón, no entiendo.",
            translation: "Sorry, I don't understand.",
            focusNote:
              "'Perdón' stresses -DÓN. In 'entiendo' the 'ie' glides as one sound: en-TYEN-do.",
          },
          {
            id: "saludos-3-4",
            text: "¿Puede repetir, por favor?",
            translation: "Can you repeat that, please?",
            focusNote:
              "PWE-the re-pe-TEER. Every r is a light tap of the tongue, never an American 'r'.",
          },
          {
            id: "saludos-3-5",
            text: "Hablo un poquito de español.",
            translation: "I speak a little Spanish.",
            focusNote:
              "Silent h: AH-blo. 'Poquito' is po-KEE-to — the magic word that makes everyone patient with you.",
          },
        ],
      },
    ],
  },
  {
    id: "cafe",
    title: "El café",
    subtitle: "Coffee, water and wine",
    color: "#1cb0f6",
    colorDark: "#1899d6",
    lessons: [
      {
        id: "cafe-1",
        title: "Ordering coffee",
        phrases: [
          {
            id: "cafe-1-1",
            text: "Un café con leche, por favor.",
            translation: "A coffee with milk, please.",
            focusNote:
              "'Café' stresses -FÉ. 'Leche' is LE-che with pure e's — no 'lay-chay' drawl.",
          },
          {
            id: "cafe-1-2",
            text: "Un cortado, por favor.",
            translation: "An espresso cut with a little milk.",
            focusNote:
              "Soft d: cor-TA-tho. Tap the r. This is the local's order — expect an approving nod.",
          },
          {
            id: "cafe-1-3",
            text: "Un café solo.",
            translation: "An espresso, black.",
            focusNote:
              "'Solo' = the coffee comes alone. Pure o's: SO-lo, clipped, no glide at the end.",
          },
          {
            id: "cafe-1-4",
            text: "¿Me pone un descafeinado?",
            translation: "Could I get a decaf?",
            focusNote:
              "'¿Me pone...?' — literally 'will you put me...' — is THE ordering formula in Spain. Learn it once, order anything forever.",
          },
          {
            id: "cafe-1-5",
            text: "¿Me cobra, por favor?",
            translation: "Can I pay, please?",
            focusNote:
              "Literally 'charge me': ME KO-bra, tapped r. Said at the bar when you're ready to go.",
          },
        ],
      },
      {
        id: "cafe-2",
        title: "Water and wine",
        phrases: [
          {
            id: "cafe-2-1",
            text: "Un vaso de agua, por favor.",
            translation: "A glass of water, please.",
            focusNote:
              "Spanish v sounds like b: BA-so. 'Agua' is AH-gwa. (v and b are the same sound — everywhere, always.)",
          },
          {
            id: "cafe-2-2",
            text: "Agua con gas… sin gas.",
            translation: "Sparkling water… still water.",
            focusNote:
              "You WILL be asked '¿con gas o sin gas?' — now you own both answers. 'Sin' is like 'seen', cut short.",
          },
          {
            id: "cafe-2-3",
            text: "Una copa de vino tinto.",
            translation: "A glass of red wine.",
            focusNote:
              "'Copa' for a wine glass, never 'vaso'. 'Vino' = BEE-no. And red wine is 'tinto', never 'rojo'.",
          },
          {
            id: "cafe-2-4",
            text: "Una copa de vino blanco… rosado.",
            translation: "A glass of white… of rosé.",
            focusNote:
              "'Blanco' crisp: BLAN-ko. 'Rosado' with the soft d: ro-SA-tho.",
          },
          {
            id: "cafe-2-5",
            text: "Una copa de cava, por favor.",
            translation: "A glass of cava, please.",
            focusNote:
              "KA-ba — that v is a b again. Possibly the most important sentence in this entire course.",
          },
        ],
      },
      {
        id: "cafe-3",
        title: "At the table",
        phrases: [
          {
            id: "cafe-3-1",
            text: "¿Tienen mesa para dos?",
            translation: "Do you have a table for two?",
            focusNote:
              "TYE-nen ME-sa. Pure e in 'mesa' — resist 'may-sa'.",
          },
          {
            id: "cafe-3-2",
            text: "¿Qué me recomienda?",
            translation: "What do you recommend?",
            focusNote:
              "re-ko-MYEN-da. Waiters love this question — just be ready for a fast, enthusiastic answer.",
          },
          {
            id: "cafe-3-3",
            text: "Está buenísimo.",
            translation: "It's really, really good.",
            focusNote:
              "bwe-NEE-see-mo — lean hard on the NEE. The -ísimo ending turns 'good' up to eleven.",
          },
          {
            id: "cafe-3-4",
            text: "Otra, por favor.",
            translation: "Another one, please.",
            focusNote:
              "Tap the r right after the t: OT-ra. 'Otra' for una copa or una caña; 'otro' for un café.",
          },
          {
            id: "cafe-3-5",
            text: "La cuenta, por favor.",
            translation: "The bill, please.",
            focusNote:
              "KWEN-ta. In Spain the bill never comes until you ask — this sentence is how you go home.",
          },
        ],
      },
    ],
  },
  {
    id: "tapas",
    title: "Tapas",
    subtitle: "Ordering, sharing — and taking it home",
    color: "#ff9600",
    colorDark: "#e08600",
    lessons: [
      {
        id: "tapas-1",
        title: "Ordering tapas",
        phrases: [
          {
            id: "tapas-1-1",
            text: "Unas bravas, por favor.",
            translation: "Some patatas bravas, please.",
            focusNote:
              "That v is a b: BRA-bas. Both a's open and identical.",
          },
          {
            id: "tapas-1-2",
            text: "Una de tortilla.",
            translation: "One (portion) of tortilla.",
            focusNote:
              "'ll' sounds like y: tor-TEE-ya. 'Una de...' works for anything on the board — one of the bravas, one of the croquetas…",
          },
          {
            id: "tapas-1-3",
            text: "Unas aceitunas.",
            translation: "Some olives.",
            focusNote:
              "The Spain 'c' workout: a-they-TOO-nas. Take it slowly — it's a tongue twister with a reward.",
          },
          {
            id: "tapas-1-4",
            text: "Es para compartir.",
            translation: "It's for sharing.",
            focusNote:
              "com-par-TEER — every r a light tap. Says 'we know how tapas work' in four words.",
          },
          {
            id: "tapas-1-5",
            text: "De momento, nada más.",
            translation: "Nothing else for now.",
            focusNote:
              "Soft d's throughout: NA-tha mas. Buys you time before round two.",
          },
        ],
      },
      {
        id: "tapas-2",
        title: "Para llevar",
        phrases: [
          {
            id: "tapas-2-1",
            text: "¿Me lo puede poner para llevar?",
            translation: "Can you box this up for me to take away?",
            focusNote:
              "'Llevar' = ye-BAR. Literally 'can you put it for me to carry'. THE sentence — worth overlearning until it's automatic.",
          },
          {
            id: "tapas-2-2",
            text: "¿Me pone el resto para llevar?",
            translation: "Can I take the rest to go?",
            focusNote:
              "Crisp t, tapped r: RES-to. For when it was too good to finish but too good to leave.",
          },
          {
            id: "tapas-2-3",
            text: "Una caja, por favor.",
            translation: "A box, please.",
            focusNote:
              "Spanish j is a breathy English h: KA-ha. Never like an English j.",
          },
          {
            id: "tapas-2-4",
            text: "Me lo llevo.",
            translation: "I'll take it with me.",
            focusNote:
              "me lo YE-bo. Bonus: this is also what you say in a shop when you've decided to buy the thing.",
          },
          {
            id: "tapas-2-5",
            text: "¿Tienen algo para llevar?",
            translation: "Do you have anything to go?",
            focusNote:
              "'Algo' has a hard g: AL-go. For bakeries and counters when you're eating on the move.",
          },
        ],
      },
      {
        id: "tapas-3",
        title: "Paying and leaving",
        phrases: [
          {
            id: "tapas-3-1",
            text: "¿Puedo pagar con tarjeta?",
            translation: "Can I pay by card?",
            focusNote:
              "'Tarjeta' — tar-HE-ta, that breathy j again. Stress on -HE-.",
          },
          {
            id: "tapas-3-2",
            text: "¿Cuánto es?",
            translation: "How much is it?",
            focusNote:
              "KWAN-to es. For quick counter payments; at a table you ask for 'la cuenta' instead.",
          },
          {
            id: "tapas-3-3",
            text: "Ha estado todo muy rico.",
            translation: "Everything was delicious.",
            focusNote:
              "Silent h: a es-TA-tho TO-tho mwee REE-ko. The compliment every cook wants to hear.",
          },
          {
            id: "tapas-3-4",
            text: "¿Está incluida la propina?",
            translation: "Is the tip included?",
            focusNote:
              "pro-PEE-na. (In Spain tipping is small and optional — but the question earns you a smile.)",
          },
          {
            id: "tapas-3-5",
            text: "Adiós, ¡hasta pronto!",
            translation: "Bye — see you soon!",
            focusNote:
              "a-DYOS, stress on the end; silent h in 'hasta'. Warmer than plain adiós.",
          },
        ],
      },
    ],
  },
  {
    id: "mercado",
    title: "El mercado",
    subtitle: "Counters, kilos and pointing",
    color: "#ce82ff",
    colorDark: "#a568cc",
    lessons: [
      {
        id: "mercado-1",
        title: "At the counter",
        phrases: [
          {
            id: "mercado-1-1",
            text: "Póngame un cuarto de jamón.",
            translation: "A quarter kilo of ham, please.",
            focusNote:
              "PON-ga-me — the counter-ordering word, the market cousin of '¿me pone?'. 'Jamón' = ha-MON.",
          },
          {
            id: "mercado-1-2",
            text: "Medio kilo de tomates.",
            translation: "Half a kilo of tomatoes.",
            focusNote:
              "ME-thyo KEE-lo. Market amounts run in kilos: 'medio' (half) and 'cuarto' (quarter) cover nearly everything.",
          },
          {
            id: "mercado-1-3",
            text: "¿Me da una barra de pan?",
            translation: "Can I get a baguette?",
            focusNote:
              "'Barra' has the course's one rolled rr — a quick drum-roll of the tongue. If it won't roll yet, a long tap passes.",
          },
          {
            id: "mercado-1-4",
            text: "Un poco más, por favor.",
            translation: "A bit more, please.",
            focusNote:
              "PO-ko mas. For when they pause at the scale and look up at you.",
          },
          {
            id: "mercado-1-5",
            text: "Así está bien.",
            translation: "That's fine like that.",
            focusNote:
              "a-SEE es-TA byen. The other answer to the scale-pause. You now control the scale.",
          },
        ],
      },
      {
        id: "mercado-2",
        title: "Choosing and paying",
        phrases: [
          {
            id: "mercado-2-1",
            text: "¿A cuánto está el tomate?",
            translation: "How much are the tomatoes (per kilo)?",
            focusNote:
              "Prices per kilo use '¿a cuánto está...?' — not '¿cuánto cuesta?'. Singular 'el tomate' means the produce, not one tomato.",
          },
          {
            id: "mercado-2-2",
            text: "Nada más, gracias.",
            translation: "Nothing else, thanks.",
            focusNote:
              "NA-tha mas. The answer to '¿algo más?', which you will hear at every counter, every time.",
          },
          {
            id: "mercado-2-3",
            text: "Este, por favor. No — aquel.",
            translation: "This one, please. No — that one.",
            focusNote:
              "ES-te… a-KEL. Pointing is allowed, expected and effective.",
          },
          {
            id: "mercado-2-4",
            text: "¿Me lo puede cortar fino?",
            translation: "Can you slice it thin?",
            focusNote:
              "cor-TAR FEE-no, both r's tapped. Essential for jamón and cheese — thin is the whole point.",
          },
          {
            id: "mercado-2-5",
            text: "¿Me da una bolsa?",
            translation: "Can I have a bag?",
            focusNote:
              "BOL-sa. The 'l' stays light and forward — not the dark American 'l' in 'ball'.",
          },
        ],
      },
      {
        id: "mercado-3",
        title: "Market small talk",
        phrases: [
          {
            id: "mercado-3-1",
            text: "¿Está maduro?",
            translation: "Is it ripe?",
            focusNote:
              "ma-THU-ro, soft d. For avocados, melons, and building trust with the fruit man.",
          },
          {
            id: "mercado-3-2",
            text: "Es para hoy.",
            translation: "It's for eating today.",
            focusNote:
              "Silent h: pa-ra OY. Tell them when you'll eat it and they'll pick you the right one — this is the secret handshake.",
          },
          {
            id: "mercado-3-3",
            text: "¿Cuál está mejor hoy?",
            translation: "Which is best today?",
            focusNote:
              "kwal es-TA me-HOR oy — breathy j in 'mejor'. Vendors light up at this question.",
          },
          {
            id: "mercado-3-4",
            text: "Hasta el sábado.",
            translation: "See you Saturday.",
            focusNote:
              "SA-ba-tho, stress right at the front. Become a regular — it pays off in better tomatoes.",
          },
          {
            id: "mercado-3-5",
            text: "¡Muy amable, gracias!",
            translation: "Very kind of you — thanks!",
            focusNote:
              "mwee a-MA-ble. The warm goodbye that makes them remember you tomorrow.",
          },
        ],
      },
    ],
  },
  {
    // Four everyday units added together, asked for as "more words and
    // sentences covering a wider variety to keep the game going" — Match
    // draws from every card in the app, so the way to keep it fresh is more
    // course. Prices first (asked for by name), then the restaurant, more
    // food shopping, and the day-to-day. Same rules as the units above: five
    // phrases a lesson, nothing already on a card elsewhere in the course,
    // and every focusNote written for an American mouth learning Castilian.
    id: "precios",
    title: "Precios y números",
    subtitle: "Counting, prices and the time",
    color: "#00c2b2",
    colorDark: "#00a294",
    lessons: [
      {
        id: "precios-1",
        title: "One to ten",
        phrases: [
          {
            id: "precios-1-1",
            text: "Uno, dos, tres.",
            translation: "One, two, three.",
            focusNote:
              "OO-no, dos, tres. Pure vowels, and 'tres' rhymes with 'press' — never 'trays'. The r is a single tap.",
          },
          {
            id: "precios-1-2",
            text: "Cuatro, cinco, seis.",
            translation: "Four, five, six.",
            focusNote:
              "KWA-tro, THEEN-ko, says. In Spain 'cinco' opens on the 'th' of 'thin'; 'seis' is one syllable, like 'says'.",
          },
          {
            id: "precios-1-3",
            text: "Siete, ocho, nueve, diez.",
            translation: "Seven, eight, nine, ten.",
            focusNote:
              "SYEH-te, O-cho, NWEH-be, dyeth. 'Diez' ends on Spain's soft 'th' — 'dyeth', not 'dee-ez'.",
          },
          {
            id: "precios-1-4",
            text: "Dos, por favor.",
            translation: "Two, please.",
            focusNote:
              "'Dos' is a short 'dose' with no 'oh-oo' glide on the end. Stress on fa-VOR, final r one light tap.",
          },
          {
            id: "precios-1-5",
            text: "Media docena de huevos.",
            translation: "Half a dozen eggs.",
            focusNote:
              "MEH-dya do-THE-na de WEH-bos. The h in 'huevos' is silent and the v is a soft b — it starts 'weh'.",
          },
        ],
      },
      {
        id: "precios-2",
        title: "How much?",
        phrases: [
          {
            id: "precios-2-1",
            text: "¿Cuánto cuesta esto?",
            translation: "How much does this cost?",
            focusNote:
              "KWAN-to KWES-ta ES-to. Three plain 'o' endings — short, with no 'oh-oo' tail on any of them.",
          },
          {
            id: "precios-2-2",
            text: "Son tres euros con cincuenta.",
            translation: "That's three euros fifty.",
            focusNote:
              "'Euros' is EH-oo-ros, two quick vowels, not 'YOU-rohs'. 'Cincuenta' opens on the Spain 'th': theen-KWEN-ta.",
          },
          {
            id: "precios-2-3",
            text: "Es muy caro.",
            translation: "It's very expensive.",
            focusNote:
              "KA-ro with a single tapped r — one flick of the tongue, like the tt in 'butter'. Not an American 'car'.",
          },
          {
            id: "precios-2-4",
            text: "¿Tiene algo más barato?",
            translation: "Do you have anything cheaper?",
            focusNote:
              "TYEH-ne AL-go mas ba-RA-to. 'Barato' — soft b, one tapped r, stress in the middle.",
          },
          {
            id: "precios-2-5",
            text: "Me lo quedo.",
            translation: "I'll take it.",
            focusNote:
              "me lo KEH-do. The qu in 'quedo' is a plain k, and the d is the soft one, tongue against the teeth.",
          },
        ],
      },
      {
        id: "precios-3",
        title: "Bigger numbers",
        phrases: [
          {
            id: "precios-3-1",
            text: "Quince euros.",
            translation: "Fifteen euros.",
            focusNote:
              "KEEN-the. Spain's 'th' on the c; the qu is a plain k, no 'kw'. Two syllables.",
          },
          {
            id: "precios-3-2",
            text: "Veinticinco euros.",
            translation: "Twenty-five euros.",
            focusNote:
              "bayn-tee-THEEN-ko. Soft b at the start (v = b), 'th' in the middle. Five even syllables.",
          },
          {
            id: "precios-3-3",
            text: "Cincuenta euros.",
            translation: "Fifty euros.",
            focusNote:
              "theen-KWEN-ta — 'th' first, then the stress on KWEN. 'Euros' stays EH-oo-ros.",
          },
          {
            id: "precios-3-4",
            text: "Cien euros.",
            translation: "A hundred euros.",
            focusNote:
              "THYEN — one syllable, 'th' as in 'thin'. Not 'see-en'.",
          },
          {
            id: "precios-3-5",
            text: "¿Tiene cambio?",
            translation: "Do you have change?",
            focusNote:
              "TYEH-ne KAM-byo. 'Cambio' is two syllables, KAM-byo, not three.",
          },
        ],
      },
      {
        id: "precios-4",
        title: "What time?",
        phrases: [
          {
            id: "precios-4-1",
            text: "¿Qué hora es?",
            translation: "What time is it?",
            focusNote:
              "ke O-ra es. The h in 'hora' is silent — the word starts on the vowel. 'Qué' is 'keh', not 'kway'.",
          },
          {
            id: "precios-4-2",
            text: "Son las diez.",
            translation: "It's ten o'clock.",
            focusNote:
              "son las dyeth. Plural 'son' for every hour after one o'clock. 'Diez' ends on Spain's soft 'th'.",
          },
          {
            id: "precios-4-3",
            text: "A las ocho y media.",
            translation: "At half past eight.",
            focusNote:
              "a las O-cho ee MEH-dya. The 'y' is just 'ee'; 'media' is two syllables, MEH-dya.",
          },
          {
            id: "precios-4-4",
            text: "¿A qué hora abren?",
            translation: "What time do they open?",
            focusNote:
              "a ke O-ra A-bren. Silent h in 'hora'; soft b in 'abren', the lips barely closing.",
          },
          {
            id: "precios-4-5",
            text: "Cierran a las dos.",
            translation: "They close at two.",
            focusNote:
              "THYEH-rran. 'th' at the start, and the double rr is a rolled r — a tap if the roll won't come, never an American r.",
          },
        ],
      },
    ],
  },
  {
    id: "restaurante",
    title: "El restaurante",
    subtitle: "A table, the menu and the bill",
    color: "#ff4b4b",
    colorDark: "#d63d3d",
    lessons: [
      {
        id: "restaurante-1",
        title: "Getting a table",
        phrases: [
          {
            id: "restaurante-1-1",
            text: "Una mesa para dos, por favor.",
            translation: "A table for two, please.",
            focusNote:
              "OO-na MEH-sa PA-ra dos. 'Mesa' with a pure 'eh', and the s stays an s — never a z as in 'mezza'.",
          },
          {
            id: "restaurante-1-2",
            text: "Tengo una reserva.",
            translation: "I have a reservation.",
            focusNote:
              "TEN-go OO-na re-SER-ba. The v in 'reserva' is a soft b; stress on SER.",
          },
          {
            id: "restaurante-1-3",
            text: "A nombre de Deb.",
            translation: "Under the name Deb.",
            focusNote:
              "a NOM-bre de Deb. 'Nombre' — straight from the m into 'bre', with no vowel between them.",
          },
          {
            id: "restaurante-1-4",
            text: "¿Podemos sentarnos fuera?",
            translation: "Can we sit outside?",
            focusNote:
              "po-DEH-mos sen-TAR-nos FWEH-ra. The d in 'podemos' is soft; 'fuera' starts 'fweh', one syllable.",
          },
          {
            id: "restaurante-1-5",
            text: "¿Cuánto hay que esperar?",
            translation: "How long is the wait?",
            focusNote:
              "KWAN-to eye ke es-pe-RAR. 'Hay' sounds like the English 'eye' — silent h. The final r is one light tap.",
          },
        ],
      },
      {
        id: "restaurante-2",
        title: "Ordering",
        phrases: [
          {
            id: "restaurante-2-1",
            text: "La carta, por favor.",
            translation: "The menu, please.",
            focusNote:
              "la KAR-ta. One tapped r, then a crisp t. 'La carta' is the menu you read — 'el menú' is the set lunch.",
          },
          {
            id: "restaurante-2-2",
            text: "¿Hay menú del día?",
            translation: "Is there a set lunch menu?",
            focusNote:
              "eye me-NOO del DEE-a. Stress on the end of 'menú' — the accent says so. 'Día' is two syllables.",
          },
          {
            id: "restaurante-2-3",
            text: "De primero, la ensalada.",
            translation: "To start, the salad.",
            focusNote:
              "de pree-MEH-ro, la en-sa-LA-da. Every d is the soft one, tongue to the teeth; pure vowels in 'ensalada'.",
          },
          {
            id: "restaurante-2-4",
            text: "De segundo, el pescado.",
            translation: "For the main, the fish.",
            focusNote:
              "de se-GOON-do, el pes-KA-do. Hard g in 'segundo', as in 'go'; soft d at the end of 'pescado'.",
          },
          {
            id: "restaurante-2-5",
            text: "Para beber, agua.",
            translation: "To drink, water.",
            focusNote:
              "PA-ra be-BER, A-gwa. 'Beber' — both b's soft, stress on the end. 'Agua' is A-gwa, two syllables.",
          },
        ],
      },
      {
        id: "restaurante-3",
        title: "At the table",
        phrases: [
          {
            id: "restaurante-3-1",
            text: "¿Me trae más pan?",
            translation: "Could you bring me more bread?",
            focusNote:
              "me TRA-e mas pan. 'Trae' is two syllables, TRA-eh, with a tapped r. Pure a in 'pan' — not the English 'pan'.",
          },
          {
            id: "restaurante-3-2",
            text: "Soy alérgica a los frutos secos.",
            translation: "I'm allergic to nuts.",
            focusNote:
              "soy a-LER-hee-ka a los FROO-tos SEH-kos. The g before i is a throaty h: a-LER-hee-ka. The -a ending because it's Deb saying it.",
          },
          {
            id: "restaurante-3-3",
            text: "¿Qué hay de postre?",
            translation: "What is there for dessert?",
            focusNote:
              "ke eye de POS-tre. 'Postre' — POS, then a quick 'tre' with a tapped r.",
          },
          {
            id: "restaurante-3-4",
            text: "Estaba todo muy rico.",
            translation: "It was all delicious.",
            focusNote:
              "es-TA-ba TO-do mwee RREE-ko. The b in 'estaba' is soft; the r in 'rico' starts the word, so it rolls.",
          },
          {
            id: "restaurante-3-5",
            text: "¿Nos trae la cuenta?",
            translation: "Could you bring us the bill?",
            focusNote:
              "nos TRA-e la KWEN-ta. 'Cuenta' is KWEN-ta — the u is a quick w, not a syllable of its own.",
          },
        ],
      },
    ],
  },
  {
    id: "compras",
    title: "De compras",
    subtitle: "The supermarket, the bakery and the fish counter",
    color: "#58cc02",
    colorDark: "#46a302",
    lessons: [
      {
        id: "compras-1",
        title: "At the supermarket",
        phrases: [
          {
            id: "compras-1-1",
            text: "¿Dónde está la leche?",
            translation: "Where is the milk?",
            focusNote:
              "DON-de es-TA la LEH-che. 'Leche' — pure 'eh', then ch as in 'church'. Not 'letch-ay'.",
          },
          {
            id: "compras-1-2",
            text: "¿Tienen bolsas?",
            translation: "Do you have bags?",
            focusNote:
              "TYEH-nen BOL-sas. The l in 'bolsas' is a light, front-of-the-mouth l — not the thick American one.",
          },
          {
            id: "compras-1-3",
            text: "¿Dónde está la caja?",
            translation: "Where is the checkout?",
            focusNote:
              "la KA-ha. The j is a throaty h, like gently clearing your throat: KA-ha.",
          },
          {
            id: "compras-1-4",
            text: "Con tarjeta, por favor.",
            translation: "By card, please.",
            focusNote:
              "kon tar-HEH-ta. The j again — tar-HEH-ta — with a tapped r just before it.",
          },
          {
            id: "compras-1-5",
            text: "¿Me da el tique?",
            translation: "Can I have the receipt?",
            focusNote:
              "me da el TEE-ke. 'Tique' is TEE-keh — the qu is a plain k, and the final e is said, not dropped.",
          },
        ],
      },
      {
        id: "compras-2",
        title: "At the bakery",
        phrases: [
          {
            id: "compras-2-1",
            text: "¿Está recién hecho?",
            translation: "Is it freshly made?",
            focusNote:
              "es-TA re-THYEN EH-cho. 'Recién' has the Spain 'th' and its stress on the end; the h in 'hecho' is silent.",
          },
          {
            id: "compras-2-2",
            text: "Dos cruasanes, por favor.",
            translation: "Two croissants, please.",
            focusNote:
              "dos krwa-SA-nes. Spanish spells it as it says it: krwa-SA-nes, stress in the middle, every letter sounded.",
          },
          {
            id: "compras-2-3",
            text: "¿Qué lleva esto?",
            translation: "What's in this?",
            focusNote:
              "ke YEH-ba ES-to. 'Lleva' starts with a y sound in Spain — YEH-ba — and the v is a soft b.",
          },
          {
            id: "compras-2-4",
            text: "Me llevo este.",
            translation: "I'll take this one.",
            focusNote:
              "me YEH-bo ES-te. The same ll — YEH-bo. 'Este' with a pure 'eh', not 'es-tay'.",
          },
          {
            id: "compras-2-5",
            text: "Un trozo de tarta, por favor.",
            translation: "A slice of cake, please.",
            focusNote:
              "oon TRO-tho de TAR-ta. 'Trozo' — tapped r, then Spain's 'th' on the z: TRO-tho.",
          },
        ],
      },
      {
        id: "compras-3",
        title: "At the fish counter",
        phrases: [
          {
            id: "compras-3-1",
            text: "¿Está fresco el pescado?",
            translation: "Is the fish fresh?",
            focusNote:
              "es-TA FRES-ko el pes-KA-do. Both s's are crisp, and the final d is soft, almost a 'th'.",
          },
          {
            id: "compras-3-2",
            text: "Medio kilo de gambas.",
            translation: "Half a kilo of prawns.",
            focusNote:
              "MEH-dyo KEE-lo de GAM-bas. 'Kilo' is KEE-lo, a pure 'ee'. Hard g in 'gambas'.",
          },
          {
            id: "compras-3-3",
            text: "¿Me lo puede limpiar?",
            translation: "Can you clean it for me?",
            focusNote:
              "me lo PWEH-de leem-PYAR. 'Limpiar' ends on 'PYAR', one syllable, with a tapped r.",
          },
          {
            id: "compras-3-4",
            text: "Cuatro filetes, finos.",
            translation: "Four fillets, thin.",
            focusNote:
              "KWA-tro fee-LEH-tes, FEE-nos. Spanish 'filete' says every letter: fee-LEH-te.",
          },
          {
            id: "compras-3-5",
            text: "¿Me lo envuelve, por favor?",
            translation: "Could you wrap it for me, please?",
            focusNote:
              "me lo en-BWEL-be. Both v's are soft b's: en-BWEL-be, stress on BWEL.",
          },
        ],
      },
    ],
  },
  {
    id: "diario",
    title: "Cada día",
    subtitle: "Weather, neighbours and the lift",
    color: "#1cb0f6",
    colorDark: "#1899d6",
    lessons: [
      {
        id: "diario-1",
        title: "The weather",
        phrases: [
          {
            id: "diario-1-1",
            text: "Hace buen tiempo.",
            translation: "It's nice weather.",
            focusNote:
              "A-the bwen TYEM-po. Silent h and Spain's 'th' on the c: A-the. 'Tiempo' is two syllables, TYEM-po.",
          },
          {
            id: "diario-1-2",
            text: "Está lloviendo.",
            translation: "It's raining.",
            focusNote:
              "es-TA yo-BYEN-do. The ll is a y in Spain — yo-BYEN-do — and the v is a soft b.",
          },
          {
            id: "diario-1-3",
            text: "Hace mucho viento.",
            translation: "It's very windy.",
            focusNote:
              "A-the MOO-cho BYEN-to. 'Viento' starts with a soft b: BYEN-to, lips barely touching.",
          },
          {
            id: "diario-1-4",
            text: "Mañana va a llover.",
            translation: "It's going to rain tomorrow.",
            focusNote:
              "ma-NYA-na ba a yo-BER. The ñ is 'ny' as in 'canyon'; 'llover' is yo-BER, stress on the end.",
          },
          {
            id: "diario-1-5",
            text: "Hace sol.",
            translation: "It's sunny.",
            focusNote:
              "A-the sol — literally 'it makes sun'. Short o in 'sol', as in 'doll', not 'soul'.",
          },
        ],
      },
      {
        id: "diario-2",
        title: "The neighbours",
        phrases: [
          {
            id: "diario-2-1",
            text: "¿Sube o baja?",
            translation: "Going up or down?",
            focusNote:
              "SOO-be o BA-ha. Soft b in 'sube'; the j in 'baja' is a throaty h: BA-ha.",
          },
          {
            id: "diario-2-2",
            text: "Soy la vecina del tercero.",
            translation: "I'm the neighbour from the third floor.",
            focusNote:
              "soy la be-THEE-na del ter-THEH-ro. Two Spain 'th's — be-THEE-na, ter-THEH-ro — and the v is a soft b.",
          },
          {
            id: "diario-2-3",
            text: "Hasta mañana.",
            translation: "See you tomorrow.",
            focusNote:
              "AS-ta ma-NYA-na. Silent h; the ñ is 'ny'. Four even syllables, no rush.",
          },
          {
            id: "diario-2-4",
            text: "¿Me ayuda con esto?",
            translation: "Could you help me with this?",
            focusNote:
              "me a-YOO-da kon ES-to. 'Ayuda' — stress on YOO, and the d is the soft one.",
          },
          {
            id: "diario-2-5",
            text: "Buenas noches.",
            translation: "Good night.",
            focusNote:
              "BWEH-nas NO-ches. Said arriving as well as leaving, once it's dark. 'ch' as in 'church'.",
          },
        ],
      },
      {
        id: "diario-3",
        title: "At home",
        phrases: [
          {
            id: "diario-3-1",
            text: "No funciona el ascensor.",
            translation: "The lift isn't working.",
            focusNote:
              "no foon-THYO-na el as-then-SOR. Two 'th's: foon-THYO-na, as-then-SOR. Stress on the very end of 'ascensor'.",
          },
          {
            id: "diario-3-2",
            text: "¿Ha llegado el paquete?",
            translation: "Has the parcel arrived?",
            focusNote:
              "a ye-GA-do el pa-KEH-te. Silent h in 'ha'; the ll is y: ye-GA-do. Soft d.",
          },
          {
            id: "diario-3-3",
            text: "Tengo pilates a las diez.",
            translation: "I have Pilates at ten.",
            focusNote:
              "TEN-go pee-LA-tes a las dyeth. 'Pilates' is pee-LA-tes in Spain, every vowel pure.",
          },
          {
            id: "diario-3-4",
            text: "Voy a regar las plantas.",
            translation: "I'm going to water the plants.",
            focusNote:
              "boy a re-GAR las PLAN-tas. 'Voy' starts with a soft b — boy. 'Regar' ends on a tapped r.",
          },
          {
            id: "diario-3-5",
            text: "Estoy en casa.",
            translation: "I'm at home.",
            focusNote:
              "es-TOY en KA-sa. 'Casa' with a crisp s, never a z — it's not 'kah-za'.",
          },
        ],
      },
    ],
  },
  {
    // Five more everyday units, asked for as "more phrases, more words, more
    // match, more stories" with the topics named: what an American living
    // in Barcelona needs in year one — the pharmacy and the phone, her
    // plants, looking for a flat, finding the way, and the holidays, since
    // Thanksgiving and Christmas are next. Same rules again: five phrases a
    // lesson, nothing already on a card elsewhere in the course, Castilian
    // focusNotes written for an American mouth. They sit on the path in
    // course order after Cada día and before El pasado.
    id: "vida",
    title: "La vida diaria",
    subtitle: "The pharmacy, the phone and things that break",
    color: "#1cb0f6",
    colorDark: "#1899d6",
    lessons: [
      {
        id: "vida-1",
        title: "At the pharmacy",
        phrases: [
          {
            id: "vida-1-1",
            text: "Necesito algo para el resfriado.",
            translation: "I need something for a cold.",
            focusNote:
              "ne-the-SEE-to AL-go PA-ra el res-fri-A-do. Spain's 'th' in 'necesito'; 'resfriado' is four syllables with the stress on A, and the d at the end is soft.",
          },
          {
            id: "vida-1-2",
            text: "Me duele la cabeza.",
            translation: "My head hurts.",
            focusNote:
              "me DWE-le la ka-BE-tha. 'Duele' is one glide, DWE; 'cabeza' ends on the Spain th — ka-BE-tha, never 'ka-BAY-za'.",
          },
          {
            id: "vida-1-3",
            text: "¿Hace falta receta?",
            translation: "Do I need a prescription?",
            focusNote:
              "A-the FAL-ta re-THE-ta. Silent h and two th's: A-the, re-THE-ta. 'Hace falta' is 'is it needed' — the pharmacist's own phrase.",
          },
          {
            id: "vida-1-4",
            text: "¿Cuántas veces al día?",
            translation: "How many times a day?",
            focusNote:
              "KWAN-tas BE-thes al DEE-a. 'Veces' is BE-thes — a soft b at the front and the th in the middle. 'Día' is two syllables, DEE-a.",
          },
          {
            id: "vida-1-5",
            text: "¿Tiene algo más fuerte?",
            translation: "Do you have anything stronger?",
            focusNote:
              "TYE-ne AL-go mas FWER-te. 'Fuerte' — the ue is one glide, FWER, with a tapped r. Every vowel short and pure.",
          },
        ],
      },
      {
        id: "vida-2",
        title: "On the phone",
        phrases: [
          {
            id: "vida-2-1",
            text: "¿Diga?",
            translation: "Hello? (answering the phone)",
            focusNote:
              "DEE-ga — two syllables, soft d. This is how Spain picks up the phone; 'hola' sounds like you don't know who's calling.",
          },
          {
            id: "vida-2-2",
            text: "Llamo para pedir cita.",
            translation: "I'm calling to make an appointment.",
            focusNote:
              "YA-mo PA-ra pe-DEER THEE-ta. The ll is a y: YA-mo. 'Cita' is THEE-ta, the Spain th — not 'see-ta'.",
          },
          {
            id: "vida-2-3",
            text: "¿Puede hablar más despacio?",
            translation: "Can you speak more slowly?",
            focusNote:
              "PWE-the a-BLAR mas des-PA-thyo. Silent h in 'hablar'; 'despacio' is des-PA-thyo with the th. The most useful sentence on any phone call.",
          },
          {
            id: "vida-2-4",
            text: "¿Me puede llamar más tarde?",
            translation: "Can you call me back later?",
            focusNote:
              "me PWE-the ya-MAR mas TAR-de. 'Llamar' is ya-MAR, stress at the end, one light tap on the r.",
          },
          {
            id: "vida-2-5",
            text: "Perdone, me he equivocado.",
            translation: "Sorry, wrong number.",
            focusNote:
              "per-DO-ne me e e-ki-bo-KA-do. 'Me he' is two e's run together; 'equivocado' has a k for the qu, a soft b for the v, and the stress on KA.",
          },
        ],
      },
      {
        id: "vida-3",
        title: "When something breaks",
        phrases: [
          {
            id: "vida-3-1",
            text: "No funciona la calefacción.",
            translation: "The heating isn't working.",
            focusNote:
              "no foon-THYO-na la ka-le-fak-THYON. Two th's — foon-THYO-na, ka-le-fak-THYON — and the stress lands right at the end.",
          },
          {
            id: "vida-3-2",
            text: "Hay una fuga de agua.",
            translation: "There's a water leak.",
            focusNote:
              "ai OO-na FOO-ga de A-gwa. 'Hay' is just 'eye' — the h is silent. 'Agua' is A-gwa, two syllables, the u a quick glide.",
          },
          {
            id: "vida-3-3",
            text: "¿Puede venir alguien a mirarlo?",
            translation: "Can someone come and look at it?",
            focusNote:
              "PWE-the be-NEER AL-gyen a mee-RAR-lo. 'Venir' starts with a soft b; 'alguien' is AL-gyen with a hard g. Tap both r's in 'mirarlo'.",
          },
          {
            id: "vida-3-4",
            text: "No tengo internet.",
            translation: "I have no internet.",
            focusNote:
              "no TEN-go in-ter-NET. Spanish stresses the END of 'internet' — in-ter-NET — and taps the r. The vowels stay short.",
          },
          {
            id: "vida-3-5",
            text: "¿Cuándo puede pasar?",
            translation: "When can you come by?",
            focusNote:
              "KWAN-do PWE-the pa-SAR. 'Pasar' — to drop by — is the word for a tradesperson's visit; stress at the end, tapped r.",
          },
        ],
      },
    ],
  },
  {
    id: "plantas",
    title: "Las plantas",
    subtitle: "Buying them, keeping them alive, showing them off",
    color: "#58cc02",
    colorDark: "#46a302",
    lessons: [
      {
        id: "plantas-1",
        title: "At the garden centre",
        phrases: [
          {
            id: "plantas-1-1",
            text: "¿Esta planta necesita mucha luz?",
            translation: "Does this plant need a lot of light?",
            focusNote:
              "ES-ta PLAN-ta ne-the-SEE-ta MOO-cha looth. 'Luz' ends on the Spain th: looth. 'Necesita' has the same th in the middle.",
          },
          {
            id: "plantas-1-2",
            text: "¿Es de interior o de exterior?",
            translation: "Is it for indoors or outdoors?",
            focusNote:
              "es de in-te-RYOR o de eks-te-RYOR. The x is 'ks'; both words stress the very end, -RYOR, with a tapped r.",
          },
          {
            id: "plantas-1-3",
            text: "¿Cada cuánto la riego?",
            translation: "How often do I water it?",
            focusNote:
              "KA-da KWAN-to la RYE-go. 'Cada cuánto' is the everyday 'how often'. 'Riego' — a tapped r, then one glide, RYE-go.",
          },
          {
            id: "plantas-1-4",
            text: "Quiero una maceta más grande.",
            translation: "I want a bigger pot.",
            focusNote:
              "KYE-ro OO-na ma-THE-ta mas GRAN-de. 'Maceta' is ma-THE-ta — the c before e is the Spain th. Soft d in 'grande'.",
          },
          {
            id: "plantas-1-5",
            text: "¿Tienen tierra para macetas?",
            translation: "Do you have potting soil?",
            focusNote:
              "TYE-nen TYE-rra PA-ra ma-THE-tas. 'Tierra' has the rolled rr — one of the few places the r really rolls rather than taps.",
          },
        ],
      },
      {
        id: "plantas-2",
        title: "Keeping them alive",
        phrases: [
          {
            id: "plantas-2-1",
            text: "Se le caen las hojas.",
            translation: "Its leaves are falling off.",
            focusNote:
              "se le KA-en las O-has. Silent h, and the j is the throaty h: O-has. 'Caen' is two syllables, KA-en.",
          },
          {
            id: "plantas-2-2",
            text: "Creo que la he regado demasiado.",
            translation: "I think I've overwatered it.",
            focusNote:
              "KRE-o ke la e re-GA-do de-ma-SYA-do. 'Creo' is two syllables, KRE-o; the h in 'he' is silent, so it's just 'e'. Soft d's throughout.",
          },
          {
            id: "plantas-2-3",
            text: "Le hace falta más sol.",
            translation: "It needs more sun.",
            focusNote:
              "le A-the FAL-ta mas sol. Silent h and the Spain th: A-the. 'Le hace falta' — 'it is lacking' — is how Spanish says something needs something.",
          },
          {
            id: "plantas-2-4",
            text: "Está creciendo mucho.",
            translation: "It's growing a lot.",
            focusNote:
              "es-TA kre-THYEN-do MOO-cho. 'Creciendo' is kre-THYEN-do — hard k, then the th, then one glide. Three syllables.",
          },
          {
            id: "plantas-2-5",
            text: "Tiene una flor nueva.",
            translation: "It has a new flower.",
            focusNote:
              "TYE-ne OO-na flor NWE-ba. 'Flor' has a short o and a tapped r — not 'floor'. 'Nueva' is one glide, NWE, and a soft b.",
          },
        ],
      },
      {
        id: "plantas-3",
        title: "Showing them off",
        phrases: [
          {
            id: "plantas-3-1",
            text: "Tengo muchas plantas en el balcón.",
            translation: "I have a lot of plants on the balcony.",
            focusNote:
              "TEN-go MOO-chas PLAN-tas en el bal-KON. 'Balcón' stresses the end, bal-KON, with a light l — not the English 'BAL-cony'.",
          },
          {
            id: "plantas-3-2",
            text: "Esta es mi favorita.",
            translation: "This one is my favourite.",
            focusNote:
              "ES-ta es mee fa-bo-REE-ta. 'Favorita' — the v is a soft b, fa-bo-REE-ta, stress on REE.",
          },
          {
            id: "plantas-3-3",
            text: "¿Me la puede cuidar unos días?",
            translation: "Could you look after it for a few days?",
            focusNote:
              "me la PWE-the kwee-DAR OO-nos DEE-as. 'Cuidar' — the ui is one glide, kwee-DAR, stress at the end.",
          },
          {
            id: "plantas-3-4",
            text: "Hay que regarla dos veces a la semana.",
            translation: "It has to be watered twice a week.",
            focusNote:
              "ai ke re-GAR-la dos BE-thes a la se-MA-na. 'Hay que' is 'you have to'. 'Veces' is BE-thes, soft b and the th.",
          },
          {
            id: "plantas-3-5",
            text: "Se está muriendo.",
            translation: "It's dying.",
            focusNote:
              "se es-TA moo-RYEN-do. 'Muriendo' is moo-RYEN-do — a tapped r and one glide, three syllables. Said with a sigh, to Carmen.",
          },
        ],
      },
    ],
  },
  {
    id: "piso",
    title: "Buscar piso",
    subtitle: "The advert, the viewing and the deposit",
    color: "#ff9600",
    colorDark: "#e08600",
    lessons: [
      {
        id: "piso-1",
        title: "Calling about the ad",
        phrases: [
          {
            id: "piso-1-1",
            text: "Llamo por el anuncio del piso.",
            translation: "I'm calling about the flat advert.",
            focusNote:
              "YA-mo por el a-NOON-thyo del PEE-so. The ll is a y: YA-mo. 'Anuncio' is a-NOON-thyo with the Spain th.",
          },
          {
            id: "piso-1-2",
            text: "¿Sigue disponible?",
            translation: "Is it still available?",
            focusNote:
              "SEE-ge dis-po-NEE-ble. In 'sigue' the u is silent and the g is hard: SEE-ge. 'Disponible' — stress on NEE, final e said.",
          },
          {
            id: "piso-1-3",
            text: "¿Cuánto es el alquiler al mes?",
            translation: "How much is the rent a month?",
            focusNote:
              "KWAN-to es el al-kee-LER al mes. 'Alquiler' — the qu is a k, and the stress sits at the very end: al-kee-LER.",
          },
          {
            id: "piso-1-4",
            text: "¿Están incluidos los gastos?",
            translation: "Are the bills included?",
            focusNote:
              "es-TAN in-kloo-EE-dos los GAS-tos. 'Incluidos' is four syllables — the ui splits here, in-kloo-EE-dos. 'Gastos' is the word for bills.",
          },
          {
            id: "piso-1-5",
            text: "¿Puedo verlo esta semana?",
            translation: "Can I see it this week?",
            focusNote:
              "PWE-do BER-lo ES-ta se-MA-na. 'Verlo' starts with a soft b and taps the r: BER-lo.",
          },
        ],
      },
      {
        id: "piso-2",
        title: "Viewing the flat",
        phrases: [
          {
            id: "piso-2-1",
            text: "¿Cuántas habitaciones tiene?",
            translation: "How many bedrooms does it have?",
            focusNote:
              "KWAN-tas a-bi-ta-THYO-nes TYE-ne. Silent h; 'habitaciones' is five syllables with the th in THYO. Stress on THYO.",
          },
          {
            id: "piso-2-2",
            text: "¿Tiene ascensor?",
            translation: "Does it have a lift?",
            focusNote:
              "TYE-ne as-then-SOR. 'Ascensor' — the sc is s-then-, with the Spain th, and the stress on the end. Fourth floor without one is a real question.",
          },
          {
            id: "piso-2-3",
            text: "¿Está amueblado?",
            translation: "Is it furnished?",
            focusNote:
              "es-TA a-mwe-BLA-do. 'Amueblado' — the ue is one glide, a-mwe-BLA-do, with a soft d at the end.",
          },
          {
            id: "piso-2-4",
            text: "¿Da a la calle o al patio?",
            translation: "Does it face the street or the courtyard?",
            focusNote:
              "da a la KA-ye o al PA-tyo. 'Da a' — the two a's run together as one long a. 'Calle' is KA-ye; the ll is a y.",
          },
          {
            id: "piso-2-5",
            text: "¿Hay mucho ruido por la noche?",
            translation: "Is there much noise at night?",
            focusNote:
              "ai MOO-cho RWEE-do por la NO-che. 'Ruido' is two syllables, RWEE-do, with a tapped r. Ask it with the window open.",
          },
        ],
      },
      {
        id: "piso-3",
        title: "Taking it",
        phrases: [
          {
            id: "piso-3-1",
            text: "¿Cuánto es la fianza?",
            translation: "How much is the deposit?",
            focusNote:
              "KWAN-to es la FYAN-tha. 'Fianza' — FYAN-tha, one glide at the front and the Spain th at the end.",
          },
          {
            id: "piso-3-2",
            text: "¿Cuándo podría entrar?",
            translation: "When could I move in?",
            focusNote:
              "KWAN-do po-DREE-a en-TRAR. 'Podría' is three syllables with the stress on DREE; 'entrar' stresses the end, tapped r.",
          },
          {
            id: "piso-3-3",
            text: "Necesito un contrato de un año.",
            translation: "I need a one-year contract.",
            focusNote:
              "ne-the-SEE-to oon kon-TRA-to de oon A-nyo. 'Año' — the ñ is 'ny', and it matters: without it, it's a very different word.",
          },
          {
            id: "piso-3-4",
            text: "¿Qué documentos necesita?",
            translation: "What documents do you need?",
            focusNote:
              "ke do-koo-MEN-tos ne-the-SEE-ta. 'Documentos' — stress on MEN, every vowel pure. The answer will be the NIE and a payslip.",
          },
          {
            id: "piso-3-5",
            text: "Lo pensaré y le llamo mañana.",
            translation: "I'll think about it and call you tomorrow.",
            focusNote:
              "lo pen-sa-RE ee le YA-mo ma-NYA-na. 'Pensaré' stresses the very end, where the accent is. 'Llamo' is YA-mo.",
          },
        ],
      },
    ],
  },
  {
    id: "ciudad",
    title: "Por la ciudad",
    subtitle: "Asking the way, understanding the answer, getting there",
    color: "#00c2b2",
    colorDark: "#00a294",
    lessons: [
      {
        id: "ciudad-1",
        title: "Asking the way",
        phrases: [
          {
            id: "ciudad-1-1",
            text: "Perdone, ¿dónde está el metro?",
            translation: "Excuse me, where's the metro?",
            focusNote:
              "per-DO-ne DON-de es-TA el ME-tro. 'Perdone' is the formal 'excuse me' for a stranger — stress on DO. 'Metro' with a tapped r.",
          },
          {
            id: "ciudad-1-2",
            text: "¿Está lejos?",
            translation: "Is it far?",
            focusNote:
              "es-TA LE-hos. The j is the throaty h: LE-hos. Two short syllables.",
          },
          {
            id: "ciudad-1-3",
            text: "¿Se puede ir andando?",
            translation: "Can you walk there?",
            focusNote:
              "se PWE-de eer an-DAN-do. 'Ir' is just 'eer'. 'Andando' has two soft d's, tongue on the teeth.",
          },
          {
            id: "ciudad-1-4",
            text: "Busco la calle Mallorca.",
            translation: "I'm looking for Mallorca Street.",
            focusNote:
              "BOOS-ko la KA-ye ma-YOR-ka. Both ll's are y's in Spain: KA-ye, ma-YOR-ka. 'Busco' is BOOS-ko, hard k.",
          },
          {
            id: "ciudad-1-5",
            text: "¿Me lo puede señalar en el mapa?",
            translation: "Can you show me on the map?",
            focusNote:
              "me lo PWE-the se-nya-LAR en el MA-pa. 'Señalar' — the ñ is 'ny', stress at the end. 'Mapa' with a pure a, MA-pa.",
          },
        ],
      },
      {
        id: "ciudad-2",
        title: "Understanding the answer",
        phrases: [
          {
            id: "ciudad-2-1",
            text: "Todo recto.",
            translation: "Straight on.",
            focusNote:
              "TO-do REK-to. Soft d in 'todo'; 'recto' has a hard k in the middle, REK-to. The answer you'll hear most.",
          },
          {
            id: "ciudad-2-2",
            text: "Gire a la izquierda.",
            translation: "Turn left.",
            focusNote:
              "HEE-re a la eeth-KYER-da. 'Gire' — g before i is the throaty h: HEE-re. 'Izquierda' is eeth-KYER-da, the z a th.",
          },
          {
            id: "ciudad-2-3",
            text: "La segunda a la derecha.",
            translation: "Second on the right.",
            focusNote:
              "la se-GOON-da a la de-RE-cha. 'Derecha' — de-RE-cha, ch as in 'church', stress on RE.",
          },
          {
            id: "ciudad-2-4",
            text: "Está en la esquina.",
            translation: "It's on the corner.",
            focusNote:
              "es-TA en la es-KEE-na. 'Esquina' — the qu is a k: es-KEE-na, stress on KEE.",
          },
          {
            id: "ciudad-2-5",
            text: "Está al lado de la farmacia.",
            translation: "It's next to the pharmacy.",
            focusNote:
              "es-TA al LA-do de la far-MA-thya. 'Farmacia' is far-MA-thya — the Spain th, and the stress on MA, not on the end.",
          },
        ],
      },
      {
        id: "ciudad-3",
        title: "Getting there",
        phrases: [
          {
            id: "ciudad-3-1",
            text: "¿Qué línea va a la Sagrada Familia?",
            translation: "Which line goes to the Sagrada Familia?",
            focusNote:
              "ke LEE-ne-a ba a la sa-GRA-da fa-MEE-lya. 'Línea' is three syllables, LEE-ne-a; 'va' is a soft b. Soft d in 'Sagrada'.",
          },
          {
            id: "ciudad-3-2",
            text: "¿Este autobús para en la plaza?",
            translation: "Does this bus stop at the square?",
            focusNote:
              "ES-te ow-to-BOOS PA-ra en la PLA-tha. 'Autobús' stresses the end; 'plaza' is PLA-tha with the Spain th.",
          },
          {
            id: "ciudad-3-3",
            text: "¿Cuántas paradas faltan?",
            translation: "How many stops are left?",
            focusNote:
              "KWAN-tas pa-RA-das FAL-tan. 'Faltan' — 'are missing' — is how you ask how many to go. Soft d in 'paradas'.",
          },
          {
            id: "ciudad-3-4",
            text: "A esta dirección, por favor.",
            translation: "To this address, please.",
            focusNote:
              "a ES-ta dee-rek-THYON por fa-BOR. 'Dirección' — the cc is k-th, dee-rek-THYON, stress at the end. Said to a taxi driver with the phone held up.",
          },
          {
            id: "ciudad-3-5",
            text: "Me bajo aquí.",
            translation: "I'm getting off here.",
            focusNote:
              "me BA-ho a-KEE. 'Bajo' — the j is the throaty h: BA-ho. 'Aquí' stresses the end, a-KEE.",
          },
        ],
      },
    ],
  },
  {
    // Thanksgiving explained to the neighbours, then Spain's own December:
    // Nochebuena, the lottery, the grapes and the Kings. The customs are in
    // the focusNotes because they are what she'll be asked about.
    id: "fiestas",
    title: "Las fiestas",
    subtitle: "Thanksgiving, Christmas, the grapes and the Kings",
    color: "#ce82ff",
    colorDark: "#a568cc",
    lessons: [
      {
        id: "fiestas-1",
        title: "Thanksgiving",
        phrases: [
          {
            id: "fiestas-1-1",
            text: "En Estados Unidos celebramos Acción de Gracias.",
            translation: "In the US we celebrate Thanksgiving.",
            focusNote:
              "en es-TA-dos oo-NEE-dos the-le-BRA-mos ak-THYON de GRA-thyas. Three Spain th's: the-le-BRA-mos, ak-THYON, GRA-thyas. Long, but you'll say it ten times in November.",
          },
          {
            id: "fiestas-1-2",
            text: "Es el cuarto jueves de noviembre.",
            translation: "It's the fourth Thursday of November.",
            focusNote:
              "es el KWAR-to HWE-bes de no-BYEM-bre. 'Jueves' is HWE-bes — the throaty h, then a soft b. 'Noviembre' is no-BYEM-bre.",
          },
          {
            id: "fiestas-1-3",
            text: "Voy a hacer un pavo.",
            translation: "I'm going to make a turkey.",
            focusNote:
              "boy a a-THER oon PA-bo. 'Voy a hacer' — the h is silent, so the a's run together: boy-a-THER. 'Pavo' is PA-bo, soft b.",
          },
          {
            id: "fiestas-1-4",
            text: "¿Tienen pavo entero?",
            translation: "Do you have a whole turkey?",
            focusNote:
              "TYE-nen PA-bo en-TE-ro. 'Entero' — en-TE-ro, tapped r, stress on TE. Ask the butcher a week early; they order it in.",
          },
          {
            id: "fiestas-1-5",
            text: "Venid a cenar a mi casa el jueves.",
            translation: "Come to dinner at mine on Thursday.",
            focusNote:
              "be-NEED a the-NAR a mee KA-sa el HWE-bes. 'Venid' is 'come', to more than one person — soft b, stress at the end. 'Cenar' is the-NAR.",
          },
        ],
      },
      {
        id: "fiestas-2",
        title: "Christmas",
        phrases: [
          {
            id: "fiestas-2-1",
            text: "¡Feliz Navidad!",
            translation: "Merry Christmas!",
            focusNote:
              "fe-LEETH na-bi-DAD. 'Feliz' ends on the Spain th: fe-LEETH. In 'Navidad' the v is a soft b and the final d barely sounds.",
          },
          {
            id: "fiestas-2-2",
            text: "¿Dónde pasas la Nochebuena?",
            translation: "Where are you spending Christmas Eve?",
            focusNote:
              "DON-de PA-sas la no-che-BWE-na. 'Nochebuena' is no-che-BWE-na, stress on BWE. The big dinner in Spain is the 24th, not the 25th.",
          },
          {
            id: "fiestas-2-3",
            text: "Me voy a Estados Unidos por Navidad.",
            translation: "I'm going to the US for Christmas.",
            focusNote:
              "me boy a es-TA-dos oo-NEE-dos por na-bi-DAD. 'Me voy' is 'I'm off' — soft b. Every d in the sentence is the soft one.",
          },
          {
            id: "fiestas-2-4",
            text: "¿Te ha tocado la lotería?",
            translation: "Did you win the lottery?",
            focusNote:
              "te a to-KA-do la lo-te-REE-a. Silent h in 'ha'. 'Lotería' is four syllables, lo-te-REE-a. The Christmas draw is 22 December and everyone asks.",
          },
          {
            id: "fiestas-2-5",
            text: "Un poco de turrón, por favor.",
            translation: "A bit of turrón, please.",
            focusNote:
              "oon PO-ko de too-RRON por fa-BOR. The rr rolls in 'turrón' and the stress is at the end. It's the Christmas almond nougat — hard or soft, you'll be asked which.",
          },
        ],
      },
      {
        id: "fiestas-3",
        title: "New Year and the Kings",
        phrases: [
          {
            id: "fiestas-3-1",
            text: "¡Feliz año nuevo!",
            translation: "Happy New Year!",
            focusNote:
              "fe-LEETH A-nyo NWE-bo. 'Año' — the ñ is 'ny', and it matters: without it, it's a very different word. 'Nuevo' is NWE-bo.",
          },
          {
            id: "fiestas-3-2",
            text: "Doce uvas a medianoche.",
            translation: "Twelve grapes at midnight.",
            focusNote:
              "DO-the OO-bas a me-dya-NO-che. 'Doce' is DO-the; 'uvas' is OO-bas, soft b. One grape per chime on New Year's Eve, and you have to finish.",
          },
          {
            id: "fiestas-3-3",
            text: "¿Qué te han traído los Reyes?",
            translation: "What did the Kings bring you?",
            focusNote:
              "ke te an tra-EE-do los RE-yes. Silent h in 'han'. 'Traído' is three syllables, tra-EE-do. Presents come on 6 January, from the Three Kings.",
          },
          {
            id: "fiestas-3-4",
            text: "¿Lleva sorpresa el roscón?",
            translation: "Does the roscón have the surprise in it?",
            focusNote:
              "YE-ba sor-PRE-sa el ros-KON. 'Lleva' is YE-ba — y for the ll, soft b. The Kings' ring cake hides a figurine, and a bean: whoever gets the bean pays.",
          },
          {
            id: "fiestas-3-5",
            text: "¡Felices fiestas!",
            translation: "Happy holidays!",
            focusNote:
              "fe-LEE-thes FYES-tas. 'Felices' is fe-LEE-thes with the Spain th. The all-purpose one for shop doors and lifts, from December right through to the 6th.",
          },
        ],
      },
    ],
  },
  {
    // The past, drilled Xerra-style: before a card will show its Spanish, the
    // lesson asks which SHAPE the sentence is — a dot in a box (preterite), a
    // line (imperfect), or a line reaching now (present perfect) — and the
    // verdict answers with the ending in big print. The goal is recognising
    // the tense and what it does to the ending, not memorising the verbs, so
    // the sentences are Deb's own life: Pilates, Atlanta, Chicago, plants.
    //
    // `aspect` is the shape the card is about and `aspectNote` says why this
    // sentence is that shape; the gate offers only the shapes the lesson
    // contains (see ASPECTS in store.js), so a lesson's contents are
    // load-bearing — a lone present-perfect card added to pasado-1 grows a
    // third button on every card in it. Each single-shape lesson carries one
    // card of the other shape on purpose: a lesson whose name answers its own
    // question trains the lesson, not the grammar.
    id: "pasado",
    title: "El pasado",
    subtitle: "Dot in a box, line — or reaching now?",
    color: "#ff4b4b",
    colorDark: "#d63d3d",
    lessons: [
      {
        id: "pasado-1",
        title: "The line · -aba / -ía",
        phrases: [
          {
            id: "pasado-1-1",
            text: "Trabajaba en Chicago.",
            marked: "Trabaj[aba] en Chicago.",
            infinitive: "trabajar — to work",
            translation: "I used to work in Chicago.",
            focusNote:
              "tra-ba-HA-ba, stress on -HA-. That -aba tail is the sound of the line — you'll hear it all lesson.",
            aspect: "line",
            aspectNote:
              "No date, no edges — the -aba on its own says 'used to'. That is the line.",
          },
          {
            id: "pasado-1-2",
            text: "Tenía veintiún años.",
            marked: "Ten[ía] veintiún años.",
            infinitive: "tener — to have",
            translation: "I was twenty-one.",
            focusNote:
              "te-NÍ-a — three syllables, stress on the Í. That -ía is the line's other ending.",
            aspect: "line",
            aspectNote:
              "'Was', and still the line: being twenty-one is a stretch of life, not an event. Spanish says ages with tener — ten-ÍA.",
          },
          {
            id: "pasado-1-3",
            text: "Volaba cada semana a Chicago.",
            marked: "Vol[aba] cada semana a Chicago.",
            infinitive: "volar — to fly",
            translation: "I flew to Chicago every week.",
            focusNote:
              "bo-LA-ba — that v is a b, stress on -LA-. Another -aba.",
            aspect: "line",
            aspectNote:
              "'Cada semana' is a habit, and habits have no edges. -aba, so a line.",
          },
          {
            id: "pasado-1-4",
            text: "Me levantaba a las seis y media.",
            marked: "Me levant[aba] a las seis y media.",
            infinitive: "levantarse — to get up",
            translation: "I used to get up at six thirty.",
            focusNote:
              "le-ban-TA-ba — v is b again. The 6:30 these lessons were sized for, in the past.",
            aspect: "line",
            aspectNote:
              "A daily habit, however long it ran. -aba is the line.",
          },
          {
            id: "pasado-1-5",
            text: "Ayer compré una planta.",
            marked: "Ayer compr[é] una planta.",
            infinitive: "comprar — to buy",
            translation: "I bought a plant yesterday.",
            focusNote:
              "com-PRÉ — the stress lands hard on the final É. That end-stress is the dot's sound, where -aba sits in the middle.",
            aspect: "dot",
            aspectNote:
              "The odd one out. Yesterday is a shut box and the buying happened once inside it — a dot, and the ending jumps to a stressed -é.",
          },
        ],
      },
      {
        id: "pasado-2",
        title: "The dot in a box · -é / -ó",
        phrases: [
          {
            id: "pasado-2-1",
            text: "Fui a Atlanta.",
            marked: "[Fui] a Atlanta.",
            infinitive: "ir — to go",
            translation: "I went to Atlanta.",
            focusNote:
              "'Fui' is one syllable — fwee. It does the work of both 'I went' and 'I was'.",
            aspect: "dot",
            aspectNote:
              "One finished trip, one dot. Fui is the dot with no ending to listen for — the whole word is the signal.",
          },
          {
            id: "pasado-2-2",
            text: "Fui a Atlanta y luego a Florida.",
            marked: "[Fui] a Atlanta y luego a Florida.",
            infinitive: "ir — to go",
            translation: "I went to Atlanta and then to Florida.",
            focusNote:
              "LWE-go — the ue glides as one sound. Two place names to coast on.",
            aspect: "dot",
            aspectNote:
              "Two trips, one after the other — dots in a row. A story that moves forward is told in dots.",
          },
          {
            id: "pasado-2-3",
            text: "Fui a un mercadillo de plantas.",
            marked: "[Fui] a un mercadillo de plantas.",
            infinitive: "ir — to go",
            translation: "I went to a plant sale.",
            focusNote:
              "mer-ka-DEE-yo — the ll is a y and the d melts soft. Stress on -DEE-.",
            aspect: "dot",
            aspectNote:
              "One visit, over and done — a dot.",
          },
          {
            id: "pasado-2-4",
            text: "La clase de ayer fue dura.",
            marked: "La clase de ayer [fue] dura.",
            infinitive: "ser — to be",
            translation: "Yesterday's class was hard.",
            focusNote:
              "'Fue' is one syllable — fweh. Tap the r in 'dura': DU-ra.",
            aspect: "dot",
            aspectNote:
              "It says 'was', but yesterday's class is one finished thing being summed up — a dot, so it's fue. Compare the next card.",
          },
          {
            id: "pasado-2-5",
            text: "Ayer estaba cansada.",
            marked: "Ayer est[aba] cansada.",
            infinitive: "estar — to be",
            translation: "Yesterday I was tired.",
            focusNote:
              "es-TA-ba — the -aba again, sitting on 'was'.",
            aspect: "line",
            aspectNote:
              "The odd one out, and the trap: 'ayer' doesn't make it a dot. Being tired is the backdrop, not an event — the line. Yesterday's class WAS hard (fue, a dot); yesterday you WERE tired (estaba, a line).",
          },
        ],
      },
      {
        id: "pasado-3",
        title: "Reaching now · he + -ado / -ido",
        phrases: [
          {
            id: "pasado-3-1",
            text: "Hoy he ido a pilates.",
            marked: "Hoy [he ido] a pilates.",
            infinitive: "ir — to go",
            translation: "I have been to Pilates today.",
            focusNote:
              "'He' is just eh — silent h. Then EE-tho: 'ido' with the soft d.",
            aspect: "presentPerfect",
            aspectNote:
              "'Hoy' still has now inside it, so the bracket is open — he + -ido, the line reaching now.",
          },
          {
            id: "pasado-3-2",
            text: "Ayer fui a pilates.",
            marked: "Ayer [fui] a pilates.",
            infinitive: "ir — to go",
            translation: "I went to Pilates yesterday.",
            focusNote:
              "Same sentence as its pair — but listen: one closed fwee where 'he ido' was.",
            aspect: "dot",
            aspectNote:
              "Change hoy to ayer and the box shuts. Spain changes the verb with it: he ido becomes fui.",
          },
          {
            id: "pasado-3-3",
            text: "He ido todos los días esta semana.",
            marked: "[He ido] todos los días esta semana.",
            infinitive: "ir — to go",
            translation: "I went every day this week.",
            focusNote:
              "eh EE-tho again, then TO-thos los DEE-as — keep every vowel pure.",
            aspect: "presentPerfect",
            aspectNote:
              "The trap: 'every day' sounds like a habit-line, but 'this week' still has now inside it, so Spain says he ido. Ask where the bracket is, not how many times.",
          },
          {
            id: "pasado-3-4",
            text: "He estado usando la aplicación.",
            marked: "[He estado] usando la aplicación.",
            infinitive: "usar — to use",
            translation: "I have been using the app.",
            focusNote:
              "eh es-TA-tho u-SAN-do. 'Aplicación' ends on a stressed -THYON, that Spain c.",
            aspect: "presentPerfect",
            aspectNote:
              "Started in the past and still true this minute — the line reaching right up to now. he + -ado again.",
          },
          {
            id: "pasado-3-5",
            text: "Pasé un buen fin de semana.",
            marked: "Pas[é] un buen fin de semana.",
            infinitive: "pasar — to spend (time)",
            translation: "I had a nice weekend.",
            focusNote:
              "pa-SÉ — the stress slams onto the final É. 'Buen' is one syllable: bwen.",
            aspect: "dot",
            aspectNote:
              "Said on Monday, the weekend is a shut box — a dot, pa-SÉ. On Sunday evening, with the weekend still around you, Spain would say he pasado.",
          },
        ],
      },
      {
        // Tiny derivatives of the sentences above — same market, same plants,
        // same Chicago, same trabajar — so every card is one small step from
        // one she already knows. All three shapes in play, so the gate asks
        // the full "Which shape?" here. The trabajé / he trabajado pair is the
        // one to keep together: the time word is the whole difference.
        id: "pasado-4",
        title: "All three · tiny ones",
        phrases: [
          {
            id: "pasado-4-1",
            text: "Ayer fui al mercado.",
            marked: "Ayer [fui] al mercado.",
            infinitive: "ir — to go",
            translation: "I went to the market yesterday.",
            focusNote:
              "fwee again — one syllable. 'Mercado' with the soft d: mer-KA-tho.",
            aspect: "dot",
            aspectNote: "Yesterday is a shut box. One trip, one dot.",
          },
          {
            id: "pasado-4-2",
            text: "Vivía en Chicago.",
            marked: "Viv[ía] en Chicago.",
            infinitive: "vivir — to live",
            translation: "I used to live in Chicago.",
            focusNote:
              "bi-BÍ-a — the v is a b, three syllables, stress on the Í. The -ía again.",
            aspect: "line",
            aspectNote:
              "No dates, no edges — just how life was for a stretch. -ía is the line.",
          },
          {
            id: "pasado-4-3",
            text: "La semana pasada trabajé mucho.",
            marked: "La semana pasada trabaj[é] mucho.",
            infinitive: "trabajar — to work",
            translation: "I worked a lot last week.",
            focusNote:
              "tra-ba-HÉ — the stress jumps to the end. Compare it with trabajaba.",
            aspect: "dot",
            aspectNote:
              "'Pasada' shuts the box. Same verb as the Chicago line card — the ending is the whole difference.",
          },
          {
            id: "pasado-4-4",
            text: "Esta semana he trabajado mucho.",
            marked: "Esta semana [he trabajado] mucho.",
            infinitive: "trabajar — to work",
            translation: "I have worked a lot this week.",
            focusNote:
              "eh tra-ba-HA-tho. Same sentence as its pair — listen for the little 'he'.",
            aspect: "presentPerfect",
            aspectNote:
              "Change 'la semana pasada' to 'esta semana' and the bracket opens — trabajé becomes he trabajado.",
          },
          {
            id: "pasado-4-5",
            text: "Hoy he comprado una planta.",
            marked: "Hoy [he comprado] una planta.",
            infinitive: "comprar — to buy",
            translation: "I have bought a plant today.",
            focusNote:
              "eh com-PRA-tho — the -ado melts to 'AH-tho'.",
            aspect: "presentPerfect",
            aspectNote:
              "'Hoy' still has now inside it — he + -ado. Yesterday it would be compré.",
          },
        ],
      },
    ],
  },
  /* Palabras — vocabulary by the keyword-picture method.
   *
   * Every other unit teaches a phrase you say. This one teaches single words,
   * and it teaches them the way people who are good at this actually do it:
   * you hear an English sound inside the Spanish word, and you build one
   * ridiculous picture out of that sound and the meaning. `tenedor` sounds
   * like "ten-a-door", so a ten-dollar bill is nailed to a door with a fork,
   * and the word is never a coin-flip again.
   *
   * Two fields carry it. `sounds` is the bridge — what the word sounds like in
   * English, and nothing else. `picture` is the scene, and it has exactly one
   * job: to contain BOTH the sound and the meaning, so that recalling the
   * picture hands back the word. A picture with the sound in it but not the
   * meaning ("a ten-dollar bill on a door") is useless; so is a pretty one
   * with neither.
   *
   * Rules for writing more of these:
   *   - Strange beats sensible. The scene should be impossible, or violent, or
   *     rude, or all three. A plausible picture is forgotten by Thursday.
   *   - The sound bridge has to be a sound she already owns in English. Don't
   *     bridge to another Spanish word.
   *   - Never bridge to a sound the word doesn't have. `llave` is not "lava",
   *     however good the picture would be — the mnemonic would teach the
   *     wrong mouth, and a mnemonic that teaches a mispronunciation is worse
   *     than no mnemonic at all. The focusNote still does the real
   *     pronunciation work; the picture only has to get her to the word.
   *   - One picture per word, one sentence long. It's a hook, not a story.
   *
   * The nouns carry their article in `text` — "el tenedor", not "tenedor" —
   * because a noun learnt without its gender has to be learnt twice. */
  {
    id: "palabras",
    title: "Palabras",
    subtitle: "Everyday words, each with a silly picture to hang it on",
    color: "var(--purple)",
    colorDark: "var(--purple-dark)",
    lessons: [
      /* The ids are not in lesson order, and that is on purpose: these lessons
         were re-cut after a cull and the cards kept the ids they were born
         with. Ids are referenced by saved attempts and are never renumbered —
         which lesson a card sits in is free to change, its id is not. */
      {
        id: "palabras-1",
        title: "At the table",
        phrases: [
          {
            id: "palabras-1-1",
            text: "el tenedor",
            translation: "the fork",
            sounds: "ten-a-door",
            picture:
              "A ten-dollar bill nailed to your front door — and the nail is a fork.",
            focusNote:
              "te-ne-DOR, stress right at the end. Soft d, and the final r is one light tap, not an American growl.",
          },
          {
            id: "palabras-1-2",
            text: "la cuchara",
            translation: "the spoon",
            sounds: "coo-CHAR-a",
            picture:
              "You CHAR a marshmallow black on a spoon the size of a shovel, and a pigeon goes 'coo'.",
            focusNote:
              "coo-CHA-ra, stress in the middle. 'ch' exactly as in 'church'; the r is a tap.",
          },
          {
            id: "palabras-1-3",
            text: "el cuchillo",
            translation: "the knife",
            sounds: "ooh, CHILLY-o",
            picture:
              "You pick up the knife and yelp 'ooh, chilly!' — someone left it in the freezer overnight.",
            focusNote:
              "coo-CHEE-yo. The 'll' is a y sound in Spain, so the end is 'yo' — never 'lo'.",
          },
          {
            id: "palabras-4-1",
            text: "el pan",
            translation: "the bread",
            sounds: "pan",
            picture:
              "A loaf baked in a frying pan, and it comes out pan-shaped, handle and all.",
            focusNote:
              "One syllable, pure a: pahn. Not the English 'pan' with its flat a.",
          },
          {
            id: "palabras-2-3",
            text: "la silla",
            translation: "the chair",
            sounds: "SEE ya",
            picture:
              "You go to sit down and the chair says 'see ya!' and slides out from under you.",
            focusNote:
              "SEE-ya. Two syllables, and again 'll' is y. One l in English 'sila' would be wrong — Spanish spells it ll.",
          },
        ],
      },
      {
        id: "palabras-2",
        title: "Out on the street",
        phrases: [
          {
            id: "palabras-3-1",
            text: "la calle",
            translation: "the street",
            sounds: "CAR, yeah!",
            picture:
              "You step off the curb, a taxi swerves round you — 'car! yeah!' — and that is a calle.",
            focusNote:
              "KA-ye. The 'll' is y once more: never 'callie'. Stress the first syllable.",
          },
          {
            id: "palabras-3-5",
            text: "la parada",
            translation: "the (bus) stop",
            sounds: "parade",
            picture:
              "A whole marching band is waiting at the bus stop, and the bus cannot get anywhere near it.",
            focusNote:
              "pa-RA-da — tapped r, and that middle d is soft, closer to 'th' in 'father'.",
          },
          {
            id: "palabras-3-3",
            text: "el bolso",
            translation: "the handbag",
            sounds: "BOWL-so",
            picture:
              "You tip your handbag out on the counter and it is nothing but soup bowls, dozens of them.",
            focusNote:
              "BOL-so. Short pure o's, both of them — no English 'boh-oo' slide.",
          },
          {
            id: "palabras-3-4",
            text: "el dinero",
            translation: "the money",
            sounds: "De Niro",
            picture:
              "Robert De Niro at the next table, paying for everyone's dinner in cash, one bill at a time.",
            focusNote:
              "di-NE-ro, stress on NE. Soft d to start, tapped r in the middle.",
          },
          {
            id: "palabras-10-3",
            text: "el paquete",
            translation: "the parcel",
            sounds: "PACKET-eh",
            picture:
              "The doorman is buried under a parcel the size of a wardrobe, and your name is on the label.",
            focusNote:
              "pa-KE-te — 'qu' is a plain k. Three syllables, stress in the middle.",
          },
        ],
      },
      {
        id: "palabras-3",
        title: "Words you need every hour",
        phrases: [
          {
            id: "palabras-6-1",
            text: "tener",
            translation: "to have",
            sounds: "TEN in the AIR",
            picture:
              "Everything you have floats ten feet in the air — keys, purse, coffee — and you jump for each thing you need.",
            focusNote:
              "te-NER, stress at the end, tapped r. 'Tengo' is I have — the g is the odd one in the family.",
          },
          {
            id: "palabras-6-2",
            text: "querer",
            translation: "to want, to love",
            sounds: "care — RARE",
            picture:
              "You want your steak so rare that you care about nothing else, and you shout 'care! RARE!' across the restaurant.",
            focusNote:
              "ke-RER — 'qu' is a plain k, the u is silent, and both r's are single taps. 'Quiero' is I want.",
          },
          {
            id: "palabras-6-4",
            text: "ir",
            translation: "to go",
            sounds: "EAR",
            picture:
              "You go everywhere led by your own ear, dragged along by it like a child out of a sweet shop.",
            focusNote:
              "One syllable, 'eer'. Two letters and it's the most irregular verb there is — 'voy' is I go.",
          },
          {
            id: "palabras-6-5",
            text: "saber",
            translation: "to know (a fact)",
            sounds: "SABER (the sword)",
            picture:
              "You know the answer because there is a sabre held at your throat until you say it out loud.",
            focusNote:
              "sa-BER, tapped r. 'Sé' is I know — one syllable, and nothing like the infinitive.",
          },
          {
            id: "palabras-5-3",
            text: "ahora",
            translation: "now",
            sounds: "an HOUR",
            picture:
              "You ask when, they say 'an hour' — and you shout back that you meant NOW. It sounds like 'an hour' and means the opposite.",
            focusNote:
              "a-O-ra. The h is silent, so it's three vowels and a tapped r — ah-OH-ra.",
          },
        ],
      },
      {
        id: "palabras-4",
        title: "Asking questions",
        phrases: [
          {
            id: "palabras-7-1",
            text: "¿dónde?",
            translation: "where?",
            sounds: "DON, all day",
            picture:
              "A mafia don sits at the crossroads all day, and he is the only one who knows where anything is.",
            focusNote:
              "DON-de, stress the first syllable — that's what the accent is telling you. Soft d at the end.",
          },
          {
            id: "palabras-7-2",
            text: "¿cuándo?",
            translation: "when?",
            sounds: "KWAN DO",
            picture:
              "Your tae kwon do teacher will tell you exactly when the class starts, and never where it is.",
            focusNote:
              "KWAN-do — 'cua' is one syllable, kwan. The accent again means the stress is at the front.",
          },
          {
            id: "palabras-7-3",
            text: "¿cuánto?",
            translation: "how much?",
            sounds: "QUANTITY",
            picture:
              "The man at the counter weighs the quantity on scales made of ten-dollar bills and asks how much you want.",
            focusNote:
              "KWAN-to. Same 'cua' as cuándo, and it really is the quantity word — same Latin root.",
          },
          {
            id: "palabras-7-4",
            text: "¿quién?",
            translation: "who?",
            sounds: "KEN",
            picture:
              "Ken — the doll, in his little shorts — is buzzing your door at midnight and nobody knows who he is.",
            focusNote:
              "kyen, one syllable. 'qu' is a plain k again, so never 'kwee-en'.",
          },
          {
            id: "palabras-7-5",
            text: "¿por qué?",
            translation: "why?",
            sounds: "poor KAY",
            picture:
              "Poor Kay asks why, over and over, and not one person in the room will tell her.",
            focusNote:
              "por-KE, stress on the KE — that accent is doing real work. Without it, 'porque' is *because*.",
          },
        ],
      },
      {
        id: "palabras-5",
        title: "When, and how often",
        phrases: [
          {
            id: "palabras-8-1",
            text: "hoy",
            translation: "today",
            sounds: "OY!",
            picture:
              "Someone leans out of a window and yells 'OY!' at you — today, and only today, never again.",
            focusNote:
              "One syllable, 'oy'. The h is silent, the way it always is.",
          },
          {
            id: "palabras-8-3",
            text: "ayer",
            translation: "yesterday",
            sounds: "a YEAR",
            picture:
              "Yesterday feels like a whole year ago, because you spent all of it in the air on a plane.",
            focusNote:
              "a-YER, stress at the end. Two syllables and a tapped r.",
          },
          {
            id: "palabras-8-5",
            text: "tarde",
            translation: "late, afternoon",
            sounds: "TAR day",
            picture:
              "You are late because you stepped in tar on the way out, and the whole afternoon goes on getting free.",
            focusNote:
              "TAR-de, soft d. Same word does late and afternoon — 'buenas tardes' is the one you know.",
          },
          {
            id: "palabras-5-1",
            text: "siempre",
            translation: "always",
            sounds: "SEE 'EM PRAY",
            picture:
              "Whenever you look through that window, you see 'em pray — every time, without fail.",
            focusNote:
              "SYEM-pre — 'sie' is one syllable, syem. Tapped r at the end.",
          },
          {
            id: "palabras-5-2",
            text: "nunca",
            translation: "never",
            sounds: "NOON car",
            picture:
              "The clock crawls towards noon and stops one minute short. Noon never comes, and neither does the car.",
            focusNote:
              "NUN-ka. Pure u, said 'oo'. Stress the first syllable.",
          },
          {
            id: "palabras-5-5",
            text: "todavía",
            translation: "still, not yet",
            sounds: "TOAD a VIA",
            picture:
              "A toad sitting in the middle of the road, still there an hour later, refusing to move: 'toad-a-VIA!'",
            focusNote:
              "to-da-VEE-a, stress on VEE. Soft d in the middle, and the í is a pure ee.",
          },
        ],
      },
      {
        id: "palabras-6",
        title: "Away from home",
        phrases: [
          {
            id: "palabras-11-1",
            text: "el avión",
            translation: "the plane",
            sounds: "a BEE ON",
            picture:
              "A bee on the wing of the plane, hanging on grimly the whole way to Atlanta.",
            focusNote:
              "a-BYON — the v is a b, and 'ió' is one syllable. Stress at the end, where the accent is.",
          },
          {
            id: "palabras-11-2",
            text: "la maleta",
            translation: "the suitcase",
            sounds: "MALLET-a",
            picture:
              "You shut the suitcase with a mallet, then sit on it, and it still will not close.",
            focusNote:
              "ma-LE-ta, three syllables, stress in the middle.",
          },
          {
            id: "palabras-2-5",
            text: "la escalera",
            translation: "the stairs",
            sounds: "escalator",
            picture:
              "The stairs in your building are an escalator running the wrong way, so you never arrive.",
            focusNote:
              "es-ca-LE-ra. Pure vowels, tapped r, stress on LE. It means the ladder too.",
          },
          {
            id: "palabras-9-3",
            text: "el dolor",
            translation: "the pain, the ache",
            sounds: "DOLLAR",
            picture:
              "Every twinge of pain costs you a dollar, and watching the money go hurts more than the ache does.",
            focusNote:
              "do-LOR, stress at the end. English 'dolorous' is the same word wearing a coat.",
          },
          {
            id: "palabras-9-5",
            text: "la receta",
            translation: "the prescription",
            sounds: "RECIPE-a",
            picture:
              "The pharmacist hands you a recipe instead of a prescription: two eggs, a lemon, and lie down until Thursday.",
            focusNote:
              "re-THE-ta — the Spain c again. It really does mean recipe too, which is why the picture works.",
          },
        ],
      },
      {
        /* Two lessons added with the four everyday units, for the same
           reason: Match draws from every card and the pile was thin. The
           phrase ids carry on from where the numbering had got to
           (palabras-12-n, palabras-13-n) — which lesson a card sits in is
           free to change, its id is not. */
        id: "palabras-7",
        title: "Food shopping",
        phrases: [
          {
            id: "palabras-12-1",
            text: "el queso",
            translation: "the cheese",
            sounds: "K… so?",
            picture:
              "You ask for cheese and get handed a giant letter K carved out of it. 'K?' you say. The shopkeeper shrugs: 'K… so?'",
            focusNote:
              "KEH-so. The qu is a plain k and the e is pure — not 'kay'. Two short syllables.",
          },
          {
            id: "palabras-12-2",
            text: "el huevo",
            translation: "the egg",
            sounds: "web-o",
            picture:
              "A spider has spun a web around every egg in the box — a web-o on each one — and charges you extra for the silk.",
            focusNote:
              "WEH-bo. The h is silent, so it starts on 'weh'; the v is a soft b, lips barely touching.",
          },
          {
            id: "palabras-12-3",
            text: "el pollo",
            translation: "the chicken",
            sounds: "po-YO",
            picture:
              "A chicken on a pogo stick, shouting 'yo!' at every bounce — po-yo, po-yo — all the way down the aisle.",
            focusNote:
              "PO-yo. Spain's ll is a y, so it's PO-yo — never with an l, which would make it 'polo'.",
          },
          {
            id: "palabras-12-4",
            text: "el pescado",
            translation: "the fish",
            sounds: "pesky cod-oh",
            picture:
              "A pesky cod keeps leaping out of your trolley and flopping back to the counter: 'oh, that pesky cod!'",
            focusNote:
              "pes-KA-do. Stress on KA; the final d is soft, tongue to the teeth. 'Pescado' is fish on a plate — 'pez' is fish in the sea.",
          },
          {
            id: "palabras-12-5",
            text: "la bolsa",
            translation: "the bag",
            sounds: "bowl-sa",
            picture:
              "Your shopping bag is a salad bowl with two handles — a bowl-sa — and the oranges roll round and round in it.",
            focusNote:
              "BOL-sa. Short o, light front l, crisp s. Stress on the first syllable.",
          },
        ],
      },
      {
        id: "palabras-8",
        title: "Around the day",
        phrases: [
          {
            id: "palabras-13-1",
            text: "el sol",
            translation: "the sun",
            sounds: "sole",
            picture:
              "The sun is the sole of a huge flip-flop, slapping across the sky every morning.",
            focusNote:
              "sol — short o, as in 'doll', not the long 'soul' the picture leans on. The l is light.",
          },
          {
            id: "palabras-13-2",
            text: "la hora",
            translation: "the hour, the time",
            sounds: "oar-a",
            picture:
              "The clock's hands are two oars — oar-a — rowing you round the hour.",
            focusNote:
              "O-ra. The h is silent, so the word starts on the vowel. One tapped r.",
          },
          {
            id: "palabras-13-3",
            text: "el ascensor",
            translation: "the lift",
            sounds: "as… then… sore",
            picture:
              "The lift shoots up so fast you land on your backside — as… then… sore.",
            focusNote:
              "as-then-SOR. The sc gives you an s and then Spain's 'th' — as-then — and the stress is right at the end.",
          },
          {
            id: "palabras-13-4",
            text: "la noche",
            translation: "the night",
            sounds: "notch-eh",
            picture:
              "Each night you carve a notch in the bedpost — notch-eh — and by the weekend it's sawn clean through.",
            focusNote:
              "NO-che. Pure o, then ch as in 'church'; the final e is 'eh', said, not swallowed.",
          },
          {
            id: "palabras-13-5",
            text: "la lluvia",
            translation: "the rain",
            sounds: "YOU-bya",
            picture:
              "A tiny cloud follows only you down the street, raining — 'you! bye-ah!' it shouts, YOU-bya — and nobody else gets wet.",
            focusNote:
              "YOO-bya. Spain's ll is a y and the v is a soft b: YOO-bya, two syllables.",
          },
        ],
      },
      /* Four more lessons, asked for from the phone as "more everyday words
         that I would need to use in a store or just in everyday life", once
         the forty-one above had all been drilled. Ids carry on from 14, since
         13 was the highest in use; the lessons are 9 to 12. Same rules as
         above: the bridge is a sound the word actually has, the scene holds
         the sound and the meaning both, and the colour carries the gender so
         the words don't have to. */
      {
        id: "palabras-9",
        title: "At the till",
        phrases: [
          {
            id: "palabras-14-1",
            text: "la caja",
            translation: "the till, the checkout",
            sounds: "car-ha",
            picture:
              "You drive your car right up to the till and the cashier just points and goes 'HA!' — car-ha.",
            focusNote:
              "KA-ha. The j is a rasp from the back of the throat, like clearing it; stress on the first syllable.",
          },
          {
            id: "palabras-14-2",
            text: "la tarjeta",
            translation: "the card (bank card)",
            sounds: "tar-HEY-ta",
            picture:
              "Your bank card is dripping with hot tar — 'HEY!' yells the cashier as it sticks to the till — tar-HEY-ta.",
            focusNote:
              "tar-HE-ta. One tapped r, then the throaty j of 'caja' again; the stress sits on HE.",
          },
          {
            id: "palabras-14-3",
            text: "el cambio",
            translation: "the change (money)",
            sounds: "cam-bee-oh",
            picture:
              "Instead of a drawer, the till has a camera, and it fires your change out of the lens — cam-bee-oh! — coin by coin.",
            focusNote:
              "KAM-byo. The b is soft, almost a v, and the io runs together as one 'byo'.",
          },
          {
            id: "palabras-14-4",
            text: "la talla",
            translation: "the size (clothes)",
            sounds: "TA-ya",
            picture:
              "You karate-chop the clothes rail — TA-YA! — and only the shirts in your size fall off.",
            focusNote:
              "TA-ya. Spain's ll is a y, never an l — nothing to do with 'tall'. Stress on the first syllable.",
          },
          {
            id: "palabras-14-5",
            text: "el descuento",
            translation: "the discount",
            sounds: "desk-WHEN-toe",
            picture:
              "A queen sits on the shop's desk, points her toe at the price tag — desk, when, toe — and the price drops a fifth.",
            focusNote:
              "des-KWEN-to. The ue is one glide, 'kwen'; stress on it. The final o is pure, not 'oh-w'.",
          },
        ],
      },
      {
        id: "palabras-10",
        title: "On the shelf",
        phrases: [
          {
            id: "palabras-15-1",
            text: "la leche",
            translation: "the milk",
            sounds: "LEH-cheh",
            picture:
              "Every carton of milk gives you a lecture — LEH-cheh, LEH-cheh — and you drink it just to shut it up.",
            focusNote:
              "LE-che. The ch is 'church'; the final e is said, 'eh', not swallowed.",
          },
          {
            id: "palabras-15-2",
            text: "el aceite",
            translation: "the oil (olive oil)",
            sounds: "a-THAY-tay",
            picture:
              "The olive oil is so slippery the shop has to tape every bottle to the shelf — 'ah, they tape it' — a-THAY-tay.",
            focusNote:
              "a-THEI-te. The c before e is Spain's 'th' as in 'think'; stress on THEI, and the last e is said.",
          },
          {
            id: "palabras-15-3",
            text: "el azúcar",
            translation: "the sugar",
            sounds: "a-THOO-car",
            picture:
              "A car built from sugar cubes drives up the aisle — a-THOO-car — and melts into a puddle at the till.",
            focusNote:
              "a-THU-kar. The z is 'th'; stress on the middle; the r at the end is one light tap.",
          },
          {
            id: "palabras-15-4",
            text: "la manzana",
            translation: "the apple",
            sounds: "man-THAN-ah",
            picture:
              "A man throws an apple at you and shouts 'man, THANKS, nah!' as it bounces off your head — man-THAN-ah.",
            focusNote:
              "man-THA-na. The z is 'th' as in 'think', not a buzz; stress on THA.",
          },
          {
            id: "palabras-15-5",
            text: "la carne",
            translation: "the meat",
            sounds: "CAR-neh",
            picture:
              "Parked outside the butcher's is a car made of raw meat — CAR-neh — and a dog is eating the bumper.",
            focusNote:
              "KAR-ne. One tapped r; the final e is a short 'eh', said.",
          },
        ],
      },
      {
        id: "palabras-11",
        title: "Around the flat and the street",
        phrases: [
          {
            id: "palabras-16-1",
            text: "la llave",
            translation: "the key",
            sounds: "YA-beh",
            picture:
              "Fred Flintstone yells 'YABBA!' — ya-beh — every time he turns the key in his stone front door.",
            focusNote:
              "YA-be. Spain's ll is a y, and the v is a soft b: YA-be, two syllables. Not 'lava'.",
          },
          {
            id: "palabras-16-2",
            text: "la cocina",
            translation: "the kitchen",
            sounds: "co-THEE-na",
            picture:
              "In the kitchen the goddess Athena — co-THEE-na — is frying eggs in full armour.",
            focusNote:
              "ko-THI-na. The c before i is 'th'; stress on THI. The first c is a hard k.",
          },
          {
            id: "palabras-16-3",
            text: "el baño",
            translation: "the bathroom, the toilet",
            sounds: "BAN-yo",
            picture:
              "The bathroom door has a sign reading BAN, YO — you are banned — and it stays locked when you need it most.",
            focusNote:
              "BA-nyo. The ñ is the ny of 'canyon', one sound; stress on the first syllable.",
          },
          {
            id: "palabras-16-4",
            text: "la tienda",
            translation: "the shop",
            sounds: "tea-EN-da",
            picture:
              "A shop that sells only tea and a dartboard — tea 'n' da… — with nothing else on the shelves.",
            focusNote:
              "TYEN-da. The ie is one glide, so it is two syllables, stress on the first; the d is soft.",
          },
          {
            id: "palabras-16-5",
            text: "la farmacia",
            translation: "the pharmacy, the chemist's",
            sounds: "far-MA-thya",
            picture:
              "A farm where Martha — far-MA-thya — grows pills in rows instead of potatoes.",
            focusNote:
              "far-MA-thya. The c before i is 'th'; stress on MA; the ia at the end is one quick 'thya'.",
          },
        ],
      },
      {
        id: "palabras-12",
        title: "Out and about",
        phrases: [
          {
            id: "palabras-17-1",
            text: "el médico",
            translation: "the doctor",
            sounds: "MEH-dee-co",
            picture:
              "The doctor shrugs 'meh', pokes you and says 'd'you know?' — MEH-dee-co — then charges you anyway.",
            focusNote:
              "ME-di-ko. Stress on the first syllable, as the accent says; the d is soft, almost 'th' in 'this'.",
          },
          {
            id: "palabras-17-2",
            text: "la cita",
            translation: "the appointment",
            sounds: "THEE-ta",
            picture:
              "The receptionist books your appointment with a wedding vow — 'I THEE… ta!' — THEE-ta.",
            focusNote:
              "THI-ta. The c before i is 'th' as in 'think'; two syllables, stress on the first.",
          },
          {
            id: "palabras-17-3",
            text: "el autobús",
            translation: "the bus",
            sounds: "ow-toe-BOOS",
            picture:
              "The bus runs over your toe — 'OW! TOE!' — and the passengers boo you for it — ow-toe-BOOS.",
            focusNote:
              "au-to-BUS. The au is 'ow'; the stress is right at the end, where the accent is.",
          },
          {
            id: "palabras-17-4",
            text: "el billete",
            translation: "the ticket (bus, train)",
            sounds: "bee-YEH-teh",
            picture:
              "A bee in a tiny booth sells you your bus ticket, yelling 'YEH! TEH!' — bee-YEH-teh — as it stamps it.",
            focusNote:
              "bi-YE-te. The ll is y; stress on YE; the final e is said.",
          },
          {
            id: "palabras-17-5",
            text: "la entrada",
            translation: "the entrance; the ticket (to get in)",
            sounds: "en-TRA-da",
            picture:
              "The entrance to the museum is a trapdoor — en-TRA-da — and everyone with a ticket falls straight through it.",
            focusNote:
              "en-TRA-da. One tapped r; the d is soft; stress on TRA.",
          },
        ],
      },
      /* Four more lessons, arriving with the five everyday units: the words
         those units lean on, each with a picture. Lesson ids carry on from
         palabras-12; phrase ids carry on from the last block, 17, for the
         reason given above. */
      {
        id: "palabras-13",
        title: "The plants",
        phrases: [
          {
            id: "palabras-18-1",
            text: "la maceta",
            translation: "the flower pot",
            sounds: "ma, THE TAp",
            picture:
              "Your ma keeps a flower pot under the kitchen tap — 'Ma! THE TAp!' — and it overflows every single morning.",
            focusNote:
              "ma-THE-ta. The c before e is the Spain th — ma-THE-ta, never 'ma-SET-a'. Stress in the middle.",
          },
          {
            id: "palabras-18-2",
            text: "la hoja",
            translation: "the leaf",
            sounds: "oh! ha!",
            picture:
              "A leaf lands on your head and you go 'oh! ha!' — and then the whole tree starts laughing at you, leaf by leaf.",
            focusNote:
              "O-ha. The h is silent and the j is the throaty h, so it's 'oh-ha'. Two syllables, stress on the first.",
          },
          {
            id: "palabras-18-3",
            text: "la tierra",
            translation: "the soil, the earth",
            sounds: "tiara",
            picture:
              "A queen is crowned with a tiara made of wet potting soil, worms and all, and it drips down her face through the whole ceremony.",
            focusNote:
              "TYE-rra. The ie is one glide and the rr really rolls — this is one of the few words where it does. Stress on TYE.",
          },
          {
            id: "palabras-18-4",
            text: "la flor",
            translation: "the flower",
            sounds: "floor",
            picture:
              "A flower bursts up through the floorboards of your flat, and you have to water the floor every morning.",
            focusNote:
              "flor — one syllable, short o as in 'for', and the r is one light tap. Not the long 'floor'.",
          },
          {
            id: "palabras-18-5",
            text: "la semilla",
            translation: "the seed",
            sounds: "see me? YA!",
            picture:
              "'See me? YA!' shouts a seed, leaping out of the packet and planting itself in the pot before you can.",
            focusNote:
              "se-MEE-ya. The ll is a y in Spain, so the end is 'ya'. Stress on MEE.",
          },
        ],
      },
      {
        id: "palabras-14",
        title: "Looking for a flat",
        phrases: [
          {
            id: "palabras-19-1",
            text: "el piso",
            translation: "the flat (apartment)",
            sounds: "Pisa",
            picture:
              "Your flat leans like the tower of Pisa, and every piece of furniture slides across to the same wall.",
            focusNote:
              "PEE-so. Two syllables, stress on PEE, and the final o is pure — the one thing 'Pisa' gets wrong. Also the floor of a building: 'el tercer piso'.",
          },
          {
            id: "palabras-19-2",
            text: "el alquiler",
            translation: "the rent",
            sounds: "Al's key lair",
            picture:
              "Al lives in a lair full of keys, and on the first of every month you pay him the rent in more keys.",
            focusNote:
              "al-kee-LER. The qu is a k; stress right at the end, with a tapped r. Three syllables.",
          },
          {
            id: "palabras-19-3",
            text: "el casero",
            translation: "the landlord",
            sounds: "casserole",
            picture:
              "Your landlord is a steaming casserole with a moustache, and he knocks on the door on the first of the month.",
            focusNote:
              "ka-SE-ro. Stress on SE, not on the first syllable as in 'casserole'; the r is a single tap.",
          },
          {
            id: "palabras-19-4",
            text: "la fianza",
            translation: "the deposit",
            sounds: "fee, Anthea",
            picture:
              "You hand the deposit to Anthea — 'a fee? Anthea!' — and she swallows it and promises it back in a year.",
            focusNote:
              "FYAN-tha. The ia is one glide and the z is the Spain th: FYAN-tha. Two syllables.",
          },
          {
            id: "palabras-19-5",
            text: "el ruido",
            translation: "the noise",
            sounds: "roo, EE, dough",
            picture:
              "A kangaroo in the flat upstairs eats raw dough all night — 'roo? EE! dough' — and the chewing is the noise.",
            focusNote:
              "RWEE-do. Two syllables — the ui is one glide — with a tapped r at the front and a soft d.",
          },
        ],
      },
      {
        id: "palabras-15",
        title: "Finding the way",
        phrases: [
          {
            id: "palabras-20-1",
            text: "la esquina",
            translation: "the corner",
            sounds: "a ski? NAH",
            picture:
              "You try to ski round the street corner — 'a ski? NAH!' — and go straight through the bakery window.",
            focusNote:
              "es-KEE-na. The qu is a k, and the stress sits on KEE. Three syllables.",
          },
          {
            id: "palabras-20-2",
            text: "el semáforo",
            translation: "the traffic light",
            sounds: "semaphore",
            picture:
              "The traffic light has no bulbs: a man up the pole waves semaphore flags — red, amber, green — and the cars obey.",
            focusNote:
              "se-MA-fo-ro. Four syllables, stress on MA where the accent is — not 'SEM-a-for'. Both r's tap.",
          },
          {
            id: "palabras-20-3",
            text: "la rotonda",
            translation: "the roundabout",
            sounds: "rotunda",
            picture:
              "A marble rotunda sits in the middle of the roundabout, and the cars drive round and round between its pillars.",
            focusNote:
              "ro-TON-da. Stress on TON; the first r taps and the d is soft.",
          },
          {
            id: "palabras-20-4",
            text: "lejos",
            translation: "far",
            sounds: "lay hose",
            picture:
              "You lay a garden hose along the pavement to the place you're going, and it's so far the hose runs out.",
            focusNote:
              "LE-hos. The j is the throaty h: LE-hos. Stress on the first syllable.",
          },
          {
            id: "palabras-20-5",
            text: "cerca",
            translation: "near",
            sounds: "THERE, car!",
            picture:
              "'THERE — car!' You point, and the car is right there, near enough to touch — it's parked on your foot.",
            focusNote:
              "THER-ka. The c before e is the Spain th, so it opens on 'there'; the second c is a hard k. Stress on THER.",
          },
        ],
      },
      {
        id: "palabras-16",
        title: "The holidays",
        phrases: [
          {
            id: "palabras-21-1",
            text: "el pavo",
            translation: "the turkey",
            sounds: "Pa bows",
            picture:
              "Your pa bows low to the Thanksgiving turkey, and the turkey bows back, and neither of them will stand up first.",
            focusNote:
              "PA-bo. The v is a soft b, lips barely touching: PA-bo. Stress on PA.",
          },
          {
            id: "palabras-21-2",
            text: "el regalo",
            translation: "the present",
            sounds: "regal, oh!",
            picture:
              "A regal present: you unwrap it and it's a crown, and a tiny king inside shouts 'oh!' when you put it on.",
            focusNote:
              "re-GA-lo. Stress on GA; the r is a single tap. Not 'REE-gal'.",
          },
          {
            id: "palabras-21-3",
            text: "la uva",
            translation: "the grape",
            sounds: "ooh… BAH",
            picture:
              "A sheep at midnight eats twelve grapes one by one, going 'ooh… BAH' at every chime of the clock.",
            focusNote:
              "OO-ba. The v is a soft b: OO-ba. Two syllables, stress on OO.",
          },
          {
            id: "palabras-21-4",
            text: "el brindis",
            translation: "the toast (raising a glass)",
            sounds: "bring this!",
            picture:
              "'Bring this!' — everyone raises an empty glass at you, and you have to bring the cava for the toast.",
            focusNote:
              "BRIN-dis. Stress on BRIN; the final s is crisp. Tap the r.",
          },
          {
            id: "palabras-21-5",
            text: "el belén",
            translation: "the nativity scene",
            sounds: "bell, Len",
            picture:
              "Len rings a huge bell over a tiny stable in the living room, and the little clay shepherds cover their ears.",
            focusNote:
              "be-LEN. Stress at the end, where the accent is; a soft b at the front. It's Bethlehem in Spanish, and every house and shop has one in December.",
          },
        ],
      },
    ],
  },
];

// Flat lookups, built once.
export const LESSONS = COURSE.flatMap((unit) =>
  unit.lessons.map((lesson) => ({ ...lesson, unit }))
);

export const COURSE_PHRASES = LESSONS.flatMap((lesson) =>
  lesson.phrases.map((p) => ({ ...p, language: COURSE_LANGUAGE, lessonId: lesson.id }))
);

export function lessonById(id) {
  return LESSONS.find((l) => l.id === id) ?? null;
}

// ------------------------------------------------------------------ stories
//
// Tiny scenes: three or four sentences, then a few comprehension questions.
// Asked for in those words — "tiny mini stories … followed by a few questions
// that are multiple-choice, as a kind of comprehension test". Hand-written
// like the rest of this file, and deliberately out of the course's own
// vocabulary: a story is where the cards get met again in a sentence that
// isn't the card, which is the reading half of knowing a phrase.
//
// The question is in English and the answers are in Spanish, lifted from the
// story — so the question is never the obstacle, and answering means reading
// the Spanish rather than remembering the English. `answer` is the index of
// the right option here; the page shuffles the order it shows them in.
//
// Scores are kept by id in `debolingo.stories` (store.js), so ids are stable
// like phrase ids are: never renumber, append. Easy ones first, and then a
// climb in tiers — see STORY_TIERS at the bottom and the comments above
// historia-11 and historia-17 for what each step adds.

export const STORIES = [
  {
    id: "historia-1",
    title: "El portero",
    teaser: "Seven in the morning, and it's cold",
    lines: [
      { es: "Son las siete de la mañana.", en: "It's seven in the morning." },
      { es: "Deb sale de casa y ve al portero.", en: "Deb leaves the house and sees the doorman." },
      { es: "—Buenos días —dice Deb—. ¡Qué frío!", en: "'Good morning,' says Deb. 'It's so cold!'" },
      { es: "—Muy frío. Que tenga un buen día —dice él.", en: "'Very cold. Have a good day,' he says." },
    ],
    questions: [
      { q: "What time is it?", options: ["Las diez", "Las siete", "Las dos"], answer: 1 },
      { q: "What does Deb say about the weather?", options: ["Qué frío", "Qué calor", "Está lloviendo"], answer: 0 },
      { q: "What does the doorman wish her?", options: ["Buenas noches", "Hasta el sábado", "Un buen día"], answer: 2 },
    ],
  },
  {
    id: "historia-2",
    title: "Un café",
    teaser: "The café on the corner",
    lines: [
      { es: "Deb entra en el café de la esquina.", en: "Deb goes into the café on the corner." },
      { es: "—Un café con leche, por favor —dice.", en: "'A coffee with milk, please,' she says." },
      { es: "El camarero pregunta: —¿Algo más?", en: "The waiter asks: 'Anything else?'" },
      { es: "—No, gracias. ¿Me cobra? —Son dos euros.", en: "'No, thanks. Can I pay?' 'That's two euros.'" },
    ],
    questions: [
      { q: "What does Deb order?", options: ["Un cortado", "Un vaso de agua", "Un café con leche"], answer: 2 },
      { q: "What does the waiter ask her?", options: ["¿Algo más?", "¿Cuánto es?", "¿Está maduro?"], answer: 0 },
      { q: "How much is it?", options: ["Tres euros", "Dos euros", "Diez euros"], answer: 1 },
    ],
  },
  {
    id: "historia-3",
    title: "En el mercado",
    teaser: "Saturday, tomatoes, and are they ripe?",
    lines: [
      { es: "El sábado Deb va al mercado.", en: "On Saturday Deb goes to the market." },
      { es: "—Medio kilo de tomates, por favor. ¿Están maduros?", en: "'Half a kilo of tomatoes, please. Are they ripe?'" },
      { es: "—Sí, son para hoy —dice la mujer.", en: "'Yes, they're for today,' says the woman." },
      { es: "Deb paga tres euros y dice: —Hasta el sábado.", en: "Deb pays three euros and says: 'See you Saturday.'" },
    ],
    questions: [
      { q: "What day does Deb go to the market?", options: ["El domingo", "El sábado", "El viernes"], answer: 1 },
      { q: "What does she buy?", options: ["Medio kilo de tomates", "Un cuarto de jamón", "Una barra de pan"], answer: 0 },
      { q: "How much does she pay?", options: ["Dos euros", "Cinco euros", "Tres euros"], answer: 2 },
    ],
  },
  {
    id: "historia-4",
    title: "Tapas con una amiga",
    teaser: "Bravas, tortilla and two glasses of red",
    lines: [
      { es: "Esta noche Deb cena tapas con una amiga.", en: "Tonight Deb is having tapas with a friend." },
      { es: "Piden unas bravas, una de tortilla y dos copas de vino tinto.", en: "They order some bravas, a tortilla and two glasses of red wine." },
      { es: "—Es para compartir —dice Deb al camarero.", en: "'It's to share,' Deb says to the waiter." },
      { es: "Al final sobra tortilla. —¿Me lo pone para llevar?", en: "At the end there's tortilla left over. 'Can I have it to take away?'" },
    ],
    questions: [
      { q: "What do they drink?", options: ["Vino blanco", "Vino tinto", "Cava"], answer: 1 },
      { q: "What does Deb tell the waiter?", options: ["Es para compartir", "Es muy caro", "Está buenísimo"], answer: 0 },
      { q: "What is left over?", options: ["Bravas", "Aceitunas", "Tortilla"], answer: 2 },
    ],
  },
  {
    id: "historia-5",
    title: "Pilates",
    teaser: "A hard class, and water afterwards",
    lines: [
      { es: "Deb tiene pilates a las diez.", en: "Deb has Pilates at ten." },
      { es: "Hoy la clase es dura y Deb está cansada.", en: "Today the class is hard and Deb is tired." },
      { es: "Después toma un vaso de agua con gas.", en: "Afterwards she has a glass of sparkling water." },
      { es: "—Mañana vuelvo —dice. Va todos los días.", en: "'I'll be back tomorrow,' she says. She goes every day." },
    ],
    questions: [
      { q: "What time is Pilates?", options: ["A las ocho", "A las diez", "A las dos"], answer: 1 },
      { q: "How is today's class?", options: ["Dura", "Fácil", "Corta"], answer: 0 },
      { q: "What does she drink afterwards?", options: ["Un café solo", "Una copa de cava", "Agua con gas"], answer: 2 },
    ],
  },
  {
    id: "historia-6",
    title: "Llueve",
    teaser: "A day at home with the plants",
    lines: [
      { es: "Hoy está lloviendo.", en: "Today it's raining." },
      { es: "Deb no va al mercado. Se queda en casa.", en: "Deb doesn't go to the market. She stays at home." },
      { es: "Riega las plantas y toma un café.", en: "She waters the plants and has a coffee." },
      { es: "Mañana va a hacer sol.", en: "Tomorrow it's going to be sunny." },
    ],
    questions: [
      { q: "What's the weather like today?", options: ["Hace sol", "Está lloviendo", "Hace calor"], answer: 1 },
      { q: "What does Deb do at home?", options: ["Riega las plantas", "Compra una planta", "Va a pilates"], answer: 0 },
      { q: "What will the weather be tomorrow?", options: ["Va a llover", "Va a hacer frío", "Va a hacer sol"], answer: 2 },
    ],
  },
  {
    id: "historia-7",
    title: "En el ascensor",
    teaser: "Going up, with a neighbour",
    lines: [
      { es: "Deb entra en el ascensor con una vecina.", en: "Deb gets into the lift with a neighbour." },
      { es: "—¿Sube o baja? —pregunta la vecina. —Subo, al tercero.", en: "'Going up or down?' asks the neighbour. 'Up, to the third floor.'" },
      { es: "—Yo soy la vecina del quinto. Hablo un poquito de inglés.", en: "'I'm the neighbour from the fifth. I speak a little English.'" },
      { es: "—Y yo hablo un poquito de español —dice Deb. Las dos ríen.", en: "'And I speak a little Spanish,' says Deb. They both laugh." },
    ],
    questions: [
      { q: "Which floor is Deb going to?", options: ["Al quinto", "Al tercero", "Al segundo"], answer: 1 },
      { q: "Where does the neighbour live?", options: ["En el tercero", "En la calle", "En el quinto"], answer: 2 },
      { q: "What does the neighbour speak a little of?", options: ["Inglés", "Español", "Catalán"], answer: 0 },
    ],
  },
  {
    id: "historia-8",
    title: "En el restaurante",
    teaser: "A reservation at nine, outside",
    lines: [
      { es: "Deb tiene una reserva a las nueve, a nombre de Deb.", en: "Deb has a reservation at nine, under the name Deb." },
      { es: "—¿Podemos sentarnos fuera? —pregunta. —Claro.", en: "'Can we sit outside?' she asks. 'Of course.'" },
      { es: "De primero pide la ensalada y de segundo, el pescado.", en: "To start she orders the salad and for the main, the fish." },
      { es: "—Soy alérgica a los frutos secos —dice al camarero.", en: "'I'm allergic to nuts,' she tells the waiter." },
    ],
    questions: [
      { q: "What time is the reservation?", options: ["A las nueve", "A las diez", "A las siete"], answer: 0 },
      { q: "Where does she want to sit?", options: ["Dentro", "Fuera", "En la barra"], answer: 1 },
      { q: "What is she allergic to?", options: ["El pescado", "La leche", "Los frutos secos"], answer: 2 },
    ],
  },
  {
    id: "historia-9",
    title: "La panadería",
    teaser: "Bread, croissants, paying by card",
    lines: [
      { es: "Por la mañana Deb va a la panadería.", en: "In the morning Deb goes to the bakery." },
      { es: "—¿Me da una barra de pan? ¿Está recién hecha?", en: "'Can I have a loaf of bread? Is it freshly made?'" },
      { es: "—Sí, recién hecha. ¿Algo más? —Dos cruasanes, por favor.", en: "'Yes, freshly made. Anything else?' 'Two croissants, please.'" },
      { es: "Deb paga con tarjeta y dice: —Muy amable, gracias.", en: "Deb pays by card and says: 'Very kind, thank you.'" },
    ],
    questions: [
      { q: "When does Deb go to the bakery?", options: ["Por la noche", "El sábado", "Por la mañana"], answer: 2 },
      { q: "What else does she buy?", options: ["Dos cruasanes", "Un trozo de tarta", "Media docena de huevos"], answer: 0 },
      { q: "How does she pay?", options: ["Con cambio", "Con tarjeta", "Con cien euros"], answer: 1 },
    ],
  },
  {
    id: "historia-10",
    title: "El paquete",
    teaser: "The lift is broken and something has arrived",
    lines: [
      { es: "Deb vuelve a casa a las seis. El ascensor no funciona.", en: "Deb gets home at six. The lift isn't working." },
      { es: "Sube por la escalera, cansada.", en: "She goes up the stairs, tired." },
      { es: "—¿Ha llegado el paquete? —pregunta al portero.", en: "'Has the parcel arrived?' she asks the doorman." },
      { es: "—Sí, aquí está. Es muy grande —dice él. Deb ríe: —Es una planta.", en: "'Yes, here it is. It's very big,' he says. Deb laughs: 'It's a plant.'" },
    ],
    questions: [
      { q: "What time does Deb get home?", options: ["A las seis", "A las siete", "A las diez"], answer: 0 },
      { q: "Why does she take the stairs?", options: ["Está lloviendo", "El ascensor no funciona", "Tiene pilates"], answer: 1 },
      { q: "What is in the parcel?", options: ["Una maleta", "Un paquete de pan", "Una planta"], answer: 2 },
    ],
  },
  /* Five harder ones, asked for from the phone as "could you make those
     stories a little bit more difficult too". Five sentences rather than
     four, longer ones, the past tenses El pasado drills, a subordinate
     clause or two, and four questions. They lean on the four new Palabras
     lessons — the till, the shelf, the flat, out and about — so the words
     are met again in a sentence that isn't the card. */
  {
    id: "historia-11",
    title: "La farmacia",
    teaser: "A headache, and no prescription",
    lines: [
      { es: "Esta mañana Deb se ha levantado con dolor de cabeza y ha ido a la farmacia de la esquina.", en: "This morning Deb woke up with a headache and went to the pharmacy on the corner." },
      { es: "—¿Tiene algo para el dolor de cabeza? —pregunta. —¿Tiene receta? —No, no tengo.", en: "'Do you have something for a headache?' she asks. 'Do you have a prescription?' 'No, I don't.'" },
      { es: "La farmacéutica le da una caja pequeña: —Una cada ocho horas, y no más de tres al día.", en: "The pharmacist gives her a small box: 'One every eight hours, and no more than three a day.'" },
      { es: "—¿Cuánto es? —Cuatro euros con cincuenta. —¿Puedo pagar con tarjeta? —Claro.", en: "'How much is it?' 'Four euros fifty.' 'Can I pay by card?' 'Of course.'" },
      { es: "Deb paga, guarda la caja en el bolso y la farmacéutica le dice: —Que se mejore.", en: "Deb pays, puts the box in her bag, and the pharmacist says: 'Get well soon.'" },
    ],
    questions: [
      { q: "Why does Deb go to the pharmacy?", options: ["Tiene dolor de cabeza", "Tiene una receta", "Tiene pilates"], answer: 0 },
      { q: "How often should she take one?", options: ["Tres cada hora", "Una cada ocho horas", "Una al día"], answer: 1 },
      { q: "How much does it cost?", options: ["Cuatro euros", "Cinco euros con cuarenta", "Cuatro euros con cincuenta"], answer: 2 },
      { q: "What does the pharmacist say as she leaves?", options: ["Hasta el sábado", "Que se mejore", "Que tenga un buen día"], answer: 1 },
    ],
  },
  {
    id: "historia-12",
    title: "La chaqueta",
    teaser: "The right size, and a discount",
    lines: [
      { es: "El jueves por la tarde Deb vio una chaqueta azul en el escaparate de una tienda y entró.", en: "On Thursday afternoon Deb saw a blue jacket in a shop window and went in." },
      { es: "—¿La tiene en una talla más pequeña? Esta me queda grande —le dijo a la dependienta.", en: "'Do you have it in a smaller size? This one is too big on me,' she said to the shop assistant." },
      { es: "—Sí, un momento. Y hoy, además, tiene un veinte por ciento de descuento.", en: "'Yes, one moment. And today, what's more, it has a twenty per cent discount.'" },
      { es: "La chaqueta costaba sesenta euros; con el descuento, cuarenta y ocho.", en: "The jacket cost sixty euros; with the discount, forty-eight." },
      { es: "Deb pagó con tarjeta y guardó el tique en el bolso, por si acaso.", en: "Deb paid by card and kept the receipt in her bag, just in case." },
    ],
    questions: [
      { q: "What did Deb see in the shop window?", options: ["Una maleta", "Un bolso", "Una chaqueta azul"], answer: 2 },
      { q: "What was wrong with the first one?", options: ["Le quedaba grande", "Era muy cara", "No tenía descuento"], answer: 0 },
      { q: "What did she pay in the end?", options: ["Sesenta euros", "Cuarenta y ocho euros", "Veinte euros"], answer: 1 },
      { q: "Why did she keep the receipt?", options: ["Para la dependienta", "Por si acaso", "Para pagar con tarjeta"], answer: 1 },
    ],
  },
  {
    id: "historia-13",
    title: "El supermercado",
    teaser: "No milk at home, and where is the oil?",
    lines: [
      { es: "Después de pilates, Deb ha pasado por el supermercado porque no quedaba leche en casa.", en: "After Pilates, Deb stopped by the supermarket because there was no milk left at home." },
      { es: "Ha cogido dos litros de leche, un kilo de azúcar y seis manzanas, pero no encontraba el aceite.", en: "She picked up two litres of milk, a kilo of sugar and six apples, but she couldn't find the oil." },
      { es: "—Perdone, ¿dónde está el aceite? —Al fondo, a la derecha, al lado del arroz.", en: "'Excuse me, where is the oil?' 'At the back, on the right, next to the rice.'" },
      { es: "En la caja, la cajera le ha preguntado: —¿Necesita bolsa? Son diez céntimos. —Sí, una, por favor.", en: "At the till, the cashier asked her: 'Do you need a bag? It's ten cents.' 'Yes, one, please.'" },
      { es: "Al salir, Deb se ha dado cuenta de que se ha olvidado de los huevos. —Bueno, mañana.", en: "On the way out, Deb realised she had forgotten the eggs. 'Oh well, tomorrow.'" },
    ],
    questions: [
      { q: "Why did Deb go to the supermarket?", options: ["Tenía una cita", "No quedaba leche en casa", "Quería manzanas"], answer: 1 },
      { q: "Where is the oil?", options: ["Al lado de la leche", "En la caja", "Al fondo, a la derecha"], answer: 2 },
      { q: "How much is a bag?", options: ["Diez céntimos", "Un euro", "Dos litros"], answer: 0 },
      { q: "What did she forget?", options: ["El azúcar", "El aceite", "Los huevos"], answer: 2 },
    ],
  },
  {
    id: "historia-14",
    title: "La cita con el médico",
    teaser: "The number seven bus, and nothing serious",
    lines: [
      { es: "Deb tenía cita con el médico a las once y media, así que cogió el autobús número siete.", en: "Deb had an appointment with the doctor at half past eleven, so she took the number seven bus." },
      { es: "Compró el billete al conductor —un euro con cincuenta— y se sentó al lado de la ventana.", en: "She bought the ticket from the driver — one euro fifty — and sat by the window." },
      { es: "Llegó pronto, pero tuvo que esperar veinte minutos en la sala de espera.", en: "She arrived early, but had to wait twenty minutes in the waiting room." },
      { es: "—No es nada grave —le dijo el médico—. Descanse, beba mucha agua y vuelva en dos semanas si no mejora.", en: "'It's nothing serious,' the doctor told her. 'Rest, drink plenty of water and come back in two weeks if it doesn't get better.'" },
      { es: "Deb salió contenta y, como hacía sol, volvió a casa andando.", en: "Deb left happy and, as it was sunny, walked home." },
    ],
    questions: [
      { q: "What time was the appointment?", options: ["A las once y media", "A las dos", "A las siete"], answer: 0 },
      { q: "How much was the bus ticket?", options: ["Veinte euros", "Un euro con cincuenta", "Dos euros"], answer: 1 },
      { q: "How long did she have to wait?", options: ["Dos semanas", "Siete minutos", "Veinte minutos"], answer: 2 },
      { q: "How did she get home?", options: ["En el autobús número siete", "Andando", "En taxi"], answer: 1 },
    ],
  },
  {
    id: "historia-15",
    title: "Las llaves",
    teaser: "Not in the bag, not with the doorman…",
    lines: [
      { es: "Anoche, al volver a casa, Deb buscó las llaves en el bolso y no las encontró.", en: "Last night, coming home, Deb looked for her keys in her bag and couldn't find them." },
      { es: "—¿Tiene usted una copia? —le preguntó al portero. —Lo siento, no tengo ninguna.", en: "'Do you have a copy?' she asked the doorman. 'I'm sorry, I don't have one.'" },
      { es: "La vecina del quinto, que bajaba por la escalera, le dijo: —Suba a mi casa y tómese un café mientras piensa.", en: "The neighbour from the fifth floor, who was coming down the stairs, said: 'Come up to my place and have a coffee while you think.'" },
      { es: "Media hora después, Deb metió la mano en el bolsillo de la chaqueta… y allí estaban las llaves.", en: "Half an hour later, Deb put her hand in her jacket pocket… and there were the keys." },
      { es: "—¡Qué tonta! —dijo riendo—. Pues otro café, y esta vez lo pago yo.", en: "'How silly of me!' she said, laughing. 'Well then, another coffee, and this time I'm paying.'" },
    ],
    questions: [
      { q: "Where did Deb look for the keys first?", options: ["En la chaqueta", "En el bolso", "En el ascensor"], answer: 1 },
      { q: "Did the doorman have a copy?", options: ["Sí, una", "Sí, dos", "No, ninguna"], answer: 2 },
      { q: "What did the neighbour offer her?", options: ["Un café", "Una copia", "Una chaqueta"], answer: 0 },
      { q: "Where were the keys?", options: ["En casa de la vecina", "En el bolso", "En el bolsillo de la chaqueta"], answer: 2 },
    ],
  },
  {
    id: "historia-16",
    title: "Atrapada en el ascensor",
    teaser: "Between the third and the fourth floor",
    lines: [
      { es: "El lunes por la noche Deb subía a casa en el ascensor cuando, de repente, se paró entre el tercero y el cuarto.", en: "On Monday night Deb was going up to her flat in the lift when, suddenly, it stopped between the third and the fourth floor." },
      { es: "Apretó el botón de alarma dos veces, pero no pasó nada, y el móvil no tenía cobertura.", en: "She pressed the alarm button twice, but nothing happened, and her phone had no signal." },
      { es: "—¡Hola! ¿Hay alguien? —gritó. Desde la escalera, la vecina del quinto contestó: —¡Tranquila, voy a avisar al portero!", en: "'Hello! Is anyone there?' she shouted. From the stairs, the neighbour from the fifth floor answered: 'Don't worry, I'll go and tell the doorman!'" },
      { es: "El portero llamó al técnico, y mientras esperaban, la vecina le pasó una botella de agua por la rendija de la puerta.", en: "The doorman called the technician, and while they waited, the neighbour passed her a bottle of water through the gap in the door." },
      { es: "Cuarenta minutos después, las puertas se abrieron. —Mañana subo por la escalera —dijo Deb—. Y bajo también.", en: "Forty minutes later, the doors opened. 'Tomorrow I'm taking the stairs up,' said Deb. 'And down too.'" },
    ],
    questions: [
      { q: "Where did the lift stop?", options: ["Entre el tercero y el cuarto", "En el quinto", "En la planta baja"], answer: 0 },
      { q: "Why couldn't she phone anyone?", options: ["El botón no funcionaba", "El móvil no tenía cobertura", "No tenía móvil"], answer: 1 },
      { q: "Who did the neighbour go and tell?", options: ["Al técnico", "A la vecina del quinto", "Al portero"], answer: 2 },
      { q: "How long was she stuck?", options: ["Dos veces", "Cuarenta minutos", "Media hora"], answer: 1 },
    ],
  },
  /* Ten more, asked for as "more please — maybe slowly make them
     progressively harder and longer". So they climb: four at six lines
     and four questions, four at seven lines and five questions, and two at
     eight lines with a twist at the end. The grammar climbs with them —
     the conditional, "cuando" with the subjunctive, reported speech,
     "se le rompió", object pronouns doing real work — and the neighbour
     from the fifth and the doorman get names, Carmen and Manolo, because
     at this length "la vecina del quinto" four times a story is a mouthful.
     Every tier is declared in STORY_TIERS below, and the list groups by it,
     so the climb is visible rather than something you discover at line six. */
  {
    id: "historia-17",
    tier: "longer",
    title: "Una tarde en el parque",
    teaser: "Ice creams, a bench in the shade, and the names of the trees",
    lines: [
      { es: "El domingo por la tarde hacía buen tiempo, así que Deb y Carmen, la vecina del quinto, fueron al parque.", en: "On Sunday afternoon the weather was nice, so Deb and Carmen, the neighbour from the fifth floor, went to the park." },
      { es: "Compraron dos helados en un quiosco: uno de chocolate para Carmen y uno de limón para Deb.", en: "They bought two ice creams at a kiosk: a chocolate one for Carmen and a lemon one for Deb." },
      { es: "Se sentaron en un banco, a la sombra, y Carmen le enseñó los nombres de los árboles en español.", en: "They sat on a bench, in the shade, and Carmen taught her the names of the trees in Spanish." },
      { es: "—Ese es un pino, y aquel, un olivo —le dijo—. Y esa flor roja se llama amapola.", en: "'That one is a pine, and that one over there, an olive tree,' she told her. 'And that red flower is called a poppy.'" },
      { es: "Deb apuntó las palabras en el móvil para repasarlas por la noche.", en: "Deb noted the words down on her phone to go over them that night." },
      { es: "A las siete empezó a refrescar y volvieron a casa andando, despacio, hablando de plantas.", en: "At seven it started to get cooler and they walked home slowly, talking about plants." },
    ],
    questions: [
      { q: "Who went to the park with Deb?", options: ["El portero", "Carmen, la vecina del quinto", "Su amiga de Chicago"], answer: 1 },
      { q: "What flavour was Deb's ice cream?", options: ["De chocolate", "De fresa", "De limón"], answer: 2 },
      { q: "What is the red flower called?", options: ["Olivo", "Amapola", "Pino"], answer: 1 },
      { q: "Why did they go home?", options: ["Empezó a llover", "Empezó a refrescar", "Cerraba el parque"], answer: 1 },
    ],
  },
  {
    id: "historia-18",
    tier: "longer",
    title: "El taxi al aeropuerto",
    teaser: "Half past six, a heavy suitcase, and don't forget the passport",
    lines: [
      { es: "El viernes Deb tenía que coger un avión a las nueve de la mañana, así que pidió un taxi para las seis y media.", en: "On Friday Deb had to catch a plane at nine in the morning, so she booked a taxi for half past six." },
      { es: "El taxista llegó puntual y la ayudó con la maleta, que pesaba bastante.", en: "The taxi driver arrived on time and helped her with the suitcase, which was quite heavy." },
      { es: "—Al aeropuerto, por favor. ¿Cuánto se tarda a esta hora? —Unos veinticinco minutos, si no hay tráfico.", en: "'To the airport, please. How long does it take at this time?' 'About twenty-five minutes, if there's no traffic.'" },
      { es: "Por el camino hablaron del tiempo y de Chicago, donde el taxista tenía un primo.", en: "On the way they talked about the weather and about Chicago, where the taxi driver had a cousin." },
      { es: "La carrera costó treinta y dos euros; Deb le dio treinta y cinco y le dijo que se quedara con el cambio.", en: "The fare came to thirty-two euros; Deb gave him thirty-five and told him to keep the change." },
      { es: "—Buen viaje —dijo él—. Y no se olvide del pasaporte. Deb lo buscó en el bolso: allí estaba, menos mal.", en: "'Have a good trip,' he said. 'And don't forget your passport.' Deb looked for it in her bag: there it was, thank goodness." },
    ],
    questions: [
      { q: "What time was the taxi booked for?", options: ["A las nueve", "A las seis y media", "A las seis"], answer: 1 },
      { q: "How long does the journey take without traffic?", options: ["Unos veinticinco minutos", "Treinta y dos minutos", "Una hora"], answer: 0 },
      { q: "Where did the driver have a cousin?", options: ["En Atlanta", "En Chicago", "En el aeropuerto"], answer: 1 },
      { q: "How much did Deb give the driver?", options: ["Treinta y dos euros", "Treinta y cinco euros", "Veinticinco euros"], answer: 1 },
    ],
  },
  {
    id: "historia-19",
    tier: "longer",
    title: "La cena en casa",
    teaser: "Two omelettes, one cheesecake, and few grammar rules",
    lines: [
      { es: "El sábado Deb invitó a cenar a Carmen y a su marido, Pepe, y pasó toda la tarde en la cocina.", en: "On Saturday Deb invited Carmen and her husband, Pepe, to dinner, and spent the whole afternoon in the kitchen." },
      { es: "Quería hacer una tortilla de patatas, pero la primera se le rompió al darle la vuelta.", en: "She wanted to make a Spanish omelette, but the first one broke on her when she flipped it." },
      { es: "La segunda salió perfecta, y de postre compró una tarta de queso en la pastelería de abajo.", en: "The second came out perfect, and for dessert she bought a cheesecake from the cake shop downstairs." },
      { es: "—¡Qué rica! —dijo Pepe—. ¿La has hecho tú? —La tortilla sí; la tarta, no —confesó Deb riendo.", en: "'Delicious!' said Pepe. 'Did you make it?' 'The omelette, yes; the cake, no,' Deb confessed, laughing." },
      { es: "Hablaron hasta las doce, medio en español y medio en inglés, con mucho vino y pocas reglas de gramática.", en: "They talked until midnight, half in Spanish and half in English, with lots of wine and few grammar rules." },
      { es: "Al irse, Carmen le dijo: —La próxima vez, en mi casa. Y te enseño a darle la vuelta a la tortilla.", en: "As she left, Carmen said: 'Next time, at my place. And I'll teach you to flip the omelette.'" },
    ],
    questions: [
      { q: "Who came to dinner?", options: ["El portero y su mujer", "Carmen y Pepe", "Su amiga de Atlanta"], answer: 1 },
      { q: "What happened to the first omelette?", options: ["Se quemó", "Se le rompió", "Salió perfecta"], answer: 1 },
      { q: "Where did the cheesecake come from?", options: ["La hizo Deb", "La trajo Carmen", "De la pastelería de abajo"], answer: 2 },
      { q: "What will Carmen teach her?", options: ["A hacer la tarta", "A darle la vuelta a la tortilla", "Las reglas de gramática"], answer: 1 },
    ],
  },
  {
    id: "historia-20",
    tier: "longer",
    title: "El mercadillo de plantas",
    teaser: "One for the bathroom, and the doorman keeps count",
    lines: [
      { es: "Una vez al mes hay un mercadillo de plantas en la plaza, y Deb no se lo pierde nunca.", en: "Once a month there's a plant market in the square, and Deb never misses it." },
      { es: "Esta vez buscaba una planta para el baño, que no tiene mucha luz.", en: "This time she was looking for a plant for the bathroom, which doesn't get much light." },
      { es: "—Esta aguanta bien la sombra —le dijo la vendedora— y solo hay que regarla una vez a la semana.", en: "'This one copes well with shade,' the seller told her, 'and you only need to water it once a week.'" },
      { es: "Costaba doce euros, pero como Deb compró también una maceta, se lo dejó todo en quince.", en: "It cost twelve euros, but as Deb also bought a pot, she let her have it all for fifteen." },
      { es: "De vuelta a casa se encontró con el portero, que miró la planta y dijo: —Otra más. ¿Cuántas tiene ya?", en: "On the way home she ran into the doorman, who looked at the plant and said: 'Another one. How many have you got now?'" },
      { es: "—Veintitrés —contestó Deb—. Bueno, veinticuatro. Pero esta es para el baño, que estaba muy vacío.", en: "'Twenty-three,' Deb replied. 'Well, twenty-four. But this one is for the bathroom, which was looking very empty.'" },
    ],
    questions: [
      { q: "How often is the plant market?", options: ["Cada semana", "Una vez al mes", "Una vez al año"], answer: 1 },
      { q: "Which room was the plant for?", options: ["La cocina", "El baño", "El salón"], answer: 1 },
      { q: "How often does it need watering?", options: ["Una vez a la semana", "Cada día", "Una vez al mes"], answer: 0 },
      { q: "How much did she pay in total?", options: ["Doce euros", "Quince euros", "Veinticuatro euros"], answer: 1 },
    ],
  },
  {
    id: "historia-21",
    tier: "long",
    title: "Una llamada de Atlanta",
    teaser: "Three in the afternoon over there, and a visit in the spring",
    lines: [
      { es: "El martes por la noche sonó el móvil de Deb: era Susan, una amiga de Atlanta, donde eran las tres de la tarde.", en: "On Tuesday night Deb's phone rang: it was Susan, a friend from Atlanta, where it was three in the afternoon." },
      { es: "—¿Cómo va el español? —le preguntó Susan. —Despacio, pero va —contestó Deb—. Ya pido el café sin pensar.", en: "'How's the Spanish going?' Susan asked her. 'Slowly, but it's going,' Deb replied. 'I order coffee without thinking now.'" },
      { es: "Susan le contó que iba a venir a verla en primavera, en abril o en mayo, cuando ya no hiciera frío.", en: "Susan told her she was going to come and see her in spring, in April or May, once it was no longer cold." },
      { es: "—Perfecto —dijo Deb—. Te llevo al mercado, a mi bar de tapas y a la clase de pilates, si te atreves.", en: "'Perfect,' said Deb. 'I'll take you to the market, to my tapas bar, and to Pilates class, if you dare.'" },
      { es: "—A pilates no —rio Susan—. Pero a las tapas sí. ¿Y tu portero sigue tan simpático?", en: "'Not Pilates,' Susan laughed. 'But tapas, yes. And is your doorman still as nice?'" },
      { es: "—Igual que siempre. Ahora me corrige el español, pero con cariño.", en: "'Same as ever. Now he corrects my Spanish, but kindly.'" },
      { es: "Hablaron casi una hora, y al colgar Deb apuntó en el calendario: «Susan — abril o mayo — comprar otra silla».", en: "They talked for almost an hour, and when she hung up Deb wrote on the calendar: 'Susan — April or May — buy another chair.'" },
    ],
    questions: [
      { q: "What time was it in Atlanta?", options: ["Las tres de la tarde", "Las nueve de la noche", "Las once de la mañana"], answer: 0 },
      { q: "How is the Spanish going, according to Deb?", options: ["Muy mal", "Despacio, pero va", "Perfecto"], answer: 1 },
      { q: "When is Susan coming?", options: ["En invierno", "En abril o en mayo", "La semana que viene"], answer: 1 },
      { q: "Which does Susan not want to do?", options: ["Ir al mercado", "Ir de tapas", "Ir a pilates"], answer: 2 },
      { q: "What did Deb write on the calendar?", options: ["Llamar a Susan", "Comprar otra silla", "Ir a Atlanta"], answer: 1 },
    ],
  },
  {
    id: "historia-22",
    tier: "long",
    title: "El cumpleaños del portero",
    teaser: "Sixty, a surprise in the lobby, and a cake chosen by the American",
    lines: [
      { es: "Deb se enteró por Carmen de que el portero, Manolo, cumplía sesenta años el jueves.", en: "Deb found out from Carmen that the doorman, Manolo, was turning sixty on Thursday." },
      { es: "Entre los vecinos decidieron hacerle un regalo, y Deb se ofreció a ir a comprar la tarta.", en: "The neighbours decided between them to get him a present, and Deb offered to go and buy the cake." },
      { es: "En la pastelería pidió una tarta de chocolate para doce personas y preguntó si podían escribir algo encima.", en: "At the cake shop she ordered a chocolate cake for twelve people and asked if they could write something on top." },
      { es: "—Claro. ¿Qué ponemos? —«Felices sesenta, Manolo» —dijo Deb, muy despacio, para no equivocarse.", en: "'Of course. What shall we put?' ''Happy sixtieth, Manolo',' said Deb, very slowly, so as not to get it wrong." },
      { es: "El jueves a las seis, cuando Manolo entró en el portal, todos los vecinos gritaron «¡Sorpresa!».", en: "On Thursday at six, when Manolo came into the lobby, all the neighbours shouted 'Surprise!'" },
      { es: "Manolo no dijo nada durante unos segundos; luego se rio, se limpió los ojos y cortó la tarta.", en: "Manolo said nothing for a few seconds; then he laughed, wiped his eyes and cut the cake." },
      { es: "—Veinte años aquí y es la primera vez —dijo—. Y la tarta la ha elegido la americana, ¿verdad? Se nota: está buenísima.", en: "'Twenty years here and it's the first time,' he said. 'And the American chose the cake, didn't she? You can tell: it's delicious.'" },
    ],
    questions: [
      { q: "How old was Manolo turning?", options: ["Cincuenta", "Sesenta", "Setenta"], answer: 1 },
      { q: "What did Deb offer to do?", options: ["Hacer la tarta", "Comprar la tarta", "Escribir una carta"], answer: 1 },
      { q: "How many people was the cake for?", options: ["Para doce", "Para seis", "Para veinte"], answer: 0 },
      { q: "What did the neighbours shout?", options: ["¡Felicidades!", "¡Sorpresa!", "¡Hola!"], answer: 1 },
      { q: "How long has Manolo worked there?", options: ["Sesenta años", "Doce años", "Veinte años"], answer: 2 },
    ],
  },
  {
    id: "historia-23",
    tier: "long",
    title: "Un día de lluvia en el centro",
    teaser: "No umbrella, a bookshop, and chocolate con churros",
    lines: [
      { es: "El miércoles Deb había quedado con Carmen en el centro a las once para ir de tiendas.", en: "On Wednesday Deb had arranged to meet Carmen in the town centre at eleven to go shopping." },
      { es: "Cuando salió de casa lucía el sol, así que no cogió el paraguas; a las once y cuarto estaba lloviendo a cántaros.", en: "When she left home the sun was shining, so she didn't take an umbrella; at quarter past eleven it was pouring down." },
      { es: "Se refugió en una librería y, mientras esperaba, encontró un libro de recetas españolas con fotos enormes.", en: "She took shelter in a bookshop and, while she waited, found a book of Spanish recipes with enormous photos." },
      { es: "—Me lo llevo —decidió—. Si voy a aprender a darle la vuelta a la tortilla, mejor con instrucciones.", en: "'I'll take it,' she decided. 'If I'm going to learn to flip the omelette, better with instructions.'" },
      { es: "Carmen llegó empapada y con un paraguas roto. —¡Menudo día! —dijo—. Vamos a tomar algo caliente.", en: "Carmen arrived soaked and with a broken umbrella. 'What a day!' she said. 'Let's get something hot.'" },
      { es: "Pidieron dos chocolates con churros en una cafetería de la plaza y vieron caer la lluvia por la ventana.", en: "They ordered two hot chocolates with churros in a café on the square and watched the rain fall through the window." },
      { es: "De tiendas, al final, no fueron; pero Deb volvió a casa con un libro, un paraguas nuevo y las manos todavía calientes.", en: "In the end they didn't go shopping; but Deb went home with a book, a new umbrella and her hands still warm." },
    ],
    questions: [
      { q: "What time had they arranged to meet?", options: ["A las once", "A las once y cuarto", "A las doce"], answer: 0 },
      { q: "Why didn't Deb take an umbrella?", options: ["No tiene paraguas", "Lucía el sol cuando salió", "Carmen tenía uno"], answer: 1 },
      { q: "Where did she take shelter?", options: ["En una cafetería", "En una librería", "En una tienda de paraguas"], answer: 1 },
      { q: "What did they order?", options: ["Dos cafés con leche", "Dos chocolates con churros", "Una tarta de queso"], answer: 1 },
      { q: "What did Deb go home with?", options: ["Un libro y un paraguas nuevo", "Una chaqueta nueva", "Solo el libro"], answer: 0 },
    ],
  },
  {
    id: "historia-24",
    tier: "long",
    title: "La profesora nueva",
    teaser: "Pilates in fast Spanish, and a hand in the air",
    lines: [
      { es: "Esta semana en pilates hay una profesora nueva, Lucía, que habla muy rápido y no sabe nada de inglés.", en: "This week at Pilates there's a new teacher, Lucía, who talks very fast and doesn't know any English." },
      { es: "El primer día Deb no entendía casi nada: «inhala», «exhala», «estira la pierna»… y copiaba a la chica de al lado.", en: "The first day Deb understood almost nothing: 'breathe in', 'breathe out', 'stretch your leg'… and copied the girl next to her." },
      { es: "Al terminar, se acercó a Lucía y le dijo: —Perdona, soy americana y todavía aprendo español. ¿Puedes hablar un poco más despacio?", en: "At the end, she went up to Lucía and said: 'Sorry, I'm American and I'm still learning Spanish. Can you speak a bit more slowly?'" },
      { es: "—¡Claro! —contestó Lucía—. Y si no entiendes algo, levanta la mano, que te lo enseño con el cuerpo.", en: "'Of course!' Lucía replied. 'And if you don't understand something, put your hand up and I'll show you with my body.'" },
      { es: "El segundo día fue mucho mejor: Deb entendió «espalda», «rodillas» y «hombros», y solo se equivocó de pierna una vez.", en: "The second day was much better: Deb understood 'back', 'knees' and 'shoulders', and only got the wrong leg once." },
      { es: "El viernes, Lucía dijo delante de toda la clase: —Muy bien, Deb. Hoy no has mirado a nadie.", en: "On Friday, Lucía said in front of the whole class: 'Very good, Deb. Today you didn't look at anyone.'" },
      { es: "Deb salió tan contenta que se compró un cortado y lo pidió, por primera vez, sin pensar en el acento.", en: "Deb left so happy that she bought herself a cortado and ordered it, for the first time, without thinking about her accent." },
    ],
    questions: [
      { q: "What is the new teacher like?", options: ["Habla muy despacio", "Habla muy rápido y no sabe inglés", "Es americana"], answer: 1 },
      { q: "What did Deb do on the first day?", options: ["Copiaba a la chica de al lado", "Levantó la mano", "Se fue a casa"], answer: 0 },
      { q: "What did Deb ask Lucía?", options: ["Hablar en inglés", "Hablar más despacio", "Cambiar de clase"], answer: 1 },
      { q: "What should Deb do if she doesn't understand?", options: ["Levantar la mano", "Copiar a la vecina", "Preguntar en inglés"], answer: 0 },
      { q: "What did Lucía say on Friday?", options: ["Hoy no has mirado a nadie", "Habla más despacio", "Te has equivocado de pierna"], answer: 0 },
    ],
  },
  {
    id: "historia-25",
    tier: "hard",
    title: "La carta del banco",
    teaser: "A twenty-euro fee, a ticket number, and three sentences that worked",
    lines: [
      { es: "El lunes Deb recibió una carta del banco que no entendía del todo: hablaba de «una comisión de mantenimiento» de veinte euros.", en: "On Monday Deb got a letter from the bank that she didn't entirely understand: it talked about a 'maintenance fee' of twenty euros." },
      { es: "Se la enseñó a Carmen, que la leyó dos veces y dijo: —Esto es un error. Tú tienes la cuenta sin comisiones, ¿no?", en: "She showed it to Carmen, who read it twice and said: 'This is a mistake. You've got the no-fee account, haven't you?'" },
      { es: "Al día siguiente fue a la oficina del banco, cogió número y esperó veinticinco minutos repasando las palabras de la carta en el móvil.", en: "The next day she went to the bank branch, took a ticket and waited twenty-five minutes going over the words from the letter on her phone." },
      { es: "—Buenos días. He recibido esta carta y creo que hay un error —dijo, y le dio la carta al empleado sin añadir nada más.", en: "'Good morning. I've received this letter and I think there's a mistake,' she said, and handed the letter to the clerk without adding anything else." },
      { es: "El empleado miró la pantalla, frunció el ceño y tecleó un buen rato. —Tiene razón —dijo por fin—. Le devolvemos los veinte euros esta semana.", en: "The clerk looked at the screen, frowned and typed for a good while. 'You're right,' he said at last. 'We'll refund the twenty euros this week.'" },
      { es: "—¿Y no va a volver a pasar? —preguntó Deb. —No debería. Pero si vuelve a pasar, llámenos y lo arreglamos.", en: "'And it won't happen again?' asked Deb. 'It shouldn't. But if it happens again, call us and we'll sort it out.'" },
      { es: "Deb salió a la calle sintiéndose, por primera vez, capaz de discutir con un banco en español, aunque fuera con tres frases.", en: "Deb walked out into the street feeling, for the first time, able to argue with a bank in Spanish, even if it was with three sentences." },
      { es: "Esa noche se lo contó a Carmen. —¿Ves? —le dijo su vecina—. El próximo paso es quejarte de la factura de la luz.", en: "That night she told Carmen. 'You see?' said her neighbour. 'The next step is complaining about the electricity bill.'" },
    ],
    questions: [
      { q: "What was the letter about?", options: ["Una comisión de veinte euros", "Una cuenta nueva", "La factura de la luz"], answer: 0 },
      { q: "What did Carmen think?", options: ["Que había que pagar", "Que era un error", "Que no entendía la carta"], answer: 1 },
      { q: "How long did Deb wait at the bank?", options: ["Dos veces", "Veinte minutos", "Veinticinco minutos"], answer: 2 },
      { q: "What did the clerk say in the end?", options: ["Que Deb tenía razón", "Que no podía ayudarla", "Que llamara la semana que viene"], answer: 0 },
      { q: "What is the 'next step', according to Carmen?", options: ["Abrir otra cuenta", "Quejarse de la factura de la luz", "Cambiar de banco"], answer: 1 },
    ],
  },
  {
    id: "historia-26",
    tier: "hard",
    title: "El examen del portero",
    teaser: "One exam at eight, another five minutes later",
    lines: [
      { es: "Desde que Manolo descubrió que Deb estudiaba español todas las mañanas, le hace un «examen» cada vez que ella pasa por el portal.", en: "Ever since Manolo discovered that Deb studies Spanish every morning, he gives her an 'exam' every time she walks through the lobby." },
      { es: "—A ver, Deb: ¿cómo se dice «I would like a table by the window»? —Querría una mesa al lado de la ventana. —¡Muy bien! Mañana, más difícil.", en: "'Let's see, Deb: how do you say 'I would like a table by the window'?' 'Querría una mesa al lado de la ventana.' 'Very good! Tomorrow, harder.'" },
      { es: "Algunos días Deb se equivoca, y Manolo nunca se ríe: repite la frase despacio, una vez, y le dice que la practique en el ascensor.", en: "Some days Deb gets it wrong, and Manolo never laughs: he repeats the sentence slowly, once, and tells her to practise it in the lift." },
      { es: "Un jueves, Deb le propuso cambiar los papeles: —Hoy el examen te lo hago yo, pero en inglés.", en: "One Thursday, Deb suggested swapping roles: 'Today I'll give you the exam, but in English.'" },
      { es: "Manolo se puso rojo. —Yo de inglés, nada —dijo—. Bueno… «good morning», «thank you» y «one beer, please», que lo aprendí en Benidorm.", en: "Manolo went red. 'I know no English at all,' he said. 'Well… 'good morning', 'thank you' and 'one beer, please', which I learned in Benidorm.'" },
      { es: "—Pues ya son tres frases —contestó Deb—. Mañana te enseño «where is the station», que es la que más me preguntan a mí en Chicago.", en: "'Well, that's three sentences already,' Deb replied. 'Tomorrow I'll teach you 'where is the station', which is the one people ask me most in Chicago.'" },
      { es: "Ahora, cada mañana, hay dos exámenes en el portal: uno en español, a las ocho, y otro en inglés, cinco minutos después.", en: "Now, every morning, there are two exams in the lobby: one in Spanish, at eight, and another in English, five minutes later." },
      { es: "Carmen, que lo ve todo desde la escalera, dice que es la única academia de idiomas del barrio que abre antes que la panadería.", en: "Carmen, who sees it all from the stairs, says it's the only language school in the neighbourhood that opens before the bakery." },
    ],
    questions: [
      { q: "When does Manolo give Deb an exam?", options: ["Los jueves", "Cada vez que pasa por el portal", "Una vez al mes"], answer: 1 },
      { q: "What does Manolo do when Deb gets it wrong?", options: ["Se ríe", "Repite la frase despacio", "Cambia de tema"], answer: 1 },
      { q: "What did Deb suggest one Thursday?", options: ["Dejar los exámenes", "Cambiar los papeles", "Ir a Benidorm"], answer: 1 },
      { q: "Where did Manolo learn his English?", options: ["En Chicago", "En la escalera", "En Benidorm"], answer: 2 },
      { q: "When is the English exam?", options: ["A las ocho", "Cinco minutos después del de español", "Antes que la panadería"], answer: 1 },
    ],
  },
  /* Eight more, arriving with the five everyday units and written out of
     their vocabulary: the plants, the way to the metro, the flat hunt,
     Thanksgiving in the third-floor flat, the pharmacy, the Christmas
     lottery, the grapes and the Kings. Spread across the tiers rather than
     stacked on the end — the list groups by tier, so an easy one appended
     here still lands under Short. */
  {
    id: "historia-27",
    tier: "easy",
    title: "Las plantas de Deb",
    teaser: "A new flower, and some advice",
    lines: [
      { es: "Deb tiene muchas plantas en el balcón.", en: "Deb has a lot of plants on the balcony." },
      { es: "Hoy una planta tiene una flor nueva.", en: "Today one plant has a new flower." },
      { es: "—¡Mira, Carmen! —dice Deb—. Esta es mi favorita.", en: "'Look, Carmen!' says Deb. 'This one is my favourite.'" },
      { es: "—Muy bonita —dice Carmen—. Pero le hace falta más sol.", en: "'Very pretty,' says Carmen. 'But it needs more sun.'" },
    ],
    questions: [
      { q: "Where are Deb's plants?", options: ["En la cocina", "En el balcón", "En el mercado"], answer: 1 },
      { q: "What does the plant have today?", options: ["Una flor nueva", "Una hoja seca", "Una maceta nueva"], answer: 0 },
      { q: "What does Carmen say it needs?", options: ["Más agua", "Más sol", "Más tierra"], answer: 1 },
    ],
  },
  {
    id: "historia-28",
    tier: "easy",
    title: "¿Está lejos?",
    teaser: "Straight on, then second on the right",
    lines: [
      { es: "Deb busca la calle Mallorca.", en: "Deb is looking for Mallorca Street." },
      { es: "—Perdone, ¿está lejos? —pregunta a un señor.", en: "'Excuse me, is it far?' she asks a man." },
      { es: "—No. Todo recto y la segunda a la derecha —dice él.", en: "'No. Straight on and second on the right,' he says." },
      { es: "Deb va andando y llega en cinco minutos.", en: "Deb walks and gets there in five minutes." },
    ],
    questions: [
      { q: "What is Deb looking for?", options: ["La calle Mallorca", "El mercado", "La farmacia"], answer: 0 },
      { q: "What does the man say?", options: ["Todo recto y la segunda a la derecha", "Gire a la izquierda", "Está muy lejos"], answer: 0 },
      { q: "How does Deb get there?", options: ["En autobús", "En taxi", "Andando"], answer: 2 },
    ],
  },
  {
    id: "historia-29",
    tier: "harder",
    title: "Un piso con balcón",
    teaser: "Three flats, and the one with the morning light",
    lines: [
      { es: "Cuando Deb llegó a Barcelona, buscaba un piso con balcón para sus plantas.", en: "When Deb arrived in Barcelona, she was looking for a flat with a balcony for her plants." },
      { es: "El primero que vio era muy bonito, pero daba a una calle con mucho ruido.", en: "The first one she saw was very pretty, but it faced a street with a lot of noise." },
      { es: "El segundo tenía ascensor y estaba amueblado, pero el alquiler era muy caro.", en: "The second had a lift and was furnished, but the rent was very expensive." },
      { es: "El tercero daba al patio, tenía luz toda la mañana y el casero era muy amable.", en: "The third faced the courtyard, had light all morning and the landlord was very kind." },
      { es: "—Me lo quedo —dijo Deb—. ¿Cuánto es la fianza?", en: "'I'll take it,' said Deb. 'How much is the deposit?'" },
    ],
    questions: [
      { q: "What was Deb looking for?", options: ["Un piso con balcón", "Un piso con piscina", "Un piso en el centro"], answer: 0 },
      { q: "What was wrong with the first flat?", options: ["Era muy caro", "Daba a una calle con mucho ruido", "No tenía ascensor"], answer: 1 },
      { q: "Why not the second one?", options: ["El alquiler era muy caro", "No tenía luz", "El casero no era amable"], answer: 0 },
      { q: "Which flat did she take?", options: ["El primero", "El segundo", "El tercero"], answer: 2 },
    ],
  },
  {
    id: "historia-30",
    tier: "harder",
    title: "Acción de Gracias en el tercero",
    teaser: "A whole turkey, and an oven that's too small",
    lines: [
      { es: "El cuarto jueves de noviembre, Deb invitó a Carmen y a Manolo a cenar.", en: "On the fourth Thursday of November, Deb invited Carmen and Manolo to dinner." },
      { es: "—En Estados Unidos celebramos Acción de Gracias —les explicó—. Se come pavo.", en: "'In the US we celebrate Thanksgiving,' she explained to them. 'You eat turkey.'" },
      { es: "El lunes fue a la carnicería y pidió un pavo entero; el carnicero se rio y dijo que lo tendría el miércoles.", en: "On Monday she went to the butcher's and asked for a whole turkey; the butcher laughed and said he'd have it on Wednesday." },
      { es: "El jueves el pavo no cabía en el horno, así que Deb lo cortó en dos y nadie se dio cuenta.", en: "On Thursday the turkey didn't fit in the oven, so Deb cut it in two and nobody noticed." },
      { es: "—Está buenísimo —dijo Manolo—. ¿Y esto se celebra todos los años? Pues yo vengo.", en: "'It's delicious,' said Manolo. 'And this is celebrated every year? Then I'm coming.'" },
    ],
    questions: [
      { q: "Who did Deb invite?", options: ["A Carmen y a Manolo", "A Susan", "A la profesora de pilates"], answer: 0 },
      { q: "What did the butcher say?", options: ["Que no tenía pavo", "Que lo tendría el miércoles", "Que era muy caro"], answer: 1 },
      { q: "What was the problem on Thursday?", options: ["El pavo estaba frío", "El pavo no cabía en el horno", "El pavo no llegó"], answer: 1 },
      { q: "What does Manolo say at the end?", options: ["Que no le gusta el pavo", "Que viene todos los años", "Que tiene frío"], answer: 1 },
    ],
  },
  {
    id: "historia-31",
    tier: "longer",
    title: "La farmacia de la esquina",
    teaser: "A first Barcelona cold, and no prescription needed",
    lines: [
      { es: "El martes Deb se despertó con dolor de cabeza y la nariz tapada: su primer resfriado en Barcelona.", en: "On Tuesday Deb woke up with a headache and a blocked nose: her first cold in Barcelona." },
      { es: "Bajó a la farmacia de la esquina y dijo, muy despacio: —Necesito algo para el resfriado.", en: "She went down to the pharmacy on the corner and said, very slowly: 'I need something for a cold.'" },
      { es: "La farmacéutica le preguntó si tenía fiebre y si era alérgica a algo. —A los frutos secos —contestó Deb—, pero eso no es un medicamento, ¿no?", en: "The pharmacist asked her if she had a fever and if she was allergic to anything. 'To nuts,' Deb answered, 'but that's not a medicine, is it?'" },
      { es: "—No, tranquila —se rio la farmacéutica, y le dio una caja de sobres—. Uno cada ocho horas, con agua caliente. Y no hace falta receta.", en: "'No, don't worry,' laughed the pharmacist, and gave her a box of sachets. 'One every eight hours, with hot water. And you don't need a prescription.'" },
      { es: "Deb pagó cuatro euros con veinte y volvió a casa pensando que había entendido todo, o casi todo.", en: "Deb paid four euros twenty and went home thinking she had understood everything, or almost everything." },
      { es: "Esa noche durmió diez horas; el miércoles, en el portal, Manolo le dijo que tenía mejor cara que él.", en: "That night she slept ten hours; on Wednesday, in the lobby, Manolo told her she looked better than he did." },
    ],
    questions: [
      { q: "What was wrong with Deb?", options: ["Le dolía la espalda", "Tenía un resfriado", "Estaba cansada"], answer: 1 },
      { q: "What did the pharmacist ask?", options: ["Si tenía fiebre", "Si tenía receta", "Si tenía tarjeta"], answer: 0 },
      { q: "How often should Deb take the medicine?", options: ["Dos veces al día", "Uno cada ocho horas", "Uno a la semana"], answer: 1 },
      { q: "How long did Deb sleep?", options: ["Ocho horas", "Diez horas", "Toda la mañana"], answer: 1 },
    ],
  },
  {
    id: "historia-32",
    tier: "longer",
    title: "El Gordo",
    teaser: "Twenty euros in, children singing numbers, and twenty euros out",
    lines: [
      { es: "A principios de diciembre, Manolo le preguntó a Deb si quería comprar un décimo de la lotería de Navidad con los vecinos.", en: "At the beginning of December, Manolo asked Deb if she wanted to buy a share of the Christmas lottery with the neighbours." },
      { es: "—¿Un décimo? —preguntó Deb. —Sí, mujer: veinte euros, y si toca, toca para todo el edificio —explicó Carmen.", en: "'A share?' asked Deb. 'Yes: twenty euros, and if it wins, it wins for the whole building,' Carmen explained." },
      { es: "Deb no entendía muy bien cómo funcionaba, pero pagó sus veinte euros y guardó el papel en el bolso.", en: "Deb didn't really understand how it worked, but she paid her twenty euros and kept the slip in her bag." },
      { es: "El veintidós de diciembre, a las nueve de la mañana, en todas las radios del barrio unos niños cantaban números.", en: "On the twenty-second of December, at nine in the morning, on every radio in the neighbourhood some children were singing numbers." },
      { es: "A las once, Carmen llamó a la puerta gritando: —¡Nos ha tocado! Bueno… la pedrea. ¡Veinte euros!", en: "At eleven, Carmen knocked on the door shouting: 'We've won! Well… a small prize. Twenty euros!'" },
      { es: "Deb recuperó justo lo que había pagado, pero bajó al portal con una botella de cava igualmente: a lo mejor el año que viene.", en: "Deb got back exactly what she had paid, but she went down to the lobby with a bottle of cava anyway: maybe next year." },
    ],
    questions: [
      { q: "What did Manolo suggest?", options: ["Comprar un décimo con los vecinos", "Comprar el pavo", "Cenar en el tercero"], answer: 0 },
      { q: "How much did Deb pay?", options: ["Diez euros", "Veinte euros", "Cien euros"], answer: 1 },
      { q: "What happens on 22 December?", options: ["Unos niños cantan números en la radio", "Es Nochebuena", "Vienen los Reyes"], answer: 0 },
      { q: "How much did they win?", options: ["Nada", "Veinte euros", "Mucho dinero"], answer: 1 },
    ],
  },
  {
    id: "historia-33",
    tier: "long",
    title: "Las doce uvas",
    teaser: "Practice on the thirtieth, a tip from the greengrocer, and midnight",
    lines: [
      { es: "Deb decidió quedarse en Barcelona en Nochevieja: el vuelo a Atlanta era carísimo y, además, quería ver lo de las uvas.", en: "Deb decided to stay in Barcelona for New Year's Eve: the flight to Atlanta was hugely expensive and, besides, she wanted to see the thing with the grapes." },
      { es: "Carmen la invitó a cenar a su casa y le dio instrucciones: —Doce uvas, una por campanada, y tienes que terminarlas antes de que acabe la última.", en: "Carmen invited her to dinner at her place and gave her instructions: 'Twelve grapes, one per chime, and you have to finish them before the last one ends.'" },
      { es: "Deb practicó el día treinta con uvas del mercado, delante del reloj de la cocina, y se atragantó en la séptima.", en: "Deb practised on the thirtieth with grapes from the market, in front of the kitchen clock, and choked on the seventh." },
      { es: "—Pélalas y quítales las pepitas —le aconsejó el frutero el día treinta y uno—. Es lo que hace todo el mundo, aunque nadie lo diga.", en: "'Peel them and take the pips out,' the greengrocer advised her on the thirty-first. 'It's what everyone does, even if nobody says so.'" },
      { es: "A las doce menos cuarto, en casa de Carmen, todos estaban de pie delante de la tele con un plato de uvas en la mano.", en: "At quarter to twelve, at Carmen's, everyone was standing in front of the TV with a plate of grapes in their hand." },
      { es: "Sonaron las campanadas; Deb comió, comió, comió… y en la duodécima levantó los brazos con la boca llena mientras todos gritaban «¡Feliz año nuevo!».", en: "The chimes rang; Deb ate, ate, ate… and on the twelfth she raised her arms with her mouth full while everyone shouted 'Happy New Year!'" },
      { es: "—Es la primera americana que lo consigue a la primera —dijo Manolo, y brindaron con cava—. El año que viene, con pepitas.", en: "'She's the first American to manage it first time,' said Manolo, and they toasted with cava. 'Next year, with the pips in.'" },
    ],
    questions: [
      { q: "Why did Deb stay in Barcelona?", options: ["El vuelo era carísimo", "No le gusta Atlanta", "Tenía que trabajar"], answer: 0 },
      { q: "What are Carmen's instructions?", options: ["Doce uvas, una por campanada", "Una uva a medianoche", "Doce uvas con cava"], answer: 0 },
      { q: "What happened when Deb practised?", options: ["Se atragantó en la séptima", "No tenía uvas", "Se comió todas"], answer: 0 },
      { q: "What did the greengrocer advise?", options: ["Comprar uvas grandes", "Pelarlas y quitarles las pepitas", "Comer solo seis"], answer: 1 },
      { q: "What does Manolo say at the end?", options: ["Que Deb ha perdido", "El año que viene, con pepitas", "Que no le gustan las uvas"], answer: 1 },
    ],
  },
  {
    id: "historia-34",
    tier: "hard",
    title: "El roscón de Reyes",
    teaser: "A bean, a figurine, and a box Deb should have read",
    lines: [
      { es: "El cinco de enero por la tarde, Carmen le explicó a Deb que los niños dejan los zapatos junto a la ventana y que los Reyes pasan por la noche a dejar los regalos.", en: "On the afternoon of the fifth of January, Carmen explained to Deb that children leave their shoes by the window and that the Kings come by in the night to leave the presents." },
      { es: "—¿Y los mayores? —preguntó Deb. —Los mayores comen roscón el día seis: a quien le toca la figurita se pone la corona, y a quien le toca el haba, paga el roscón.", en: "'And the grown-ups?' asked Deb. 'The grown-ups eat roscón on the sixth: whoever gets the little figure wears the crown, and whoever gets the bean pays for the roscón.'" },
      { es: "Deb fue a la pastelería de la plaza y compró uno grande, de nata, porque el pequeño le pareció poca cosa para cuatro personas.", en: "Deb went to the cake shop on the square and bought a big one, with cream, because the small one seemed too little for four people." },
      { es: "El día seis, Manolo subió con su hijo, y Carmen cortó el roscón muy despacio, mirando cada trozo como si fuera un médico.", en: "On the sixth, Manolo came up with his son, and Carmen cut the roscón very slowly, examining each slice as if she were a doctor." },
      { es: "El hijo de Manolo mordió, puso cara rara y escupió el haba en la servilleta. —¡Pagas tú! —gritaron todos, y el niño se puso rojo.", en: "Manolo's son bit in, pulled a funny face and spat the bean into his napkin. 'You're paying!' they all shouted, and the boy went red." },
      { es: "Deb mordió su trozo, muy atenta, y sintió algo duro: sacó una figurita de porcelana, un rey con una capa azul.", en: "Deb bit into her slice, very carefully, and felt something hard: she pulled out a little porcelain figure, a king with a blue cape." },
      { es: "Le pusieron la corona de papel dorado y, por un momento, Deb fue la reina del tercero.", en: "They put the gold paper crown on her and, for a moment, Deb was queen of the third floor." },
      { es: "Luego Carmen cortó el siguiente trozo, y el siguiente, y en cada uno había un rey. Deb miró la caja y leyó: «Roscón especial: doce sorpresas». Al final de la tarde había doce reyes en el salón y un solo niño que tenía que pagar.", en: "Then Carmen cut the next slice, and the next, and in every one there was a king. Deb looked at the box and read: 'Special roscón: twelve surprises'. By the end of the afternoon there were twelve kings in the living room and just one boy who had to pay." },
    ],
    questions: [
      { q: "Where do the children leave their shoes?", options: ["Junto a la ventana", "En el balcón", "En el portal"], answer: 0 },
      { q: "What happens to whoever gets the bean?", options: ["Se pone la corona", "Paga el roscón", "Come otro trozo"], answer: 1 },
      { q: "Which roscón did Deb buy?", options: ["El pequeño", "Uno grande, de nata", "Uno de chocolate"], answer: 1 },
      { q: "Who got the bean?", options: ["Deb", "Carmen", "El hijo de Manolo"], answer: 2 },
      { q: "How many kings were there in the end?", options: ["Uno", "Tres", "Doce"], answer: 2 },
    ],
  },
];

/* The climb, in order. A story names its tier; the list groups by it and
   says what each step adds, so "progressively harder" is a thing you can
   see on the page rather than something you discover at line six. The
   first two tiers predate the field — `tierOf` reads them off the id — so
   a story with no `tier` written on it is not an error. */
export const STORY_TIERS = [
  { id: "easy", title: "Short", sub: "Four lines, three questions" },
  { id: "harder", title: "A bit harder", sub: "Five lines, the past tenses, four questions" },
  { id: "longer", title: "Longer", sub: "Six lines, four questions" },
  { id: "long", title: "Longer still", sub: "Seven lines, five questions" },
  { id: "hard", title: "Hard", sub: "Eight lines, five questions, and a twist" },
];

export function tierOf(story) {
  if (story.tier) return story.tier;
  return Number(story.id.replace("historia-", "")) <= 10 ? "easy" : "harder";
}

export function storyById(id) {
  return STORIES.find((s) => s.id === id) ?? null;
}

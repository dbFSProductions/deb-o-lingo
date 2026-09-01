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
            text: "Antes trabajaba en Chicago.",
            translation: "I used to work in Chicago.",
            focusNote:
              "tra-ba-HA-ba, stress on -HA-. That -aba tail is the sound of the line — you'll hear it all lesson.",
            aspect: "line",
            aspectNote:
              "'Antes' with no end date on it is a stretch, not an event. The -aba is the line.",
          },
          {
            id: "pasado-1-2",
            text: "Cuando tenía veintiún años, trabajaba en un restaurante.",
            translation: "When I was twenty-one I worked in a restaurant.",
            focusNote:
              "te-NÍ-a — three syllables, stress on the Í. That -ía is the line's other ending.",
            aspect: "line",
            aspectNote:
              "A stretch of your life with no edges on it. Both verbs are the line: tenía (-ía) and trabajaba (-aba).",
          },
          {
            id: "pasado-1-3",
            text: "Volaba cada semana de Tampa a Chicago.",
            translation: "I flew from Tampa to Chicago every week.",
            focusNote:
              "bo-LA-ba — that v is a b, stress on -LA-. Another -aba.",
            aspect: "line",
            aspectNote:
              "'Cada semana' is a habit, and habits have no edges. -aba, so a line.",
          },
          {
            id: "pasado-1-4",
            text: "Antes me levantaba todos los días a las seis y media.",
            translation: "I used to get up at six thirty every day.",
            focusNote:
              "le-ban-TA-ba — v is b again. The 6:30 these lessons were sized for, in the past.",
            aspect: "line",
            aspectNote:
              "A daily habit, however long it ran. -aba is the line.",
          },
          {
            id: "pasado-1-5",
            text: "La semana pasada compré una planta nueva.",
            translation: "I bought a new plant last week.",
            focusNote:
              "com-PRÉ — the stress lands hard on the final É. That end-stress is the dot's sound, where -aba sits in the middle.",
            aspect: "dot",
            aspectNote:
              "The odd one out. Last week is a shut box and the buying happened once inside it — a dot, and the ending jumps to a stressed -é.",
          },
        ],
      },
      {
        id: "pasado-2",
        title: "The dot in a box · -é / -ó",
        phrases: [
          {
            id: "pasado-2-1",
            text: "La semana pasada fui a Atlanta.",
            translation: "I went to Atlanta last week.",
            focusNote:
              "'Fui' is one syllable — fwee. It does the work of both 'I went' and 'I was'.",
            aspect: "dot",
            aspectNote:
              "Last week is a shut box. One trip, one dot — fui is a dot with no ending to listen for; the whole word is the signal.",
          },
          {
            id: "pasado-2-2",
            text: "Fui a Atlanta y luego a Florida a ver a una amiga.",
            translation: "I went to Atlanta and then to Florida to see a friend.",
            focusNote:
              "LWE-go, and a light tapped r in 'ver'. Run 'a ver a una amiga' together as one ribbon.",
            aspect: "dot",
            aspectNote:
              "Two trips, one after the other — dots in a row. A story that moves forward is told in dots.",
          },
          {
            id: "pasado-2-3",
            text: "El domingo fui a un mercadillo de plantas.",
            translation: "On Sunday I went to a plant sale.",
            focusNote:
              "mer-ka-DEE-yo — the ll is a y and the d melts soft. Stress on -DEE-.",
            aspect: "dot",
            aspectNote:
              "Sunday came and went — the box is shut. One visit, one dot.",
          },
          {
            id: "pasado-2-4",
            text: "La clase de pilates de ayer fue dura.",
            translation: "Yesterday's Pilates class was hard.",
            focusNote:
              "'Fue' is one syllable — fweh. Tap the r in 'dura': DU-ra.",
            aspect: "dot",
            aspectNote:
              "It says 'was', but yesterday's class is one finished thing being summed up — a dot, so it's fue. Compare the next card.",
          },
          {
            id: "pasado-2-5",
            text: "Ayer estaba cansada y no quería salir.",
            translation: "Yesterday I was tired and didn't want to go out.",
            focusNote:
              "es-TA-ba and ke-RÍ-a — one of each line ending, -aba and -ía, in the same breath.",
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
            translation: "I've been to Pilates today.",
            focusNote:
              "'He' is just eh — silent h. Then EE-tho: 'ido' with the soft d.",
            aspect: "presentPerfect",
            aspectNote:
              "'Hoy' still has now inside it, so the bracket is open — he + -ido, the line reaching now.",
          },
          {
            id: "pasado-3-2",
            text: "Ayer fui a pilates.",
            translation: "I went to Pilates yesterday.",
            focusNote:
              "Same sentence as its pair — but listen: one closed fwee where 'he ido' was.",
            aspect: "dot",
            aspectNote:
              "Change hoy to ayer and the box shuts. Spain changes the verb with it: he ido becomes fui.",
          },
          {
            id: "pasado-3-3",
            text: "Esta semana he ido a pilates todos los días.",
            translation: "I went to Pilates every day this week.",
            focusNote:
              "eh EE-tho again, then TO-thos los DEE-as — keep every vowel pure.",
            aspect: "presentPerfect",
            aspectNote:
              "The trap: 'every day' sounds like a habit-line, but 'this week' still has now inside it, so Spain says he ido. Ask where the bracket is, not how many times.",
          },
          {
            id: "pasado-3-4",
            text: "He estado usando la aplicación para aprender español.",
            translation: "I've been using the app to learn Spanish.",
            focusNote:
              "eh es-TA-tho u-SAN-do — soft d's all through. 'Aplicación' ends on a stressed -THYON, that Spain c.",
            aspect: "presentPerfect",
            aspectNote:
              "Started in the past and still true this minute — the line reaching right up to now. he + -ado again.",
          },
          {
            id: "pasado-3-5",
            text: "Pasé un buen fin de semana.",
            translation: "I had a nice weekend.",
            focusNote:
              "pa-SÉ — the stress slams onto the final É. 'Buen' is one syllable: bwen.",
            aspect: "dot",
            aspectNote:
              "Said on Monday, the weekend is a shut box — a dot, pa-SÉ. On Sunday evening, with the weekend still around you, Spain would say he pasado.",
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

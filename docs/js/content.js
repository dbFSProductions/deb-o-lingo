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
      {
        id: "palabras-1",
        title: "On the table",
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
            id: "palabras-1-4",
            text: "el vaso",
            translation: "the glass",
            sounds: "BASS-o",
            picture:
              "A bass — the fish — swimming laps inside your water glass, bumping the sides.",
            focusNote:
              "The v is a b: BA-so. Same sound as the b in 'bien', both softer than an English b.",
          },
          {
            id: "palabras-1-5",
            text: "la servilleta",
            translation: "the napkin",
            sounds: "serve a YETI",
            picture:
              "You serve a yeti his dinner and he tucks a bedsheet-sized napkin under his chin.",
            focusNote:
              "ser-bi-YE-ta — v as b again, and 'll' as y. Four syllables, stress on YE.",
          },
        ],
      },
      {
        id: "palabras-2",
        title: "Around the apartment",
        phrases: [
          {
            id: "palabras-2-1",
            text: "la llave",
            translation: "the key",
            sounds: "YA! wave",
            picture:
              "You wave the key over your head like a lasso, shout '¡YA!', and the lock gives up.",
            focusNote:
              "YA-be. 'll' is y, v is b — and stress the first syllable. Not 'lah-vay'.",
          },
          {
            id: "palabras-2-2",
            text: "la puerta",
            translation: "the door",
            sounds: "PORT-a",
            picture:
              "Your front door is a ship's porthole, and you climb through it to get in with the shopping.",
            focusNote:
              "PWER-ta — 'pue' is one syllable, pwer. Same 'port' root as English, which is half the reason it sticks.",
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
          {
            id: "palabras-2-4",
            text: "la ventana",
            translation: "the window",
            sounds: "VENT + banana",
            picture:
              "A banana jammed in the window vent, holding it open all night.",
            focusNote:
              "ben-TA-na — v as b, stress on TA. Say it slowly and it's almost 'ventilate'.",
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
        ],
      },
      {
        id: "palabras-3",
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
            id: "palabras-3-2",
            text: "la tienda",
            translation: "the shop",
            sounds: "TENT + a",
            picture:
              "The corner shop is pitched like a circus tent, with ten-dollar bills flapping off the pole.",
            focusNote:
              "TYEN-da — 'tie' is one syllable, tyen. It really does mean tent as well, which is where the picture comes from.",
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
            id: "palabras-3-5",
            text: "la parada",
            translation: "the (bus) stop",
            sounds: "parade",
            picture:
              "A whole marching band is waiting at the bus stop, and the bus cannot get anywhere near it.",
            focusNote:
              "pa-RA-da — tapped r, and that middle d is soft, closer to 'th' in 'father'.",
          },
        ],
      },
      {
        id: "palabras-4",
        title: "At the market",
        phrases: [
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
            id: "palabras-4-2",
            text: "el queso",
            translation: "the cheese",
            sounds: "K, so…",
            picture:
              "The cheese man starts every sentence with 'K, so…' and cuts you another slice each time.",
            focusNote:
              "KE-so. 'qu' is a plain k and the u is silent — never 'kwe'.",
          },
          {
            id: "palabras-4-3",
            text: "la leche",
            translation: "the milk",
            sounds: "LECTURE",
            picture:
              "The milk lectures you, out loud, for drinking it straight from the carton over the sink.",
            focusNote:
              "LE-che, 'ch' as in 'church'. Two syllables, stress the first.",
          },
          {
            id: "palabras-4-4",
            text: "el pollo",
            translation: "the chicken",
            sounds: "POLO, yo",
            picture:
              "A chicken in a polo shirt, playing polo, shouting 'yo!' at the other chickens.",
            focusNote:
              "PO-yo. 'll' as y — and this one matters: 'polo' with an l is a polo shirt, not lunch.",
          },
          {
            id: "palabras-4-5",
            text: "la manzana",
            translation: "the apple",
            sounds: "man, THANK ya",
            picture:
              "A man tips his hat and lisps 'man, thank ya' every single time you hand him an apple.",
            focusNote:
              "man-THA-na — that's the Spain z, tongue between the teeth. In Latin America it would be 'man-SA-na'.",
          },
        ],
      },
      {
        id: "palabras-5",
        title: "Small words that do a lot",
        phrases: [
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
            id: "palabras-5-3",
            text: "ahora",
            translation: "now",
            sounds: "an HOUR",
            picture:
              "You ask when, they say 'an hour' — and you shout back that you meant NOW. It sounds like 'an hour' and means the opposite.",
            focusNote:
              "a-O-ra. The h is silent, so it's three vowels and a tapped r — ah-OH-ra.",
          },
          {
            id: "palabras-5-4",
            text: "luego",
            translation: "later",
            sounds: "LEGO",
            picture:
              "Two Lego people wave from the doorway: 'we go… later.' You stand on a brick anyway.",
            focusNote:
              "LWE-go — 'lue' is one syllable, lwe. You already say it in '¡Hasta luego!'",
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
            id: "palabras-6-3",
            text: "poder",
            translation: "to be able to, can",
            sounds: "POWDER",
            picture:
              "One sniff of the powder and you can do anything — lift the fridge, carry all the shopping in one go.",
            focusNote:
              "po-DER, stress on DER, and the d is soft. 'Puedo' is I can — the o breaks into 'we'.",
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
        ],
      },
      {
        id: "palabras-7",
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
        id: "palabras-8",
        title: "Today, tomorrow, yesterday",
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
            id: "palabras-8-2",
            text: "mañana",
            translation: "tomorrow, morning",
            sounds: "a man says 'ya, ya, na'",
            picture:
              "A man waves you away — 'ya, ya, na' — he'll do it tomorrow. He said that yesterday too.",
            focusNote:
              "ma-NYA-na. The ñ is 'ny' as in canyon. It means the morning as well as tomorrow, which is very Spanish of it.",
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
            id: "palabras-8-4",
            text: "la semana",
            translation: "the week",
            sounds: "some MANNA",
            picture:
              "Manna falls out of the sky once a week, and you have to catch a whole week's worth in a bedsheet.",
            focusNote:
              "se-MA-na, stress in the middle. 'Fin de semana' is the weekend — you already say it to the doorman.",
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
        ],
      },
      {
        id: "palabras-9",
        title: "When something hurts",
        phrases: [
          {
            id: "palabras-9-1",
            text: "la farmacia",
            translation: "the pharmacy",
            sounds: "FARM-acia",
            picture:
              "The pharmacy is a farm — a flashing green cross over the barn door and a cow at the counter in a white coat.",
            focusNote:
              "far-MA-thya — that's the Spain c. Look for the flashing green cross; that is what they all have.",
          },
          {
            id: "palabras-9-2",
            text: "la cabeza",
            translation: "the head",
            sounds: "CAB, BEIGE-a",
            picture:
              "You bang your head on the roof of a beige cab, twice, because you forgot the first time.",
            focusNote:
              "ca-BE-tha — the z is the Spain 'th', tongue between the teeth. Stress the middle.",
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
            id: "palabras-9-4",
            text: "cansado",
            translation: "tired",
            sounds: "CAN'T SAY DOUGH",
            picture:
              "You are so tired you can't say your own name. 'Can… sa… dough…' and you're asleep in the chair.",
            focusNote:
              "can-SA-do, soft d. A woman says 'cansada' — the ending agrees with the person, not the tiredness.",
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
        id: "palabras-10",
        title: "Your building and your street",
        phrases: [
          {
            id: "palabras-10-1",
            text: "el ascensor",
            translation: "the elevator",
            sounds: "ASCEND — SORE",
            picture:
              "The elevator ascends so fast your ears are sore by the fourth floor, and it does it every single morning.",
            focusNote:
              "as-then-SOR — that middle c is the Spain 'th'. Stress right at the end.",
          },
          {
            id: "palabras-10-2",
            text: "el portero",
            translation: "the doorman",
            sounds: "PORTER-o",
            picture:
              "The doorman is a hotel porter in a red hat who insists on carrying everything you own, including your coffee.",
            focusNote:
              "por-TE-ro, two tapped r's. Same 'port' as puerta — he is the door man, literally.",
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
          {
            id: "palabras-10-4",
            text: "la esquina",
            translation: "the corner",
            sounds: "a SKINNY one",
            picture:
              "A very skinny man is folded into the corner of the street, pointing at the bar you were looking for.",
            focusNote:
              "es-KI-na — 'qu' is k, u silent. Directions here are all corners: 'en la esquina'.",
          },
          {
            id: "palabras-10-5",
            text: "el barrio",
            translation: "the neighborhood",
            sounds: "BAR with an O",
            picture:
              "Your whole neighborhood is squeezed into one bar, and there is an enormous letter O hanging over the door.",
            focusNote:
              "BA-rryo — and this rr is the rolled one, the only one in the unit. English borrowed this word without the roll.",
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

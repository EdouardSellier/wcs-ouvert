const questions = [
  {
    id: "genre",
    type: "option",
    label: "Vous êtes :",
    possibilities: ["Un homme", "Une femme", "Je ne souhaite pas répondre"],
    index: "genre",
    number: 1,
    contentPDF: `Vous êtes :`,
    coordinateTitle: [90, 30],
    coordinateImg: [0, 35, -100, 40],
    indexImgPdf: 3,
    pageAdded: false
  },
  {
    id: "age",
    type: "option",
    label: "Vous avez :",
    possibilities: [
      "25 ans ou moins",
      "Entre 26 et 40 ans",
      "Entre 41 et 55 ans",
      "56 ans ou plus",
      "Je ne souhaite pas répondre"
    ],
    index: "age",
    number: 2,
    contentPDF: `Vous avez :`,
    coordinateTitle: [90, 95],
    coordinateImg: [0, 100, -100, 40],
    indexImgPdf: 6,
    pageAdded: false
  },
  {
    id: "principalTransport",
    type: "multipleOption",
    label:
      "Quel(s) mode(s) de déplacements utilisez-vous pour venir travailler ? Si vous utilisez plusieurs modes de déplacements au cours de votre trajet domicile-travail, veuillez les renseigner dans l’ordre d’importance qu’ils ont dans votre parcours (en termes de temps et de distance)",
    possibilities: [
      "Voiture personnelle",
      "Voiture de fonction/service",
      "Covoiturage",
      "Train",
      "Transports en commun (tramway, métro bus)",
      "Vélo",
      "Trottinette",
      "Gyropode",
      "Deux-roues motorisés",
      "Marche à pied"
    ],
    index: "principal_transport_",
    number: 3,
    contentPDF: `        Quels modes de déplacements utilisez-vous pour venir travailler ?
    Si vous utilisez plusieurs modes de déplacements au cours de votre trajet 
    domicile-travail, veuillez les renseigner dans l'ordre dimportance qu'ils ont 
        dans votre parcours (en termes de temps et de distance)`,
    coordinateTitle: [38, 165],
    coordinateImg: [25, 185, 150, 100],
    indexImgPdf: 18,
    pageAdded: true
  },
  {
    id: "ocasionalyTransport",
    type: "multipleOption",
    label:
      "Peut-être utilisez-vous occasionnellement d’autres modes de déplacements en fonction du jour de la semaine, de vos horaires, de la météo…",
    possibilities: [
      "Voiture personnelle",
      "Voiture de fonction/service",
      "Covoiturage",
      "Train",
      "Transports en commun (tramway, métro bus)",
      "Vélo",
      "Trottinette",
      "Gyropode",
      "Deux-roues motorisés",
      "Marche à pied"
    ],
    index: "ocasionaly_transport_",
    number: 4,
    contentPDF: `                Peut-être utilisez-vous occasionnellement d'autres modes 
    de déplacements en fonction du jour de la semaine,  de vos horaires,
                                                de la météo...`,
    coordinateTitle: [42, 15],
    coordinateImg: [25, 30, 150, 100],
    indexImgPdf: 19,
    pageAdded: false
  },
  {
    id: "reasonTransport",
    type: "option",
    label:
      "Quelle(s) raison(s) motive(nt) le choix de votre mode de déplacements principal ?",
    possibilities: [
      "Rapidité",
      "Pas d’autres choix",
      "Coût avantageux",
      "Pour ma santé, mon bien-être",
      "Moins stressant",
      "Plus écologique",
      "Adapté à mes horaires",
      "Sécurité",
      "Indépendance",
      "Autre raison"
    ],
    index: "reason_transport",
    number: 5,
    contentPDF: `Quelle(s) raison(s) motive(nt) le choix de votre mode de déplacements principal ? `,
    coordinateTitle: [42, 170],
    coordinateImg: [25, 180, 150, 100],
    indexImgPdf: 12,
    pageAdded: true
  },

  {
    id: "distanceKlm",
    type: "number",
    label: "Quelle distance (en km) parcourez-vous pour :",
    possibilities: [],
    index: "distance_klm",
    number: 6,
    contentPDF: `Quelle distance (en km) parcourez-vous pour :`,
    coordinateTitle: [64, 15],
    coordinateImg: [-58, 20, 320, 10],
    indexImgPdf: 0,
    pageAdded: false
  },
  {
    id: "distanceMin",
    type: "number",
    label: "Combien de temps (en minutes) mettez-vous pour :",
    possibilities: [],
    index: "distance_min",
    number: 7,
    contentPDF: `Combien de temps (en minutes) mettez-vous pour :`,
    coordinateTitle: [60, 50],
    coordinateImg: [-57, 55, 320, 10],
    indexImgPdf: 2,
    pageAdded: false
  },

  {
    id: "distanceMoney",
    type: "number",
    label: "Quel budget (en euros) dépensez-vous pour :",
    possibilities: [],
    index: "distance_money",
    number: 8,
    contentPDF: `Quel budget (en euros) dépensez-vous pour :`,
    coordinateTitle: [65, 85],
    coordinateImg: [-57, 90, 320, 10],
    indexImgPdf: 1,
    pageAdded: false
  },
  {
    id: "elements",
    type: "multipleOption",
    label:
      "Quels éléments prenez-vous en compte pour organiser vos déplacements domicile–travail ?",
    possibilities: [
      "Pas d’obligation particulière",
      "Accompagnement des enfants",
      "Horaires (début matinal, sortie tardive, imprévisibles…)",
      "Activités sur le temps de midi",
      "Déplacements professionnels fréquents",
      "Autre"
    ],
    index: "elements_",
    number: 9,
    contentPDF: `Quels éléments prenez-vous en compte pour organiser vos déplacements domicile-travail ?`,
    coordinateTitle: [35, 135],
    coordinateImg: [25, 150, 150, 100],
    indexImgPdf: 16,
    pageAdded: true
  },
  {
    id: "parkingPlace",
    type: "option",
    label:
      "Si vous vous rendez en voiture sur votre lieu de travail, y-trouvez-vous facilement une place de parking ?",
    possibilities: [
      "Oui",
      "Non",
      "Je ne me rends pas sur mon lieu de travail en voiture"
    ],
    index: "parking_place",
    number: 10,
    contentPDF: `Si vous vous rendez en voiture sur votre lieu de travail, y-trouvez-vous facilement une place de parking ?`,
    coordinateTitle: [25, 15],
    coordinateImg: [0, 22, -100, 40],
    indexImgPdf: 4,
    pageAdded: false
  },
  {
    id: "midday",
    type: "option",
    label: "Où déjeunez–vous le plus souvent le midi ?",
    possibilities: [
      "Sur mon lieu de travail dans le restaurant d’entreprise",
      "Sur mon lieu de travail avec mon propre repas",
      "A mon domicile",
      "A l’extérieur"
    ],
    index: "midday",
    number: 11,
    contentPDF: `Où déjeunez-vous le plus souvent le midi ?`,
    coordinateTitle: [65, 83],
    coordinateImg: [0, 90, -100, 40],
    indexImgPdf: 5,
    pageAdded: false
  },
  {
    id: "frequencyMidday",
    type: "option",
    label:
      "En moyenne, à quelle fréquence effectuez–vous des déplacements le midi ?",
    possibilities: [
      "Jamais",
      "Moins d’une fois par semaine",
      "1 fois par semaine",
      "2 à 4 fois par semaine",
      "Tous les jours"
    ],
    index: "frequency_midday",
    number: 12,
    contentPDF: `En moyenne, à quelle fréquence effectuez-vous des déplacements le midi ?`,
    coordinateTitle: [45, 152],
    coordinateImg: [0, 159, -100, 40],
    indexImgPdf: 7,
    pageAdded: false
  },
  {
    id: "transportMidday",
    type: "option",
    label:
      "Lorsque vous vous déplacez le midi, quel mode de transport utilisez-vous principalement ?",

    possibilities: [
      "Voiture personnelle",
      "Voiture de fonction/service",
      "Covoiturage",
      "Train",
      "Transports en commun (tramway, métro bus)",
      "Vélo",
      "Trottinette",
      "Gyropode",
      "Deux-roues motorisés",
      "Marche à pied"
    ],
    index: "transport_midday",
    number: 13,
    contentPDF: `Lorsque vous vous déplacez le midi, quel mode de transport utilisez-vous principalement ?`,
    coordinateTitle: [45, 220],
    coordinateImg: [0, 227, -100, 49],
    indexImgPdf: 13,
    pageAdded: true
  },
  {
    id: "frequencyPro",
    type: "option",
    label:
      "A quelle fréquence effectuez–vous des déplacements professionnels ?",

    possibilities: [
      "Je ne fais jamais de déplacements professionnels",
      "Quelques fois par an",
      "1 à 2 fois par mois",
      "1 à 2 fois par semaine",
      "Plus de 2 fois par semaine"
    ],
    index: "frequency_pro",
    number: 14
  },
  {
    id: "distancePro",
    type: "option",
    label:
      "A quelle distance (aller ou retour, en km) vous déplacez–vous en moyenne pour les déplacements professionnels ?",

    possibilities: [
      "Je ne fais jamais de déplacements professionnels",
      "Moins de 10 km",
      "Entre 10 et 30 km",
      "Entre 30 et 50 km",
      "Plus de 50 km"
    ],
    index: "distance_pro",
    number: 15
  },
  {
    id: "deplacementPro",
    type: "option",
    label:
      "Pour vos déplacements professionnels, quel mode de déplacements utilisez-vous principalement ?",
    possibilities: [
      "Voiture personnelle",
      "Voiture de fonction/service",
      "Covoiturage",
      "Train",
      "Transports en commun (tramway, métro bus)",
      "Vélo",
      "Trottinette",
      "Gyropode",
      "Deux-roues motorisés",
      "Marche à pied"
    ],
    index: "deplacement_pro",
    number: 16
  },
  {
    id: "reasonPersoCar",
    type: "option",
    label:
      "Si vous utilisez votre voiture personnelle pour des déplacements professionnels, pour quelle raison ?",
    possibilities: [
      "Pas d’autres solutions identifiées",
      "Confort",
      "Rapidité",
      "Flexibilité (si déplacement tôt ou tard)",
      "Aucune raison particulière",
      "Je n’utilise pas ma voiture personnelle pour les déplacements professionnels"
    ],
    index: "reason_perso_car",
    number: 17
  },
  {
    id: "deplacementMethodPro",
    type: "option",
    label:
      "Parmi les affirmations ci-dessous, laquelle correspond le plus à la manière dont vous vous déplacez pour vous rendre sur votre lieu de travail ?",
    possibilities: [
      "J’utilise quotidiennement un mode de déplacements alternatif à la voiture individuelle",
      "Je connais des alternatives à la voiture individuelle, j’essaye de les utiliser lorsque c’est possible et j’envisage de les utiliser davantage",
      "Je connais des alternatives à la voiture individuelle mais je ne les ai pas encore mises en pratique",
      "Je ne connais pas suffisamment les différentes possibilités de me rendre au travail sans voiture",
      "Mes contraintes (logement, obligations familiales…) ne me permettent pas d’utiliser un autre mode de déplacement que la voiture",
      "Je n’ai pas envie de changer mes habitudes de déplacements"
    ],
    index: "deplacement_method_pro",
    number: 18
  },
  {
    id: "communTransport",
    type: "multipleOption",
    label:
      "Parmi ces propositions, lesquelles vous inciteraient à utiliser davantage les transports en commun ?",
    possibilities: [
      "J’utilise déjà souvent les transports en commun",
      "Une meilleure offre de transports en commun",
      "Un meilleur sentiment de sécurité",
      "Un abonnement à une offre de transports en commun moins onéreuse",
      "Autre"
    ],
    index: "commun_transport_",
    number: 19
  },
  {
    id: "bike",
    type: "multipleOption",
    label:
      "Parmi ces mesures, lesquelles vous inciteraient à utiliser davantage le vélo ?",
    possibilities: [
      "Je me déplace déjà souvent à vélo",
      "Un meilleur sentiment de sécurité",
      "Des aménagements cyclables plus nombreux sur mon trajet",
      "Des aménagements cyclables de meilleure qualité sur mon trajet",
      "La mise à disposition d’informations sur les pistes cyclables",
      "La mise en place de l’indemnité kilométrique vélo",
      "Un stationnement vélo sécurisé et abrité",
      "Des douches et des vestiaires",
      "Autre",
      "Rien, je ne souhaite pas pédaler"
    ],
    index: "bike_",
    number: 20
  },
  {
    id: "carpooling",
    type: "multipleOption",
    label:
      "Parmi ces mesures, lesquelles vous inciteraient davantage à covoiturer ?",
    possibilities: [
      "Je covoiture déjà souvent",
      "Une place de parking dédiée aux covoitureurs à proximité de l’entrée",
      "Une mise en relation avec les collègues habitant à proximité de chez moi",
      "Un retour assuré en cas de désistement du covoitureur ou autre",
      "Autre",
      "Rien, je ne souhaite pas covoiturer "
    ],
    index: "carpooling_",
    number: 21
  },
  {
    id: "otherThanCar",
    type: "text",
    label:
      "Avez–vous une ou des idée(s) de modes de déplacements alternatifs à la voiture individuelle qui conviendrai(en)t à votre situation ?",
    possibilities: [],
    index: "other_than_car",
    number: 22
  },
  {
    id: "commentary",
    type: "text",
    label:
      "Si vous avez des commentaires ou remarques éventuelles, n’hésitez pas à nous en faire part !",
    possibilities: [],
    index: "commentary",
    number: 23
  }
];

export default questions;

// Tout le texte du site, dans les trois langues.
// Les trois langues doivent garder la même structure.
const MESSAGES = {
  "fr": {
    "meta": {
      "title": "Victorien Thomas, ingénieur aérospatial",
      "description": "Étudiant ingénieur en double diplôme IPSA et UPC. Simulation de systèmes spatiaux et communications optiques par satellite."
    },
    "nav": {
      "projects": "Projets",
      "path": "Parcours",
      "skills": "Compétences",
      "contact": "Contact",
      "language": "Langue"
    },
    "hero": {
      "role": "Étudiant ingénieur aérospatial, IPSA et UPC",
      "lead": "Je simule des systèmes spatiaux, de la propagation d'un faisceau laser dans l'atmosphère à la modélisation 3D d'engins spatiaux.",
      "cv": "Télécharger mon CV",
      "contact": "Me contacter",
      "photoAlt": "Portrait de Victorien Thomas"
    },
    "path": {
      "title": "Parcours",
      "work": "Expérience",
      "study": "Formation",
      "items": [
        {
          "period": "2026 – 2027",
          "type": "study",
          "title": "Master in Space and Aeronautical Engineering (MASE)",
          "org": "UPC, ESEIAAT, Terrassa",
          "logo": "images/logos/upc.png",
          "short": "UPC",
          "text": "Double diplôme avec l'IPSA. Propulsion spatiale, matériaux composites, astrodynamique, conception de satellites et de sous-systèmes."
        },
        {
          "period": "2026",
          "type": "work",
          "title": "Stage de recherche",
          "org": "NCSR « Demokritos », Athènes",
          "logo": "images/logos/ncsr.jpg",
          "short": "NCSR",
          "text": "Simulation de liaisons optiques sol-satellite."
        },
        {
          "period": "2025",
          "type": "study",
          "title": "Semestre d'échange",
          "org": "Universidad EIA, Medellín, Colombie",
          "logo": "images/logos/eia.png",
          "short": "EIA",
          "text": "Semestre d'échange avec l'IPSA (juillet à novembre 2025)."
        },
        {
          "period": "2023 – 2026",
          "type": "work",
          "title": "Trésorier, chef du pôle modélisation et design",
          "org": "IPSA F1, association étudiante",
          "logo": "images/logos/ipsaf1.jpg",
          "short": "F1",
          "text": "Gestion du budget, direction du pôle modélisation et design du simulateur, puis montage du châssis prototype au pôle construction."
        },
        {
          "period": "2024",
          "type": "work",
          "title": "Stage ingénieur",
          "org": "ESA",
          "logo": "images/logos/esa.png",
          "short": "ESA",
          "text": "Modélisation 3D d'un satellite et de l'Orbital Propellant Depot."
        },
        {
          "period": "2023",
          "type": "work",
          "title": "Job étudiant",
          "org": "Schneider Electric",
          "logo": "images/logos/se.png",
          "short": "SE",
          "text": "Travail en équipe sur site industriel, processus qualité."
        },
        {
          "period": "2022 – 2027",
          "type": "study",
          "title": "Diplôme d'ingénieur aéronautique et spatial",
          "org": "IPSA, Paris",
          "logo": "images/logos/ipsa.png",
          "short": "IPSA",
          "text": "Spécialisation Systèmes Spatiaux : mécanique spatiale, conception de mission, instrumentation spatiale, astrophysique, physique des plasmas."
        },
        {
          "period": "2019 – 2022",
          "type": "study",
          "title": "Baccalauréat général, maths et physique",
          "org": "Lycée Lamartine",
          "logo": "images/logos/lam.jpg",
          "short": "LL",
          "text": ""
        },
        {
          "period": "2019",
          "type": "work",
          "title": "Stage",
          "org": "Météo-France",
          "logo": "images/logos/MF.png",
          "short": "MF",
          "text": "Découverte de la chaîne de prévision météorologique."
        }
      ],
      "all": "Tout"
    },
    "projects": {
      "title": "Projets",
      "items": [
        {
          "title": "Orbital Propellant Depot",
          "context": "ESA, 2024",
          "image": "images/esa.png",
          "text": "Modélisation 3D d'un dépôt de carburant en orbite, destiné à ravitailler des véhicules spatiaux pour prolonger leurs missions. Conception détaillée, puis rendus et textures sous Blender pour illustrer plusieurs scénarios d'utilisation.",
          "tools": [
            "Catia",
            "Blender"
          ],
          "category": "internship",
          "logo": "images/logos/esa.png"
        },
        {
          "title": "Atterrissage vertical d'un microlanceur réutilisable",
          "context": "IPSA et CNES, 2026",
          "image": "images/launch.png",
          "text": "Éco-conception du système d'atterrissage de SIRIUS 2, un microlanceur réutilisable qui doit se poser 20 fois sur une barge au large de Kourou. Notre solution associe des pétales de freinage aérodynamique à quatre jambes déployables, validées par une simulation par éléments finis et une analyse du cycle de vie.",
          "tools": [],
          "category": "academic",
          "logo": "images/logos/cnes.png"
        },
        {
          "title": "Classification d'images satellite",
          "context": "IPSA, 2025",
          "image": "images/resnet.jpg",
          "text": "ResNet pré-entraîné, affiné sur 27 000 images satellite Sentinel-2 (EuroSAT) pour classer l'occupation des sols en 10 catégories, avec augmentation de données. 96,9 % de bonnes classifications sur 5 400 images de test.",
          "tools": [
            "Python",
            "ResNet"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "Mission de la Terre à Neptune",
          "context": "IPSA, 2026",
          "image": "images/neptune.png",
          "text": "Conception d'une mission vers Neptune avec une assistance gravitationnelle de Jupiter. Trajectoire calculée analytiquement (coniques raccordées), puis simulée sous STK/Astrogator. Lancement en 2031, arrivée en 2040 après environ 9 ans de vol.",
          "tools": [
            "STK",
            "Astrogator"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "Simulateur IPSA F1",
          "context": "IPSA F1, association étudiante, 2023-2026",
          "image": "images/f1.png",
          "text": "Prototype de simulateur de Formule 1. Réalisation du design du simulateur et montage de l'ensemble du châssis prototype. Trésorier de l'association, j'ai dirigé le pôle modélisation et design avant de rejoindre le pôle construction.",
          "tools": [
            "Catia",
            "Blender",
            "RDM"
          ],
          "category": "personal",
          "logo": "images/logos/ipsaf1.jpg"
        },
        {
          "title": "Stabilisation d'un pendule inversé (Segway)",
          "context": "IPSA, 2026",
          "text": "Modélisation non linéaire d'un Segway, puis linéarisation autour de l'équilibre vertical. Conception et comparaison de deux lois de commande en simulation : PID en cascade (stabilisation de l'angle et suivi de position, avec saturation et anti-windup) et retour d'état par placement de pôles.",
          "image": "images/pendule.png",
          "tools": [
            "MATLAB",
            "Simulink"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        }
      ],
      "filter": "Filtrer",
      "featured": {
        "category": "internship",
        "title": "Propagation d'un faisceau laser dans l'atmosphère",
        "context": "Stage de recherche, NCSR « Demokritos », Athènes, Grèce, 2026",
        "image": "images/sat.png",
        "paragraphs": [
          "Quand un laser traverse l'atmosphère, il est diffusé, absorbé et déformé par la turbulence. Seule une partie de la puissance émise atteint la cible. J'ai simulé ces effets pour sept longueurs d'onde, de l'UV (360 nm) au laser CO₂ (10,6 µm), sur 1 km, 6 km et jusqu'à 100 km d'altitude, afin de déterminer le laser le plus adapté aux télécommunications optiques et à l'échauffement d'une cible à distance."
        ],
        "pointsTitle": "Ce que j'ai modélisé",
        "points": [
          "Diffusion Rayleigh et Mie, effet de la pluie",
          "Absorption moléculaire (base HITRAN)",
          "Turbulence : dérive et élargissement du faisceau, 4 modèles de Cn² dont Hufnagel-Valley",
          "Blooming thermique, faisceau focalisé ou collimaté",
          "Échauffement et fusion de matériaux"
        ],
        "tools": [
          "Python",
          "HITRAN (HAPI)",
          "ISA"
        ],
        "logo": "images/logos/ncsr.jpg"
      },
      "categories": {
        "all": "Tout",
        "internship": "Stages",
        "academic": "Projets académiques",
        "personal": "Personnel et associatif"
      }
    },
    "skills": {
      "title": "Compétences",
      "groups": [
        {
          "name": "Simulation et calcul",
          "items": [
            "Python",
            "MATLAB/Simulink"
          ]
        },
        {
          "name": "Mécanique spatiale",
          "items": [
            "STK/Astrogator",
            "Trajectoires interplanétaires"
          ]
        },
        {
          "name": "Optique atmosphérique",
          "items": [
            "Propagation laser",
            "Modèles de turbulence"
          ]
        },
        {
          "name": "Automatique",
          "items": [
            "PID discret",
            "Représentation d'état",
            "Placement de pôles",
            "Filtre de Kalman"
          ]
        },
        {
          "name": "Systèmes embarqués",
          "items": [
            "C/C++",
            "VHDL/FPGA",
            "Arduino"
          ]
        },
        {
          "name": "Structures et conception",
          "items": [
            "Catia",
            "Creo",
            "Blender",
            "RDM"
          ]
        },
        {
          "name": "Machine learning",
          "items": [
            "ResNet",
            "Classification d'images"
          ]
        }
      ],
      "languagesTitle": "Langues",
      "languages": [
        {
          "name": "Français",
          "level": "Langue maternelle"
        },
        {
          "name": "Anglais",
          "level": "B2, TOEIC 830"
        },
        {
          "name": "Espagnol",
          "level": "B2"
        }
      ]
    },
    "phd": {
      "title": "Ce que je cherche",
      "heading": "Une thèse dans le spatial, après mon master",
      "text": "Je termine mon master en 2027 et je cherche un sujet de thèse dans le spatial ; je suis disponible à partir de juillet 2027. J'ai travaillé sur des sujets variés (communications optiques, mécanique orbitale, propulsion, matériaux composites, GNC, systèmes embarqués) et je suis ouvert à tous types de sujets, théoriques comme appliqués, même si j'apprécierais d'y trouver une part de pratique. Si vous encadrez ou connaissez un sujet, n'hésitez pas à m'écrire.",
      "cta": "M'écrire"
    },
    "contact": {
      "title": "Contact",
      "text": "Je réponds en français, en anglais ou en espagnol.",
      "email": "E-mail",
      "phone": "Téléphone",
      "linkedin": "LinkedIn",
      "copy": "Copier l'adresse",
      "copied": "Adresse copiée",
      "heading": "Un sujet de thèse, une question ? Écrivez-moi."
    },
    "footer": "Victorien Thomas"
  },
  "en": {
    "meta": {
      "title": "Victorien Thomas, aerospace engineer",
      "description": "Aerospace engineering student on a double degree between IPSA and UPC. Space systems simulation and satellite optical communications."
    },
    "nav": {
      "projects": "Projects",
      "path": "Background",
      "skills": "Skills",
      "contact": "Contact",
      "language": "Language"
    },
    "hero": {
      "role": "Aerospace engineering student, IPSA and UPC",
      "lead": "I simulate space systems, from laser beam propagation through the atmosphere to 3D modelling of spacecraft.",
      "cv": "Download my CV",
      "contact": "Get in touch",
      "photoAlt": "Portrait of Victorien Thomas"
    },
    "path": {
      "title": "Background",
      "work": "Experience",
      "study": "Education",
      "items": [
        {
          "period": "2026 – 2027",
          "type": "study",
          "title": "Master in Space and Aeronautical Engineering (MASE)",
          "org": "UPC, ESEIAAT, Terrassa",
          "logo": "images/logos/upc.png",
          "short": "UPC",
          "text": "Double degree with IPSA. Space propulsion, composite materials, astrodynamics, spacecraft and subsystem design."
        },
        {
          "period": "2026",
          "type": "work",
          "title": "Research intern",
          "org": "NCSR \"Demokritos\", Athens",
          "logo": "images/logos/ncsr.jpg",
          "short": "NCSR",
          "text": "Simulation of ground-to-satellite optical links."
        },
        {
          "period": "2025",
          "type": "study",
          "title": "Exchange semester",
          "org": "Universidad EIA, Medellín, Colombia",
          "logo": "images/logos/eia.png",
          "short": "EIA",
          "text": "Exchange semester with IPSA (July to November 2025)."
        },
        {
          "period": "2023 – 2026",
          "type": "work",
          "title": "Treasurer, head of the modelling and design team",
          "org": "IPSA F1, student association",
          "logo": "images/logos/ipsaf1.jpg",
          "short": "F1",
          "text": "Budget management, led the simulator's modelling and design team, then assembled the prototype chassis in the construction team."
        },
        {
          "period": "2024",
          "type": "work",
          "title": "Engineering intern",
          "org": "ESA",
          "logo": "images/logos/esa.png",
          "short": "ESA",
          "text": "3D modelling of a satellite and the Orbital Propellant Depot."
        },
        {
          "period": "2023",
          "type": "work",
          "title": "Student job",
          "org": "Schneider Electric",
          "logo": "images/logos/se.png",
          "short": "SE",
          "text": "Teamwork on an industrial site, quality processes."
        },
        {
          "period": "2022 – 2027",
          "type": "study",
          "title": "Aerospace engineering degree",
          "org": "IPSA, Paris",
          "logo": "images/logos/ipsa.png",
          "short": "IPSA",
          "text": "Space Systems track: space mechanics, mission design, space instrumentation, astrophysics, plasma physics."
        },
        {
          "period": "2019 – 2022",
          "type": "study",
          "title": "French Baccalaureate, maths and physics",
          "org": "Lycée Lamartine",
          "logo": "images/logos/lam.jpg",
          "short": "LL",
          "text": ""
        },
        {
          "period": "2019",
          "type": "work",
          "title": "Internship",
          "org": "Météo-France",
          "logo": "images/logos/MF.png",
          "short": "MF",
          "text": "Introduction to the weather forecasting chain."
        }
      ],
      "all": "All"
    },
    "projects": {
      "title": "Projects",
      "items": [
        {
          "title": "Orbital Propellant Depot",
          "context": "ESA, 2024",
          "image": "images/esa.png",
          "text": "3D model of an in-orbit propellant depot, designed to refuel spacecraft and extend their missions. Detailed design, then renders and textures in Blender to illustrate several use scenarios.",
          "tools": [
            "Catia",
            "Blender"
          ],
          "category": "internship",
          "logo": "images/logos/esa.png"
        },
        {
          "title": "Vertical landing of a reusable microlauncher",
          "context": "IPSA and CNES, 2026",
          "image": "images/launch.png",
          "text": "Eco-design of the landing system for SIRIUS 2, a reusable microlauncher that must land 20 times on a barge off Kourou. Our solution combines aerodynamic braking petals with four deployable legs, validated by finite element simulation and a life cycle assessment.",
          "tools": [],
          "category": "academic",
          "logo": "images/logos/cnes.png"
        },
        {
          "title": "Satellite image classification",
          "context": "IPSA, 2025",
          "image": "images/resnet.jpg",
          "text": "Pre-trained ResNet, fine-tuned on 27,000 Sentinel-2 satellite images (EuroSAT) to classify land use into 10 classes, with data augmentation. 96.9% accuracy on 5,400 test images.",
          "tools": [
            "Python",
            "ResNet"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "Earth-to-Neptune mission",
          "context": "IPSA, 2026",
          "image": "images/neptune.png",
          "text": "Design of a mission to Neptune with a Jupiter gravity assist. Trajectory computed analytically (patched conics), then simulated in STK/Astrogator. Launch in 2031, arrival in 2040 after about 9 years of flight.",
          "tools": [
            "STK",
            "Astrogator"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "IPSA F1 simulator",
          "context": "IPSA F1, student association, 2023-2026",
          "image": "images/f1.png",
          "text": "Formula 1 simulator prototype. Designed the simulator and assembled the entire prototype chassis. As the association's treasurer, I led the modelling and design team before joining the construction team.",
          "tools": [
            "Catia",
            "Blender",
            "RDM"
          ],
          "category": "personal",
          "logo": "images/logos/ipsaf1.jpg"
        },
        {
          "title": "Stabilising an inverted pendulum (Segway)",
          "context": "IPSA, 2026",
          "text": "Nonlinear modelling of a Segway, then linearisation around the upright equilibrium. Design and comparison of two control laws in simulation: cascade PID (angle stabilisation and position tracking, with saturation and anti-windup) and state feedback by pole placement.",
          "image": "images/pendule.png",
          "tools": [
            "MATLAB",
            "Simulink"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        }
      ],
      "filter": "Filter",
      "featured": {
        "category": "internship",
        "title": "Laser beam propagation through the atmosphere",
        "context": "Research internship, NCSR \"Demokritos\", Athens, Greece, 2026",
        "image": "images/sat.png",
        "paragraphs": [
          "When a laser travels through the atmosphere, it is scattered, absorbed and distorted by turbulence. Only part of the emitted power reaches the target. I simulated these effects for seven wavelengths, from UV (360 nm) to the CO₂ laser (10.6 µm), over 1 km, 6 km and up to 100 km altitude, to determine which laser is best suited to optical telecommunications and to heating a distant target."
        ],
        "pointsTitle": "What I modelled",
        "points": [
          "Rayleigh and Mie scattering, effect of rain",
          "Molecular absorption (HITRAN database)",
          "Turbulence: beam wander and spreading, 4 Cn² models including Hufnagel-Valley",
          "Thermal blooming, focused vs collimated beam",
          "Heating and melting of materials"
        ],
        "tools": [
          "Python",
          "HITRAN (HAPI)",
          "ISA"
        ],
        "logo": "images/logos/ncsr.jpg"
      },
      "categories": {
        "all": "All",
        "internship": "Internships",
        "academic": "Academic projects",
        "personal": "Personal and club"
      }
    },
    "skills": {
      "title": "Skills",
      "groups": [
        {
          "name": "Simulation and computing",
          "items": [
            "Python",
            "MATLAB/Simulink"
          ]
        },
        {
          "name": "Space mechanics",
          "items": [
            "STK/Astrogator",
            "Interplanetary trajectories"
          ]
        },
        {
          "name": "Atmospheric optics",
          "items": [
            "Laser propagation",
            "Turbulence models"
          ]
        },
        {
          "name": "Control",
          "items": [
            "Discrete PID",
            "State-space",
            "Pole placement",
            "Kalman filter"
          ]
        },
        {
          "name": "Embedded systems",
          "items": [
            "C/C++",
            "VHDL/FPGA",
            "Arduino"
          ]
        },
        {
          "name": "Structures and design",
          "items": [
            "Catia",
            "Creo",
            "Blender",
            "Strength of materials"
          ]
        },
        {
          "name": "Machine learning",
          "items": [
            "ResNet",
            "Image classification"
          ]
        }
      ],
      "languagesTitle": "Languages",
      "languages": [
        {
          "name": "French",
          "level": "Native"
        },
        {
          "name": "English",
          "level": "B2, TOEIC 830"
        },
        {
          "name": "Spanish",
          "level": "B2"
        }
      ]
    },
    "phd": {
      "title": "What I'm looking for",
      "heading": "A PhD in the space sector, after my master's",
      "text": "I finish my master's in 2027 and I'm looking for a PhD topic in the space sector; I'm available from July 2027. I've worked on a wide range of subjects (optical communications, orbital mechanics, propulsion, composite materials, GNC, embedded systems) and I'm open to all kinds of topics, theoretical or applied, though I'd welcome some hands-on work. If you supervise or know of a topic, feel free to get in touch.",
      "cta": "Write to me"
    },
    "contact": {
      "title": "Contact",
      "text": "I reply in French, English or Spanish.",
      "email": "Email",
      "phone": "Phone",
      "linkedin": "LinkedIn",
      "copy": "Copy address",
      "copied": "Address copied",
      "heading": "A PhD topic or a question? Write to me."
    },
    "footer": "Victorien Thomas"
  },
  "es": {
    "meta": {
      "title": "Victorien Thomas, ingeniero aeroespacial",
      "description": "Estudiante de ingeniería aeroespacial en doble titulación entre IPSA y la UPC. Simulación de sistemas espaciales y comunicaciones ópticas por satélite."
    },
    "nav": {
      "projects": "Proyectos",
      "path": "Trayectoria",
      "skills": "Competencias",
      "contact": "Contacto",
      "language": "Idioma"
    },
    "hero": {
      "role": "Estudiante de ingeniería aeroespacial, IPSA y UPC",
      "lead": "Simulo sistemas espaciales, desde la propagación de un haz láser en la atmósfera hasta el modelado 3D de vehículos espaciales.",
      "cv": "Descargar mi CV",
      "contact": "Contactar",
      "photoAlt": "Retrato de Victorien Thomas"
    },
    "path": {
      "title": "Trayectoria",
      "work": "Experiencia",
      "study": "Formación",
      "items": [
        {
          "period": "2026 – 2027",
          "type": "study",
          "title": "Master in Space and Aeronautical Engineering (MASE)",
          "org": "UPC, ESEIAAT, Terrassa",
          "logo": "images/logos/upc.png",
          "short": "UPC",
          "text": "Doble titulación con IPSA. Propulsión espacial, materiales compuestos, astrodinámica, diseño de vehículos espaciales y subsistemas."
        },
        {
          "period": "2026",
          "type": "work",
          "title": "Prácticas de investigación",
          "org": "NCSR «Demokritos», Atenas",
          "logo": "images/logos/ncsr.jpg",
          "short": "NCSR",
          "text": "Simulación de enlaces ópticos tierra-satélite."
        },
        {
          "period": "2025",
          "type": "study",
          "title": "Semestre de intercambio",
          "org": "Universidad EIA, Medellín, Colombia",
          "logo": "images/logos/eia.png",
          "short": "EIA",
          "text": "Semestre de intercambio con IPSA (de julio a noviembre de 2025)."
        },
        {
          "period": "2023 – 2026",
          "type": "work",
          "title": "Tesorero, jefe del área de modelado y diseño",
          "org": "IPSA F1, asociación estudiantil",
          "logo": "images/logos/ipsaf1.jpg",
          "short": "F1",
          "text": "Gestión del presupuesto, dirección del área de modelado y diseño del simulador y, después, montaje del chasis prototipo en el área de construcción."
        },
        {
          "period": "2024",
          "type": "work",
          "title": "Prácticas de ingeniería",
          "org": "ESA",
          "logo": "images/logos/esa.png",
          "short": "ESA",
          "text": "Modelado 3D de un satélite y del Orbital Propellant Depot."
        },
        {
          "period": "2023",
          "type": "work",
          "title": "Trabajo de estudiante",
          "org": "Schneider Electric",
          "logo": "images/logos/se.png",
          "short": "SE",
          "text": "Trabajo en equipo en un entorno industrial, procesos de calidad."
        },
        {
          "period": "2022 – 2027",
          "type": "study",
          "title": "Título de ingeniero aeronáutico y espacial",
          "org": "IPSA, París",
          "logo": "images/logos/ipsa.png",
          "short": "IPSA",
          "text": "Especialidad Sistemas Espaciales: mecánica espacial, diseño de misiones, instrumentación espacial, astrofísica, física de plasmas."
        },
        {
          "period": "2019 – 2022",
          "type": "study",
          "title": "Bachillerato francés, matemáticas y física",
          "org": "Lycée Lamartine",
          "logo": "images/logos/lam.jpg",
          "short": "LL",
          "text": ""
        },
        {
          "period": "2019",
          "type": "work",
          "title": "Prácticas",
          "org": "Météo-France",
          "logo": "images/logos/MF.png",
          "short": "MF",
          "text": "Introducción a la cadena de predicción meteorológica."
        }
      ],
      "all": "Todo"
    },
    "projects": {
      "title": "Proyectos",
      "items": [
        {
          "title": "Orbital Propellant Depot",
          "context": "ESA, 2024",
          "image": "images/esa.png",
          "text": "Modelado 3D de un depósito de combustible en órbita, destinado a repostar vehículos espaciales para prolongar sus misiones. Diseño detallado, después renderizado y texturas en Blender para ilustrar varios escenarios de uso.",
          "tools": [
            "Catia",
            "Blender"
          ],
          "category": "internship",
          "logo": "images/logos/esa.png"
        },
        {
          "title": "Aterrizaje vertical de un microlanzador reutilizable",
          "context": "IPSA y CNES, 2026",
          "image": "images/launch.png",
          "text": "Ecodiseño del sistema de aterrizaje de SIRIUS 2, un microlanzador reutilizable que debe posarse 20 veces en una barcaza frente a Kourou. Nuestra solución combina pétalos de frenado aerodinámico con cuatro patas desplegables, validadas mediante una simulación por elementos finitos y un análisis del ciclo de vida.",
          "tools": [],
          "category": "academic",
          "logo": "images/logos/cnes.png"
        },
        {
          "title": "Clasificación de imágenes de satélite",
          "context": "IPSA, 2025",
          "image": "images/resnet.jpg",
          "text": "ResNet preentrenada, ajustada con 27 000 imágenes satelitales Sentinel-2 (EuroSAT) para clasificar el uso del suelo en 10 categorías, con aumento de datos. 96,9 % de aciertos en 5400 imágenes de prueba.",
          "tools": [
            "Python",
            "ResNet"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "Misión de la Tierra a Neptuno",
          "context": "IPSA, 2026",
          "image": "images/neptune.png",
          "text": "Diseño de una misión a Neptuno con una asistencia gravitatoria de Júpiter. Trayectoria calculada analíticamente (cónicas empalmadas) y después simulada en STK/Astrogator. Lanzamiento en 2031, llegada en 2040 tras unos 9 años de vuelo.",
          "tools": [
            "STK",
            "Astrogator"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        },
        {
          "title": "Simulador IPSA F1",
          "context": "IPSA F1, asociación estudiantil, 2023-2026",
          "image": "images/f1.png",
          "text": "Prototipo de simulador de Fórmula 1. Diseño del simulador y montaje de todo el chasis prototipo. Como tesorero de la asociación, dirigí el área de modelado y diseño antes de unirme al área de construcción.",
          "tools": [
            "Catia",
            "Blender",
            "RDM"
          ],
          "category": "personal",
          "logo": "images/logos/ipsaf1.jpg"
        },
        {
          "title": "Estabilización de un péndulo invertido (Segway)",
          "context": "IPSA, 2026",
          "text": "Modelado no lineal de un Segway y linealización en torno al equilibrio vertical. Diseño y comparación de dos leyes de control en simulación: PID en cascada (estabilización del ángulo y seguimiento de posición, con saturación y anti-windup) y realimentación de estado por asignación de polos.",
          "image": "images/pendule.png",
          "tools": [
            "MATLAB",
            "Simulink"
          ],
          "category": "academic",
          "logo": "images/logos/ipsa.png"
        }
      ],
      "filter": "Filtrar",
      "featured": {
        "category": "internship",
        "title": "Propagación de un haz láser en la atmósfera",
        "context": "Prácticas de investigación, NCSR «Demokritos», Atenas, Grecia, 2026",
        "image": "images/sat.png",
        "paragraphs": [
          "Cuando un láser atraviesa la atmósfera, se dispersa, se absorbe y la turbulencia lo deforma. Solo una parte de la potencia emitida llega al objetivo. Simulé estos efectos para siete longitudes de onda, del UV (360 nm) al láser de CO₂ (10,6 µm), a 1 km, 6 km y hasta 100 km de altitud, para determinar el láser más adecuado para las telecomunicaciones ópticas y para calentar un objetivo a distancia."
        ],
        "pointsTitle": "Lo que modelicé",
        "points": [
          "Dispersión de Rayleigh y de Mie, efecto de la lluvia",
          "Absorción molecular (base HITRAN)",
          "Turbulencia: deriva y ensanchamiento del haz, 4 modelos de Cn² entre ellos Hufnagel-Valley",
          "Blooming térmico, haz enfocado o colimado",
          "Calentamiento y fusión de materiales"
        ],
        "tools": [
          "Python",
          "HITRAN (HAPI)",
          "ISA"
        ],
        "logo": "images/logos/ncsr.jpg"
      },
      "categories": {
        "all": "Todo",
        "internship": "Prácticas",
        "academic": "Proyectos académicos",
        "personal": "Personal y asociativo"
      }
    },
    "skills": {
      "title": "Competencias",
      "groups": [
        {
          "name": "Simulación y cálculo",
          "items": [
            "Python",
            "MATLAB/Simulink"
          ]
        },
        {
          "name": "Mecánica espacial",
          "items": [
            "STK/Astrogator",
            "Trayectorias interplanetarias"
          ]
        },
        {
          "name": "Óptica atmosférica",
          "items": [
            "Propagación láser",
            "Modelos de turbulencia"
          ]
        },
        {
          "name": "Control automático",
          "items": [
            "PID discreto",
            "Espacio de estados",
            "Asignación de polos",
            "Filtro de Kalman"
          ]
        },
        {
          "name": "Sistemas embarcados",
          "items": [
            "C/C++",
            "VHDL/FPGA",
            "Arduino"
          ]
        },
        {
          "name": "Estructuras y diseño",
          "items": [
            "Catia",
            "Creo",
            "Blender",
            "Resistencia de materiales"
          ]
        },
        {
          "name": "Machine learning",
          "items": [
            "ResNet",
            "Clasificación de imágenes"
          ]
        }
      ],
      "languagesTitle": "Idiomas",
      "languages": [
        {
          "name": "Francés",
          "level": "Nativo"
        },
        {
          "name": "Inglés",
          "level": "B2, TOEIC 830"
        },
        {
          "name": "Español",
          "level": "B2"
        }
      ]
    },
    "phd": {
      "title": "Lo que busco",
      "heading": "Un doctorado en el sector espacial, después de mi máster",
      "text": "Termino mi máster en 2027 y busco un tema de doctorado en el sector espacial; estoy disponible a partir de julio de 2027. He trabajado en temas variados (comunicaciones ópticas, mecánica orbital, propulsión, materiales compuestos, GNC, sistemas embarcados) y estoy abierto a todo tipo de temas, teóricos o aplicados, aunque me gustaría que incluyeran una parte práctica. Si dirige o conoce un tema, no dude en escribirme.",
      "cta": "Escribirme"
    },
    "contact": {
      "title": "Contacto",
      "text": "Respondo en francés, inglés o español.",
      "email": "Correo",
      "phone": "Teléfono",
      "linkedin": "LinkedIn",
      "copy": "Copiar dirección",
      "copied": "Dirección copiada",
      "heading": "¿Un tema de doctorado o una pregunta? Escríbame."
    },
    "footer": "Victorien Thomas"
  }
};

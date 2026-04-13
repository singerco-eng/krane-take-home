export const PROJECT = {
  name: "Griffin Hospital — Emergency Generator & Distribution Upgrades",
  location: "130 Division Street, Derby, CT",
  phase: "Phase 2",
  specDate: "May 10, 2024",
  specDocument: "griffin-hospital-generator-upgrades.pdf",
  revisionDate: "July 15, 2024",
  revisionNote: "Addendum #2 — scope clarification, equipment rating changes"
};

export const PROCUREMENT_LOG = [
  {
    id: 1,
    specSection: "263213",
    description: "1250kW Diesel Engine Generator Set (GEN-2)",
    basisOfDesign:
      "Caterpillar, Kohler, or Cummins — 1250kW, 480V/277V, 3-phase 4-wire, turbocharged, Class 96 NFPA 110 Level 1",
    leadTimeWeeks: "52-78",
    riskTier: "CRITICAL",
    flags: [
      "Factory testing required",
      "Seismic certification required",
      "NFPA 110 Level 1 compliance",
      "Submittal-intensive",
      "Extended warranty"
    ],
    urgencyRank: 1,
    actionTimeframe: "ACT_NOW"
  },
  {
    id: 2,
    specSection: "262400",
    description: "Essential Distribution Switchboard (EQESBB)",
    basisOfDesign:
      "Square D Power-Style QED or ABB/Eaton equivalent, Seismic Design Category D",
    leadTimeWeeks: "40-60",
    riskTier: "CRITICAL",
    flags: [
      "Owner-furnished equipment",
      "Seismic certification required",
      "Coordination study required"
    ],
    urgencyRank: 2,
    actionTimeframe: "ACT_NOW"
  },
  // CHANGED: ATS-GEN rating increased from 2000A to 2500A per Addendum #2
  {
    id: 3,
    specSection: "263600",
    description: "Automatic Transfer Switches (ATS-GEN + 5 others)",
    basisOfDesign:
      "ASCO 7000 Series or Russelectric RTS-03 — ATS-GEN rated 2500A (increased from 2000A per Addendum #2); all procured by Griffin Healthcare",
    leadTimeWeeks: "30-52",
    riskTier: "LONG_LEAD",
    flags: [
      "Owner-furnished equipment",
      "Coordination study required"
    ],
    urgencyRank: 3,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 4,
    specSection: "231113",
    description: "Fuel Oil Piping and Transfer System",
    basisOfDesign:
      "New fuel maintenance system, transfer pumps, day tanks for GEN-1 and GEN-2; connects to Phase 1 fuel supply piping",
    leadTimeWeeks: "20-36",
    riskTier: "LONG_LEAD",
    flags: [
      "Submittal-intensive",
      "Factory testing required"
    ],
    urgencyRank: 4,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 5,
    specSection: "230940",
    description: "HVAC Instrumentation and Controls",
    basisOfDesign:
      "DDC controls for generator room ventilation, BMS integration",
    leadTimeWeeks: "20-30",
    riskTier: "LONG_LEAD",
    flags: [],
    urgencyRank: 5,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  // CHANGED: Silencer upgraded from critical-grade to hospital-grade
  {
    id: 6,
    specSection: "235100",
    description: "Generator Exhaust System (Flue + Silencer)",
    basisOfDesign:
      "Hospital-grade silencer (upgraded from critical-grade), 35dB min attenuation at 500Hz, 16\" stainless steel exhaust flue",
    leadTimeWeeks: "20-30",
    riskTier: "LONG_LEAD",
    flags: [
      "Factory testing required",
      "Sole-source specified"
    ],
    urgencyRank: 6,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 7,
    specSection: "263213",
    description: "Radiator-Mounted Load Banks",
    basisOfDesign: "Avtron, Simplex, or equivalent — for generator testing",
    leadTimeWeeks: "16-24",
    riskTier: "LONG_LEAD",
    flags: [],
    urgencyRank: 7,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  // NEW: Second load bank added for redundancy testing per Addendum #2
  {
    id: 41,
    specSection: "263213",
    description: "Portable Load Bank — Redundancy Testing",
    basisOfDesign:
      "Avtron or Simplex — 1500kW portable load bank for simultaneous redundancy testing of GEN-1 and GEN-2",
    leadTimeWeeks: "16-24",
    riskTier: "LONG_LEAD",
    flags: [
      "Factory testing required"
    ],
    urgencyRank: 8,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 8,
    specSection: "262400",
    description: "Distribution Transformers",
    basisOfDesign:
      "Dry-type, 480V delta to 208Y/120V, Square D EX Series or equivalent",
    leadTimeWeeks: "16-24",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 9,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 9,
    specSection: "211313",
    description: "Wet-Pipe Sprinkler System Revisions",
    basisOfDesign:
      "Viking Corp or equivalent, revise piping in generator and essential distribution rooms",
    leadTimeWeeks: "8-14",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 10,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 10,
    specSection: "233113",
    description: "Metal Ductwork",
    basisOfDesign: "Galvanized steel, generator room ventilation",
    leadTimeWeeks: "6-10",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 11,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 11,
    specSection: "233423",
    description: "HVAC Power Ventilators",
    basisOfDesign: "Induced draft exhaust fans for generator room",
    leadTimeWeeks: "10-16",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 12,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 12,
    specSection: "262400",
    description: "Panelboards",
    basisOfDesign: "Square D, circuit breaker-equipped, NEMA PB-1",
    leadTimeWeeks: "12-20",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 13,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 13,
    specSection: "260574",
    description: "Overcurrent Coordination and Arc Flash Study",
    basisOfDesign:
      "Independent testing agency (INETA member), per IEEE 1584 and NFPA 70E",
    leadTimeWeeks: "8-12",
    riskTier: "MODERATE",
    flags: [
      "Coordination study required"
    ],
    urgencyRank: 14,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 14,
    specSection: "263213",
    description: "Generator Starting Battery and Charger",
    basisOfDesign: "24V system, UL 1236 charger, heated battery compartment",
    leadTimeWeeks: "6-10",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 15,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 15,
    specSection: "033000",
    description: "Cast-in-Place Concrete — Housekeeping Pads",
    basisOfDesign:
      "4000 psi per ACI 301, for generator, switchboard, and ATS mounting",
    leadTimeWeeks: "2-4",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 16,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 16,
    specSection: "03200",
    description: "Concrete Reinforcement",
    basisOfDesign: "ASTM A615, Grade 60 deformed bars",
    leadTimeWeeks: "1-3",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 17,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 17,
    specSection: "260526",
    description: "Electrical Grounding System",
    basisOfDesign:
      "Copper grounding electrode conductor, ground rods, bonding jumpers",
    leadTimeWeeks: "2-4",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 18,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 18,
    specSection: "260545",
    description: "Penetration Firestopping (Electrical)",
    basisOfDesign: "UL-listed firestop systems, Hilti Inc. or acceptable equivalent",
    leadTimeWeeks: "1-3",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 19,
    actionTimeframe: "SCHEDULE_LATER"
  },
  // REMOVED: Duct Insulation (id 19) — consolidated into Metal Ductwork line item
  // REMOVED: Identification Devices (id 20) — consolidated into trade-specific line items
  {
    id: 21,
    specSection: "231113",
    description: "Duplex Fuel Transfer Pump Set and Controls",
    basisOfDesign:
      "Preferred Utilities, Viking Pump, or IMO Pump — duplex transfer pumps with UL508A control panel, Modbus/BACnet, Preferred Model 72 duplex strainer, flow switch, leak detection",
    leadTimeWeeks: "16-24",
    riskTier: "LONG_LEAD",
    flags: [
      "Factory testing required",
      "Submittal-intensive"
    ],
    urgencyRank: 21,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 22,
    specSection: "231113",
    description: "Fuel Oil Day Tanks (GEN-1 and GEN-2)",
    basisOfDesign:
      "Preferred Utilities, Modern Welding, or Pryco — 200 gal UL 142, with rupture basin, multi-point level controls, high-high vent switch, leak detection",
    leadTimeWeeks: "12-18",
    riskTier: "MODERATE",
    flags: [
      "Extended warranty"
    ],
    urgencyRank: 22,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 23,
    specSection: "231113",
    description: "Fuel Oil Filtration and Maintenance System",
    basisOfDesign:
      "Preferred Utilities or Pall Corporation — microprocessor-controlled fuel polishing, NEMA 4 enclosure, Modbus/BACnet, containment basin with leak float",
    leadTimeWeeks: "16-24",
    riskTier: "LONG_LEAD",
    flags: [
      "Factory testing required"
    ],
    urgencyRank: 23,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 24,
    specSection: "231113",
    description: "Fuel Oil Valves and Specialties",
    basisOfDesign:
      "Ball valves: Conbraco/Apollo or Watts (UL 842); safety valves: Anderson Greenwood/Webster; emergency fusomatic shutoff: Morrison Bros./OPW; anti-siphon: Preferred Utilities/EBW",
    leadTimeWeeks: "8-12",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 24,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 25,
    specSection: "235100",
    description: "Double-Wall Generator Exhaust Flue (16\" SS)",
    basisOfDesign:
      "American Metal Products, Heat-Fab, Metal-Fab, or Selkirk — UL 103/959, 1400°F continuous, ASTM A666 Type 304 SS inner/outer, 2\" ceramic-fiber insulation",
    leadTimeWeeks: "16-24",
    riskTier: "LONG_LEAD",
    flags: [],
    urgencyRank: 25,
    actionTimeframe: "ACT_THIS_MONTH"
  },
  {
    id: 26,
    specSection: "262400",
    description: "Enclosed Molded-Case Circuit Breakers",
    basisOfDesign:
      "Square D with Micrologic LSI trip units, or Siemens/Eaton Cutler-Hammer — LSIG for ≥1000A on emergency systems; 65kA AIC at 480V",
    leadTimeWeeks: "12-20",
    riskTier: "MODERATE",
    flags: [
      "Coordination study required"
    ],
    urgencyRank: 26,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 27,
    specSection: "262400",
    description: "Fusible Branch Circuit Panelboards",
    basisOfDesign:
      "Cooper Bussmann Quik-Spec QSCP or Square D/GE/Eaton — 100kA SCCR, Class J fuses (Bussmann TCF branch / JKS main), 300kA IR minimum",
    leadTimeWeeks: "12-20",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 27,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 28,
    specSection: "262400",
    description: "Surge Protective Devices — Emergency Panels",
    basisOfDesign:
      "APT, Eaton, GE, Schneider, or Cooper Bussmann — factory-integral SPD per UL 67 / UL 1449, ≥200kA per phase, for all emergency power distribution panels",
    leadTimeWeeks: "10-16",
    riskTier: "MODERATE",
    flags: [
      "NFPA 110 Level 1 compliance"
    ],
    urgencyRank: 28,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 29,
    specSection: "260515",
    description: "Heavy-Duty Safety Switches and Fuses",
    basisOfDesign:
      "Square D Type H (NEMA HD), GE, or Westinghouse — Class RK5 fuses: Bussmann FRN-R (208V) / FRS-R (480V); rejection clips; one spare set per type/size",
    leadTimeWeeks: "6-10",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 29,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 30,
    specSection: "260515",
    description: "VFD Cable",
    basisOfDesign:
      "Belden #29502–29507 (#12–#2), #29528–29532 (#1–4/0), #29533–29535 (250–500 kcmil) or equivalent meeting spec requirements",
    leadTimeWeeks: "6-10",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 30,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 31,
    specSection: "260548",
    description: "Vibration and Seismic Controls — Electrical Systems",
    basisOfDesign:
      "ISAT, Amber/Booth, Hilti, or Mason Industries — vibration isolators, seismic bracing kits, cable restraints, mechanical/adhesive anchors per IBC Seismic Design Category D",
    leadTimeWeeks: "10-16",
    riskTier: "MODERATE",
    flags: [
      "Seismic certification required"
    ],
    urgencyRank: 31,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 32,
    specSection: "230548",
    description: "Vibration Isolators and Seismic Restraints — HVAC",
    basisOfDesign:
      "Mason Industries (Super W pads, SLF springs, SLR restrained springs, 30N spring hangers, SCB/SCBH cable restraints) or Vibro-Acoustics equivalent",
    leadTimeWeeks: "10-16",
    riskTier: "MODERATE",
    flags: [
      "Seismic certification required"
    ],
    urgencyRank: 32,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 33,
    specSection: "211313",
    description: "Fire Protection Sprinkler Heads",
    basisOfDesign:
      "Reliable, Tyco, Victaulic, or Viking — UL listed, FM approved, K=5.6, 175 psig, nominal 1/2\" orifice; bronze finish where indicated",
    leadTimeWeeks: "8-12",
    riskTier: "MODERATE",
    flags: [],
    urgencyRank: 33,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 34,
    specSection: "211313",
    description: "Grooved-Joint Pipe Fittings — Fire Protection",
    basisOfDesign:
      "Victaulic FireLock Installation-Ready or Anvil/Tyco/Shurjoint equivalent — ductile iron, EPDM gasket, UL 300 psi, for Schedule 10 grooved steel pipe NPS 1-1/4 through 2-1/2",
    leadTimeWeeks: "6-10",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 34,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 35,
    specSection: "233300",
    description: "Air Duct Accessories (Access Doors, Flex Connectors, Dampers)",
    basisOfDesign:
      "Access doors: Greenheck/Ruskin/Pottorff; flex connectors: Ductmate/Duro Dyne/Ventfabrics (UL 181 Class 1); fusible links: 10% spare stock",
    leadTimeWeeks: "6-10",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 35,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 36,
    specSection: "260515",
    description: "Electrical Raceways and Fittings",
    basisOfDesign:
      "RMC/IMC/EMT (min 3/4\"); PVC Sch 40: Carlon Type 40; LFMC: Liquatite Type LA with O-Z/Gedney 4Q connectors; sealing fittings: Crouse-Hinds EYS Series",
    leadTimeWeeks: "2-4",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 36,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 37,
    specSection: "260515",
    description: "Conductors and Cables",
    basisOfDesign:
      "THHN/THWN 600V (#14–#1 AWG); XHHW for #3 AWG and larger; MI cable where 2-hour fire rating required; color-coded per NEC",
    leadTimeWeeks: "4-8",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 37,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 38,
    specSection: "230519",
    description: "HVAC Meters, Gages, and Thermowells",
    basisOfDesign:
      "Ashcroft, Trerice, Weiss, or WIKA — bimetallic thermometers, pressure gages (ASME B40.100/B40.200), thermowells, test plugs; gauge test kit for Owner",
    leadTimeWeeks: "4-8",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 38,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 39,
    specSection: "260515",
    description: "Emergency Power-Off and Fuel Pump Stop Stations",
    basisOfDesign:
      "STI SS2024PO-EN (EPO), STI SS2035 FS/ES-EN (fuel stop) or equivalent — wall-mounted, labeled, with protective cover",
    leadTimeWeeks: "4-6",
    riskTier: "STANDARD",
    flags: [],
    urgencyRank: 39,
    actionTimeframe: "SCHEDULE_LATER"
  },
  {
    id: 40,
    specSection: "230529",
    description: "Hangers, Supports, and Metal Framing — HVAC",
    basisOfDesign:
      "Cooper B-Line, Unistrut, or Flex-Strut (MFMA-4); MSS SP-58/SP-69 hangers; thermal-hanger shield inserts: Pipe Shields/Rilco; expansion anchors per loads",
    leadTimeWeeks: "2-4",
    riskTier: "COMMODITY",
    flags: [],
    urgencyRank: 40,
    actionTimeframe: "SCHEDULE_LATER"
  }
];

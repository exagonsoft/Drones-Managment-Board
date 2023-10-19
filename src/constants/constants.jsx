import {
  GiDeliveryDrone,
  GiHistogram,
  GiHarborDock,
  GiMedicalPack,
} from "react-icons/gi";

export const navMenuLinks = [
  {
    title: "Drones",
    icon: <GiDeliveryDrone />,
    link: "/drones",
  },
  {
    title: "Drones Available",
    icon: <GiHarborDock />,
    link: "/drones/load",
  },
  {
    title: "Audit Logs",
    icon: <GiHistogram />,
    link: "/drones/audit",
  },
  {
    title: "Medications",
    icon: <GiMedicalPack />,
    link: "/medications",
  },
];

export const droneStates = [
  "IDLE",
  "LOADING",
  "LOADED",
  "DELIVERING",
  "DELIVERED",
  "RETURNING",
];

export const droneModels = [
  "Lightweight",
  "Middleweight",
  "Cruiserweight",
  "Heavyweight",
];

export const notificationType = {
  success: "SUCCESS",
  warning: "WARNING",
  error: "ERROR",
  info: "INFO",
}

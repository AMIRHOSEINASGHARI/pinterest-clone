// React Icons Imports
import { DiGhostSmall, DiPhotoshop } from "react-icons/di";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { PiMountainsLight } from "react-icons/pi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdOutlineDraw } from "react-icons/md";
import { GiComputerFan } from "react-icons/gi";
import { LuCat } from "react-icons/lu";
import {
  TbDeviceGamepad2,
  TbDeviceMobile,
  TbCar,
  TbCamera,
} from "react-icons/tb";
import { BiImage } from "react-icons/bi";

export const categoryFilters = [
  {
    name: "PC Setup",
    icon: <GiComputerFan />,
  },
  {
    name: "UI/UX",
    icon: <AiOutlineFormatPainter />,
  },
  {
    name: "Gaming",
    icon: <TbDeviceGamepad2 />,
  },
  {
    name: "Mobile",
    icon: <TbDeviceMobile />,
  },
  {
    name: "Computer",
    icon: <HiMiniComputerDesktop />,
  },
  {
    name: "Cars",
    icon: <TbCar />,
  },
  {
    name: "Wallpaper",
    icon: <BiImage />,
  },
  {
    name: "Photo",
    icon: <TbCamera />,
  },
  {
    name: "Nature",
    icon: <PiMountainsLight />,
  },
  {
    name: "Art",
    icon: <MdOutlineDraw />,
  },
  {
    name: "Cats",
    icon: <LuCat />,
  },
  {
    name: "Manipulation",
    icon: <DiPhotoshop />,
  },
  {
    name: "Others",
    icon: <DiGhostSmall />,
  },
];

export const breackPointsObject = {
  default: 2,
  550: 2,
  1000: 3,
  1200: 4,
  1400: 5,
  1800: 6,
  2000: 7,
  3000: 8,
  3500: 9,
  4000: 10,
  4500: 12,
  5000: 15,
};

export const notifyOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: "light",
};

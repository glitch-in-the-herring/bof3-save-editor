import type { ChangeEvent } from "react"

import anglerIcon from "../../../assets/fish/Angler.png"
import barandyIcon from "../../../assets/fish/Barandy.png"
import bassIcon from "../../../assets/fish/Bass.png"
import blackBassIcon from "../../../assets/fish/Black Bass.png"
import blackPorgyIcon from "../../../assets/fish/Black Porgy.png"
import blowfishIcon from "../../../assets/fish/Blowfish.png"
import devilfishIcon from "../../../assets/fish/Devilfish.png"
import flyingFishIcon from "../../../assets/fish/Flying Fish.png"
import jellyfishIcon from "../../../assets/fish/Jellyfish.png"
import mackerelIcon from "../../../assets/fish/Mackerel.png"
import manOWarIcon from "../../../assets/fish/Man-o'-War.png"
import manilloIcon from "../../../assets/fish/Manillo.png"
import martianSquidIcon from "../../../assets/fish/MartianSquid.png"
import octopusIcon from "../../../assets/fish/Octopus.png"
import piranhaIcon from "../../../assets/fish/Piranha.png"
import pufferIcon from "../../../assets/fish/Puffer.png"
import rainbowTroutIcon from "../../../assets/fish/RainbowTrout.png"
import redCatfishIcon from "../../../assets/fish/Red Catfish.png"
import seaBassIcon from "../../../assets/fish/Sea Bass.png"
import seaBreamIcon from "../../../assets/fish/Sea Bream.png"
import spearfishIcon from "../../../assets/fish/Spearfish.png"
import troutIcon from "../../../assets/fish/Trout.png"
import whaleIcon from "../../../assets/fish/Whale.png"
import { getFishing, useGlobal } from "../../../store/globalStore"
import { fish, type Fish } from "../../../types/fishing"
import Input from "../../shared/Input"

const fishIconsMap: Record<Fish, string> = {
  Jellyfish: jellyfishIcon,
  Piranha: piranhaIcon,
  Puffer: pufferIcon,
  Trout: troutIcon,
  RainbowTrout: rainbowTroutIcon,
  "Red Catfish": redCatfishIcon,
  Bass: bassIcon,
  MartianSquid: martianSquidIcon,
  "Black Bass": blackBassIcon,
  Barandy: barandyIcon,
  "Man-o'-War": manOWarIcon,
  "Flying Fish": flyingFishIcon,
  Blowfish: blowfishIcon,
  "Sea Bream": seaBreamIcon,
  "Sea Bass": seaBassIcon,
  "Black Porgy": blackPorgyIcon,
  Octopus: octopusIcon,
  Angler: anglerIcon,
  Devilfish: devilfishIcon,
  Spearfish: spearfishIcon,
  Whale: whaleIcon,
  Mackerel: mackerelIcon,
  Manillo: manilloIcon,
}

export default function FishingLength() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const fishing = getFishing(activeOptions, memcard)

  return (
    <div>
      <h3>Fish Lengths</h3>
      <div className="grid lg:w-4/12 grid-cols-4 gap-2">
        {fish.map((f, i) => (
          <Input
            id={`fish${i}`}
            name={`fish${i}`}
            label={f}
            inputType="number"
            icon={fishIconsMap[f]}
            iconHeight={40}
            iconWidth={64}
            value={fishing ? fishing.lengths[f] : ""}
            onChange={(e: ChangeEvent) => lengthChangeHandler(e, f)}
            divClassName="flex flex-col"
            disabled={!fishing}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

function lengthChangeHandler(e: ChangeEvent, fish: Fish) {
  const { saveFileIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setFishLength = useGlobal.getState().setFishLength

  setFishLength(Number(target.value), fish, saveFileIndex)
}

import Input from "../Input";

export default function CharacterGrowth() {
  return <div>
    <h3>Stat Growth Modifier</h3>
    <div className="grid grid-cols-2">
      <Input
        id="charHPGrowth"
        name="charHPGrowth"
        label="HP increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
      <Input
        id="charAPGrowth"
        name="charAPGrowth"
        label="AP increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
      <Input
        id="charPWRGrowth"
        name="charPWRGrowth"
        label="PWR increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
      <Input
        id="charDEFGrowth"
        name="charDEFGrowth"
        label="DEF increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
      <Input
        id="charAGLGrowth"
        name="charAGLGrowth"
        label="AGL increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
      <Input
        id="charINTGrowth"
        name="charINTGrowth"
        label="INT increase:"
        inputType="number"
        inputClassName="w-1/2"
      />
    </div>
  </div>
}
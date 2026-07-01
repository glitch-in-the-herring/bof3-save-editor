import Header from "../components/Index/Header"

export default function Changelog() {
  return (
    <>
      <Header />
      <title>Breath of Fire III Save Editor | Changelog</title>
      <h2>Changelog</h2>
      <div className="px-6">
        <ul>
          <li>
            <b>1 July 2026</b>
            <ul>
              <li>Added metadata editor</li>
              <li>Added play time editor</li>
            </ul>
          </li>
          <li>
            <b>30 June 2026</b>
            <ul>
              <li>
                It has been nearly five years since I made the first version of the Breath of Fire
                III save editor. At first I intended this to be a desktop application built with C
                and GTK. It was a terrible idea (you can still see the code in the old-gtk branch of
                the repository). Then I decided to move the editor to a website for portability's
                sake. The code that I made for the website version was terrible to say the least.
                Now I've finally updated it using modern web development technology&trade;. Most of
                the functionality of the editor before this overhaul is still there. I removed
                battle counters because they weren't working (they will be reimplemented later).
                Sometime soon I will be adding a faerie village editor (finally putting{" "}
                <a href="https://github.com/glitch-in-the-herring/bof3-save-editor/issues/3">
                  issue #3
                </a>{" "}
                to rest) as well as a metadata editor. This overhaul will also serve as a foundation
                for an (even more overdue) overhaul of the Breath of Fire IV save editor.
              </li>
            </ul>
          </li>
          <li>
            <b>5 October 2024</b>
          </li>
          <ul>
            <li>
              It seems that I forgot to include the Beast Spear in the list of equipment, it should
              be fixed now.
            </li>
          </ul>
          <li>
            <b>28 August 2024</b>
          </li>
          <ul>
            <li>
              Turns out the game's checksum algorithm only checks for the bytes from +0x200 to
              +0x10b0, not +0x200 to +0x1e00. This caused some weird errors when the empty byte is
              0xff instead of 0x00.
            </li>
          </ul>
          <li>
            <b>30 August 2023</b>
          </li>
          <ul>
            <li>Fixed fishing data not being saved.</li>
          </ul>
          <li>
            <b>17 June 2023:</b>
          </li>
          <ul>
            <li>
              Added "Child Ryu (Pyjama)" as a party member option. Without this, the save editor
              didn't work when editing saves created at the very first save point.
            </li>
          </ul>
          <li>
            <b>24 April 2023:</b>
          </li>
          <ul>
            <li>
              The appropriate stat growth value is inserted when changing masters.{" "}
              <del>
                Special cases of D'lonzo's accuracy increase and Yggdrasil's fire weakness are not
                included yet.
              </del>{" "}
              I now wonder if this is actually done by detecting by the master's ID and not by
              setting a byte.
            </li>
            <li>
              The current level of a character is set to be the apprenticing level when changing
              masters.
            </li>
          </ul>
          <li>
            <b>13 August 2022:</b>
          </li>
          <ul>
            <li>Maximum of fish caught can now be edited.</li>
          </ul>
          <li>
            <b>16 September 2021:</b>
          </li>
          <ul>
            <li>The project was created.</li>
          </ul>
        </ul>
      </div>
    </>
  )
}

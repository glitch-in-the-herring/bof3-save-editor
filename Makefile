save-editor: save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o dialog_window.o memcard_writer.o abils.o accs.o armors.o items.o options.o vitals.o weapons.o
	gcc -o save_editor save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o dialog_window.o memcard_writer.o abils.o accs.o armors.o items.o options.o vitals.o weapons.o `pkg-config --cflags --libs gtk4` -O2
	rm -f *.o
save_editor.o:
	gcc -c src/save_editor.c `pkg-config --cflags --libs gtk4` -O2
main_gui.o:
	gcc -c src/gui/main_gui.c `pkg-config --cflags --libs gtk4` -O2
character_page.o:
	gcc -c src/gui/character_page.c -O2 `pkg-config --cflags --libs gtk4` -O2
memcard.o:
	gcc -c src/memcard/memcard.c -O2 `pkg-config --cflags --libs gtk4` -O2
utils.o:
	gcc -c src/utils/utils.c -O2 `pkg-config --cflags --libs gtk4` -O2
character.o:
	gcc -c src/structs/character.c -O2 `pkg-config --cflags --libs gtk4` -O2
slot_switcher.o:
	gcc -c src/gui/slot_switcher.c -O2 `pkg-config --cflags --libs gtk4` -O2
dialog_window.o:
	gcc -c src/gui/dialog_window.c -O2 `pkg-config --cflags --libs gtk4` -O2
memcard_writer.o:
	gcc -c src/memcard/memcard_writer.c -O2 `pkg-config --cflags --libs gtk4` -O2

abils.o:
	gcc -c src/db/abils.c -O2 `pkg-config --cflags --libs gtk4` -O2
accs.o:
	gcc -c src/db/accs.c -O2 `pkg-config --cflags --libs gtk4` -O2
armors.o:
	gcc -c src/db/armors.c -O2 `pkg-config --cflags --libs gtk4` -O2
items.o:
	gcc -c src/db/items.c -O2 `pkg-config --cflags --libs gtk4` -O2
options.o:
	gcc -c src/db/options.c -O2 `pkg-config --cflags --libs gtk4` -O2
vitals.o:
	gcc -c src/db/vitals.c -O2 `pkg-config --cflags --libs gtk4` -O2
weapons.o:
	gcc -c src/db/weapons.c -O2 `pkg-config --cflags --libs gtk4` -O2

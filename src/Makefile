save_editor: save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o dialog_window.o memcard_writer.o abils.o accs.o armors.o items.o options.o vitals.o weapons.o
	gcc -o save_editor save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o dialog_window.o memcard_writer.o abils.o accs.o armors.o items.o options.o vitals.o weapons.o `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
	rm -f *.o
save_editor.o:
	gcc -c save_editor.c `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
main_gui.o:
	gcc -c gui/main_gui.c `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
character_page.o:
	gcc -c gui/character_page.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
memcard.o:
	gcc -c memcard/memcard.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
utils.o:
	gcc -c utils/utils.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
character.o:
	gcc -c structs/character.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
slot_switcher.o:
	gcc -c gui/slot_switcher.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
dialog_window.o:
	gcc -c gui/dialog_window.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
memcard_writer.o:
	gcc -c memcard/memcard_writer.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
abils.o:
	gcc -c db/abils.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
accs.o:
	gcc -c db/accs.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
armors.o:
	gcc -c db/armors.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
items.o:
	gcc -c db/items.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
options.o:
	gcc -c db/options.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
vitals.o:
	gcc -c db/vitals.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2
weapons.o:
	gcc -c db/weapons.c -O2 `pkg-config --cflags gtk+-3.0 --libs gtk+-3.0` -O2

.PHONY: clean
clean:
	rm -f save_editor
	rm -f save_editor.exe
	rm -f *.o

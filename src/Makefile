save-editor: save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o error_handler.o memcard_writer.o
	gcc -o a.out save_editor.o main_gui.o character_page.o memcard.o utils.o character.o slot_switcher.o error_handler.o memcard_writer.o `pkg-config --cflags --libs gtk4` -O2 -g
save_editor.o:
	gcc -c save_editor.c `pkg-config --cflags --libs gtk4` -O2 -g
main_gui.o:
	gcc -c gui/main_gui.c `pkg-config --cflags --libs gtk4` -O2 -g
character_page.o:
	gcc -c gui/character_page.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
memcard.o:
	gcc -c memcard/memcard.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
utils.o:
	gcc -c utils/utils.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
character.o:
	gcc -c structs/character.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
slot_switcher.o:
	gcc -c gui/slot_switcher.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
error_handler.o:
	gcc -c gui/error_handler.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g
memcard_writer.o:
	gcc -c memcard/memcard_writer.c -O2 `pkg-config --cflags --libs gtk4` -O2 -g	
.PHONY: clean
clean:
	rm -f out
	rm -f *.o

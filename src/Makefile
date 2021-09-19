save-editor: editor.o maingui.o utils.o character.o character_page.o
	gcc -o save-editor editor.o maingui.o utils.o character.o character_page.o `pkg-config --cflags --libs gtk4` -O2
editor.o:
	gcc -c editor.c `pkg-config --cflags --libs gtk4` -O2
maingui.o:
	gcc -c gui/maingui.c `pkg-config --cflags --libs gtk4` -O2
utils.o:
	gcc -c utils/utils.c -O2 `pkg-config --cflags --libs gtk4` -O2
character.o:
	gcc -c data/character.c -O2 `pkg-config --cflags --libs gtk4` -O2
character_page.o:
	gcc -c gui/character_page.c -O2 `pkg-config --cflags --libs gtk4` -O2	
.PHONY: clean
clean:
	rm -f save-editor
	rm -f *.o

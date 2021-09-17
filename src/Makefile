save-editor: editor.o gui.o utils.o
	gcc -o save-editor editor.o maingui.o utils.o `pkg-config --cflags --libs gtk4` -O2
editor.o:
	gcc -c editor.c `pkg-config --cflags --libs gtk4` -O2
gui.o:
	gcc -c gui/maingui.c `pkg-config --cflags --libs gtk4` -O2
utils.o:
	gcc -c utils/utils.c -O2 `pkg-config --cflags --libs gtk4` -O2
.PHONY: clean
clean:
	rm -f save-editor
	rm -f *.o

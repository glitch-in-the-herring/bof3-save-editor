SRC_DIR := ./src
SRC_FILES := $(wildcard $(SRC_DIR)/*/*.c)
OBJ_DIR := ./obj
OBJ_FILES := $(patsubst $(SRC_DIR)/%/%.c,$(OBJ)/%/%.o,$(SRC_FILES))
CC      := gcc
CFLAGS  := `pkg-config --cflags --libs gtk4` --O2
EXE := ./save_editor

all: | $(EXE)
$(EXE): $(OBJ_FILES) | $(OBJ_DIR)
	$(CC) $(CFLAGS) $^ -o $@
$(OBJ_DIR)/%/%.o: $(SRC)/%/%.c | $(OBJ_DIR):
	$(CC) $(CFLAGS) -c $< -o $@
$(OBJ_DIR):
	mkdir $@
.PHONY: clean
clean:
	rm -f save_editor
	rm -rf $(OBJ)

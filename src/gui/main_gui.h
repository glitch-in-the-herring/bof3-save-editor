#ifndef MAIN_GUI
#define MAIN_GUI

#include <gtk/gtk.h>
#include "character_page.h"
#include "../structs/save_slot.h"

#define INPUT_COUNT 19

struct FreeStruct
{
    int save_slot_count;
    struct SlotPageID **slot_page_ids;
};

void app_activate(GtkApplication *app, gpointer data);
void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data);
void app_shutdown(GtkApplication *app, gpointer data);

#endif

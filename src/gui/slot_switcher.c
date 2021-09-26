#include "slot_switcher.h"
#include "character_page.h"

void prev_save_slot(GtkWidget *widget, gpointer data)
{
    struct SlotPageID **slot_page_ids = data;
    GtkWidget *status_bar = slot_page_ids[0]->slot_page->status_bar;

    if (slot_page_ids[0]->slot_page->position == slot_page_ids[0]->slot_page->save_slot_count - 1)
        g_object_set(slot_page_ids[0]->slot_page->next_button, "sensitive", TRUE, NULL);

    slot_page_ids[0]->slot_page->position--;

    char buffer[32];
    sprintf(buffer, "Slot %i of %i", slot_page_ids[0]->slot_page->position + 1, slot_page_ids[0]->slot_page->save_slot_count);
    gtk_statusbar_push(GTK_STATUSBAR(status_bar), 1, buffer);    

    if (slot_page_ids[0]->slot_page->position == 0)
        g_object_set(slot_page_ids[0]->slot_page->prev_button, "sensitive", FALSE, NULL);

    prev_slot_load_character_fields(slot_page_ids);
}

void next_save_slot(GtkWidget *widget, gpointer data)
{
    struct SlotPageID **slot_page_ids = data;
    GtkWidget *status_bar = slot_page_ids[0]->slot_page->status_bar;

    if (slot_page_ids[0]->slot_page->position == 0)
        g_object_set(slot_page_ids[0]->slot_page->prev_button, "sensitive", TRUE, NULL);

    slot_page_ids[0]->slot_page->position++;

    char buffer[32];
    sprintf(buffer, "Slot %i of %i", slot_page_ids[0]->slot_page->position + 1, slot_page_ids[0]->slot_page->save_slot_count);
    gtk_statusbar_push(GTK_STATUSBAR(status_bar), 1, buffer);       

    if (slot_page_ids[0]->slot_page->position == slot_page_ids[0]->slot_page->save_slot_count - 1)
        g_object_set(slot_page_ids[0]->slot_page->next_button, "sensitive", FALSE, NULL);

    next_slot_load_character_fields(slot_page_ids);
}

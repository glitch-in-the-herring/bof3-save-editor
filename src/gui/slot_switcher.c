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

    load_slot_name(slot_page_ids[0]->slot_page, slot_page_ids[0]->slot_page->position);
    change_slot_load_character_fields(slot_page_ids);
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

    load_slot_name(slot_page_ids[0]->slot_page, slot_page_ids[0]->slot_page->position);
    change_slot_load_character_fields(slot_page_ids);
}

void load_slot_name(struct SlotPage *slot_page, int order)
{
    static unsigned long slot_name_signal_id = 0;

    if (slot_name_signal_id != 0)
        g_signal_handler_disconnect(slot_page->slot_name_entry, slot_name_signal_id);

    gtk_entry_set_text(GTK_ENTRY(slot_page->slot_name_entry), slot_page->save_slots[order]->name);

    slot_name_signal_id = g_signal_connect(slot_page->slot_name_entry, "changed", G_CALLBACK(store_slot_name), slot_page);
}

void store_slot_name(GtkWidget *widget, gpointer data)
{
    struct SlotPage *slot_page = data;
    strcpy(slot_page->save_slots[slot_page->position]->name, gtk_entry_get_text(GTK_ENTRY(widget)));
    int name_length = strlen(slot_page->save_slots[slot_page->position]->name);

    if (name_length < 5)
    {
        for (int i = name_length; i < 5; i++)
            slot_page->save_slots[slot_page->position]->name[i] = '\0';
    }
}

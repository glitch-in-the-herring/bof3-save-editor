#include "file_opener.h"
#include "main_gui.h"
#include "slot_switcher.h"
#include "character_page.h"
#include "inventory_page.h"
#include "dialog_window.h"
#include "../structs/save_slot.h"
#include "../structs/character.h"
#include "../structs/inventory.h"
#include "../memcard/memcard.h"
#include "../memcard/memcard_writer.h"

void file_opener(GtkWidget *widget, gpointer data)
{
    struct Loadable *loadable = data;
    struct SlotPageID **slot_page_ids = loadable->slot_page_ids;
    struct SlotPage *slot_page = loadable->card_stream->slot_page;
    struct CharacterDataFields *character_data_fields = slot_page->character_data_fields;
    struct CharacterFields *character_fields = character_data_fields->character_fields;
    struct InventoryDataFields *inventory_data_fields = slot_page->inventory_data_fields;
    struct InventoryFields *inventory_fields = inventory_data_fields->inventory_fields;
    struct SaveSlot **save_slots = slot_page->save_slots;
    struct FreeStruct *free_struct = loadable->free_struct;
    GtkFileChooserAction action = GTK_FILE_CHOOSER_ACTION_OPEN;
    GtkWidget *app_window = loadable->parent;
    GtkWidget *open_dialog = gtk_file_chooser_dialog_new("Open File", GTK_WINDOW(loadable->parent), action, "Cancel", GTK_RESPONSE_CANCEL, "Open", GTK_RESPONSE_ACCEPT, NULL);
    GtkWidget *status_bar = loadable->status_bar;
    GFile *file;

    g_object_set(open_dialog, "select-multiple", FALSE, NULL);

    int response =  gtk_dialog_run(GTK_DIALOG(open_dialog));

    if (response == GTK_RESPONSE_ACCEPT)
    {
        file = gtk_file_chooser_get_file(GTK_FILE_CHOOSER(open_dialog));

        unsigned char *memory_card;
        char *filename;
        int address;
        int save_slot_count = 0;

        if (g_file_load_contents(file, NULL, (char **) &memory_card, NULL, NULL, NULL))
        {
            if (validate_memory_card(memory_card))
            {
                while ((address = browse_toc(memory_card)) != -1)
                {
                    if (save_slots[save_slot_count]->character_data == NULL)
                        save_slots[save_slot_count]->character_data = g_new(struct CharacterData*, 8);
                    else
                    {
                        for (int i = 0; i < 8; i++)
                        {
                            if (save_slots[save_slot_count]->character_data[i] != NULL)
                                g_free(save_slots[save_slot_count]->character_data[i]);
                        }
                    }

                    if (save_slots[save_slot_count]->inventory_data != NULL)
                        g_free(save_slots[save_slot_count]->inventory_data);

                    save_slots[save_slot_count]->address = address;
                    get_save_slot_name(memory_card, save_slots[save_slot_count]->name, address);

                    for (int i = 0; i < 8; i++)
                        save_slots[save_slot_count]->character_data[i] = get_character_data(memory_card, i, address);

                    save_slots[save_slot_count]->inventory_data = get_inventory_data(memory_card, address);

                    save_slot_count++;
                }

                if (save_slot_count > 0)
                {
                    if (loadable->card_stream->file_stream != NULL)
                        g_io_stream_close(G_IO_STREAM(loadable->card_stream->file_stream), NULL, NULL);

                    char buffer[128];
                    filename = g_file_get_basename(file);
                    slot_page->save_slot_count = save_slot_count;
                    character_data_fields->character_data = save_slots[0]->character_data;
                    character_data_fields->character_id = 0;
                    load_slot_name(slot_page, 0);
                    load_character_names(slot_page_ids);
                    load_character_fields(slot_page_ids, character_data_fields, 0);
                    load_inventory_grid(slot_page_ids, inventory_data_fields, 0);
                    gtk_combo_box_set_active(GTK_COMBO_BOX(inventory_fields->inv_id_combo_box), 0);
                    g_signal_connect(inventory_fields->inv_id_combo_box, "changed", G_CALLBACK(combo_box_load_inventory_grid), inventory_data_fields);
                    g_object_unref(file);

                    if (loadable->not_sensitive)
                    {
                        enable_character_fields(character_fields);
                        g_object_set(slot_page->slot_name_entry, "sensitive", TRUE, NULL);
                        g_object_set(slot_page->save_button, "sensitive", TRUE, NULL);
                        g_object_set(inventory_fields->inv_id_combo_box, "sensitive", TRUE, NULL);
                        loadable->not_sensitive = 0;
                    }

                    g_snprintf(buffer, 128, "Slot %i of %i", slot_page->position + 1, save_slot_count);
                    gtk_statusbar_push(GTK_STATUSBAR(status_bar), 1, buffer);

                    g_snprintf(buffer, 128, "Breath of Fire III Save Editor - %s", filename);
                    gtk_window_set_title(GTK_WINDOW(app_window), buffer);
                    g_free(filename);

                    if (save_slot_count > 1)
                        g_object_set(slot_page->next_button, "sensitive", TRUE, NULL);
                    else
                        g_object_set(slot_page->next_button, "sensitive", FALSE, NULL);

                    loadable->card_stream->file_stream = g_file_open_readwrite(G_FILE(file), NULL, NULL);
                }
                else
                    assert_error(GTK_WINDOW(app_window), "No Breath of Fire III Save File Found");
            }
            else
                assert_error(GTK_WINDOW(app_window), "Invalid Memory Card");

            g_free(memory_card);
        }
        else
        {
            if ((filename = g_file_get_path(file)) != NULL)
            {
                assert_error(GTK_WINDOW(app_window), "File Does Not Exist");
                g_free(filename);
            }
        }

        free_struct->save_slot_count = save_slot_count;
        gtk_widget_destroy(open_dialog);
    }
}

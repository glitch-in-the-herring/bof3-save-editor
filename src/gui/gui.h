#include <gtk/gtk.h>

struct ToolButtons
{
    GtkWidget *open;
    GtkWidget *save;
};

struct CharacterFields
{
    GtkWidget *name_entry;
    GtkWidget *level_entry
    GtkWidget *exp_entry;    
    GtkWidget *current_hp_entry;
    GtkWidget *current_hp_entry;
    GtkWidget *current_max_hp_entry;
    GtkWidget *current_max_ap_entry;
    GtkWidget *current_max_hp_entry;
    GtkWidget *current_max_ap_entry;
    GtkWidget *base_pwr_entry;
    GtkWidget *base_def_entry;
    GtkWidget *base_agl_entry;
    GtkWidget *base_int_entry;
    GtkWidget *willpower_entry;
    GtkWidget *surprise_entry;
    GtkWidget *critical_entry;
    GtkWidget *dodge_entry;
    GtkWidget *to_hit_entry;
    GtkWidget *resistance_combo_boxes[9];
};

void app_activate(GtkApplication *app, gpointer data);
void app_open(GtkApplication *app, GFile **files, gint n_files, gchar *hint, gpointer data);
void app_shutdown(GtkApplication *app, gpointer data);
void launch_open_file_dialog(GtkButton *button, gpointer data);

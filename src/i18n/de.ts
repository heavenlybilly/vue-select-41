import { VueSelectI18n } from '@/types'

const i18n: VueSelectI18n = {
  noResults: "Keine Ergebnisse gefunden",
  selectedRecordsTitle: "Ausgewählte Datensätze",
  recordsSelected: (count: number) => {
    const form = count === 1 ? 'Datensatz' : 'Datensätze'
    return `${count} ${form} ausgewählt`
  },
  placeholder: {
    single: "Wählen Sie einen Wert",
    multiple: "Wählen Sie Werte",
    search: "Geben Sie Text ein, um zu suchen"
  }
};

export default i18n
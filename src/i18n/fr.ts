import { VueSelectTranslation } from '@/types'

const translation: VueSelectTranslation = {
  noResults: "Aucun résultat trouvé",
  selectedRecordsTitle: "Enregistrements sélectionnés",
  recordsSelected: (count: number) => {
    const form = count === 1 ? 'enregistrement' : 'enregistrements'
    return `${count} ${form} sélectionné${count > 1 ? 's' : ''}`
  },
  placeholder: {
    single: "Sélectionnez une valeur",
    multiple: "Sélectionnez des valeurs",
    search: "Entrez du texte pour rechercher"
  }
};

export default translation
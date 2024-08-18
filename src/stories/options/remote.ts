export const remoteHeroes = async (search?: string | null) => {
  const response = await fetch('https://mocki.io/v1/a42a5149-62c4-425c-95a0-ec7b43c29304')
  const items: { id: number; label: string }[] = await response.json()

  return items.filter((item) => {
    if (!search) {
      return true
    }

    return item.label.toLowerCase().includes(search.toLowerCase())
  })
}

export const remoteCountries = async (search?: string | null) => {
  const response = await fetch('https://mocki.io/v1/0d4cd626-5b76-41c8-a81e-3080ef904f60')
  const data: { options: { id: number; label: string }[] } = await response.json()

  const items = data.options
  return items.filter((item) => {
    if (!search) {
      return true
    }

    return item.label.toLowerCase().includes(search.toLowerCase())
  })
}

const SECTION_ORDER = ['Wireframes', 'High-Fi', 'Mockups', 'Screenshots', '_root']

const SECTION_TITLES = {
  Wireframes: 'Wireframes',
  'High-Fi': 'High Fidelity Prototype',
  Mockups: 'Mockups',
  Screenshots: 'Screenshots',
  _root: 'Design Process',
}

/** @type {Record<string, { category: 'design' | 'develop', folder: string, images: string[] }>} */
export const PROJECT_MOCKUP_SOURCES = {
  'd-1': {
    category: 'design',
    folder: 'WebMart',
    images: [
      'Wireframes/1.Home.png',
      'Wireframes/2.Products Listing.png',
      'Wireframes/3.Product Details.png',
      'Wireframes/4.Cart.png',
      'Wireframes/5.Checkout.png',
      'Wireframes/6.Tracking.png',
      'High-Fi/1.Home.png',
      'High-Fi/2.Products Listing.png',
      'High-Fi/3.Product Details.png',
      'High-Fi/4.Cart.png',
      'High-Fi/5.Checkout.png',
      'High-Fi/6.Tracking.png',
    ],
  },
  'd-2': {
    category: 'design',
    folder: 'EmpireDonuts',
    images: [
      'InformationArchitecture.png',
      'Userflow.png',
      'High-Fi/1.Home.png',
      'High-Fi/2.ProductDetail.png',
      'High-Fi/3.Cart.png',
      'High-Fi/4.Contact.png',
      'High-Fi/5.FAQs.png',
      'High-Fi/6.Reviews.png',
    ],
  },
  'd-3': {
    category: 'design',
    folder: 'Catitude',
    images: [
      'High-Fi/1.Welcome Page.png',
      'High-Fi/2.Home Page.png',
      'High-Fi/3.Cat Breeds Page.png',
      'High-Fi/4.Search.png',
      'High-Fi/5.Cat Detail Page.png',
      'High-Fi/6.P1 Page.png',
      'High-Fi/7.P2 Page.png',
      'High-Fi/8.P3 Page.png',
      'High-Fi/9.P4 Page.png',
      'High-Fi/10.P5 Page.png',       
      'High-Fi/11.Detect Page.png',
      'High-Fi/12.Settings.png',
    ],
  },
  'd-4': {
    category: 'design',
    folder: 'VibeChat',
    images: [
      'High-Fi/MacBook Pro 16_ - 4.png',
      'High-Fi/MacBook Pro 16_ - 5.png',
      'High-Fi/MacBook Pro 16_ - 6.png',
      'High-Fi/MacBook Pro 16_ - 7.png',
      'Mockups/MacBook Air (15 inch)-1.png',
      'Mockups/MacBook Air (15 inch).png',
    ],
  },
  'd-5': {
    category: 'design',
    folder: 'FoodSwift',
    images: [
      'High-Fi/1. Home Screen.png',
      'High-Fi/2. Restaurant Screen.png',
      'High-Fi/3. Food Screen.png',
      'High-Fi/4. Cart Screen.png',
      'High-Fi/5. Checkout Screen.png',
      'High-Fi/6. Status Screen.png',
      'High-Fi/Card.png',
      'High-Fi/E-wallet.png',
      'High-Fi/Filter.png',
      'High-Fi/Payment method screen.png',
      'High-Fi/Profile.png',
      'High-Fi/Settings.png',
    ],
  },
  'dev-1': {
    category: 'develop',
    folder: 'VibeChat',
    images: [
      'Screenshots/1.Login.png',
      'Screenshots/2.HomePage.png',
      'Screenshots/3.Messages.png',
    ],
  },
  'dev-2': {
    category: 'develop',
    folder: 'EventsFinder',
    images: ['Screenshots/1.HomePage.png', 'Screenshots/2.EventDetail.png'],
  },
}

const getSectionKey = (relativePath) => {
  const slashIndex = relativePath.indexOf('/')
  return slashIndex === -1 ? '_root' : relativePath.slice(0, slashIndex)
}

const getImageFileName = (relativePath) => {
  const parts = relativePath.split('/')
  return parts[parts.length - 1]
}

const getImageLabel = (relativePath) => {
  const fileName = getImageFileName(relativePath)
  return fileName.replace(/\.[^.]+$/, '')
}

const getLeadingNumber = (relativePath) => {
  const match = getImageFileName(relativePath).match(/^(\d+)/)
  return match ? Number(match[1]) : null
}

const compareMockupPaths = (pathA, pathB) => {
  const numberA = getLeadingNumber(pathA)
  const numberB = getLeadingNumber(pathB)

  if (numberA !== null && numberB !== null) {
    return numberA - numberB
  }

  if (numberA !== null) {
    return -1
  }

  if (numberB !== null) {
    return 1
  }

  return pathA.localeCompare(pathB)
}

export const getMockupImageUrl = (category, folder, relativePath) => {
  const encodedPath = relativePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return `${import.meta.env.BASE_URL}projects/mockups/${category}/${folder}/${encodedPath}`
}

export const getProjectMockupSections = (projectId) => {
  const source = PROJECT_MOCKUP_SOURCES[projectId]

  if (!source) {
    return []
  }

  const grouped = source.images.reduce((sections, relativePath) => {
    const key = getSectionKey(relativePath)

    if (!sections[key]) {
      sections[key] = []
    }

    sections[key].push({
      relativePath,
      src: getMockupImageUrl(source.category, source.folder, relativePath),
      alt: getImageLabel(relativePath),
    })

    return sections
  }, {})

  return SECTION_ORDER.filter((key) => grouped[key]?.length).map((key) => ({
    id: key,
    title: SECTION_TITLES[key] ?? key,
    images: grouped[key]
      .sort((imageA, imageB) => compareMockupPaths(imageA.relativePath, imageB.relativePath))
      .map(({ src, alt }) => ({ src, alt })),
  }))
}

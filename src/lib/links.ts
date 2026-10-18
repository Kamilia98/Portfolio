import { profile } from '../content'

// The PDF is printed into dist by `npm run cv`; the dev server has no PDF, so it links the page the PDF is printed from.
const devServer = import.meta.env.MODE === 'development'

export const cvHref = import.meta.env.BASE_URL + (devServer ? 'cv.html' : profile.cvFile)
export const cvDownloads = !devServer

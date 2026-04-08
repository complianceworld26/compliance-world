import { serviceCategories } from '../data/servicesData'

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const getServiceDetailPath = (category, service) =>
  `/services/${slugify(category)}/${slugify(service)}`

export const resolveServiceFromSlugs = (categorySlug, serviceSlug) => {
  const category =
    serviceCategories.find((item) => slugify(item.label) === categorySlug) ?? serviceCategories[0]

  const service =
    category.options.find((option) => slugify(option) === serviceSlug) ??
    category.options[0] ??
    'Proprietorship'

  return { category: category.label, service }
}

export interface CategoryModel {
  id: string
  title: string
  slug: string
  parentId: string
  description: string
  createdAt: string
  updatedAt: any
  parent: any
  image?: string
  subCategories: any[]
  productCategories: any[]
  suppliers: any[]
}

export interface ProductModel {
  id: string
  title: string
  slug: string
  supplier: string
  description: string
  images: string[]
  expiryDate: any
  createdAt: string
  updatedAt: any
  productCategories: any[]
  subProducts: SubProductModel[]
}

export interface SubProductModel {
  id: string
  color: string
  size: string
  qty: number
  price: number
  productId: string
  images: string[]
  discount?: number
  count: number
  createdBy: string
}

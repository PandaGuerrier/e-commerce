import ProductDto from '#marketing/dtos/product'
import { TableCell, TableRow } from '#ui/components/table'
import React, { useState } from 'react'

interface ProductCartProps {
  product: ProductDto
  quantity: number
  size: string
}

export function ProductCart({ product, quantity, size }: ProductCartProps) {
  const stock = product.stock.find(stock => stock.size === size)
  const stockQuantity = stock ? stock.stock : 0
  const [actQantity, setActQuantity] = useState(quantity)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const value = parseInt(e.target.value)
    if (value <= stockQuantity && value >= 0) {
      setActQuantity(value)
      // todo
    }
  }

  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium"><img width={"150px"} className={"rounded-md"} src={product.imageUrl || 'https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-7509.jpg?w=1380'}  alt={'Pas d\'images'}/></TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price / 100}</TableCell>
      <TableCell>{size}</TableCell>
      <TableCell className="text-right">
        <input
          type="number"
          value={actQantity}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            if (value <= stockQuantity && value >= 0) {
              setActQuantity(value)
            }
          }}
          className="w-16 text-center border rounded-md"
        />
      </TableCell>
    </TableRow>
  )

}

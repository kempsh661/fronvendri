export type OrderCatalogProduct = {
  id: string;
  name: string;
  unitPrice: number;
};

export const orderCatalogMock: OrderCatalogProduct[] = [
  { id: "p1", name: "Bolso de mano Laura", unitPrice: 120_000 },
  { id: "p2", name: "Camiseta oversize", unitPrice: 45_000 },
  { id: "p3", name: "Zapatillas Urban Run", unitPrice: 180_000 },
  { id: "p4", name: "Aretes dorados", unitPrice: 35_000 },
  { id: "p5", name: "Jeans mom fit", unitPrice: 95_000 },
  { id: "p6", name: "Gorra snapback", unitPrice: 28_000 },
  { id: "p7", name: "Chaqueta denim", unitPrice: 150_000 },
  { id: "p8", name: "Mochila Urbana", unitPrice: 135_000 },
];

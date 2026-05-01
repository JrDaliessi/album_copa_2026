export type ProductColor = "preto" | "amarelo" | "verde" | "azul" | "azul-claro";

export interface OrderDetails {
  color?: ProductColor;
  wantsPersonalization: boolean;
}

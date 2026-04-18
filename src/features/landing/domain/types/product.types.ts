export type ProductColor = "preto" | "amarelo" | "verde" | "azul";

export interface OrderDetails {
  color?: ProductColor;
  wantsPersonalization: boolean;
}

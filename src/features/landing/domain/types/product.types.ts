export type ProductColor = "preto" | "amarelo" | "verde" | "azul" | "azul-claro" | "duplo";

export interface OrderDetails {
  color?: ProductColor;
  wantsPersonalization: boolean;
  isDuplo?: boolean;
}

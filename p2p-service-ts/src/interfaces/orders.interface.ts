export interface Order {
  id: number;
  pix_address: string;
  amount: number;
  usdt_amount: number;
  provider_id?: number;
  receipt_image?: string;
  status: string;
}

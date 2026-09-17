// Application types and Cloudflare D1 environment definition

export type Bindings = {
  DB: D1Database;
};

export interface Category {
  id: number;
  name: string;
  icon: string;
  sort_order: number;
}

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: number;
  category_name?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id?: number;
  order_id?: number;
  menu_item_id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  temperature: string;
  sweetness: string;
  ice: string;
  toppings: string | null;
  item_notes?: string | null;
}

export interface Order {
  id: number;
  order_code: string;
  customer_name: string;
  customer_phone?: string | null;
  order_type: 'dine_in' | 'takeaway';
  table_no?: string | null;
  total_amount: number;
  status: OrderStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone?: string;
  order_type: 'dine_in' | 'takeaway';
  table_no?: string;
  notes?: string;
  items: {
    menu_item_id: number;
    item_name: string;
    quantity: number;
    unit_price: number;
    temperature: string;
    sweetness: string;
    ice: string;
    toppings?: string;
    item_notes?: string;
  }[];
}

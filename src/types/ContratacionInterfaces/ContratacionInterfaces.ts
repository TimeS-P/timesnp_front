// types/index.ts
export interface ContratacionData {
  nombre: string;
  rating: number;
  reviews: number;
  price: number;
  tipoPrecio: string;
  serviceTitle: string;
  availability: string;
  avatar: string;
  ubicacion: string;
}

export interface ContratacionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: ContratacionData;
}

export interface ServiceConfigData {
  selectedDate: string;
  selectedHours: number;
  selectedMeters: number;
  startTime: string;
  endTime: string;
}

export interface ReferralData {
  referralCode: string;
  referralApplied: boolean;
}

export interface PaymentData {
  usePoints: boolean;
  acceptTerms: boolean;
  basePrice: number;
  pointsDiscount: number;
  totalPrice: number;
  availablePoints: number;
  pointsValue: number;
}

export interface AllFormData extends ServiceConfigData, ReferralData, PaymentData {
  providerData: ContratacionData;
}
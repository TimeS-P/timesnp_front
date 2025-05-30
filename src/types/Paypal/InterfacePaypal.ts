declare global {
  interface Window {
    paypal: {
      Buttons: (options: {
        createOrder: (data: any, actions: any) => Promise<string>;
        onApprove: (data: any, actions: any) => Promise<void>;
        onCancel?: (data: any) => void;
        onError?: (err: any) => void;
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
          height?: number;
        };
      }) => {
        render: (element: HTMLElement) => void;
      };
    };
  }
}

export {};
export const INVOICE_STATUSES = ["draft", "pending", "paid"];

export const emptyInvoice = {
  createdAt: new Date().toISOString().slice(0, 10),
  paymentDue: new Date().toISOString().slice(0, 10),
  description: "",
  paymentTerms: 30,
  clientName: "",
  clientEmail: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: ""
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: ""
  },
  items: [{ name: "", quantity: 1, price: 0 }]
};

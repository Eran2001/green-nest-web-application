import { create } from "zustand";

interface LeadStore {
  consultationRequests: any[];
  contactMessages: any[];
  newsletterSubscriptions: string[];
  addConsultation: (data: any) => void;
  addContactMessage: (data: any) => void;
  addSubscription: (email: string) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  consultationRequests: [],
  contactMessages: [],
  newsletterSubscriptions: [],
  addConsultation: (data) => set((s) => ({ consultationRequests: [...s.consultationRequests, data] })),
  addContactMessage: (data) => set((s) => ({ contactMessages: [...s.contactMessages, data] })),
  addSubscription: (email) => set((s) => ({ newsletterSubscriptions: [...s.newsletterSubscriptions, email] })),
}));

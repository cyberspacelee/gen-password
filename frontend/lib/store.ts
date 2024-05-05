import { create } from 'zustand';

type PasswdStore = {
  password: string;
  updatePassword: (newPassword: string) => void;
};

export const useGenPass = create<PasswdStore>()((set) => ({
  password: 'Generated Password',
  updatePassword: (newPassword: string) => set({ password: newPassword }),
}));

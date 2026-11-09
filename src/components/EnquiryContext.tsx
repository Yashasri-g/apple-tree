import { createContext, useContext, useState, type ReactNode } from 'react';

export type CampusChoice = 'apple-play-school' | 'appletree-play-school' | 'not-sure';
interface Ctx { open: boolean; campus: CampusChoice; openEnquiry: (c?: CampusChoice) => void; close: () => void }
const C = createContext<Ctx | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [campus, setCampus] = useState<CampusChoice>('not-sure');
  return (
    <C.Provider value={{ open, campus, openEnquiry: (c = 'not-sure') => { setCampus(c); setOpen(true); }, close: () => setOpen(false) }}>
      {children}
    </C.Provider>
  );
}
export const useEnquiry = () => {
  const c = useContext(C);
  if (!c) throw new Error('useEnquiry outside provider');
  return c;
};

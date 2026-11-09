import React, { createContext, useContext, useState, ReactNode } from 'react';

type SchoolOption = 'both' | 'apple-play-school' | 'appletree-play-school';

interface EnquiryContextType {
  isOpen: boolean;
  selectedSchool: SchoolOption;
  openEnquiryModal: (school?: SchoolOption) => void;
  closeEnquiryModal: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption>('both');

  const openEnquiryModal = (school: SchoolOption = 'both') => {
    setSelectedSchool(school);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        selectedSchool,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = (): EnquiryContextType => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};


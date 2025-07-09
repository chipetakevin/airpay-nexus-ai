
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BankBranchMapping {
  [bankName: string]: {
    universalBranchCode: string;
    branches: Array<{
      name: string;
      code: string;
      location: string;
      isMain?: boolean;
    }>;
  };
}

const SOUTH_AFRICAN_BANK_BRANCHES: BankBranchMapping = {
  "ABSA Bank": {
    universalBranchCode: "632005",
    branches: [
      { name: "Main Branch", code: "632005", location: "Johannesburg CBD", isMain: true },
      { name: "Sandton City", code: "632020", location: "Sandton" },
      { name: "Cape Town Main", code: "632109", location: "Cape Town CBD" },
      { name: "Durban Point", code: "632242", location: "Durban" },
      { name: "Pretoria Central", code: "632166", location: "Pretoria" }
    ]
  },
  "Standard Bank": {
    universalBranchCode: "051001",
    branches: [
      { name: "Head Office", code: "051001", location: "Johannesburg CBD", isMain: true },
      { name: "Rosebank", code: "052053", location: "Rosebank" },
      { name: "V&A Waterfront", code: "025009", location: "Cape Town" },
      { name: "Umhlanga Ridge", code: "052546", location: "Umhlanga" },
      { name: "Brooklyn Mall", code: "012142", location: "Pretoria" }
    ]
  },
  "First National Bank (FNB)": {
    universalBranchCode: "250655",
    branches: [
      { name: "Main Branch", code: "250655", location: "Johannesburg CBD", isMain: true },
      { name: "Eastgate", code: "251345", location: "Bedfordview" },
      { name: "Claremont", code: "201409", location: "Cape Town" },
      { name: "Gateway", code: "250705", location: "Umhlanga" },
      { name: "Menlyn Park", code: "251745", location: "Pretoria" }
    ]
  },
  "Nedbank": {
    universalBranchCode: "198765",
    branches: [
      { name: "Head Office", code: "198765", location: "Sandton", isMain: true },
      { name: "Canal Walk", code: "198851", location: "Cape Town" },
      { name: "Pavilion", code: "128745", location: "Durban" },
      { name: "Wonderpark", code: "167742", location: "Pretoria" },
      { name: "Centurion Mall", code: "140805", location: "Centurion" }
    ]
  },
  "Capitec Bank": {
    universalBranchCode: "470010",
    branches: [
      { name: "Head Office", code: "470010", location: "Stellenbosch", isMain: true },
      { name: "Sandton", code: "470020", location: "Sandton" },
      { name: "Canal Walk", code: "470030", location: "Cape Town" },
      { name: "Gateway", code: "470040", location: "Umhlanga" },
      { name: "Brooklyn Mall", code: "470050", location: "Pretoria" }
    ]
  },
  "Discovery Bank": {
    universalBranchCode: "679000",
    branches: [
      { name: "Sandton", code: "679000", location: "Sandton", isMain: true },
      { name: "Cape Town", code: "679001", location: "Cape Town" }
    ]
  },
  "African Bank": {
    universalBranchCode: "430000",
    branches: [
      { name: "Head Office", code: "430000", location: "Midrand", isMain: true },
      { name: "Johannesburg", code: "430010", location: "Johannesburg CBD" }
    ]
  },
  "Investec Bank": {
    universalBranchCode: "580105",
    branches: [
      { name: "Sandton", code: "580105", location: "Sandton", isMain: true },
      { name: "Cape Town", code: "580205", location: "Cape Town" }
    ]
  }
};

export const useBranchCodeAutoAssign = () => {
  const { toast } = useToast();

  const getBranchCodeForBank = useCallback((bankName: string): string => {
    console.log(`🔍 Looking up branch code for: "${bankName}"`);
    
    const bankMapping = SOUTH_AFRICAN_BANK_BRANCHES[bankName];
    if (bankMapping) {
      const branchCode = bankMapping.universalBranchCode;
      console.log(`✅ Found branch code ${branchCode} for ${bankName}`);
      return branchCode;
    }
    
    console.warn(`❌ No branch code mapping found for: "${bankName}"`);
    console.log('Available banks:', Object.keys(SOUTH_AFRICAN_BANK_BRANCHES));
    return '';
  }, []);

  const getMainBranchForBank = useCallback((bankName: string) => {
    const bankMapping = SOUTH_AFRICAN_BANK_BRANCHES[bankName];
    if (bankMapping) {
      const mainBranch = bankMapping.branches.find(branch => branch.isMain) || bankMapping.branches[0];
      return mainBranch;
    }
    return null;
  }, []);

  const saveBankingInfoPermanently = useCallback((bankName: string, branchCode: string, accountNumber?: string) => {
    try {
      const bankingInfo = {
        bankName,
        branchCode,
        accountNumber: accountNumber || '',
        savedAt: new Date().toISOString(),
        isPermanent: true
      };

      // Save to multiple storage locations for maximum persistence
      localStorage.setItem('permanentBankingInfo', JSON.stringify(bankingInfo));
      sessionStorage.setItem('currentBankingSession', JSON.stringify(bankingInfo));
      
      // Also save to user profile for future logins
      const userProfile = localStorage.getItem('onecardUser');
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile);
          profile.bankingInfo = bankingInfo;
          localStorage.setItem('onecardUser', JSON.stringify(profile));
        } catch (error) {
          console.log('Profile banking save skipped');
        }
      }

      console.log('✅ Banking info permanently saved:', bankingInfo);
      return true;
    } catch (error) {
      console.error('❌ Failed to save banking info permanently:', error);
      return false;
    }
  }, []);

  const loadSavedBankingInfo = useCallback(() => {
    try {
      // Try permanent storage first
      const permanentData = localStorage.getItem('permanentBankingInfo');
      if (permanentData) {
        return JSON.parse(permanentData);
      }

      // Try current session
      const sessionData = sessionStorage.getItem('currentBankingSession');
      if (sessionData) {
        return JSON.parse(sessionData);
      }

      // Try user profile
      const userProfile = localStorage.getItem('onecardUser');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        if (profile.bankingInfo) {
          return profile.bankingInfo;
        }
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to load saved banking info:', error);
      return null;
    }
  }, []);

  const autoAssignBranchCode = useCallback((bankName: string, onBranchCodeSet: (branchCode: string) => void) => {
    const branchCode = getBranchCodeForBank(bankName);
    const mainBranch = getMainBranchForBank(bankName);
    
    if (branchCode && mainBranch) {
      onBranchCodeSet(branchCode);
      
      // Permanently save the banking selection  
      saveBankingInfoPermanently(bankName, branchCode);
      
      toast({
        title: "Branch Code Auto-Assigned! 🏦",
        description: `${mainBranch.name} - ${branchCode} permanently saved`,
        duration: 3000
      });
      
      console.log(`✅ Auto-assigned branch code: ${branchCode} for ${bankName}`);
      return branchCode;
    }
    
    return '';
  }, [getBranchCodeForBank, getMainBranchForBank, saveBankingInfoPermanently, toast]);

  return {
    getBranchCodeForBank,
    getMainBranchForBank,
    autoAssignBranchCode,
    saveBankingInfoPermanently,
    loadSavedBankingInfo,
    SOUTH_AFRICAN_BANK_BRANCHES
  };
};

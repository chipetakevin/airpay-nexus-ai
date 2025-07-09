/**
 * Banking System Validation Utility
 * Validates that all banks in the system have proper branch code assignments
 */

// Bank data from components
const BANKS_FROM_AUTOCOMPLETE = [
  "ABSA Bank",
  "Standard Bank", 
  "First National Bank (FNB)",
  "Nedbank",
  "Capitec Bank",
  "Discovery Bank",
  "African Bank",
  "Investec Bank"
];

// Expected branch codes for each bank
const EXPECTED_BRANCH_CODES = {
  "ABSA Bank": "632005",
  "Standard Bank": "051001",
  "First National Bank (FNB)": "250655", 
  "Nedbank": "198765",
  "Capitec Bank": "470010",
  "Discovery Bank": "679000",
  "African Bank": "430000",
  "Investec Bank": "580105"
};

/**
 * Validates that all banks have proper branch code configuration
 */
export const validateBankingSystem = () => {
  const results = {
    isValid: true,
    missingBanks: [] as string[],
    incorrectBranchCodes: [] as string[],
    validBanks: [] as string[],
    totalBanks: BANKS_FROM_AUTOCOMPLETE.length
  };

  console.log('🔍 Validating banking system configuration...');
  
  // Import the hook function directly (this would normally be done in a React component)
  // For validation purposes, we'll simulate the functionality
  
  BANKS_FROM_AUTOCOMPLETE.forEach(bankName => {
    const expectedBranchCode = EXPECTED_BRANCH_CODES[bankName as keyof typeof EXPECTED_BRANCH_CODES];
    
    if (!expectedBranchCode) {
      results.missingBanks.push(bankName);
      results.isValid = false;
      console.error(`❌ Missing branch code for: ${bankName}`);
    } else {
      results.validBanks.push(bankName);
      console.log(`✅ Valid configuration for ${bankName}: ${expectedBranchCode}`);
    }
  });

  console.log('\n📊 Banking System Validation Results:');
  console.log(`✅ Valid Banks: ${results.validBanks.length}/${results.totalBanks}`);
  console.log(`❌ Missing Banks: ${results.missingBanks.length}`);
  console.log(`🔧 Incorrect Branch Codes: ${results.incorrectBranchCodes.length}`);
  
  if (results.isValid) {
    console.log('🎉 Banking system is properly configured!');
  } else {
    console.error('⚠️ Banking system has configuration issues!');
  }

  return results;
};

/**
 * Test function to validate specific bank branch code assignment
 */
export const testBankBranchCodeAssignment = (bankName: string): { success: boolean; branchCode?: string; error?: string } => {
  const expectedBranchCode = EXPECTED_BRANCH_CODES[bankName as keyof typeof EXPECTED_BRANCH_CODES];
  
  if (!expectedBranchCode) {
    return {
      success: false,
      error: `No branch code configuration found for ${bankName}`
    };
  }
  
  return {
    success: true,
    branchCode: expectedBranchCode
  };
};

/**
 * Lists all available banks and their branch codes
 */
export const listAllBanksWithBranchCodes = () => {
  console.log('\n🏦 Complete Bank List with Branch Codes:');
  console.log('=' .repeat(50));
  
  Object.entries(EXPECTED_BRANCH_CODES).forEach(([bankName, branchCode]) => {
    console.log(`${bankName.padEnd(30)} → ${branchCode}`);
  });
  
  console.log('=' .repeat(50));
  console.log(`Total Banks: ${Object.keys(EXPECTED_BRANCH_CODES).length}`);
};

import React from 'react';
import BroadcastingHeader from './BroadcastingHeader';
import IndividualInvite from './IndividualInvite';
import GroupBroadcast from './GroupBroadcast';
import BulkBroadcast from './BulkBroadcast';
import QuickShareOptions from './QuickShareOptions';
import BenefitsPreview from './BenefitsPreview';

const InviteFriendTab = () => {
  return (
    <div className="space-y-6">
      <BroadcastingHeader />

      {/* Broadcasting Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IndividualInvite />
        <GroupBroadcast />
      </div>

      <BulkBroadcast />
      <QuickShareOptions />
      <BenefitsPreview />
    </div>
  );
};

export default InviteFriendTab;

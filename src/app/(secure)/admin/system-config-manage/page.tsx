'use client';

import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import SystemConfigurationManager from './_components/SystemConfigurationManager';
import { EAction } from '@/utils/types/authorization.type';

export default function SystemConfigurationPage() {
  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Configuration }]}>
      <SystemConfigurationManager />
    </ProtectedComponent>
  );
}

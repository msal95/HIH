import React from 'react'
import { useIntegrationImport } from '../../../api/config/integrationQueries'

export default function IntegrationImport() {
    const importQuery = useIntegrationImport();
    importQuery.mutate(12);
  return (
    <div>
      IntegrationImport
    </div>
  )
}

import { I18nProvider } from '../../contexts/I18nContext';
import { SiteContentProvider } from '../../contexts/SiteContentContext';
import { AdminRoot } from './AdminRoot';

export function AdminRoute() {
  return (
    <I18nProvider>
      <SiteContentProvider>
        <AdminRoot />
      </SiteContentProvider>
    </I18nProvider>
  );
}

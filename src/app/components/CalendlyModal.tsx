import { Dialog, DialogContent } from './ui/dialog';
import { useSiteContent } from '../../contexts/SiteContentContext';

interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendlyModal({ open, onOpenChange }: CalendlyModalProps) {
  const { siteConfig } = useSiteContent();
  const url = siteConfig.calendlyUrl;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <div className="flex-1 min-h-0 flex flex-col">
          <iframe
            title="Agendar reunião - Calendly"
            src={url}
            className="w-full h-[70vh] min-h-[400px] border-0 rounded-b-lg"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

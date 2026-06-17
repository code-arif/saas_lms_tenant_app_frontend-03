import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import type { Invoice } from '../services/subscriptionService';

interface BillingHistoryProps {
  invoices: Invoice[];
}

const BillingHistory = ({ invoices }: BillingHistoryProps) => {
  const statusColors: Record<string, 'success' | 'warning' | 'destructive'> = {
    paid: 'success',
    pending: 'warning',
    failed: 'destructive',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground text-sm">
            No invoices yet
          </p>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.uuid}>
                    <TableCell className="whitespace-nowrap">{formatDate(invoice.created_at)}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={statusColors[invoice.status] || 'secondary'}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {invoice.invoice_url ? (
                        <a 
                          href={invoice.invoice_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                      {/* Show status badge on mobile next to invoice action */}
                      <Badge variant={statusColors[invoice.status] || 'secondary'} className="sm:hidden ml-2">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingHistory;
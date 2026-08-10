import { Card, CardHeader } from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import { purchaseOrders } from "@/lib/mockData";

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function PurchaseOrdersWidget() {
  return (
    <Card>
      <CardHeader title="Purchase Orders" subtitle="Most recent procurement activity" />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12.5px]">
          <thead>
            <tr className="text-concrete-300">
              <th className="pb-2 font-medium">PO #</th>
              <th className="pb-2 font-medium">Vendor</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po) => (
              <tr key={po.id} className="border-t border-concrete-100 dark:border-white/5">
                <td className="py-2.5 font-mono text-concrete-500">{po.poNumber}</td>
                <td className="py-2.5 text-concrete-900 dark:text-blueprint-100">{po.vendor}</td>
                <td className="py-2.5 font-mono text-concrete-700 dark:text-blueprint-200">
                  {formatINR(po.amount)}
                </td>
                <td className="py-2.5">
                  <StatusChip label={po.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

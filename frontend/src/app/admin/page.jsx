import React from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FileText, Package, MessageSquare, Plus, LogOut } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Paras Printers CMS Management",
};

export default function AdminPage() {
  const stats = [
    { label: "Total Quote Requests", val: "148", icon: <FileText className="w-5 h-5 text-sky-500" /> },
    { label: "Active Catalogue Products", val: "34", icon: <Package className="w-5 h-5 text-emerald-500" /> },
    { label: "Contact Inquiries", val: "89", icon: <MessageSquare className="w-5 h-5 text-amber-500" /> },
  ];

  return (
    <div className="py-12 md:py-20 bg-[var(--background)] min-h-screen">
      <Container size="xl">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--border)]">
          <div>
            <Badge variant="cyan" size="md">Admin Portal</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mt-1">
              Paras Printers Dashboard
            </h1>
          </div>
          <Button variant="outline" size="sm" leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((s, idx) => (
            <Card key={idx} className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--muted-foreground)]">{s.label}</span>
                {s.icon}
              </div>
              <div className="text-3xl font-black text-[var(--foreground)] font-mono">{s.val}</div>
            </Card>
          ))}
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--foreground)]">Recent Quotation Inquiries</h3>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] uppercase">
                  <th className="py-3 px-2">Company</th>
                  <th className="py-3 px-2">Contact</th>
                  <th className="py-3 px-2">Product Category</th>
                  <th className="py-3 px-2">Quantity</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr>
                  <td className="py-3 px-2 font-bold text-[var(--foreground)]">Assam BioPharma</td>
                  <td className="py-3 px-2">Rajesh Sharma</td>
                  <td className="py-3 px-2">Pharmaceutical Vial Labels</td>
                  <td className="py-3 px-2 font-mono">5,000</td>
                  <td className="py-3 px-2"><Badge variant="success">Pending</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-bold text-[var(--foreground)]">Aqua Pure Beverages</td>
                  <td className="py-3 px-2">Bikash Gogoi</td>
                  <td className="py-3 px-2">PVC Shrink Labels</td>
                  <td className="py-3 px-2 font-mono">50,000</td>
                  <td className="py-3 px-2"><Badge variant="cyan">In Progress</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </div>
  );
}

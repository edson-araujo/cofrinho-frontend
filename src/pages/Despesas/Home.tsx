import { ContentLayout } from "../../components/admin-panel/content-layout";
import { DespesasContent } from "./Content";

export function DespesasHome() {
  const breadcrumbPages = [
    { name: "Despesas", path: "/despesas" },
    { name: "Home", path: "/despesas/home" },
  ];

  return (
    <ContentLayout breadcrumbPages={breadcrumbPages}>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <DespesasContent />
      </div>
    </ContentLayout>
  );
}


import { ContentLayout } from "../../components/admin-panel/content-layout";
import { DespesasContent } from "./Content";

export function DespesasHome() {
  return (
    <ContentLayout>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <DespesasContent />
      </div>
    </ContentLayout>
  );
}

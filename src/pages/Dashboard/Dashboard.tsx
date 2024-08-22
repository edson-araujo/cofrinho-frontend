import { ContentLayout } from "../../components/admin-panel/content-layout";
import PlaceholderContent from "../../components/demo/placeholder-content";

export function Dashboard() {
  return (
    <ContentLayout title="Dashboard">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <PlaceholderContent />
      </div>
    </ContentLayout>
  );
}

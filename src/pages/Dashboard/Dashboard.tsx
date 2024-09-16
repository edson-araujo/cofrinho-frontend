import { ContentLayout } from "../../components/admin-panel/content-layout";
import PlaceholderContent from "../../components/demo/placeholder-content";

export function Dashboard() {
  const breadcrumbPages = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <ContentLayout breadcrumbPages={breadcrumbPages}>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <PlaceholderContent />
      </div>
    </ContentLayout>
  );
}

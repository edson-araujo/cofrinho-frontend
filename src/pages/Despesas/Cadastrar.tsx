import { ContentLayout } from "../../components/admin-panel/content-layout";

export function DespesasCadastrar() {
        const breadcrumbPages = [
          { name: "Despesas", path: "/despesas" },
          { name: "Home", path: "/despesas/home" },
          { name: "Cadastrar", path: "/despesas/cadastrar" },
        ];
  return (
    <ContentLayout breadcrumbPages={breadcrumbPages}>
      <div>
        edson
        <h1>Cadastrar Despesa</h1>
      </div>
    </ContentLayout>
  );
}

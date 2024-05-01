import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import Section from "~/components/section";
import { RepoBlock } from "~/routes/projects/repo-block";
import { PageNav } from "~/routes/projects/page-nav";
import FunnelIcon from "~/media/icons/funnel-icon.svg?jsx";
import localProjects from "~/data/projects.json";
import filters from "~/data/filters.json";
import type { Project } from "~/types/Project";
import Filter from "./filter";

function paginateData(
  filteredData: Project[],
  pageNumber: number,
  itemsPerPage: number,
): Project[] {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredData.slice(startIndex, endIndex);
}

export default component$(() => {
  const itemsPerPage = 5;
  const currentPage = useSignal(1);
  const filter = useSignal(false);
  const store = useStore({
    projects: localProjects,
  });

  const filterStore = useStore<{
    features: string[];
    repoOwners: string[];
    techStacks: string[];
    all: string[];
  }>({
    features: [],
    repoOwners: [],
    techStacks: [],
    all: [],
  });

  const projects = useStore<{ list: Project[]; total: number }>({
    list: paginateData(localProjects, currentPage.value, itemsPerPage),
    total: localProjects.length,
  });

  const filterHandler = $(async (categoryName: string, filterState: any) => {
    if (categoryName === "features") {
      filterStore.features = Array.from(new Set([...filterState]));
    } else if (categoryName === "repoOwners") {
      filterStore.repoOwners = Array.from(new Set([...filterState]));
    } else if (categoryName === "techStacks") {
      filterStore.techStacks = Array.from(new Set([...filterState]));
    } else if (categoryName === "ClearFilter") {
      filterStore.features = [];
      filterStore.repoOwners = [];
      filterStore.techStacks = [];
      filterStore.all = [];
    }

    // Reset the current page to 1 when filters are changed
    currentPage.value = 1;

    filterStore.all = Array.from(
      new Set([
        ...filterState,
        ...filterStore.features,
        ...filterStore.repoOwners,
        ...filterStore.techStacks,
      ]),
    );

    const filteredProjects = store.projects.filter((project) => {
      return filterStore.all.every((filter) =>
        project.filterTags.all.includes(filter),
      );
    });

    projects.list = paginateData(
      filteredProjects,
      currentPage.value,
      itemsPerPage,
    );

    projects.total = filteredProjects.length;

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const pageHandler = $(async (pageNumber: number) => {
    currentPage.value = pageNumber;
    const filteredProjects = store.projects.filter((project) => {
      return filterStore.all.every((filter) =>
        project.filterTags.all.includes(filter),
      );
    });

    projects.list = paginateData(
      filteredProjects,
      currentPage.value,
      itemsPerPage,
    );

    projects.total = filteredProjects.length;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleMobileFilter = $(() => (filter.value = !filter.value));

  return (
    <>
      {!filter.value ? (
        <Section>
          <h1 class="text-primary">{$localize`公共程式專案一覽`}</h1>
          <div class="h2-sub mt-4">
            {$localize`公共程式由各政府單位提供，以下匯集國內外不同單位的公共程式。`}
          </div>
        </Section>
      ) : (
        <div class="sticky top-0 flex items-center justify-between bg-white p-6 md:hidden">
          <h3>{$localize`設定篩選條件`}</h3>
          <button
            class={[
              "flex items-center justify-center gap-4 rounded-md border border-primary bg-white px-3.5 py-2.5 text-base font-semibold text-primary shadow-sm",
              "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
            ]}
            onClick$={handleMobileFilter}
          >
            {$localize`完成`}
          </button>
        </div>
      )}
      <Section class="bg-gray-100">
        <div class="flex flex-col gap-6 md:flex-row md:gap-20 xl:min-h-[50vh]">
          {!filter.value && (
            <button
              class={[
                "flex items-center justify-center gap-3 rounded-md border border-primary-700 bg-white px-3.5 py-2.5 text-base font-semibold text-primary-700 shadow-sm md:hidden",
                "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
              ]}
              onClick$={handleMobileFilter}
            >
              {$localize`設定篩選條件`}
              <FunnelIcon
                q:slot="icon-right"
                class="h-5 w-5 text-primary-700"
              />
            </button>
          )}
          <div
            id="filter"
            class={[
              "min-w-60 flex-shrink-0 flex-col gap-8 md:flex",
              filter.value ? "block" : "hidden",
            ]}
          >
            <Filter
              name="features"
              options={filters.features}
              categoryName={$localize`功能類型`}
              onChange$={filterHandler}
            />
            <Filter
              name="repoOwners"
              categoryName={$localize`提供單位`}
              options={filters.repoOwners}
              onChange$={filterHandler}
            />
            <Filter
              name="techStacks"
              categoryName={$localize`使用技術`}
              options={filters.techStacks}
              onChange$={filterHandler}
            />
          </div>
          <div
            id="projects"
            class={[
              "flex w-full flex-col gap-8",
              filter.value ? "hidden md:block" : "block",
            ]}
          >
            {projects.list.map((project) => {
              const projectName =
                project.description["zh-Hant"].localisedName || project.name;
              const mainCopyrightOwner = project.legal.mainCopyrightOwner;
              const repoOwner = project.legal.repoOwner.split(" ")[0];
              const projectDescription =
                project.description["zh-Hant"].shortDescription;
              const projectFeatures = project.description["zh-Hant"].features;
              const mainCopyrightOwnerLogo = project.tw.mainCopyrightOwnerLogo;
              return (
                <RepoBlock
                  id={project.id}
                  key={project.name}
                  name={projectName}
                  repoOwner={repoOwner}
                  mainCopyrightOwner={mainCopyrightOwner}
                  mainCopyrightOwnerLogo={mainCopyrightOwnerLogo}
                  shortDescription={projectDescription}
                  features={projectFeatures}
                  dependsOn={project.dependsOn?.open}
                  techStacks={project.tw.techStacks}
                />
              );
            })}
            <PageNav
              currentPage={currentPage.value}
              itemsPerPage={itemsPerPage}
              totalItems={projects.total}
              onChange$={pageHandler}
            />
          </div>
        </div>
      </Section>
    </>
  );
});

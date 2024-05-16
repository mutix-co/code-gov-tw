import {
  $,
  component$,
  useSignal,
  useStore,
  useComputed$,
  useTask$,
  useOnWindow,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import Section from "~/components/section";
import { RepoBlock } from "~/routes/projects/repo-block";
import { PageNav } from "~/routes/projects/page-nav";
import FunnelIcon from "~/media/icons/funnel-icon.svg?jsx";
import Filter from "~/routes/projects/filter";
import localProjects from "~/data/projects.json";
import filters from "~/data/filters.json";
import type { Project } from "~/types/Project";
import {
  filterProjectsByFeatures,
  filterProjectsByRepoOwners,
  filterProjectsByTechStacks,
} from "~/routes/projects/filter-rules";
import { useLocation } from "@builder.io/qwik-city";

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

  const location = useLocation();
  const filterStore = useStore<{
    features: string[];
    repoOwners: string[];
    techStacks: string[];
  }>({
    features: [],
    repoOwners: [],
    techStacks: [],
  });

  const computedProjects = useComputed$(
    (): { data: Project[]; total: number } => {
      const filteredProjects = store.projects.filter((project) => {
        return (
          filterProjectsByFeatures(project, filterStore.features) &&
          filterProjectsByRepoOwners(project, filterStore.repoOwners) &&
          filterProjectsByTechStacks(project, filterStore.techStacks)
        );
      });
      return {
        data: paginateData(filteredProjects, currentPage.value, itemsPerPage),
        total: filteredProjects.length,
      };
    },
  );

  const handleMobileFilter = $(() => (filter.value = !filter.value));

  // Accept currentPage, filters from URL query parameters from initial load
  useOnWindow(
    "pageshow",
    $(() => {
      // currentPage initial load
      const page = location.url.searchParams.get("page");
      const parsedPage = parseInt(page ?? "1");
      currentPage.value = isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;

      // filters initial load
      const features = location.url.searchParams.get("features");
      const repoOwners = location.url.searchParams.get("repoOwners");
      const techStacks = location.url.searchParams.get("techStacks");

      const parsedFeatures = features?.split(",") ?? [];
      filterStore.features = parsedFeatures;
      const parsedRepoOwners = repoOwners?.split(",") ?? [];
      filterStore.repoOwners = parsedRepoOwners;
      const parsedTechStacks = techStacks?.split(",") ?? [];
      filterStore.techStacks = parsedTechStacks;

      window.history.replaceState({}, "", `?page=${currentPage.value}`);
    }),
  );

  // Update URL query parameters when currentPage or filters change
  useTask$(({ track }) => {
    track(() => currentPage.value);
    track(() => filterStore.features);
    track(() => filterStore.repoOwners);
    track(() => filterStore.techStacks);

    // Reset currentPage to 1 when filters change
    if (
      filterStore.features.length > 0 ||
      filterStore.repoOwners.length > 0 ||
      filterStore.techStacks.length > 0
    ) {
      currentPage.value = 1;
    }

    const queryParameters = [];

    const features = filterStore.features.join(",");
    if (features) {
      queryParameters.push(`features=${features}`);
    }
    const repoOwners = filterStore.repoOwners.join(",");
    if (repoOwners) {
      queryParameters.push(`repoOwners=${repoOwners}`);
    }
    const techStacks = filterStore.techStacks.join(",");
    if (techStacks) {
      queryParameters.push(`techStacks=${techStacks}`);
    }

    queryParameters.push(`page=${currentPage.value}`);

    isBrowser &&
      window.history.replaceState({}, "", `?${queryParameters.join("&")}`);
  });

  const handleFilterReset = $(() => {
    filterStore.features = [];
    filterStore.repoOwners = [];
    filterStore.techStacks = [];
  });

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
            class="hidden min-w-60 flex-shrink-0 flex-col gap-8 md:flex"
          >
            <Filter
              filterName="features"
              categoryName={$localize`功能類型`}
              filterOptions={filters.features}
              store={filterStore}
            />
            <Filter
              filterName="repoOwners"
              categoryName={$localize`提供單位`}
              filterOptions={filters.repoOwners}
              store={filterStore}
            />
            <Filter
              filterName="techStacks"
              categoryName={$localize`使用技術`}
              filterOptions={filters.techStacks}
              store={filterStore}
            />
            <button
              class="font-medium text-brand-secondary"
              onClick$={handleFilterReset}
            >{$localize`重設篩選`}</button>
          </div>
          {filter.value ? (
            <div
              id="filter"
              class="flex min-w-60 flex-shrink-0 flex-col gap-8 md:hidden"
            >
              <Filter
                filterName="features"
                categoryName={$localize`包含系統功能`}
                filterOptions={filters.features}
                store={filterStore}
              />
              <Filter
                filterName="repoOwners"
                categoryName={$localize`提供單位`}
                filterOptions={filters.repoOwners}
                store={filterStore}
              />
              <Filter
                filterName="techStacks"
                categoryName={$localize`使用技術`}
                filterOptions={filters.techStacks}
                store={filterStore}
              />
              <button
                class="font-medium text-brand-secondary"
                onClick$={handleFilterReset}
              >{$localize`重設篩選`}</button>
            </div>
          ) : (
            <div id="projects" class="flex w-full flex-col gap-8">
              {computedProjects.value.total === 0 && (
                <div class="mx-auto mt-4 flex flex-col justify-center">
                  <h3>{$localize`找不到篩選的專案`}</h3>
                  <button
                    class="mt-4 font-medium text-brand-secondary"
                    onClick$={handleFilterReset}
                  >{$localize`重設篩選`}</button>
                </div>
              )}
              {computedProjects.value.data.map((project) => {
                const projectName =
                  project.description["zh-Hant"].localisedName || project.name;
                const mainCopyrightOwner = project.legal.mainCopyrightOwner;
                const repoOwner = project.legal.repoOwner.split(" ")[0];
                const projectDescription =
                  project.description["zh-Hant"].shortDescription;
                const projectFeatures = project.description["zh-Hant"].features;
                const mainCopyrightOwnerLogo =
                  project.tw.mainCopyrightOwnerLogo;
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
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={computedProjects.value.total}
              />
            </div>
          )}
        </div>
      </Section>
    </>
  );
});

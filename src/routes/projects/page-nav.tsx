import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import ArrowLeftIcon from "~/media/icons/arrow-left-icon.svg?jsx";
import ArrowRightIcon from "~/media/icons/arrow-right-icon.svg?jsx";

type PageNavProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onChange$: QRL<(pageNumber: number) => void>;
};

function calculatePageRange(currentPage: number, totalPage: number) {
  let startPage = Math.max(currentPage - 1, 2);
  let endPage = Math.min(currentPage + 1, totalPage - 1);

  if (currentPage - 1 < 2) {
    endPage = 4;
  } else if (totalPage - currentPage < 2) {
    startPage = totalPage - 3;
  }

  return { startPage, endPage };
}

function generatePageNumbers(totalPage: number, currentPageValue: number) {
  if (totalPage <= 8) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const pages = [1];

  const { startPage, endPage } = calculatePageRange(
    currentPageValue,
    totalPage,
  );

  if (startPage > 2) pages.push(-1);
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  if (endPage < totalPage - 1) pages.push(-1);
  pages.push(totalPage);

  return pages;
}

export const PageNav = component$<PageNavProps>(
  ({ currentPage, itemsPerPage, totalItems, onChange$ }) => {
    const totalPage = Math.ceil(totalItems / itemsPerPage);
    const loading = useSignal(false);

    const handleNextPage = $(async () => {
      loading.value = true;
      if (currentPage * itemsPerPage >= totalItems) {
        return;
      }
      await onChange$(currentPage + 1);
      loading.value = false;
    });

    const handlePrevPage = $(async () => {
      if (currentPage === 1) return;
      loading.value = true;
      await onChange$(currentPage - 1);
      loading.value = false;
    });

    const handleDirectPage = $(async (e: Event) => {
      loading.value = true;
      const pageNumber = parseInt((e.target as HTMLButtonElement).textContent!);
      await onChange$(pageNumber);
      loading.value = false;
    });

    const generatePageList = () => {
      const pages = generatePageNumbers(totalPage, currentPage);

      return pages.map((page, index) => (
        <button
          key={index}
          class={[
            "group relative w-10 font-medium hover:text-brand-secondary",
            currentPage === page ? "text-brand-secondary" : "text-gray-300",
            "transition-colors duration-[50ms] ease-out",
          ]}
          onClick$={handleDirectPage}
          disabled={page === -1}
        >
          {page === -1 ? "..." : page}
          <span
            class={[
              "absolute inset-x-0 -top-4 w-10 border-t-2 border-brand-secondary group-hover:border-brand-secondary",
              currentPage === page && !loading.value
                ? "border-brand-secondary"
                : "border-transparent",
              "transition-colors duration-[50ms] ease-out",
            ]}
          ></span>
        </button>
      ));
    };

    return (
      <div class={["relative flex justify-between border-t-[1px] pt-4"]}>
        <button
          class={[currentPage === 1 ? "pointer-events-none opacity-0" : ""]}
          onClick$={handlePrevPage}
        >
          <div class="flex gap-3">
            <ArrowLeftIcon class="w-5" />
            <div class="text-sm font-medium">{$localize`上一頁`}</div>
          </div>
        </button>

        <div class="hidden xl:flex">{generatePageList()}</div>

        <button
          class={[
            currentPage * itemsPerPage >= totalItems
              ? "pointer-events-none opacity-0"
              : "",
          ]}
          onClick$={handleNextPage}
          disabled={currentPage * itemsPerPage >= totalItems}
        >
          <div class="flex gap-3">
            <div class="text-sm font-medium">{$localize`下一頁`}</div>
            <ArrowRightIcon class="w-5" />
          </div>
        </button>
        <div
          class={[
            "absolute -top-0 h-1 w-full animate-back-forth border-t-2 border-brand-secondary",
            loading.value ? "block" : "hidden",
          ]}
        ></div>
      </div>
    );
  },
);

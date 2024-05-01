import { useStore, type QRL } from "@builder.io/qwik";
import { component$, $, useSignal } from "@builder.io/qwik";

type FilterProps = {
  name: string;
  categoryName: string;
  options: string[];
  onChange$: QRL<(categoryName: string, filterState: any) => void>;
};

export default component$<FilterProps>(
  ({ name, options, categoryName, onChange$ }) => {
    const loading = useSignal(false);
    const inputRef = useSignal<Element>();
    const filterListRef = useSignal<Element>();
    const current = useStore<{ filters: string[] }>({
      filters: [],
    });

    const handleChange = $(async () => {
      loading.value = true;
      const list = filterListRef.value?.querySelectorAll("input") || [];

      const filters = [];
      for (const child of list) {
        if (child.checked) {
          filters.push(child.value);
        }
      }
      current.filters = filters;
      await onChange$(name, filters);
      loading.value = false;
    });

    const handleCheckAll = $(async () => {
      loading.value = true;
      const list = filterListRef.value?.querySelectorAll("input") || [];
      const filterList = [];
      for (const child of list) {
        child.checked = true;
        filterList.push(child.value);
      }
      current.filters = filterList;
      await onChange$("CheckAll", filterList);
      loading.value = false;
    });

    const handleClearFilters = $(async () => {
      loading.value = true;
      const list = filterListRef.value?.querySelectorAll("input") || [];
      const filterList = [];
      for (const child of list) {
        child.checked = false;
        filterList.push(child.value);
      }
      current.filters = [];
      await onChange$("ClearFilter", []);
      loading.value = false;
    });

    return (
      <div
        role="group"
        aria-labelledby={name}
        class="flex flex-col gap-4 border-t border-gray-400 pt-4 last-of-type:border-b last-of-type:pb-4"
      >
        <div class="flex items-center justify-between">
          <div id={name} class="flex gap-2">
            <h4>{categoryName}</h4>
            <div
              class={["loading-spinner", loading.value ? "block" : "hidden"]}
            ></div>
          </div>
          <button
            onClick$={
              current.filters.length > 0 ? handleClearFilters : handleCheckAll
            }
          >
            <div class="font-medium text-brand-secondary">
              {current.filters.length > 0
                ? $localize`取消全選`
                : $localize`全選`}
            </div>
          </button>
        </div>
        <div class="flex flex-col gap-2" ref={filterListRef}>
          {options.map((option) => {
            return (
              <label
                for={option}
                key={option}
                class="relative flex items-center"
              >
                <input
                  ref={inputRef}
                  id={option}
                  class={["mr-2 h-4 w-4 accent-brand-primary"]}
                  type="checkbox"
                  value={option}
                  onChange$={handleChange}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  },
);

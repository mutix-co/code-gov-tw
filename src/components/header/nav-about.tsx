import { $, component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const menu = useSignal(false);

  const onClick$ = $(() => (menu.value = !menu.value));

  return (
    <div class="relative">
      <button
        type="button"
        class="peer flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-black hover:bg-gray-100"
        aria-expanded="false"
        onClick$={onClick$}
      >
        <span>{$localize`關於公共程式`}</span>
        <svg
          class="ml-1 h-5 w-5 flex-none text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        class={[
          "absolute top-full z-10 mt-4 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5",
          {
            "translate-y-0 opacity-100 transition duration-200 ease-out":
              menu.value,
            "translate-y-1 opacity-0 transition duration-150 ease-in":
              !menu.value,
          },
        ]}
      >
        <div class="p-4">
          <div class="relative flex items-center rounded-lg p-4 hover:bg-gray-100">
            <Link
              href="/about"
              class="block whitespace-nowrap"
              onClick$={onClick$}
            >
              <span>{$localize`認識公共程式`}</span>
              <span class="absolute inset-0"></span>
            </Link>
          </div>
          <div class="relative flex items-center rounded-lg p-4 hover:bg-gray-100">
            <Link href="/future-plan" class="block" onClick$={onClick$}>
              <span>{$localize`未來規劃`}</span>
              <span class="absolute inset-0"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

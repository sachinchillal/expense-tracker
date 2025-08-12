export type ToastType = 'success' | 'error';

export enum TOAST_TYPE {
  SUCCESS = 'success',
  ERROR = 'error'
};

export interface Toast {
  id: number;
  message: string;
  body: string;
  type: ToastType;
  duration?: number; // Duration in milliseconds
  isDeleted: boolean;
}

export enum THEME_TYPE {
  AUTO = 'auto',
  DARK = 'dark',
  LIGHT = 'light'
};

const TagColors = [
  {
    name: "slate",
    light: { bg: "bg-slate-100", text: "text-slate-800" },
    dark: { bg: "dark:bg-slate-700", text: "dark:text-slate-100" }
  },
  // {
  //   name: "gray",
  //   light: { bg: "bg-gray-100", text: "text-gray-800" },
  //   dark: { bg: "dark:bg-gray-700", text: "dark:text-gray-100" }
  // },
  // {
  //   name: "zinc",
  //   light: { bg: "bg-zinc-100", text: "text-zinc-800" },
  //   dark: { bg: "dark:bg-zinc-700", text: "dark:text-zinc-100" }
  // },
  // {
  //   name: "neutral",
  //   light: { bg: "bg-neutral-100", text: "text-neutral-800" },
  //   dark: { bg: "dark:bg-neutral-700", text: "dark:text-neutral-100" }
  // },
  // {
  //   name: "stone",
  //   light: { bg: "bg-stone-100", text: "text-stone-800" },
  //   dark: { bg: "dark:bg-stone-700", text: "dark:text-stone-100" }
  // },
  // {
  //   name: "red",
  //   light: { bg: "bg-red-100", text: "text-red-800" },
  //   dark: { bg: "dark:bg-red-700", text: "dark:text-red-100" }
  // },
  {
    name: "orange",
    light: { bg: "bg-orange-100", text: "text-orange-800" },
    dark: { bg: "dark:bg-orange-700", text: "dark:text-orange-100" }
  },
  {
    name: "amber",
    light: { bg: "bg-amber-100", text: "text-amber-800" },
    dark: { bg: "dark:bg-amber-700", text: "dark:text-amber-100" }
  },
  {
    name: "yellow",
    light: { bg: "bg-yellow-100", text: "text-yellow-800" },
    dark: { bg: "dark:bg-yellow-700", text: "dark:text-yellow-100" }
  },
  {
    name: "lime",
    light: { bg: "bg-lime-100", text: "text-lime-800" },
    dark: { bg: "dark:bg-lime-700", text: "dark:text-lime-100" }
  },
  {
    name: "green",
    light: { bg: "bg-green-100", text: "text-green-800" },
    dark: { bg: "dark:bg-green-700", text: "dark:text-green-100" }
  },
  {
    name: "emerald",
    light: { bg: "bg-emerald-100", text: "text-emerald-800" },
    dark: { bg: "dark:bg-emerald-700", text: "dark:text-emerald-100" }
  },
  {
    name: "teal",
    light: { bg: "bg-teal-100", text: "text-teal-800" },
    dark: { bg: "dark:bg-teal-700", text: "dark:text-teal-100" }
  },
  {
    name: "cyan",
    light: { bg: "bg-cyan-100", text: "text-cyan-800" },
    dark: { bg: "dark:bg-cyan-700", text: "dark:text-cyan-100" }
  },
  {
    name: "sky",
    light: { bg: "bg-sky-100", text: "text-sky-800" },
    dark: { bg: "dark:bg-sky-700", text: "dark:text-sky-100" }
  },
  {
    name: "blue",
    light: { bg: "bg-blue-100", text: "text-blue-800" },
    dark: { bg: "dark:bg-blue-700", text: "dark:text-blue-100" }
  },
  {
    name: "indigo",
    light: { bg: "bg-indigo-100", text: "text-indigo-800" },
    dark: { bg: "dark:bg-indigo-700", text: "dark:text-indigo-100" }
  },
  {
    name: "violet",
    light: { bg: "bg-violet-100", text: "text-violet-800" },
    dark: { bg: "dark:bg-violet-700", text: "dark:text-violet-100" }
  },
  {
    name: "purple",
    light: { bg: "bg-purple-100", text: "text-purple-800" },
    dark: { bg: "dark:bg-purple-700", text: "dark:text-purple-100" }
  },
  {
    name: "fuchsia",
    light: { bg: "bg-fuchsia-100", text: "text-fuchsia-800" },
    dark: { bg: "dark:bg-fuchsia-700", text: "dark:text-fuchsia-100" }
  },
  {
    name: "pink",
    light: { bg: "bg-pink-100", text: "text-pink-800" },
    dark: { bg: "dark:bg-pink-700", text: "dark:text-pink-100" }
  },
  {
    name: "rose",
    light: { bg: "bg-rose-100", text: "text-rose-800" },
    dark: { bg: "dark:bg-rose-700", text: "dark:text-rose-100" }
  }
];
export const TagColorsList = TagColors.map(tag => {
  return [tag.light.bg, tag.light.text, tag.dark.bg, tag.dark.text].join(' ');
})
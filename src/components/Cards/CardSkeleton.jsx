import React from "react";

const CardSkeleton = () => {
  return (
    <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg animate-pulse">
      <div class="w-full h-64 bg-slate-200 dark:bg-slate-600 rounded-md mb-4"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full mb-4"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/4"></div>
      <div class="h-10 bg-slate-200 dark:bg-slate-600 rounded w-full mt-4"></div>
    </div>
  );
};

export default CardSkeleton;

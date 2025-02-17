import React from "react";

const FeaturedCardSkeletons = () => {
  return (
    <div class="bg-slate-200 dark:bg-slate-700 p-6 rounded-lg shadow-lg animate-pulse">
      <div class="w-full h-48 bg-slate-400 dark:bg-slate-600 mb-4"></div>
      <div class="h-4 bg-slate-400 dark:bg-slate-600 w-3/4 mb-2"></div>
      <div class="h-4 bg-slate-400 dark:bg-slate-600 w-1/2 mb-4"></div>
      <div class="flex items-center space-x-2 space-y-1 flex-wrap my-4">
        <div class="h-4 bg-slate-400 dark:bg-slate-600 rounded w-14"></div>
        <div class="h-4 bg-slate-400 dark:bg-slate-600 rounded w-14"></div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="h-8 bg-slate-400 dark:bg-slate-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default FeaturedCardSkeletons;

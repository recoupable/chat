"use client";

import { useArtistProvider } from "@/providers/ArtistProvider";
import { useScheduledActions } from "@/hooks/useScheduledActions";
import { useTaskRuns } from "@/hooks/useTaskRuns";
import TasksList from "./TasksList";
import RecentRunsList from "./RecentRunsList";
import useAutoLogin from "@/hooks/useAutoLogin";

const TasksPage = () => {
  useAutoLogin();
  const { selectedArtist } = useArtistProvider();
  const artistAccountId = selectedArtist?.account_id as string | undefined;
  const { data, isLoading, isError } = useScheduledActions({
    artistAccountId,
  });
  const {
    data: taskRuns,
    isLoading: isRunsLoading,
    isError: isRunsError,
  } = useTaskRuns();

  const tasks = data ?? [];
  const runs = taskRuns ?? [];

  return (
    <div className="max-w-full md:max-w-[calc(100vw-200px)] grow py-8 px-6 md:px-12">
      <h1 className="text-left font-heading text-3xl font-bold dark:text-white mb-4">
        Tasks
      </h1>
      <p className="text-lg text-muted-foreground text-left mb-4 font-light font-sans max-w-2xl">
        View and manage all the tasks for your selected artist.
      </p>

      <TasksList tasks={tasks} isLoading={isLoading} isError={isError} />

      <div className="max-w-2xl mx-auto mt-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground dark:text-white">
            Recent Runs
          </h3>
        </div>
        <RecentRunsList
          runs={runs}
          isLoading={isRunsLoading}
          isError={isRunsError}
        />
      </div>
    </div>
  );
};

export default TasksPage;

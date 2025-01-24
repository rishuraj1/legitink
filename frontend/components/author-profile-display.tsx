"use client";

import { CurrProfile } from "@/types";
import { Landmark, User, Library } from "lucide-react";

const StudentProfile = ({ authorProfile }: { authorProfile: CurrProfile }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2">
        <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
          <User size={16} className="dark:text-zinc-300" />
          {authorProfile?.type}
        </span>
        <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
          <Landmark size={16} className="dark:text-zinc-300" />
          {authorProfile?.institution}
        </span>
      </div>
      <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
        <Library size={16} className="dark:text-zinc-300" />
        {authorProfile?.course} / {authorProfile?.year} /{" "}
        {authorProfile?.semester}th semester
      </span>
    </div>
  );
};

const ProfessionalProfile = ({
  authorProfile,
}: {
  authorProfile: CurrProfile;
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
        <User size={16} className="dark:text-zinc-300" />
        {authorProfile?.designation} ({authorProfile?.type})
      </span>
      <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
        <Landmark size={16} className="dark:text-zinc-300" />
        {authorProfile?.institution}
      </span>
    </div>
  );
};

const LawyerProfile = ({ authorProfile }: { authorProfile: CurrProfile }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
        <User size={16} className="dark:text-zinc-300" />
        {authorProfile?.type}
      </span>
      <span className="text-sm flex gap-2 text-zinc-700 dark:text-zinc-500">
        <Landmark size={16} className="dark:text-zinc-300" />
        {authorProfile?.institution}
      </span>
    </div>
  );
};

const RenderAuthorProfile = ({
  authorProfile,
}: {
  authorProfile: CurrProfile;
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {authorProfile?.type === "Law Student" && (
        <StudentProfile authorProfile={authorProfile} />
      )}
      {authorProfile?.type === "Legal Professional" && (
        <ProfessionalProfile authorProfile={authorProfile} />
      )}
      {authorProfile?.type === "Lawyer" && (
        <LawyerProfile authorProfile={authorProfile} />
      )}
    </div>
  );
};

export default RenderAuthorProfile;

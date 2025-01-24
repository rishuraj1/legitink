"use client";

import { CurrProfile } from "@/types";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

const AuthorProfile = ({
  selectProfile,
  handleChangeProfile,
  setAuthorProfile,
  authorProfile,
}: {
  selectProfile: string | null;
  handleChangeProfile: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setAuthorProfile: (profile: CurrProfile) => void;
  authorProfile: CurrProfile | null;
}) => {
  console.log("Author Profile", authorProfile);
  const [formInputs, setFormInputs] = useState({
    year: "",
    semester: "",
    institution: "",
    course: "",
    designation: "",
    practisingAt: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setFormInputs({
      year: "",
      semester: "",
      institution: "",
      course: "",
      designation: "",
      practisingAt: "",
    });
    setErrors({});
    if (selectProfile === "default") {
      setAuthorProfile({
        type: "default",
      });
    }
  }, [selectProfile, setAuthorProfile]);

  const validateField = (name: string, value: string) => {
    if (!value || value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: true }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [name]: false }));
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);

    if (selectProfile === "student") {
      const isYearValid =
        name === "year"
          ? validateField("year", value)
          : validateField("year", formInputs.year);
      const isSemesterValid =
        name === "semester"
          ? validateField("semester", value)
          : validateField("semester", formInputs.semester);
      const isInstitutionValid =
        name === "institution"
          ? validateField("institution", value)
          : validateField("institution", formInputs.institution);
      const isCourseValid =
        name === "course"
          ? validateField("course", value)
          : validateField("course", formInputs.course);

      if (
        isYearValid &&
        isSemesterValid &&
        isInstitutionValid &&
        isCourseValid
      ) {
        setAuthorProfile({
          type: "Law Student",
          year: name === "year" ? Number(value) : Number(formInputs.year),
          semester:
            name === "semester" ? Number(value) : Number(formInputs.semester),
          institution: name === "institution" ? value : formInputs.institution,
          course: name === "course" ? value : formInputs.course,
        });
      }
    } else if (selectProfile === "professional") {
      const isDesignationValid =
        name === "designation"
          ? validateField("designation", value)
          : validateField("designation", formInputs.designation);
      const isInstitutionValid =
        name === "institution"
          ? validateField("institution", value)
          : validateField("institution", formInputs.institution);

      if (isDesignationValid && isInstitutionValid) {
        setAuthorProfile({
          type: "Legal Professional",
          institution: name === "institution" ? value : formInputs.institution,
          designation: name === "designation" ? value : formInputs.designation,
        });
      }
    } else if (selectProfile === "lawyer") {
      const isPractisingAtValid =
        name === "practisingAt"
          ? validateField("practisingAt", value)
          : validateField("practisingAt", formInputs.practisingAt);
      const isInstitutionValid =
        name === "institution"
          ? validateField("institution", value)
          : validateField("institution", formInputs.institution);

      if (isPractisingAtValid && isInstitutionValid) {
        setAuthorProfile({
          type: "Lawyer",
          institution: name === "institution" ? value : formInputs.institution,
          practisingAt:
            name === "practisingAt" ? value : formInputs.practisingAt,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 border border-dashed border-gray-200 dark:border-gray-700 p-6">
      <select
        onChange={handleChangeProfile}
        className="w-1/3 border border-gray-300 dark:border-gray-700 p-2 rounded-md"
      >
        <option value="default">Select your current profile</option>
        <option value="student">Law Student</option>
        <option value="professional">Legal Professional</option>
        <option value="lawyer">Lawyer</option>
      </select>

      {selectProfile === "student" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Input
                name="year"
                placeholder="Year"
                type="number"
                max={2032}
                min={1}
                value={formInputs.year}
                onChange={handleInputChange}
                className={errors.year ? "border-red-500" : ""}
                required
              />
              {errors.year && (
                <span className="text-red-500 text-sm mt-1">
                  Year is required
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Input
                name="semester"
                placeholder="Sem"
                type="number"
                max={10}
                min={1}
                value={formInputs.semester}
                onChange={handleInputChange}
                className={errors.semester ? "border-red-500" : ""}
                required
              />
              {errors.semester && (
                <span className="text-red-500 text-sm mt-1">
                  Semester is required
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Input
                name="institution"
                placeholder="University/College"
                value={formInputs.institution}
                onChange={handleInputChange}
                className={errors.institution ? "border-red-500" : ""}
                required
              />
              {errors.institution && (
                <span className="text-red-500 text-sm mt-1">
                  Institution is required
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Input
                name="course"
                placeholder="Course"
                value={formInputs.course}
                onChange={handleInputChange}
                className={errors.course ? "border-red-500" : ""}
                required
              />
              {errors.course && (
                <span className="text-red-500 text-sm mt-1">
                  Course is required
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {selectProfile === "professional" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Input
                name="designation"
                placeholder="Designation"
                value={formInputs.designation}
                onChange={handleInputChange}
                className={errors.designation ? "border-red-500" : ""}
                required
              />
              {errors.designation && (
                <span className="text-red-500 text-sm mt-1">
                  Designation is required
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Input
                name="institution"
                placeholder="University/College"
                value={formInputs.institution}
                onChange={handleInputChange}
                className={errors.institution ? "border-red-500" : ""}
                required
              />
              {errors.institution && (
                <span className="text-red-500 text-sm mt-1">
                  Institution is required
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {selectProfile === "lawyer" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex flex-col flex-1">
              <Input
                name="practisingAt"
                placeholder="Practising at"
                value={formInputs.practisingAt}
                onChange={handleInputChange}
                className={errors.practisingAt ? "border-red-500" : ""}
                required
              />
              {errors.practisingAt && (
                <span className="text-red-500 text-sm mt-1">
                  Practice location is required
                </span>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Input
                name="institution"
                placeholder="University/College"
                value={formInputs.institution}
                onChange={handleInputChange}
                className={errors.institution ? "border-red-500" : ""}
                required
              />
              {errors.institution && (
                <span className="text-red-500 text-sm mt-1">
                  Institution is required
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorProfile;

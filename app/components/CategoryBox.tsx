"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // convert an object of params paramters to strings
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      // the label name will be assign to the params category url
      category: label,
    };
    // to select and remove selected category params
    if (params?.get(`category`) === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [router, params, label]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;

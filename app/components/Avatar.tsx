"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="avatar"
      src={src || "/images/placeholder.jpg"}
      className="rounded-full "
      width="30"
      height="30"
    />
  );
};

export default Avatar;

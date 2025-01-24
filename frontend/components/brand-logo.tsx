import Link from "next/link";

const BrandLogo = () => {
  return (
    <Link href={"/"} className="flex leading-3">
      <span className="font-light text-2xl">Legit</span>
      <span className="font-bold text-2xl">Ink</span>
    </Link>
  );
};

export default BrandLogo;

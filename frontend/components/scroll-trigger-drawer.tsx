"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useAppStore from "@/store";
import { redirect } from "next/navigation";

const ScrollTriggeredDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { hasAgreed, setHasAgreed } = useAppStore();

  useEffect(() => {
    if (!hasAgreed) {
      const handleScroll = () => {
        if (window.scrollY > 100 && !isDrawerOpen) {
          setIsDrawerOpen(true);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasAgreed, isDrawerOpen]);

  const handleAgree = () => {
    setHasAgreed(true);
    setIsDrawerOpen(false);
  };

  const handleDeny = () => {
    redirect("/");
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(isOpen) => setIsDrawerOpen(isOpen)}
      onClose={handleDeny}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms and Conditions</DrawerTitle>
          <DrawerDescription>
            By clicking on <span className="font-bold">Agree</span>, you accept
            and acknowledge with the terms that all content, including blogs and
            articles, is provided &quot;as is&quot; for informational purposes
            only. LegalInk make no guarantees regarding accuracy, completeness,
            or suitability and{" "}
            <span className="font-bold">disclaim all liability</span> for any
            errors, omissions, or actions taken based on the content.
            Copyrighted material used is{" "}
            <span className="font-bold">
              either owned or appropriately credited
            </span>
            . If you believe your rights have been violated, contact us at{" "}
            <span className="font-bold">contactLegalInk@gmail.com</span>. The
            website and its owners are not liable for any claims, damages, or
            consequences arising from the use of such content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-end gap-4">
            <Button onClick={handleAgree}>Agree</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleDeny}>
                Deny
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ScrollTriggeredDrawer;
